import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit {

  title = 'Free Agents';
  subtitle = 'Ottawa Hockey Players'
  opaque = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

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

    const offset = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    this.opaque = offset > 50;
  }
}
