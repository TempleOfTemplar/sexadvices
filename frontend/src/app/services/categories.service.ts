import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {filter, map} from "rxjs/operators";
import {Category} from "../models/Category";
import {environment} from "../../environments/environment";

const API_ROOT = environment.baseApiUrl + "/categories";

// const HEADERS = new HttpHeaders({'Content-Type': 'application/json'});
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private _categories$ = new BehaviorSubject<Category[]>(null);

  constructor(private http: HttpClient) {
  }

  get categories$(): Observable<Category[]> {
    if (!this._categories$.value) {
      this.actualize();
    }
    return this._categories$
      .pipe(
        filter(val => val !== null)
      );
  }

  async actualize(): Promise<Category[] | Error> {
    try {
      const data = await this.http.get<Category[]>(API_ROOT)
        .pipe(
          map(categories => categories.map(categoryData => new Category(categoryData)))
        ).toPromise();
      this._categories$.next(data);
      return data;
    } catch (e) {
      // TODO handle error throught service
      console.error("При запросе списка категорий произошла ошибка: ", e);
      return e;
    }
  }
}
