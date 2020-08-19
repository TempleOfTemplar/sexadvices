import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subject} from "rxjs";
import {Category} from "../../models/Category";
import {Item} from "../../models/Item";
import {Suggestion} from "../../models/Suggestion";
import {FormControl} from "@angular/forms";
import {map, takeUntil} from "rxjs/operators";
import {CategoriesService} from "../../services/categories.service";
import {ItemsService} from "../../services/items.service";
import {SuggestionsService} from "../../services/suggestions.service";

@Component({
  selector: 'suggestions-page',
  templateUrl: './suggestions-page.component.html',
  styleUrls: ['./suggestions-page.component.scss']
})
export class SuggestionsPageComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  items$: Observable<Item[]>;
  suggestions$: Observable<Suggestion[]>;
  categoryControl = new FormControl();
  itemControl = new FormControl();

  categoriesLoading$: Observable<boolean>;
  itemsLoading$: Observable<boolean>;

  private selectedCategories$: Observable<any>;
  private selectedItems$: Observable<any>;
  private componentDestroyed$ = new Subject();

  constructor(private categoriesService: CategoriesService,
              private itemsService: ItemsService,
              private suggestionsService: SuggestionsService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.categories$;
    this.items$ = this.itemsService.items$;
    this.suggestions$ = this.suggestionsService.suggestions$;
    this.selectedCategories$ = this.categoryControl.valueChanges
      .pipe(
        map(v => v)
      );
    this.selectedItems$ = this.itemControl.valueChanges
      .pipe(
        map(v => v)
      );
    combineLatest([this.selectedCategories$, this.selectedItems$])
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(([selectedCategories, selectedItems]) => {
        this.suggestionsService.actualize(selectedCategories, selectedItems);
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

}
