import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) {}
  public keyWord:any=''
  public minPrice:any='' 
  public maxPrice:any=''
  public selectedItem:any=''
 public _id:any=''

// getAllProducts(){
//     return this.httpCalls.get<any[]>(`https://api.everrest.educata.dev/shop/products/search?page_index=1&page_size=50&price_min=1&price_max=999999`)}

 search(keywords: string, priceMin: string, priceMax: string) {
    const url = `${environment.apiUrl}/products/search?pageIndex=1&pageSize=50&keywords=${keywords}&priceMin=${priceMin}&priceMax=${priceMax}`;
    return this.http.get<any>(url);}
  // return this.httpCalls.get(`https://api.everrest.educata.dev/shop/products/search?page_index=1&page_size=50&keywords=${keyWord}&price_min=${minPrice}&price_max=${maxPrice}`)

getSelectedItemById(id:string){
  return this.http.get<any[]>(`${environment.apiUrl}/products/${id}`)
  }

addToCart(productId: number, quantity: number): Observable<any> {
    const url = `${environment.apiUrl}/cart/add`;
    return this.http.post(url, { productId, quantity });
  }
}


//   getSelectedItemById(selectedItem:string){
//   return this.http.get<any[]>(`${environment.apiUrl}/products/${this._id}`)
//   }
// }

//return this.http.get<any[]>(`https://api.everrest.educata.dev/shop/products/id/${selectedItem}`)

// test(_id:String) {
//   return this.httpCalls.get(`https://api.everrest.educata.dev/shop/products/id/${_id}`)}
