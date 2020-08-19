import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Suggestion} from "../models/Suggestion";
import {environment} from "../../environments/environment";

const API_ROOT = environment.baseApiUrl + "/suggestions";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {


  private _suggestions$ = new ReplaySubject<Suggestion[]>();

  constructor(private http: HttpClient) {
  }

  get suggestions$(): Observable<Suggestion[]> {
    return this._suggestions$;
  }

  async actualize(categoriesIds: number[], itemsIds: number[]): Promise<Suggestion[] | Error> {
    const httpQueryParams = new HttpParams()
      .set('categories', categoriesIds.toString())
      .set('toys', itemsIds.toString());
    const queryOptions = {
      params: httpQueryParams
    };
    try {
      const data = await this.http.get<Suggestion[]>(API_ROOT, queryOptions)
        .pipe(
          map(categories => categories.map(categoryData => new Suggestion(categoryData)))
        ).toPromise();
      this._suggestions$.next(data);
      return data;
    } catch (e) {
      // TODO handle error throught service
      console.error("При запросе списка предложений произошла ошибка: ", e);
      return e;
    }
  }
}
