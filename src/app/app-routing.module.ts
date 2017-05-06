import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { listNotesComponent }  from './list-notes.component';
import { addNoteComponent }  from './add-note.component';
import { addCategoryComponent }  from './add-category.component';
import { listCategoriesComponent }  from './list-categories.component';
import { editNoteComponent }  from './edit-note.component';

const routes: Routes = [
	{
	  path: '',
	  redirectTo: '/listNotes',
	  pathMatch: 'full'
	},
	{
	  path: 'editNote/:id',
	  component: editNoteComponent
	},
    {
      path: 'listNotes',
      component: listNotesComponent
    },
    { path: 'listCategories',
      component: listCategoriesComponent
    },
    {
	  path: 'addNote',
      component: addNoteComponent
     },
     {
      path: 'addCategory',
      component: addCategoryComponent
     }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}