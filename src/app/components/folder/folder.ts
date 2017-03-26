import { Component, Input } from '@angular/core';
import { APIService, File, Folder } from '../../services/api';

@Component({
  selector: 'folder',
  templateUrl: 'folder.html',
  styleUrls: ['folder.css'],
  providers: [APIService]
})
export class FolderComponent {
    @Input() folder: Folder;

    open: boolean = false;
    files: File[] = null;

    constructor(private api: APIService) { }

    loadContents() {
        this.api.getFolder(this.folder.id).subscribe(files => {
            this.files = files;
        });
    }

    toggleOpen() {
        if (!this.open && !this.files) {
            this.loadContents();
        }
        this.open = !this.open;
    }
}
