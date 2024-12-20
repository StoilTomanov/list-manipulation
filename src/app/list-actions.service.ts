import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ListActionsService {
    private listItems: string[] = ['Apple', 'Banana', 'Orange'];
    private listItemsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.listItems);

    getListItems(): Observable<string[]> {
        return this.listItemsSubject.asObservable();
    }

    removeItem(): void {
        const currentItems = this.getListItemsValue();
        const newItems = currentItems.slice(0, -1);
        this.notifyForListChange(newItems);
    }

    addItem(item: string): void {
        const newItems = [...this.getListItemsValue(), item];
        this.notifyForListChange(newItems);
    }

    private getListItemsValue(): string[] {
        return this.listItemsSubject.getValue();
    }

    private notifyForListChange(updatedList: string[]): void {
        this.listItemsSubject.next(updatedList);
    }
}
