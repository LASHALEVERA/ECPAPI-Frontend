import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/service.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: false, 
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public selectedProduct: any = null;
  public thumbnail: string = '';

  @ViewChild('thumbnailContainer') thumbnailContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private service: HttpService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.service.getSelectedItemById(id).subscribe((response: any) => {
          // Assuming API returns { status, data: { id, name, ..., images: [] } }
          const product = response.data;
          this.selectedProduct = product;
          this.thumbnail = product.images[0]; // default main image
        });
      }
    });
  }

  replace(imageUrl: string): void {
    this.thumbnail = imageUrl;
  }

  scrollThumbnails(direction: 'left' | 'right'): void {
    const container = this.thumbnailContainer.nativeElement;
    const scrollAmount = 100;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }

addToCart(product: any, quantity: number = 1): void {
  this.cartService.addToCart(product, quantity);
  alert('პროდუქტი დაემატა კალათაში!');
}

// addToCart(product: any, quantity: number = 1): void {
//   this.service.addToCart(product, quantity).subscribe({
//     next: () => {
//       alert('პროდუქტი დაემატა კალათაში!');
//     },
//     error: (err) => {
//       console.error('შეცდომა კალათაში დამატებისას', err);
//       alert('პროდუქტის დამატება ვერ მოხერხდა');
//     }
//   });
// }
}

// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { HttpService } from '../service/service.service';
// import { ActivatedRoute } from '@angular/router';
// // import { info } from 'console'; 

// @Component({
//   selector: 'app-product',
//   standalone: false,
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.css'
// })
// export class ProductComponent {
//   public selectedProduct!:any;
// public selectedItem:any = "";
// public selectedImage:string | null = null;
// @ViewChild('thumbnailContainer', { static: false }) thumbnailContainer!: ElementRef;
// scrollThumbnails(direction: 'left' | 'right') {
//  const container = this.thumbnailContainer.nativeElement;
//     const scrollAmount = 100;
//      if (direction === 'left') {
//       container.scrollLeft -= scrollAmount;
//     } else {
//       container.scrollLeft += scrollAmount;
//     }
// // throw new Error('Method not implemented.');
// }

// // public thumbnail:any;

// constructor (public service:HttpService, public route:ActivatedRoute){
//   // this.route.queryParams.subscribe(info=> console.log(info))   < ობიექტის სახით მოაქვს id >
//   this.route.queryParams.subscribe( (info:any)=>{
//     this.selectedItem = info.id;
//     console.log(info.id)
//   })

//   this.service.getSelectedItemById(this.selectedItem).subscribe((data:any)=>{
//     console.log(data);
//     this.selectedProduct = data
//   })
// }

// replace (imageUrl:String) {
//    if (this.selectedProduct) {
//   this.selectedProduct.thumbnail = imageUrl;
//     }
//   }
// }

// export class ProductViewComponent {
  
//   selectedProduct = {
//     thumbnail:'path_to_default_thumbnail.jpg',
//     images: ['image_url_1.jpg', 'image_url_2.jpg', 'image_url_3.jpg', 'image_url_4.jpg']
//   };
//     currentImage: string = this.selectedProduct.thumbnail;
//     replace(imageUrl: string): void 
//     {this.currentImage = imageUrl;
    
//     }

// }
