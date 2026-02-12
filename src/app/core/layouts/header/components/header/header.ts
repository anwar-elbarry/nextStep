import {Component, inject} from '@angular/core';
import {AuthService} from '../../../../../features/auth/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    private authService = inject(AuthService);
    currentUser = this.authService.currentUser;

    logout(){
        this.authService.logout();
        console.log('you logout')
    }
}
