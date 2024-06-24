import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `Hello, {{name}}`,
})
export class AppComponent {
  name = 'World';
}
