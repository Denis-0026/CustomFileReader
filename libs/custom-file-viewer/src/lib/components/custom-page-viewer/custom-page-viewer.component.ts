import { Component, input, InputSignal, ChangeDetectionStrategy } from '@angular/core';

import { PageData } from '../../models';
import { BlockAnnotationsComponent } from '@libs/block-annotations';

@Component({
  selector: 'lib-custom-page-viewer',
  templateUrl: './custom-page-viewer.component.html',
  styleUrl: './custom-page-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [BlockAnnotationsComponent],
})
export class CustomPageViewerComponent {
  public pageData: InputSignal<PageData | undefined> = input<PageData>();
}
