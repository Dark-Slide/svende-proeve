import { Component } from '@angular/core';
import { AppRoutingModule } from "src/app/app-routing.module";
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';




@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    imports: [RouterModule, CommonModule, AppRoutingModule]
})
export class NavbarComponent {
    constructor(public authService: AuthService, private toastr: ToastrService, private router: Router) {}
    user: User | null = this.authService.user;

    profile?: Profile| null;
    

    


    logout() {
        this.authService.logOut();
        this.toastr.success('Du er nu logget ud');
        this.router.navigate(['/']);
    }

    isAuthenticated(){
        return this.authService.isAuthenticated();
    }
}
