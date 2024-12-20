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
    const currentItems = this.listItemsSubject.getValue();
    if (currentItems.length > 0) {
      currentItems.pop();
      this.notifyForListChange(currentItems);
    }
  }

  addItem(item: string): void {
    const newItems = this.listItemsSubject.getValue();
    newItems.push(item);
    this.notifyForListChange(newItems);
  }

  private notifyForListChange(updatedList: string[]): void {
    this.listItemsSubject.next(updatedList);
  }
}
