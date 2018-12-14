import { CartDetails } from "../constatnt/cartDetails";

export interface CheckoutOrder{
    orderId?: any;
    orderStatus: string;
    orderdatetime: string;
    orderLatitude: any;
    orderLongitude: any;
    offercode: string;
    orderLists: any;
}