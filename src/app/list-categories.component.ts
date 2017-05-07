import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoriesService } from './categories.service';
import { Router} from '@angular/router';

@Component({
  selector: 'list-categories',
  providers: [CategoriesService],
  templateUrl: 'app/list-categories.html'
})

export class listCategoriesComponent {
	title = "list of your categories";
  	categories : Category[];
  	selectedCategory: Category;

  	constructor(
  	private categoriesService: CategoriesService,
  	private router: Router) { }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(
      data => this.categories = data,
      err => console.error(err),
      () => console.log(this.categories)
     );
  }  

  	ngOnInit(): void {
    	this.getCategories();
  	}

  deleteCategory(category: Category): void {
    this.categoriesService.deleteCategory(category.id).subscribe(
      data => this.categories = this.categories.filter( cat => cat!== category),
      err => alert(err._body),
      () => console.log(this.categories)
    );
  }

}








