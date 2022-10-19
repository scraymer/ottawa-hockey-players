import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit {

  title = 'Free Agents';
  subtitle = 'Ottawa Hockey Players'
  opaque = false;

  constructor() { }

  /**
   * Check the scroll event class on view initialization.
   */
  ngAfterViewInit(): void {
    this.checkOpaqueClass();
  }

  /**
   * Listen to the window resize event and check the scroll event class.
   */
  @HostListener('window:resize')
  onResize() {
    this.checkOpaqueClass();
  }

  /**
   * Listen to the document scroll event and check the scroll event class.
   */
  @HostListener('document:scroll')
  onScroll() {
    this.checkOpaqueClass();
  }

  checkOpaqueClass() {

    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.opaque = offset > 50;
  }
}
