import { Component } from '@angular/core';
import { AppRoutingModule } from "src/app/app-routing.module";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    imports: [AppRoutingModule]
})
export class NavbarComponent {

}
