import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/profile';
import { ProductService } from 'src/app/Services/product.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/Services/category.service';
import { Materials } from 'src/app/models/materials';
import { MaterialService } from 'src/app/Services/material.service';
import { Types } from 'src/app/models/types';
import { TypeService } from 'src/app/Services/type.service';
import { Colours } from 'src/app/models/colours';
import { ColourService } from 'src/app/Services/colour.service';
import { Height } from 'src/app/models/height';
import { HeightService } from 'src/app/Services/height.service';
import { Width } from 'src/app/models/width';
import { WidthService } from 'src/app/Services/width.service';
import { Deepth } from 'src/app/models/deepth';
import { DeepthService } from 'src/app/Services/deepth.service';
import { Conditions } from 'src/app/models/conditions';
import { ConditionsService } from 'src/app/Services/condition.service';





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
  materials: Materials[] = [];
  types: Types[] = [];
  conditions: Conditions[] = [];
  colours: Colours[] = [];
  height: Height[] = [];
  width: Width[] = [];
  deepth: Deepth[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private colourService: ColourService,
    private materialService: MaterialService,
    private typeService: TypeService,
    private conditionService: ConditionsService,
    private heightService: HeightService,
    private widthService: WidthService,
    private deepthService: DeepthService,    
    private router: Router,
    private toastr: ToastrService
  ) {

    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
    this.materialService.getAllMaterials().subscribe(materials => this.materials = materials);
    this.typeService.getAllTypes().subscribe(types => this.types = types);
    this.heightService.getAllHeights().subscribe(height => this.height = height);
    this.widthService.getAllWidths().subscribe(width => this.width = width);
    this.deepthService.getAllDeepths().subscribe(deepth => this.deepth = deepth);    
    this.colourService.getAllColours().subscribe(colours => this.colours = colours);
    this.conditionService.getAllConditions().subscribe(conditions => this.conditions = conditions);
    
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      materials: ['', Validators.required],
      colours: ['', Validators.required],
      deepth: ['', Validators.required],
      height: ['', Validators.required],
      width: ['', Validators.required],
      types: ['', Validators.required],
      conditions: ['', Validators.required],
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
      formData.append('Height', this.productForm.get('Height')?.value);
      formData.append('Width', this.productForm.get('Width')?.value);
      formData.append('Deepth', this.productForm.get('Deepth')?.value);
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
