import { Component, Input } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'spinner',
  templateUrl: 'spinner.html',
  styleUrls: ['spinner.css'],
})
export class SpinnerComponent {
    @Input() size: number;
}
