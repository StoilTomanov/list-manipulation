import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ListActionsService {
    private listItems: string[] = ['Apple', 'Banana', 'Orange'];
    private listItemsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.listItems);

    listItemsObservable(): Observable<string[]> {
        return this.listItemsSubject.asObservable();
    }

    removeItem(): void {
        const currentItems = this.getListItems();
        const newItems = currentItems.slice(0, -1);
        this.notifyForListChange(newItems);
    }

    addItem(item: string): void {
        const newItems = [...this.getListItems(), item];
        this.notifyForListChange(newItems);
    }

    private getListItems(): string[] {
        return this.listItemsSubject.getValue();
    }

    private notifyForListChange(updatedList: string[]): void {
        this.listItemsSubject.next(updatedList);
    }
}
