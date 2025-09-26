import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private key = 'cart';

getCart(): any[] {
  const cart = localStorage.getItem(this.key);
  return cart ? JSON.parse(cart) : [];
}

addToCart(product: any, quantity: number = 1): void {
  if (!product || !product.id) {
    console.error('არასწორი პროდუქტი:', product);
    return;
  }

  const cart = this.getCart();
  const existingItem = cart.find((item: any) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  localStorage.setItem(this.key, JSON.stringify(cart));
}
removeFromCart(productId: number): void {
  let cart = this.getCart();
  cart = cart.filter(item => item.product.id !== productId);
  localStorage.setItem(this.key, JSON.stringify(cart));
}
clearCart():void{
  localStorage.removeItem(this.key);
}

  constructor() { }

saveCart(cart: any[]): void {
  localStorage.setItem(this.key, JSON.stringify(cart));
}

}