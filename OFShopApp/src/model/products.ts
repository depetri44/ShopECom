import { Tags } from "./ProductTags";

export interface  Product{
    product_id: string;
    product_name: string;
    product_title: string;
    price: any;
    configuration: string;
    body: string;
    category: string;
    featured_img: string;
    availability: string;
    product_owner: string;
    product_owner_contact_1: string;
    product_owner_contact_2: string;
    published_at: string;
    created_at: string;
    updataed_at: string;
    tags: string;
}