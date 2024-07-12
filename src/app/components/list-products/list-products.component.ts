import { Component, OnInit } from '@angular/core';
import { product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  listProducts: product[] = [];
  loading: boolean = false;

  constructor( private toastr: ToastrService,private _productService: ProductService) {}

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;
    this._productService.getListProduct().subscribe((data: { listProducts: product[] }) => {
      console.log(data);
      this.listProducts = data.listProducts;
      this.loading = false;
    });
  }

  deleteProduct(id:number){
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(()=>{
      console.log(`se elimino el articulo con id ${id}`);
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
    })
  }

}
