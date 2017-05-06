import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';
import { Router} from '@angular/router';
import { Pipe,PipeTransform} from '@angular/core';

@Component({
  selector: 'list-notes',
  providers: [NotesService],
  templateUrl: 'app/list-notes.html'
})

export class listNotesComponent {  
  	title = 'List of Notes';
  	public notes : Note[];
  	selectedNote: Note;

  	constructor(
  	private notesService: NotesService,
  	private router: Router) { }

	getNotes(): void {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      err => console.error(err),
      () => this.postProcess()
     );
	}

  	ngOnInit(): void {
    	this.getNotes();
  	}

    postProcess(): void {
      this.notes.forEach( n => {
        n.content = n.content.replace(/<\/?content>/g,' ');
        n.content = n.content.replace(/<\/?note>/g,' ');
        if (n.content.match(/<tag>(.*)<\/tag>/)){
          n.tags = n.content.match(/<tag>(.*?)<\/tag>/g).map(t => t.replace(/<\/?tag>/g,' '));
          n.content = n.content.replace(/<\/?tag>/g,' ');
          // console.log(n.tags);
        }
      });
    }

  	editNote(note: Note): void {
  		console.log(note);
  		this.selectedNote = note;
  		this.router.navigate(['/editNote', this.selectedNote.id]);
  	}  

    deleteNote(note: Note): void {
      this.notesService.deleteNote(note.id).subscribe(
        data => this.notes = this.notes.filter(n => n!== note),
        err => console.error(err),
        () => console.log(this.notes)
      );
    }

}

@Pipe({
  name: 'TagFilter',
  pure: false
})

export class TagFilter implements PipeTransform {
  transform(notes:any[], criteria:any): any {
    if (criteria !== '' && notes !== undefined) {
      return (notes.filter( note => { 
        if (note.tags !== undefined) {
          return note.tags.some(tag => tag.includes(criteria));
        }
        return false;
      }));
    }
    return notes;
  }
}