import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { AppComponent } from './app.component';
import { LandingComponent } from './games/landing/landing.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowseGamesComponent } from './games/browse/browse.component';
import { CategoriesComponent } from './games/categories/categories.component';
import { DetailsComponent } from './games/details/details.component';
import { HeaderComponent } from './shared/header/header.component';
import { WishlistComponent } from './store/wishlist/wishlist.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CarouselComponent } from './games/landing/carousel/carousel.component';
import { PlatformComponent } from './games/shared/platform/platform.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { RatingsComponent } from './games/shared/ratings/ratings.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        HeaderComponent,
        FooterComponent,
        BrowseGamesComponent,
        CategoriesComponent,
        DetailsComponent,
        WishlistComponent,
        NotFoundComponent,
        CarouselComponent,
        PlatformComponent,
        LoadingSpinnerComponent,
        RatingsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,

        NgxUsefulSwiperModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
