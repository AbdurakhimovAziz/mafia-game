import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent {
  @Output() onClick = new EventEmitter();
}
