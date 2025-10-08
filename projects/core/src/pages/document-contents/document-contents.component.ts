import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { CustomTableComponent } from '@libs/custom-table';
import { DocumentContent } from './models';
import { DocumentContentsAppService } from './services';

@Component({
  selector: 'app-document-contents',
  templateUrl: './document-contents.component.html',
  styleUrl: './document-contents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CustomTableComponent],
})
export class DocumentContentsComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private readonly documentContentsAppService: DocumentContentsAppService = inject(
    DocumentContentsAppService,
  );
  public readonly documentContents: Signal<DocumentContent[] | undefined> = toSignal(
    this.documentContentsAppService.documentContents$,
  );

  private documentId: number | null = null;

  ngOnInit(): void {
    this.getCuurentDocumentId();
  }

  openPage(contentId: number): void {
    const currentContent = this.documentContents()?.find(
      (content: DocumentContent) => content.id === contentId,
    );
    if (currentContent)
      this.router.navigate([`documents/${this.documentId}/viewer`], {
        queryParams: { page: currentContent.pageId },
        queryParamsHandling: 'merge',
      });
  }

  private getCuurentDocumentId(): void {
    const documentIdStr = this.activatedRoute.snapshot.paramMap.get('documentId');
    if (documentIdStr) {
      this.documentId = Number(documentIdStr);
      this.documentContentsAppService.getDocumentContents(this.documentId);
    }
  }
}
