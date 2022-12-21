import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoBackComponent } from './components/go-back/go-back.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [GoBackComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    GoBackComponent,
    GoBackComponent
  ]
})
export class SharedModule {}
