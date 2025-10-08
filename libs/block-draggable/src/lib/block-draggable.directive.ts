import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[draggable]',
})
export class DraggableDirective {
  private isDragging = false;
  private initialX!: number;
  private initialY!: number;
  private offsetX!: number;
  private offsetY!: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.initialX = event.clientX;
    this.initialY = event.clientY;
    this.offsetX = this.el.nativeElement.offsetLeft;
    this.offsetY = this.el.nativeElement.offsetTop;

    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    const currentX = event.clientX;
    const currentY = event.clientY;

    const deltaX = currentX - this.initialX;
    const deltaY = currentY - this.initialY;

    this.renderer.setStyle(this.el.nativeElement, 'left', `${this.offsetX + deltaX}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${this.offsetY + deltaY}px`);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }
}
