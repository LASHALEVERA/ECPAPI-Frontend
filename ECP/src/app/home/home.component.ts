import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/service.service';
// import { info } from 'console';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

 public minPrice:string = '';
 public maxPrice:string = '';
 public keyWord:string = '';
 public productList:any[] = [];
 public _id:string='';
 public productDetails:any [] = [];
 public param:any;
 public product: any;
 public selectedProduct:any = null;
 public selectedItem:string = "";

constructor (private service:HttpService, private route:ActivatedRoute, public httpService:HttpService) {
this.route.queryParams.subscribe(info=>{this.param=info})
this.service.search("","1","100000").subscribe((info:any) =>
this.productList = info.data)

}
  filter() {
    if (this.minPrice.length == 0) {
      this.minPrice = "1"
    }
    if (this.maxPrice.length == 0) {
      this.maxPrice = "100000"
    }
    this.service.search(this.keyWord, this.minPrice, this.maxPrice).subscribe((data:any) => {
      console.log(data);
      this.productList = data.data;
    });
  }

  details(){
    if (!this.selectedItem) {
    console.warn('No product ID selected.');
    return;
  }
  this.service.getSelectedItemById(this.selectedItem).subscribe((data:any)=>{
    console.log('Product Details', data);
    this.selectedProduct = data.product}, error => {
     console.error('Failed to load product details', error);
    });
  }
}

  //   details(){
  // this.service.getSelectedItemById(this.selectedItem).subscribe((data:any)=>{
  //   console.log(data);
  //   this.selectedItem = data.product})
  //   }
  // }