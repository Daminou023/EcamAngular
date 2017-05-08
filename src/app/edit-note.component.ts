import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }  from '@angular/common';

import { NotesService } from './notes.service';
import { CategoriesService } from './categories.service';

import { Category } from './category';
import { Note } from './note';


@Component({
  selector: 'edit-note',
  templateUrl: 'app/edit-note.html',
  providers: [NotesService, CategoriesService],
})

export class editNoteComponent {
	note:Note;
  title = "Edit note";
  categories : Category[];
  noteId: number;

  constructor(
    private notesService: NotesService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
) {}

getNote(): void {
    var father = this;
    var test = this.noteId;
    console.log('test', test);
    this.notesService.getNotes().subscribe(
      data => this.checkId(data),
      err => alert(err._body),
     );
    this.notesService.giveNotes();
  }

checkId(data:any): boolean {
  console.log('coucou', this.noteId);
  data.forEach((n:any) => {if(n.id === Number(this.noteId)) {this.note = n}});
  console.log(this.note);
  this.postProcess();
  return true;
}

getCategories(): void {
    this.categoriesService.getCategories().subscribe(
      data => this.categories = data,
      err => alert(err._body),
      () => console.log(this.categories)
     );
  }

updateNote(): void {
  if(!this.note.title || !this.note.date || !this.note.category || !this.note.content) {
    alert ("please fill in all the fields");
    return;
  }
  this.notesService.updateNote(this.note).subscribe(
    data => console.log(data),
    err => alert(err._body),
    () => this.router.navigate(['/listNotes']),
  )
}

goBack(): void {
  this.location.back();
}

postProcess(): void {
  this.note.content = this.note.content.replace(/<\/?content>/g,'');
  this.note.content = this.note.content.replace(/<\/?note>/g,'');
};

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
  this.route.params.subscribe(
    params => this.noteId = params['id'],
    err => console.error(err),
  );
  this.getNote();
  this.getCategories();
}

}