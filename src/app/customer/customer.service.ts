import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  upload(body): Observable<any> {
    const fd = new FormData();
    for (const file of body) {
      fd.append('excelFiles[]', file, file.Name);
    }

    console.log(fd.getAll('excelFiles[]'));
    return this.http.post(
      'https://swiftfilupload.azurewebsites.net/api/Uploads/users',
      fd,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }
}
