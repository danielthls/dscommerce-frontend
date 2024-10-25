import { OrderDTO, OrderItemDTO } from "../models/Order";
import { CART_KEY } from "../utils/system";



export function save(cart: OrderDTO) {
    const str = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, str)
}

export function get(): OrderDTO {
    const str = localStorage.getItem(CART_KEY) || '{"items": []}';
    const obj = JSON.parse(str) as OrderDTO;
    const cart = new OrderDTO();
    obj.items.forEach(item => {
        cart.items.push(new OrderItemDTO(item.productId, item.quantity, item.name, item.price, item.imgUrl))
    });
    return cart;
}

export function clear() {
    return localStorage.setItem(CART_KEY, '{"items": []}');
}