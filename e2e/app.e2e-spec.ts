import { NotepadAppPage } from './app.po';

describe('notepad-app App', function() {
  let page: NotepadAppPage;

  beforeEach(() => {
    page = new NotepadAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
