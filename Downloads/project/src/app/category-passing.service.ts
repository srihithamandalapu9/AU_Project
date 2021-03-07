import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from './Components/Model/Category';
@Injectable({
  providedIn: 'root',
})
export class CategoryPassingService {
  public _category = new BehaviorSubject('');
  constructor(private http: HttpClient) {}

  emit<T>(data: string) {
    this._category.next(data);
  }

  on<T>(): Observable<string> {
    return this._category.asObservable();
  }

  getAllCategory(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>('http://localhost:8080/getCategory');
  }
}
