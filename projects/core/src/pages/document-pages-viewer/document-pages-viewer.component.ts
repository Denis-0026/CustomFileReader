import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, takeUntil, tap } from 'rxjs';

import { CustomFileViewerComponent, PageData } from '@libs/custom-file-viewer';
import { DocumentPagesViewerAppService } from './services';

@Component({
  selector: 'app-document-pages-viewer',
  templateUrl: './document-pages-viewer.component.html',
  styleUrl: './document-pages-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CustomFileViewerComponent],
})
export class DocumentPagesViewerComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private readonly pagesViewerAppService: DocumentPagesViewerAppService = inject(
    DocumentPagesViewerAppService,
  );

  public readonly pagesData: Signal<PageData[] | undefined> = toSignal(
    this.pagesViewerAppService.pagesData$,
  );

  public readonly currentPageId: Signal<number | null | undefined> = toSignal(
    this.pagesViewerAppService.currentPageId$,
  );

  ngOnInit(): void {
    this.createActivatedRouteSubscription();
    this.getPagesData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPagesData(): void {
    if (this.getCurrentDocumentId)
      this.pagesViewerAppService.getPagesData(this.getCurrentDocumentId);
  }

  private createActivatedRouteSubscription(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        takeUntil(this.destroy$),
        tap((params) => {
          const pageId: string | null = params.get('page');
          if (pageId) {
            this.pagesViewerAppService.setCurrentPageId(Number(pageId));
          }
        }),
      )
      .subscribe();
  }

  private get getCurrentDocumentId(): number | null {
    const documentIdStr = this.activatedRoute.snapshot.paramMap.get('documentId');
    if (documentIdStr) {
      return Number(documentIdStr);
    } else {
      return null;
    }
  }
}
