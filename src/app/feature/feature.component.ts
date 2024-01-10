import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FeatureToggle } from '../../domain/feature-toggle';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { Column } from '../../domain/column';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FeatureService } from '../services/feature.service';
import { pipe, take } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [FeatureService],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css',
})
export class FeatureComponent implements OnInit {
  featureForm: FormGroup = this.fb.group({
    customerId: ['', Validators.required],
    features: this.fb.array([this.createfeatureField()]),
  });

  products!: FeatureToggle[];
  cols: Column[] = [];
  visible = false;

  constructor(
    private fb: FormBuilder,
    private _featureService: FeatureService
  ) {}

  ngOnInit() {
    this._featureService
      .getFeatures()
      .pipe(take(1))
      .subscribe((feature) => (this.products = feature.features));

    this.cols = [
      { field: 'displayName', header: 'DisplayName' },
      { field: 'technicalName', header: 'TechnicalName' },
      { field: 'expiresOn', header: 'ExpiresOn' },
      { field: 'description', header: 'Description' },
      { field: 'inverted', header: 'Inverted' },
      { field: 'customerIds', header: 'CustomerIds' },
      { field: 'action', header: 'Action' },
    ];
  }

  showFeatureDialoge() {
    this.visible = true;
  }

  createfeatureField(): FormGroup {
    return this.fb.group({
      displayName: ['', Validators.required],
    });
  }

  get features(): FormArray {
    return this.featureForm.get('features') as FormArray;
  }

  addfeatureField() {
    this.features.push(this.createfeatureField());
  }

  removefeatureField(index: number) {
    this.features.removeAt(index);
  }

  submitFeature() {
    if (this.featureForm.valid) {
      console.log('feature', this.featureForm.value);
      this._featureService
        .addFeature(this.featureForm.value)
        .pipe(take(1))
        .subscribe((addedfeature) => {
          console.log('addedfeature', addedfeature);
          console.log('product', this.products);
          this.products.push(addedfeature);
          console.log('product1', this.products);
          this.visible = false;
        });
    }
  }
}
