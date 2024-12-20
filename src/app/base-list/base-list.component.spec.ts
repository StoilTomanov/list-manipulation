import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ListActionsService } from '../list-actions.service';
import { BaseListComponent } from './base-list.component';

import SpyObj = jasmine.SpyObj;

describe('BaseListComponent', () => {
  let component: BaseListComponent;
  let fixture: ComponentFixture<BaseListComponent>;
  let debugElement: DebugElement;

  let listActionsService: SpyObj<ListActionsService>;

  beforeEach(() => {
    listActionsService = jasmine.createSpyObj<ListActionsService>({
      addItem: undefined,
      removeItem: undefined,
    });

    TestBed.configureTestingModule({
      imports: [
        BaseListComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [{
        provide: ListActionsService, useValue: listActionsService,
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseListComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When user add an item', () => {
    let inputField: MatFormField;

    beforeEach(() => {
      component.itemFormControl.setValue('Melon');
      fixture.detectChanges();
      inputField = debugElement.query(By.directive(MatFormField)).componentInstance;
      expect(inputField._formFieldControl.value).toEqual('Melon');
      component.onAddItem();
    });

    it('it calls the service to add item', () => {
      expect(listActionsService.addItem).toHaveBeenCalledOnceWith('Melon');
    });

    it('it should have the input field reset after adding the item', () => {
      expect(inputField._formFieldControl.value).toEqual('');
    });

    describe('and user adds another item', () => {
      beforeEach(() => {
        listActionsService.addItem.calls.reset();
        component.itemFormControl.setValue('Watermelon');
        fixture.detectChanges();
        inputField = debugElement.query(By.directive(MatFormField)).componentInstance;
        expect(inputField._formFieldControl.value).toEqual('Watermelon');
        component.onAddItem();
      });

      it('it calls the service to add item', () => {
        expect(listActionsService.addItem).toHaveBeenCalledOnceWith('Watermelon');
      });

      it('it should have the input field reset after adding the item', () => {
        expect(inputField._formFieldControl.value).toEqual('');
      });
    });
  });

  describe('When user remove an item', () => {
    beforeEach(() => {
      component.onRemoveItem();
    });

    it('it calls the service to remove the last item', () => {
      expect(listActionsService.removeItem).toHaveBeenCalled();
    });

    describe('and user removes another item', () => {
      beforeEach(() => {
        listActionsService.removeItem.calls.reset();
        component.onRemoveItem();
      });

      it('it calls the service to remove the last item', () => {
        expect(listActionsService.removeItem).toHaveBeenCalled();
      });
    });
  });
});
