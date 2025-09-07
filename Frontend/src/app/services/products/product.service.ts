import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../../config.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private config: ConfigService, private http: HttpClient) { }

  getProducts(): Observable<Product> {
    return this.http.get<Product>(`${this.config.apiBaseUrl}/products`).pipe(
      map((response: Product) => {
        response.data.forEach((product) => {
          product.quantity = Number(product.quantity);
        });
        return response;
      })
    );
  }
}
