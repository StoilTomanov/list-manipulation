import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { ListActionsService } from '../../list-actions.service';
import { BaseListComponent } from '../base-list.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list-two',
    templateUrl: '../base-list.component.html',
    styleUrl: '../base-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ListActionsService],
    imports: [
        MatListModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    ],
})
export class ListTwoComponent extends BaseListComponent implements OnDestroy {
    override listItems: string[] = [];
    listItemsSubscription: Subscription | undefined;

    constructor(protected override listActionsService: ListActionsService) {
        super(listActionsService);
        this.listItemsSubscription = this.listActionsService.listItemsObservable()
            .subscribe((listItems) => this.listItems = [...listItems]);
    }

    ngOnDestroy(): void {
        this.listItemsSubscription?.unsubscribe();
    }
}
