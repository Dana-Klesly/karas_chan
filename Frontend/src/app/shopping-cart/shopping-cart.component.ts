import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsService } from '../services/carts/carts.service';
import { Cart, CartItem } from '../services/carts/cart.interface';
import { Router } from '@angular/router';
import { StorageService } from '../services/storeg/storage.service';
import { ProductService } from '../services/products/product.service';
import { Product } from '../services/products/product.model';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  cart: Cart | null = null;
  cartItems: (CartItem & Product['data'][0])[] = [];
  total: number = 0;
  userId: string = '';
  showPaymentIcons = true;

  constructor(
    private cartServices: CartsService,
    private storageservices: StorageService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.storageservices.getItem('userId');

    if (!this.userId) {
      console.error('User ID not found in storage');
      return;
    }
    this.getCartItems();
    this.getCart();
  }

  getCart(): void {
    this.cartServices.getCart().subscribe({
      next: (response) => {
        if (response) {
          this.cart = response;
          this.getCartItems();
        } else {
          this.createNewCart();
        }
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      },
    });
  }

  createNewCart(): void {
    this.cartServices.createCart().subscribe({
      next: (newCart) => {
        this.cart = newCart;

        console.log('New cart created:', newCart);
      },
      error: (err) => {
        console.error('Error creating new cart:', err);
      },
    });
  }

  getCartItems(): void {
    if (!this.cart) return;

    this.cartServices.getCartItems().subscribe((response) => {
      const productRequests = response.map((item) =>
        this.getProductDetails(item.productId).pipe(
          map((productDetails) => ({
            ...item,
            ...productDetails,
            quantity: item.quantity,
            id: item.id,
          }))
        )
      );

      forkJoin(productRequests).subscribe((itemsWithDetails) => {
        this.cartItems = itemsWithDetails;
        this.calculateTotal();
      });
    });
  }
  getProductDetails(productId: string): Observable<Product['data'][0]> {
    return this.productService.getProducts().pipe(
      map((response) => {
        const foundProduct = response.data.find((p) => p.id === productId);
        return (
          foundProduct || {
            id: '',
            name: 'Unknown Product',
            price: 0,
            image: '',
            description: '',
            quantity: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        );
      })
    );
  }

  deleteCartItem(id: string): void {
    this.cartServices.deleteCartItem(id).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + (item?.price * item?.quantity || 0),
      0
    );
  }

  togglePaymentIcons(): void {
    this.router.navigate(['/thanks']);
  }
}
