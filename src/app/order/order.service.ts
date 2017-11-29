import { MEAT_API } from './../app.api';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CarItem } from './../restaurant-detail/shopping-cart/car-item.model';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { Injectable } from '@angular/core';
import { Order, OrderItem } from './order.model';
import 'rxjs/add/operator/map';


@Injectable()
export class OrderService {

    constructor(
        private cartService: ShoppingCartService,
        private http: Http
    ) {}

    cartItems() {
        return this.cartService.items;
    }

    increaseQty(item: CarItem) {
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CarItem) {
        this.cartService.decreaseQty(item);
    }

    remove(item: CarItem) {
        this.cartService.removeItem(item);
    }

    itemsValues(): number {
        return this.cartService.total();
    }

    checkOrder(order: Order): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${MEAT_API}/orders`, JSON.stringify(order), new RequestOptions({headers: headers}))
            .map(response => response.json())
            .map(order => order.id)
    }

    clear() {
        this.cartService.clear();
    }
}