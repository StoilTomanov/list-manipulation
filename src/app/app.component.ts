import { Component } from '@angular/core';
import { ListOneComponent } from './base-list/list-one/list-one.component';
import { ListTwoComponent } from './base-list/list-two/list-two.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  imports: [ListOneComponent, ListTwoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [BrowserAnimationsModule],
})
export class AppComponent {
  title = 'tide';
}
