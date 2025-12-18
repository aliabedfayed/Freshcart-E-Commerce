import { Routes } from '@angular/router';
import { AuthComponent } from './core/layouts/auth-layout/auth.component';
import { UserComponent } from './core/layouts/main-layout/user.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { NotFoundComponent } from './core/auth/components/not-found/not-found.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { BrandListComponent } from './features/brands/components/brand-list/brand-list.component';
import { ProductDetailsComponent } from './features/product/components/product-details/product-details.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { CartListComponent } from './features/cart/components/cart-list/cart-list.component';
import { CheckoutComponent } from './features/orders/components/checkout/checkout.component';
import { OrdersComponent } from './features/orders/components/orders/orders.component';
import { CategoryListComponent } from './features/category/components/category-list/category-list.component';
import { CategoryDetailsComponent } from './features/category/components/category-details/category-details.component';

export const routes: Routes = [
    {
        path: "", component: UserComponent, canActivate: [authGuard], children: [
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent, title: "Home" },
            { path: "categories", component: CategoryListComponent },
            { path: "products", component: ProductListComponent },
            { path: "product-details/:id", component: ProductDetailsComponent },
            { path: "brands", component: BrandListComponent },
            { path: "cart", component: CartListComponent },
            { path: "checkout/:id", component: CheckoutComponent },
            { path: "allorders", component: OrdersComponent },
            { path: "category-details/:id", component: CategoryDetailsComponent }
        ]
    },
    {
        path: "", component: AuthComponent, canActivate: [isLoggedGuard], children: [
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
        ]
    },
    { path: "**", component: NotFoundComponent }
];