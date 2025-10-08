import { Directive, ElementRef, inject, input, InputSignal, Renderer2 } from '@angular/core';
import { Annotation } from '../models';

@Directive({
  selector: '[annotation]',
})
export class AnnotationDirective {
  public pageAnnotation: InputSignal<Annotation | undefined> = input<Annotation>();

  private readonly el: ElementRef = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);

  ngOnInit(): void {
    this.setStartConfiguration();
  }

  private setStartConfiguration(): void {
    const parrent: HTMLElement | null = this.el.nativeElement.parentElement;
    if (parrent) {
    }
    this.renderer.setStyle(
      this.el.nativeElement,
      'width',
      this.pageAnnotation()?.size.width + 'px',
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'height',
      this.pageAnnotation()?.size.height + 'px',
    );
    this.renderer.setStyle(this.el.nativeElement, 'top', this.pageAnnotation()?.position.x + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'left', this.pageAnnotation()?.position.y + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', this.pageAnnotation()?.position.z);
  }
}
