import { Component, Input } from '@angular/core';
import { Brand } from '../../models/brand';

@Component({
  selector: 'app-brand-card',
  imports: [],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.css'
})
export class BrandCardComponent {
  @Input() brand!: Brand
}
