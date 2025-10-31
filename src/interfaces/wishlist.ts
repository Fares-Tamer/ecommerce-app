import { ProductI } from "./product";

export interface WishlistResponse {
  status: string;
  count: number;
  data: ProductI[];
}

export interface addWishlist {
  status: string
  message: string
  data: string[]
}