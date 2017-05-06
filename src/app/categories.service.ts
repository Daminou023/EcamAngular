import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Category } from './category';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriesService {

	private categoriesUrl = 'http://localhost:8000/API/Categories';
	private addCategoriesUrl = 'http://localhost:8000/API/Categories/Create';

	private headers = new Headers({'Content-Type': 'application/json'});
	private options:RequestOptions;
	
	constructor(private http: Http) { }
	
	getCategories():Observable<Category[]> { return this.http.get(this.categoriesUrl)
									.map((res:Response) => res.json())
									.catch(this.handleError); }	

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

	createCategory(label:string) : Observable<Category> {
		return this.http.post(this.addCategoriesUrl,JSON.stringify({label:label}))
			.map((res:Response) => res.json())
			.catch(this.handleError);
	}

	deleteCategory(id:number): Observable<void> {
		const url = `http://localhost:8000/API/Categories/Delete/${id}`;
		console.log(url);
		return this.http.delete(url,this.options)
			.map((res:Response) => res.json())
			.catch(this.handleError);
	}
}
