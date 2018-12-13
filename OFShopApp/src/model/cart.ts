import { ProductCart } from "../constatnt/cartproduct";

export interface  AddCart{
    cartId: string;
    userid: string;
    categoryid: string;
    productid: string;  
    cartcount: any;
    item_amount: any;
    cart_amount: any;
}