import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasketService } from 'src/app/Services/basket.service';
import { BasketItem } from 'src/app/models/basket';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';


@Component({
    selector: 'app-basket',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css'],
})


export class BasketComponent implements OnInit {
    basketItems: BasketItem[] = [];
    proudcts: Product[] = [];
    date: any = new Date();
    amount: number = 0;

    constructor(private basketService: BasketService, private datePipe: DatePipe, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.basketService.currentBasket.subscribe((x) =>(this.basketItems = x)); {
    }

    //transformDate(date: any) {
    //    return this.datePipe.transform(date, 'dd/MM/yyyy');
    //}
    /*
    clearBasket(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: 'Tøm kurv',
                message: 'Sikker på at du vil tømme din kurv?',
                confirm: 'Ja',
                cancel: 'Nej'
            },
        })

        dialogRef.afterClosed().subscribe((result) => {
            if(result){
                this.basketService.clearBasket();
            } else {

            }
        })
    }
    

    removeItem(productId: number): void {
        
    }

    updateBasket(item: BasketItem): void {
        const index = this.basketItems.findIndex((basketItem) => basketItem.id === item.id);

        if(index !== -1 && this.basketItems[index].quantity > 0) {
            this.basketItems[index].quantity = item.quantity;
            this.basketService.saveBasket(this.basketItems);
        }
        


    }*/

    //Stripe function:

    

}
}
