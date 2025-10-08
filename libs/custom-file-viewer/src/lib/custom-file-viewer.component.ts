import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

import { PageData } from './models';
import { CustomPageViewerComponent } from './components';
import { BlockZoomableDirective } from '@libs/block-zoomable';
import { ScrollPageTrackerDirective } from '@libs/scroll-page-tracker';

@Component({
  selector: 'lib-custom-file-viewer',
  templateUrl: './custom-file-viewer.component.html',
  styleUrl: './custom-file-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CustomPageViewerComponent, ScrollPageTrackerDirective, BlockZoomableDirective],
})
export class CustomFileViewerComponent {
  public pagesData: InputSignal<PageData[] | undefined> = input<PageData[]>();
  public currentPageId: InputSignal<number | null | undefined> = input<number | null>();
}
