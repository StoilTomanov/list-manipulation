import { Component, inject } from '@angular/core';
import { ListActionsService } from '../list-actions.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrl: './base-list.component.scss',
  imports: [
    MatListModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule,
  ],
})
export class BaseListComponent {
  listItems$: Observable<string[]>;
  itemFormControl: FormControl<string | null> = new FormControl(null);

  listActionsService = inject(ListActionsService);

  constructor() {
    this.listItems$ = this.listActionsService.getListItems();
  }

  onAddItem(): void {
    const newItem: string | null = this.itemFormControl.value;
    if (newItem) {
      this.listActionsService.addItem(newItem);
      this.clearInput();
    }
  }

  onRemoveItem(): void {
    this.listActionsService.removeItem();
  }

  private clearInput(): void {
    this.itemFormControl.reset();
  }
}
