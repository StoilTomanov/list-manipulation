import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { ListActionsService } from '../../list-actions.service';
import { BaseListComponent } from '../base-list.component';

@Component({
  selector: 'app-list-one',
  templateUrl: '../base-list.component.html',
  styleUrl: '../base-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListActionsService],
  imports: [
    MatListModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule,
  ],
})
export class ListOneComponent extends BaseListComponent {
}
