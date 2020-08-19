import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {SuggestionsPageComponent} from "./pages/suggestions-page/suggestions-page.component";
import {AddSuggestionPageComponent} from "./pages/add-suggestion-page/add-suggestion-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'suggestions', component: SuggestionsPageComponent},
  {path: 'suggestions/add', component: AddSuggestionPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
