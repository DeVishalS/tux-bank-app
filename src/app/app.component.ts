import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tux-bank-app';

  constructor(public translate:TranslateService){
    translate.addLangs(['en-US', 'fr-FR']);
    translate.setDefaultLang('en-US');
    translate.use('en-US');
  }
}
