import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggleNavigation = new EventEmitter<string>();

  toggleNavButtonClick(item) {
    this.toggleNavigation.emit(item);
  }
}
