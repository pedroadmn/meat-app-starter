import { MenuItem } from './../menu-item/menu-item.model';
import { CarItem } from './car-item.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {

  items: CarItem[] = [];

  constructor() { }

  clear() {
    this.items = [];
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CarItem(item));
    }
    this.items.push
  }

  removeItem(item: CarItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  increaseQty(item: CarItem) {
    item.quantity = item.quantity + 1;
  }

  decreaseQty(item: CarItem) {
    console.log('ENtrou aqui');
    item.quantity = item.quantity - 1;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

}
