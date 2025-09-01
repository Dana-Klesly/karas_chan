import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/products/product.service';
import { Product } from '../services/products/product.model';
import { CartsService } from '../services/carts/carts.service';
import { StorageService } from '../services/storeg/storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product['data'][0] | null = null;
  similarProducts: Product['data'] = [];
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartsService: CartsService,
    private storageservices: StorageService
  ) {}

  ngOnInit(): void {
    this.userId = this.storageservices.getItem('userId');

    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(productId)) {
      console.error('Invalid Product ID:', productId);
      return;
    }

    this.productService.getProducts().subscribe({
      next: (response: Product) => {
        const products = response?.data || [];

        this.product = products.find((p) => Number(p.id) === productId) || null;

        if (!this.product) {
          console.warn('Product not found with ID:', productId);
        } else {
          this.similarProducts = products.filter(
            (p) => Number(p.id) !== productId
          );
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching product:', err);

        if (err.status === 500) {
          alert('Internal server error. Please try again later!');
        }
      },
    });
  }

  addToCart(product: Product['data'][0]): void {
    if (!this.userId) {
      console.error('User ID not found in storage');
      alert('You have to login first');
      this.router.navigate(['/login']);
      return;
    }
    const itemdata = {
      productId: product.id,
      quantity: 1,
    };

    this.cartsService.addCartItem(itemdata).subscribe({
      next: (response) => {
        console.log('Item added to the cart', response);
        alert('product added to cart successfully');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding item to cart:', error);
        alert('Failed to add item to cart. Please try again.');
      },
    });
  }

  viewProduct(productId: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products', productId]);
    });
  }
}
