import { MenuItem } from './../menu-item/menu-item.model';


export class CarItem {
    
    constructor(
        public menuItem: MenuItem,
        public quantity: number = 1
    ){ }

    value(): number {
        return this.quantity * this.menuItem.price;
    }
}