import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }  from '@angular/common';
import { CategoriesService } from './categories.service';
import { Category } from './category';
import 'rxjs/add/operator/switchMap';
import { Router} from '@angular/router';

@Component({
  selector: 'add-category',
  templateUrl: 'app/add-category.html',
  providers: [CategoriesService]
})

export class addCategoryComponent {
	title = "Add a Category";

  constructor(
    private  categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}


  addCategory(name: string) : void {
  	name = name.trim();
  	if(!name) { return; }
  	this.categoriesService.createCategory(name).subscribe(
        data => console.log(data),
        err => console.log(err),
        () => this.router.navigate(['/listCategories'])
        );
  }

  goBack(): void {
  	this.location.back();
  }

}
