import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
import { Product } from '../../services/products/product.model';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product['data'] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (response: Product) => {
        this.products = response.data;
      },
      (err: HttpErrorResponse) => {
        if (err.status === 500) {
          alert('Internal server error please try again later!');
        }
      }
    );
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}
