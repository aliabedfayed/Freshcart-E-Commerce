import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { CategoryCardComponent } from "../category-card/category-card.component";
import { Subscription } from 'rxjs';
import { TranslationService } from '../../../../core/services/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-category-list',
  imports: [CategoryCardComponent, TranslatePipe],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = []
  subscription: Subscription = new Subscription

  private readonly categoryService = inject(CategoryService)
  private readonly translationService = inject(TranslationService)

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this.subscription = this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
