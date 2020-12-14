import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MotorInsurance';
  isShowAdminHeader: boolean = false;
  isShowHeader: boolean = true;
  isShowSocialIcons: boolean = true;
  isShowFooter: boolean = true;
  constructor(private router: Router, private authService: AuthenticationService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ((event['url'] == '/login')) {
          this.isShowHeader = false;
          this.isShowSocialIcons = false;
          this.isShowFooter = false;
          $('.content-wrapper').css('marginLeft', '0px');
        } else {
          this.isShowHeader = true;
          this.isShowSocialIcons = true;
          this.isShowFooter = true;
          if (this.authService.isLoggedIn.getValue())
            $('.content-wrapper').css('marginLeft', '');
          else
            $('.content-wrapper').css('marginLeft', '0px');
        }
      }
    });
    this.authService.isLoggedIn.subscribe(res => {
      this.isShowAdminHeader = res;
      this.isShowFooter = !res;
    })
  }
}
