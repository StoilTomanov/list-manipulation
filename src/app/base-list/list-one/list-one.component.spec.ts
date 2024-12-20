import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ListActionsService } from '../../list-actions.service';
import { ListOneComponent } from './list-one.component';

import SpyObj = jasmine.SpyObj;

describe('ListOneComponent', () => {
  let component: ListOneComponent;
  let fixture: ComponentFixture<ListOneComponent>;
  let listActionsService: SpyObj<ListActionsService>;

  let listItemsSubject: BehaviorSubject<string[]>;
  let receivedListItems: string[];

  beforeEach(() => {
    listItemsSubject = new BehaviorSubject<string[]>([]);
    receivedListItems = [];

    listActionsService = jasmine.createSpyObj<ListActionsService>({
      addItem: undefined,
      removeItem: undefined,
      getListItems: listItemsSubject.asObservable(),
    });

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ListOneComponent,
        ReactiveFormsModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ListActionsService,
          useValue: listActionsService,
        }
      ]
    });

    fixture = TestBed.createComponent(ListOneComponent);
    component = fixture.componentInstance;

    component.listItems$.subscribe((items => {
      receivedListItems = items;
    }));

    fixture.detectChanges();
  });

  it('it should initialize listItems with an empty array', () => {
    expect(receivedListItems).toEqual(['Apple', 'Banana', 'Orange']);
  });

  describe('We receive the emitted values', ()=> {
    beforeEach(() => {
      listItemsSubject.next(['Apple', 'Banana', 'Orange', 'Grapes']);
      component.itemFormControl.setValue('Grapes');
      fixture.detectChanges();
      component.onAddItem();
    });

    it('it should subscribe to listItemsObservable and update listItems with new values', () => {
      expect(receivedListItems).toEqual(['Apple', 'Banana', 'Orange', 'Grapes']);
      expect(receivedListItems).toEqual(receivedListItems);
    });
  });
});
