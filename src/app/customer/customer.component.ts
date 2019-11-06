import { CustomerService } from './customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  selectedFiles = null;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit() {}

  submit() {
    this.customerService.upload(this.selectedFiles).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log(
          'Upload Progress: ' +
            Math.round(event.loaded / event.total) * 100 +
            '%'
        );
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
      }
    });
  }

  onFileSelected(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length > 0) {
      for (const item of this.selectedFiles) {
        console.log(item);
      }
    }
  }
}
