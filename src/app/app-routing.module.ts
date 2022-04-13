import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './games/landing/landing.component';
import { BrowseGamesComponent } from './games/browse/browse.component';
import { CategoriesComponent } from './games/categories/categories.component';
import { DetailsComponent } from './games/details/details.component';
import { AuthGuard } from './auth/auth.guard';
import { WishlistComponent } from './store/wishlist/wishlist.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
};

const routes: Routes = [
    { path: '', redirectTo: 'discover', pathMatch: 'full' },

    { path: 'discover', component: LandingComponent },
    { path: 'browse', component: BrowseGamesComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'games/:slug', component: DetailsComponent },


    { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },

    {
        path: 'account',
        loadChildren: () => import('../app/auth/auth.module').then((m) => m.AuthModule),

        canLoad: [AuthGuard],
        data: { requiresUnauth: true },
    },
    { path: 'login', redirectTo: '/account/login', },
    { path: 'signup', redirectTo: '/account/signup' },

    { path: 'error', component: NotFoundComponent },
    { path: '**', redirectTo: '/error' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
