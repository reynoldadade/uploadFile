import { CustomerService } from './customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  selectedFiles = null;
  progress = 0;
  uploadForm: FormGroup;
  upload = false;
  spin = false;
  uploadResponse = {
    alreadyExists: [],
    successful: 0,
    alreadyExistsLength: 0
  };
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.uploadForm = this.fb.group({
      file: ['', Validators.required]
    });
  }

  submit() {
    this.upload = true;
    this.spin = true;
    this.customerService.upload(this.selectedFiles).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(event.loaded / event.total) * 100;
          this.toastr.info(
            'Updating Swift Entries, wait for csuccess confirmation',
            'Updating Data!'
          );
        } else if (event.type === HttpEventType.Response) {
          // console.log(event.body, 'response');
          this.uploadResponse.alreadyExistsLength =
            event.body.alreadyExists.length;
          this.uploadResponse.successful = event.body.successful.length;
          this.uploadResponse.alreadyExists = event.body.alreadyExists;
          this.toastr.success('Customer update complete', 'Success!');
          this.spin = false;
        }
      },
      err => {
        this.toastr.success('Unable to complete upload', 'Error!');
        this.spin = false;
      }
    );
  }

  onFileSelected(event) {
    this.selectedFiles = event.target.files;
    // if (this.selectedFiles.length > 0) {
    //   for (const item of this.selectedFiles) {
    //     console.log(item);
    //   }
    // }
  }
}
