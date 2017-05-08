import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }  from '@angular/common';
import { NotesService } from './notes.service';
import { CategoriesService } from './categories.service';
import { Note } from './note';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Category } from './category';
import { Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'add-note',
  templateUrl: 'app/add-note.html'
})

export class addNoteComponent {
	title = "Add a note";
	categories : Category[];
	providers: [NotesService, CategoriesService];
  dt = new Date();

  constructor(
    private notesService: NotesService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
  }

  addNote(title: string, date: string, category: string, content:string) : void {
  console.log('addnote!',date);
  	title = title.trim();
  	// date = date.trim();
  	category = category.trim();
  	content = content.trim();
  	
  	if(!title || !date || !category || !content) { 
      var message = 'Oops! you forgot to include: \n';
      !title?message += '- title\n':console.log('ok');
      !date?message+='-date\n':console.log('ok');
      !category?message+='-category\n':console.log('ok');
      !content?message+='-content\n':console.log('ok');
      message+='Please fill in all the fields.';
      alert(message);
      return;
    }

  	this.notesService.createNote(title,date,category,content).subscribe(
        data => console.log('data: ', data),
        err => alert(err._body),
        () => this.router.navigate(['/listNotes']) 
      );
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(
      data => this.categories = data,
      err => console.error(err),
      () => console.log('categories: ',this.categories)
     );
  }

  wrapText(textarea) {
    console.log(textarea);
    var wraperstart = '<tag>';
    var wraperend = '</tag>';
    var text = textarea.value;
    var len = text.length;
    var selectStart = textarea.selectionStart;
    var selectEnd = textarea.selectionEnd;
    var selectedText = text.substring(selectStart, selectEnd);
    var replacement = wraperstart + selectedText + wraperend;

    text = text.substring(0,selectStart) + replacement + text.substring(selectStart + selectedText.length, len);
    textarea.value = text;
    }

  ngOnInit(): void {
   	this.getCategories();
  }

  goBack(): void {
  	this.location.back();
  }

}