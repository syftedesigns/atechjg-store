import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { RefreshComponent } from './explorer/refresh.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'product/:id',
        component: ProductComponent
    },
    {
        path: 'search/:searchType/:query',
        component: ExplorerComponent
    },
    {
        path: 'redirect/:base/:to',
        component: RefreshComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
