import {
  ComponentRef,
  Directive,
  ElementRef,
  inject,
  input,
  inputBinding,
  InputSignal,
  OnDestroy,
  OnInit,
  outputBinding,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';

import { ZoomableActionsComponent } from './components';

@Directive({
  selector: '[zoomable]',
})
export class BlockZoomableDirective implements OnInit, OnDestroy {
  private _stap: number = 0.1;
  private _factor: number = 1;

  private _maxValue: number = 3;

  private _minValue: number = 0.8;
  private zoomableActionsRef!: ComponentRef<ZoomableActionsComponent>;

  public currentPageId: InputSignal<number | null | undefined> = input<number | null>();

  private readonly el: ElementRef = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  private baseWidth: number = 0;
  private baseHeight: number = 0;

  ngOnInit(): void {
    this.createZoomActionsComponent();
    this.updateSize();
  }

  ngOnDestroy(): void {
    this.zoomableActionsRef.destroy();
  }

  private createZoomActionsComponent() {
    this.baseWidth = this.el.nativeElement.offsetWidth;
    this.baseHeight = this.el.nativeElement.parentNode.offsetHeight;

    this.zoomableActionsRef = this.viewContainerRef.createComponent(ZoomableActionsComponent, {
      bindings: [
        inputBinding('factor', () => this._factor),
        outputBinding('incZoomValue', () => {
          this.incZoomValue();
        }),
        outputBinding('decZoomValue', () => {
          this.decZoomValue();
        }),
      ],
    });
  }

  private incZoomValue(): void {
    if (this._factor < this._maxValue) {
      this._factor = this.discardingNumber(this._factor + this._stap);
      this.changeZoom();
    }
  }

  private decZoomValue(): void {
    if (this._factor > this._minValue) {
      this._factor = this.discardingNumber(this._factor - this._stap);
      this.changeZoom();
    }
  }

  private discardingNumber(value: number): number {
    return Number(value.toFixed(1));
  }

  private changeZoom(): void {
    this.updateSize();
  }

  private updateSize(): void {
    this.renderer.setStyle(this.el.nativeElement, 'width', this.baseWidth * this._factor + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'height', this.baseHeight * this._factor + 'px');

    const currentId: number | null | undefined = this.currentPageId();

    if (currentId) {
      const currentEl = document.getElementById(currentId.toString());
      if (currentEl) {
        currentEl.scrollIntoView({
          inline: 'center',
          behavior: 'auto',
        });
      }
    }
  }
}
