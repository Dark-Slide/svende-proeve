import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/profile';
import { ProductService } from 'src/app/Services/product.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/Services/category.service';



@Component({
    selector: 'app-product-make',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './product-make.component.html',
    styleUrls: ['./product-make.component.css']
})
export class ProductMakeComponent {
  productForm: FormGroup;
  categories: Category[] = [];
  profile?: Profile;
  images: File[] = [];
  materials: any;
  colours: any;
  sizes: any;
  types: any;
  conditions: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

    
  }
  onSubmit() {
    if (this.productForm.valid && this.images.length > 0) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('Materials', this.productForm.get('Materials')?.value);
      formData.append('Colours', this.productForm.get('Colours')?.value);
      formData.append('Sizes', this.productForm.get('Sizes')?.value);
      formData.append('Types', this.productForm.get('Types')?.value);
      formData.append('Conditions', this.productForm.get('Conditions')?.value);
      formData.append('imageUrl', this.productForm.get('imageUrl')?.value);
      this.images.forEach((image, index) => {formData.append(`image${index}`, image);
      });
      this.productService.createProduct(formData).subscribe((response) => {
        this.toastr.success('Product created successfully!!');
        this.router.navigate(['/products', response.id]);
      }, error => {
        this.toastr.error('Failed to create product');
      });
    } else {
      this.toastr.error('Please fill in all required fields and upload at least one image');
    }
  }
  onCancel() {
    this.router.navigate(['/products']);
  }

  onImageFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.images = Array.from(event.target.files);
      this.productForm.patchValue({ imageUrl: this.images[0].name });
    } else {
      this.images = [];
      this.productForm.patchValue({ imageUrl: '' });
    }
  }
  removeImage(index: number) {
    this.images.splice(index, 1);
    if (this.images.length === 0) {
      this.productForm.patchValue({ imageUrl: '' });
    } else {
      this.productForm.patchValue({ imageUrl: this.images[0].name });
    }
  }

}
