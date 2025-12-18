import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(environments.baseUrl + "categories")
  }

  getSpecificCategory(catId: string | null): Observable<any> {
    return this.http.get(environments.baseUrl + "categories/" + catId)
  }
}
