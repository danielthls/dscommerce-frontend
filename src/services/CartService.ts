import { OrderDTO, OrderItemDTO } from "../models/Order.ts";
import * as cartRepository from '../localstorage/CartRepository.ts'
import { ProductDTO } from "../models/Product.ts";

export function saveCart(cart: OrderDTO) {
    return cartRepository.save(cart);
}

export function getCart(): OrderDTO {
    return cartRepository.get();
}

export function addProduct(product: ProductDTO) {
    const cart = cartRepository.get();
    const item = cart.items.find(x => x.productId === product.id)
    if (!item) {
        const newItem = new OrderItemDTO(product.id, 1, product.name, product.price, product.imgUrl)
        cart.items.push(newItem);
        cartRepository.save(cart);
    }
}

export function clearCart() {
    return cartRepository.clear();
}

export function increaseItem(productId: number) {
    const cart = cartRepository.get();
    const item = cart.items.find(x => x.productId === productId);
    if (item) {
        item.quantity++
        cartRepository.save(cart);
    }
}

export function decreaseItem(productId: number) {
    const cart = cartRepository.get();
    const item = cart.items.find(x => x.productId === productId);
    if (item) {
        item.quantity--;
        if (item.quantity < 1) {
            cart.items = cart.items.filter(x => x.productId != productId)
        }
        cartRepository.save(cart);
    }
}