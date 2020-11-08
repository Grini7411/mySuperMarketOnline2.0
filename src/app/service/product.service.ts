import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {first} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  public myProdEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }


  getAllCities(): Observable<any> {
    const url = 'http://localhost:3000/smo/allcity';
    return this.http.get(url);
  }
  getCategory(): Observable<any> {
    const url = 'http://localhost:3000/smo/getcat';
    return this.http.get(url);
  }

  getAllProducts(catID, searchWord): Observable<any> {
    let url = 'http://localhost:3000/smo/getproducts';

    if (catID || searchWord) {
      url = url + '?';

      if (catID && searchWord) {
        url += 'searchWord=' + searchWord + '&catID=' + catID;
      }
      else if (catID) {
        url = url + 'catID=' + catID;
      }
      else if (searchWord) {
        url += 'searchWord=' + searchWord;
      }
    }
    return this.http.get(url);
  }

  checkCart(userID: any): Observable<any> {
    const url = 'http://localhost:3000/smo/checkcart/' + userID;
    return this.http.get(url);
  }

  deleteProd(id: string): Observable<any> {
    const url = 'http://localhost:3000/smo/del/' + id;
    return this.http.delete(url, httpOptions);
  }

  addProductToDB(newProduct: any): Observable<any> {
    const url = 'http://localhost:3000/smo/addprod';
    return this.http.post(url, newProduct, httpOptions);
  }

  joinProductAndCartUnits(cartID: string): Observable<any> {
    const url = 'http://localhost:3000/smo/joinprodunits/' + cartID;
    return this.http.get(url);
  }

  delCartUnit(cartUnitID: any): Observable<any> {
    const url = `http://localhost:3000/smo/delcartunit/${cartUnitID}`;
    return this.http.delete(url, httpOptions);
  }

  checkProductInCart(prodId: string, cartId: string): Observable<any> {
    const checkUrl = `http://localhost:3000/smo/checkitemincart/${prodId}/${cartId}`;
    return this.http.get(checkUrl);
  }

  updateProductInCart(updated: any, cartId: string): Observable<any> {
    const url = `http://localhost:3000/smo/updatecartitem/${cartId}`;
    return this.http.put(url, updated, httpOptions);
  }

  addProductToCart(prod: any): Observable<any> {
      const url = 'http://localhost:3000/smo/newcartitem';
      return this.http.post(url, prod, httpOptions);
  }

  createCart(newCart: any): Observable<any> {
    const url = 'http://localhost:3000/smo/newcart';
    return this.http.post(url, newCart, httpOptions);

  }

  clearCartUnits(cartID: string): Observable<any> {
    const url = `http://localhost:3000/smo/clearcart/${cartID}`;
    return this.http.delete(url, httpOptions);
  }

  getCartUnits(cartID: string): Observable<any> {
    const url = `http://localhost:3000/smo/getcartunits/${cartID}`;
    return this.http.get(url);

  }

  getCurrentCart(clientId: any): Observable<any> {
    const url = 'http://localhost:3000/smo/getcart/' + clientId;
    return this.http.get(url);
  }
}


