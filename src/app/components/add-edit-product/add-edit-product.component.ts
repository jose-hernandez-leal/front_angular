import { ProductService } from './../../services/product.service';
import { product } from './../../interfaces/product';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'] // Aquí corregido styleUrl -> styleUrls
})
export class AddEditProductComponent {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'agregar ';
  constructor( private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
  private toastr:ToastrService,
  private aRouter: ActivatedRoute){ // Aquí corregido la indentación
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    });

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    // Código que deseas ejecutar al iniciar el componente
    if (this.id) {
      this.operacion = 'editar';
    } else {
      this.operacion = 'agregar';
    }
  }

  getProduct(id:number){
    this.loading =true;
    this._productService.getProduct(id).subscribe((data:product)=>{
    this.loading=false;
    this.form.setValue({
      name: data.name,
      description: data.description,
      price:data.price,
      stock: data.stock
    });
    });

  }


  addProduct() {
    const product: product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    };
    this.loading = true;

    if(this.id != 0){
      product.id = this.id
      this._productService.updateProduct(this.id,product).subscribe(() => {
        console.log('producto editado con éxito');
        this.toastr.success('el producto fue editado','producto editado');

    });
  }else{

      this._productService.saveProduct(product).subscribe(() => {
        console.log('producto agregado con éxito');
        this.toastr.success('el producto fue agregado','producto registrado');
      });
    }
    this.loading = false;
    this.router.navigate(['/']);


}
}
