import { OrderDTO } from "../models/Order";
import * as cartRepository from '../localstorage/CartRepository.ts'

export function saveCart(cart: OrderDTO) {
    return cartRepository.save(cart);
}

export function getCart(): OrderDTO {
    return cartRepository.get();
}