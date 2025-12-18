import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand';
import { BrandCardComponent } from "../brand-card/brand-card.component";
import { Subscription } from 'rxjs';
import { TranslationService } from '../../../../core/services/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brand-list',
  imports: [BrandCardComponent, TranslatePipe],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent implements OnInit, OnDestroy {
  private readonly brand = inject(BrandService)
  private readonly translationService = inject(TranslationService)

  brands: Brand[] = []
  subscription: Subscription = new Subscription

  ngOnInit(): void {
    this.getAllBrands()
  }

  getAllBrands() {
    this.subscription = this.brand.getBrands().subscribe({
      next: (res) => {
        this.brands = res.data
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
