import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  InputSignal,
  output,
} from '@angular/core';
import { FactorToPercentPipe } from '../../pipes';

@Component({
  selector: 'lib-zoomable-actions',
  templateUrl: './zoomable-actions.component.html',
  styleUrl: './zoomable-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [FactorToPercentPipe],
})
export class ZoomableActionsComponent {
  public factor = input<InputSignal<number | undefined>>();

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  public readonly incZoomValue = output<void>();
  public readonly decZoomValue = output<void>();

  public incZoom(): void {
    this.incZoomValue.emit();
    this.changeDetectorRef.detectChanges();
  }

  public decZoom(): void {
    this.decZoomValue.emit();
    this.changeDetectorRef.detectChanges();
  }
}
