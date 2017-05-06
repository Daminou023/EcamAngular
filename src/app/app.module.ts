import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Pipe,PipeTransform} from '@angular/core';

import { AppComponent }  from './app.component';
import { TagFilter } from './list-notes.component';
import { listNotesComponent }  from './list-notes.component';
import { addNoteComponent }  from './add-note.component';
import { addCategoryComponent }  from './add-category.component';
import { listCategoriesComponent }  from './list-categories.component';
import { editNoteComponent }  from './edit-note.component';
import { NotesService } from './notes.service';
import { CategoriesService } from './categories.service';


import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [ 
	BrowserModule,
	FormsModule,
	AppRoutingModule,
    HttpModule
	],

	declarations: [ 
		AppComponent,
		listNotesComponent,
		addNoteComponent,
		addCategoryComponent,
		listCategoriesComponent,
		editNoteComponent,
		TagFilter
	],

	providers: [ NotesService, CategoriesService],
  	bootstrap: [ AppComponent ]
})

export class AppModule { }
