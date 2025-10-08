import {
  Directive,
  HostListener,
  ElementRef,
  inject,
  AfterContentInit,
  input,
  InputSignal,
} from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[scrollPageTracker]',
})
export class ScrollPageTrackerDirective implements AfterContentInit {
  public currentPageId: InputSignal<number | null | undefined> = input();

  private readonly el: ElementRef = inject(ElementRef);
  private readonly router: Router = inject(Router);
  private childrens!: Element[];

  @HostListener('scroll', [])
  onScroll(): void {
    const currentPageId: number | null = this.getCurrentPageId();
    if (currentPageId && currentPageId !== this.currentPageId()) {
      this.setCurrentPageIdToParams(currentPageId);
    }
  }

  ngAfterContentInit(): void {
    this.getPagesElements();
    this.scrollToElement();
  }

  private scrollToElement(): void {
    const startElementId: number | null | undefined = this.currentPageId();
    if (startElementId) {
      const element = document.getElementById(startElementId.toString());
      if (element) {
        element.scrollIntoView();
      }
    }
  }

  private getCurrentPageId(): number | null {
    const currentEl: Element | undefined = this.childrens.find((page: Element) => {
      const pagePosition = page.getBoundingClientRect();
      const changePagePosition = pagePosition.top + pagePosition.height / 2;

      return changePagePosition >= 0 && changePagePosition < pagePosition.height ? page : undefined;
    });

    return currentEl ? Number(currentEl.id) : null;
  }

  private setCurrentPageIdToParams(currentId: number): void {
    this.router.navigate([], {
      queryParams: { page: currentId },
      queryParamsHandling: 'merge',
    });
  }

  private getPagesElements(): void {
    const pagesWrap: HTMLElement | null = document.getElementById('custom-file-viewer');
    if (pagesWrap) {
      this.childrens = Array.from(pagesWrap.children);
    }
  }
}
