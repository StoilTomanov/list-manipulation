import { TestBed } from '@angular/core/testing';

import { ListActionsService } from './list-actions.service';

describe('ListActionsService', () => {
  let service: ListActionsService;

  let initialListItem: string[] = [];
  let receivedListItems: string[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListActionsService],
    });

    service = TestBed.inject(ListActionsService);

    initialListItem = ['Apple', 'Banana', 'Orange'];

    service.listItemsObservable().subscribe(listItems => {
      receivedListItems = listItems;
    });
  });

  it('it should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should receive the initial list items', () => {
    expect(receivedListItems).toEqual(['Apple', 'Banana', 'Orange']);
  });

  describe('When we add item to the list', () => {
    beforeEach(() => {
      service.addItem('Potato');
    });

    it('it should append the item to the list', () => {
      expect(receivedListItems).toEqual([...initialListItem, 'Potato']);
    });

    describe('and we add another item to the list', () => {
      beforeEach(() => {
        service.addItem('Tomato');
      });

      it('it should append the item to the list', () => {
        expect(receivedListItems).toEqual([...initialListItem, 'Potato', 'Tomato']);
      });

      describe('and then we remove item to the list', () => {
        beforeEach(() => {
          service.removeItem();
        });

        it('it should pop the last item from the list', () => {
          expect(receivedListItems).toEqual([...initialListItem, 'Potato']);
        });

        describe('and we remove item again', () => {
          beforeEach(() => {
            service.removeItem();
          });

          it('it should pop the last item from the list', () => {
            expect(receivedListItems).toEqual([...initialListItem]);
          });

          describe('and we remove another item', () => {
            beforeEach(() => {
              service.removeItem();
            });

            it('it should pop the last item from the list', () => {
              expect(receivedListItems).toEqual(initialListItem.slice(0, -1));
              expect(receivedListItems).toEqual(['Apple', 'Banana']);
            });
          });
        });
      });
    });
  });

});
