import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Basket, BasketItem } from "../models/basket";



@Injectable({
  providedIn: "root",
})



export class BasketService {
    private basketName: string = "YourBasket";
    currentBasketSubejct: BehaviorSubject<BasketItem[]>;
    currentBasket: Observable<BasketItem[]>;
    public basketLength = 0;
    basketTotal:any;


  constructor() {
    this.currentBasketSubejct = new BehaviorSubject<BasketItem[]>(JSON.parse(localStorage.getItem(this.basketName) || "[]"));

    this.currentBasket = this.currentBasketSubejct.asObservable();
  }
    

    get currentBasketValue(): BasketItem[] {
      return this.currentBasketSubejct.value;
    }

    addToBasket(item: BasketItem) {
      const basket = this.currentBasketValue;
      const sofasForSale = basket.find(basketItem => basketItem.id === item.id);

      if (sofasForSale) {
        sofasForSale.quantity += item.quantity;
        if (sofasForSale.quantity <= 0) {
          this.removeFromBasket(item.id);
        }
      } else {
        basket.push(item);
        this.basketLength +=1;
      }
      this.saveBasket(basket);
    }

    removeFromBasket(productId: number) {
      const basket = this.currentBasketValue;
      const index = basket.findIndex(item => item.id === productId);
      if (index !== -1) {
        basket.splice(index, 1);
      }
        this.saveBasket(basket);
    }

    clearBasket() {
      const basket: BasketItem[] = [];
      this.saveBasket(basket);
    }

    getBasketSofaTotal(){
      const basketSofaString = localStorage.getItem(this.basketName);

      if(basketSofaString !== null){
        try{
          const parsedBasketSofa = JSON.parse(basketSofaString);
          
          const sofaArray = parsedBasketSofa;

          if(Array.isArray(sofaArray)){
            const totalQuantity = sofaArray.reduce((sum, item) => sum +  item.quantity, 0);

            this.basketTotal = totalQuantity;

            return this.basketTotal;
          } else {
            console.error("Sofas missing or not an array in localStorage");
            return 0;
          }
        } catch (error) {
          console.error("Error parsing basket from localStorage:", error);
          return 0;
        }
      } else {
        console.error("No basket found in localStorage");
        return 0;
      }
    }
  
    getBasketfull(): BasketItem[] {
      const basketString = localStorage.getItem(this.basketName);
      if (basketString !== null) {
        try {
          const parsedBasket = JSON.parse(basketString);
          return Array.isArray(parsedBasket) ? parsedBasket : [];
        } catch (error) {
          console.error("Error parsing basket from localStorage:", error);
          return [];
        }
      }else {
        console.error("No basket found in localStorage");
        return [];
      }
    }

    
    getBasketTotal(): number{
      return this.currentBasketSubejct.value.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    saveBasket(basket: BasketItem[]): void{
      localStorage.setItem(this.basketName, JSON.stringify(basket));
      this.currentBasketSubejct.next(basket);
    }

}