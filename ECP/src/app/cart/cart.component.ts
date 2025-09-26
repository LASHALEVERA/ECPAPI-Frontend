import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
 cartItems: any[] = [];
 total: number = 0;

  constructor(private cartService: CartService, private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.loadCart();
    // this.cartItems = this.cartService.getCart();
  }
  
  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartItems.reduce((sum, item) => {
    return sum + (item.product.price || 0) * item.quantity;
      // const price = item.product?.price?.current || 0;
      // return sum + price * item.quantity;
    }, 0);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
    // this.cartItems = this.cartService.getCart();
}
 clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
    // this.cartItems = [];
  }

increaseQuantity(productId: number): void {
  const cart = this.cartItems;
  const item = cart.find(i => i.product.id === productId);
  if (item) {
    item.quantity += 1;
    this.cartService.saveCart(cart);
    this.loadCart();
  }
}

decreaseQuantity(productId: number): void {
  const cart = this.cartItems;
  const item = cart.find(i => i.product.id === productId);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    this.cartService.saveCart(cart);
    this.loadCart();
    }
  }
  
// checkout(): void {
//   const orderId = "c8bddbfc-8554-4d95-a7a4-247c0c95b677";
//   // Date.now(c8bddbfc).toString(36) + Math.random().toString(36).substring(2);
//   const theme = 'light'; // ან dark
//   const url = `https://payment.bog.ge/?order_id=b72c82e6-5f75-43aa-8d13-b189cec661c8&theme=light`;
//   // const url = `https://payment.bog.ge/?order_id=${orderId}&theme=${theme}`;
//   window.location.href = url;
// }

onCheckout(): void {
  const checkoutData = {
    userId: 1,
    shippingAddress: 'Tbilisi, Georgia',
    paymentMethod: 'Card',
    items: this.cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }))
  };
  this.checkoutService.checkout(checkoutData).subscribe({
    next: (res: any) => {
       this.cartService.clearCart();
      this.loadCart();
      alert(`გადახდა წარმატებით დასრულდა. ქვითარი №: ${res.data.receiptNumber}`);
    }
  });
  }
}
        // Order ID: ${res.data.orderId}
        // ჯამი: ${res.data.total} ₾
 // this.receipt = res.data,
    // error: err => alert(err.error.errors?.[0] || 'Something went wrong.')