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
import { ListTwoComponent } from './list-two.component';

import SpyObj = jasmine.SpyObj;

describe('ListTwoComponent', () => {
  let component: ListTwoComponent;
  let fixture: ComponentFixture<ListTwoComponent>;
  let listActionsService: SpyObj<ListActionsService>;

  let listItemsSubject: BehaviorSubject<string[]>;
  let receivedListItems: string[];

  beforeEach(() => {
    listItemsSubject = new BehaviorSubject<string[]>([]);
    receivedListItems = [];

    listActionsService = jasmine.createSpyObj<ListActionsService>({
      addItem: undefined,
      removeItem: undefined,
      listItemsObservable: listItemsSubject.asObservable(),
    });

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ListTwoComponent,
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

    fixture = TestBed.createComponent(ListTwoComponent);
    component = fixture.componentInstance;

    listActionsService.listItemsObservable().subscribe((items => {
      receivedListItems = items;
    }));

    fixture.detectChanges();
  });

  it('it should initialize listItems with an empty array', () => {
    expect(component.listItems).toEqual(['Apple', 'Banana', 'Orange']);
  });

  describe('We receive the emitted values', ()=> {
    beforeEach(() => {
      component.listItems = ['Apple', 'Banana', 'Orange'];
      component.onRemoveItem();
      listItemsSubject.next(['Apple', 'Banana']);
    });

    it('it should subscribe to listItemsObservable and update listItems with new values', () => {
      expect(receivedListItems).toEqual(['Apple', 'Banana']);
      expect(component.listItems).toEqual(receivedListItems);
    });
  });
});
