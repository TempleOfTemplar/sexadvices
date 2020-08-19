import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Item} from "../models/Item";
import {filter, map} from "rxjs/operators";
import {environment} from "../../environments/environment";

const API_ROOT = environment.baseApiUrl + "/items";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private _items$ = new BehaviorSubject<Item[]>(null);

  constructor(private http: HttpClient) {
  }

  get items$(): Observable<Item[]> {
    if (!this._items$.value) {
      this.actualize();
    }
    return this._items$
      .pipe(
        filter(val => val !== null)
      );
  }

  async actualize(): Promise<Item[] | Error> {
    try {
      const data = await this.http.get<Item[]>(API_ROOT)
        .pipe(
          map(items => items.map(itemData => new Item(itemData)))
        ).toPromise();
      this._items$.next(data);
      return data;
    } catch (e) {
      // TODO handle error throught service
      console.error("При запросе списка инвентаря произошла ошибка: ", e);
      return e;
    }
  }

}
