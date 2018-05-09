import { LoginService } from './../security/login/login.service';
import { MEAT_API } from './../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        private http: HttpClient,
        private loginService: LoginService
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
        let headers = new HttpHeaders();
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
            .map(order => order.id)
    }

    clear() {
        this.cartService.clear();
    }
}