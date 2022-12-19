import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() errName!: string;
  @Input() submitted!: boolean;
}
