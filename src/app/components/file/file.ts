import { Component, Input } from '@angular/core';
import { APIService, File } from '../../services/api';

@Component({
  selector: 'file',
  templateUrl: 'file.html',
  styleUrls: ['file.css'],
  providers: [APIService],
})
export class FileComponent {
    @Input() file: File;
    @Input() even: boolean;

    open: boolean = false;

    constructor(private api: APIService) { }

    toggleOpen() {
        this.open = !this.open;
    }
    private restoreFile() {
        console.log("File info");
        console.log(this.file.id);
        console.log(this.file.name);
        this.api.getFileDownload(this.file.id).subscribe(files => {
        });
    }
}
