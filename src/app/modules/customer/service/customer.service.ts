import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { UserStorageService } from 'src/app/auth/auth-services/storage-service/user-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getProductsByTitle(title: any): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/customer/search/${title}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Productos obtenidos correctamente')),
      catchError(this.handleError<[]>('Error al obtener los productos', []))
    );
  }

  getProductByCategoryId(categoryId: any): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/customer/products/${categoryId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Producto obtenido exitosamente')),
      catchError(this.handleError<[]>('', []))
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/customer/products`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Productos obtenidos correctamente')),
      catchError(this.handleError<[]>('Error al obtener los productos', []))
    );
  }

  getAllCategories(): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/customer/categories`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Categorías obtenidas correctamente')),
      catchError(this.handleError<[]>('Error al obtener categorías', []))
    );
  }
  getCompleteProductDetailById(productId: number): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/customer/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Producto obtenido con éxito')),
      catchError(this.handleError<[]>('Error al obtener el Producto', []))
    );
  }

  // Cart Service

  getCartByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get<[]>(`${BASIC_URL}api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Carrito obtenido con éxito')),
      catchError(this.handleError<[]>('Error al obtener el Carrito', []))
    );
  }

  addToCart(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };
    return this.http.post<[]>(`${BASIC_URL}api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Producto agregado al Carrito con éxito')),
      catchError(this.handleError<[]>('Error al agregar Producto al Carrito', []))
    );
  }

  applyToken(code: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASIC_URL}api/customer/coupon/${userId}/${code}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addMinusOnProduct(productId: any): Observable<any> {
    const quantityChangeProductDto = {
      userId: UserStorageService.getUserId(),
      productId: productId,
    };
    return this.http.post<[]>(`${BASIC_URL}api/customer/deduction`, quantityChangeProductDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Producto removido de la Orden con éxito')),
      catchError(this.handleError<[]>('Error al remover Producto de la Orden', []))
    );
  }

  addPlusOnProduct(productId: any): Observable<any> {
    const quantityChangeProductDto = {
      userId: UserStorageService.getUserId(),
      productId: productId,
    };
    return this.http.post<[]>(`${BASIC_URL}api/customer/addition`, quantityChangeProductDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Producto agregado a la Orden con éxito')),
      catchError(this.handleError<[]>('Error al agregar Producto a la Orden', []))
    );
  }

  // Order Service

  placeOrder(quantityChangeProductDto: any): Observable<any> {
    quantityChangeProductDto.userId = UserStorageService.getUserId();
    return this.http.post<[]>(`${BASIC_URL}api/customer/placeOrder`, quantityChangeProductDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Pedido realizado con éxito')),
      catchError(this.handleError<[]>('Error al realizar el Pedido', []))
    );
  }

  getMyOrdersByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get<[]>(`${BASIC_URL}api/customer/myOrders/${userId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Mis Pedidos obtenidos con éxito')),
      catchError(this.handleError<[]>('Error al obtener Mis Pedidos', []))
    );
  }

  getOrderedProductsDetailsByOrderId(orderId: number): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/customer/ordered-products/${orderId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Productos obtenidos con éxito')),
      catchError(this.handleError<[]>('Error al obtener los Productos', []))
    );
  }

  // Reviews Operations

  giveReview(reviewDto: any): Observable<any> {
    console.log(reviewDto);
    return this.http.post<[]>(`${BASIC_URL}api/customer/review`, reviewDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Reseña publicada con éxito')),
      catchError(this.handleError<[]>('Error al publicar la Reseña', []))
    );
  }

  // Wishlist Operation

  addProductToWishlist(wishlistDto: any): Observable<any> {
    return this.http.post<[]>(`${BASIC_URL}api/customer/wishlist`, wishlistDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Producto agregado a la lista de deseos con éxito')),
      catchError(this.handleError<[]>('Error al agregar producto a la lista de deseos', []))
    );
  }

  getWishlistByUserId(): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/customer/wishlist/${UserStorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((_) => this.log('Lista de deseos obtenida con éxito')),
      catchError(this.handleError<[]>('Error al obtener la lista de deseos', []))
    );
  }


  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  private log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
