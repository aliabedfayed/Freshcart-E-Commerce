import { Component } from '@angular/core';
import { ProductListComponent } from "../../../product/components/product-list/product-list.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CategorySliderComponent } from "../category-slider/category-slider.component";

@Component({
  selector: 'app-home',
  imports: [ProductListComponent, MainSliderComponent, CategorySliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
