import { Injectable } from '@angular/core';
import { Cart, CartItem, OneCartItem } from './cart.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private http: HttpClient) {}

  createCart(): Observable<Cart> {
    return this.http.post<Cart>('/api/carts', {});
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`/api/carts`);
  }

  addCartItem(input: OneCartItem): Observable<CartItem> {
    return this.http.post<CartItem>('/api/carts/items', input).pipe(
      catchError((error) => {
        console.error('Error adding cart item:', error);
        return throwError(() => error);
      })
    );
  }

  getCartItems(): Observable<CartItem[]> {
    const params = new HttpParams().set('limit', '1000').set('offset', '0');

    return this.http
      .get<{ data: CartItem[] }>('/api/carts/items', { params })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching cart item', error);
          return throwError(() => error);
        })
      );
  }

  deleteCartItem(id: string): Observable<void> {
    return this.http.delete<void>(`/api/carts/items/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting cart item:', error);
        return throwError(() => error);
      })
    );
  }
}
