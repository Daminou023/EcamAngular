import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Note } from './note';

@Injectable()
export class NotesService {

	private notesUrl = 'http://localhost:8000/API/Notes';
	public notes: Note[];
	private notesCreateUrl = 'http://localhost:8000/API/Notes/Create';
	private notesDelUrl = 'http://localhost:8000/API/Notes/Delete';
	private noteEditUrl = 'http://localhost:8000/API/Notes/Edit';
	private headers = new Headers({'Content-Type': 'application/json'});
	private options:RequestOptions;
	
	constructor(private http: Http) { }
	
	getNotes():Observable<Note[]> { 
		var that = this;
		return this.http.get(this.notesUrl)
				.map(function(res:Response) {
					res.json();
					console.log('GETresult', res.json());
					that.notes = res.json();
					console.log('this:', that);
					return res.json();
				},that)
				.catch(this.handleError); 		
	}

	giveNotes() {
		console.log('give This:', this)
		console.log('giving notes:', this.notes);
		return this.notes;
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

	createNote(title:string, date:string, category:string, content:string) : Observable<Note> {
		console.log(date);
		return this.http.post(this.notesCreateUrl,JSON.stringify({title: title, date: date, category:category, content:content}))
			.map((res:Response) => res.json())
			.catch(this.handleError);
	}

	deleteNote(id:number): Observable<void> {
		const url = `${this.notesDelUrl}/${id}`;
		return this.http.delete(url, this.options)
			.map((res:Response) => res.json())
			.catch(this.handleError);
	}

	updateNote(note:Note): Observable<Note> {
		const url = `${this.noteEditUrl}/${note.id}`;
		return this.http.put(url, JSON.stringify(note))
			.map((res:Response) => res.json())
			.catch(this.handleError);
	}
}