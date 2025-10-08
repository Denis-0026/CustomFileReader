import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, of, switchMap, tap } from 'rxjs';

import { PageData, PageImageData } from '@libs/custom-file-viewer';
import { Annotation } from '@libs/block-annotations';
import { DocumentPagesViewerApiService } from '..';

@Injectable({ providedIn: 'any' })
export class DocumentPagesViewerAppService {
  private readonly documentPagesViewerApiService: DocumentPagesViewerApiService = inject(
    DocumentPagesViewerApiService,
  );

  private readonly currentPageIdBehavior: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readonly pagesDataBehavior: BehaviorSubject<PageData[]> = new BehaviorSubject<PageData[]>(
    [],
  );
  public readonly pagesData$: Observable<PageData[]> = this.pagesDataBehavior.asObservable();
  public readonly currentPageId$: Observable<number> = this.currentPageIdBehavior.asObservable();

  get currentPageId(): number {
    return this.currentPageIdBehavior.value;
  }

  get currentPagesData(): PageData[] {
    return this.pagesDataBehavior.value;
  }

  setCurrentPageId(pageId: number): void {
    this.currentPageIdBehavior.next(pageId);
    this.getCurrentPageData();
  }

  getPagesData(documentId: number): void {
    this.documentPagesViewerApiService
      .getPagesByDocumentId(documentId)
      .pipe(
        switchMap((pages: PageData[]) => {
          this.pagesDataBehavior.next(pages);
          return this.getPageImageData();
        }),
        tap((currentPageImage: PageImageData) => {
          this.currentPagesData.map((page: PageData) => {
            if (page.id === currentPageImage.id) {
              page.imageData = currentPageImage;
            }
            return page;
          });
        }),
        switchMap((currentPageImage: PageImageData) => {
          return this.getPageAnnotations();
        }),
      )
      .subscribe();
  }

  getCurrentPageData(): void {
    merge(this.getPageImageData(), this.getPageAnnotations()).subscribe();
  }

  private getPageImageData(): Observable<PageImageData> {
    let indexToUpdate = this.currentPagesData.findIndex((page) => page.id === this.currentPageId);
    if (
      this.currentPageId &&
      this.currentPagesData[indexToUpdate] &&
      !this.currentPagesData[indexToUpdate].imageData
    ) {
      return this.documentPagesViewerApiService.getPageImageById(this.currentPageId).pipe(
        tap((newPageImageData: PageImageData) => {
          if (newPageImageData) {
            this.currentPagesData[indexToUpdate].imageData = newPageImageData;
          }
        }),
      );
    } else {
      return of({ id: 0, imageUrl: '' });
    }
  }

  private getPageAnnotations(): Observable<Annotation[]> {
    let indexToUpdate = this.currentPagesData.findIndex((page) => page.id === this.currentPageId);
    if (
      this.currentPageId &&
      this.currentPagesData[indexToUpdate] &&
      !this.currentPagesData[indexToUpdate].annotations
    ) {
      return this.documentPagesViewerApiService.getPageAnnotationsById(this.currentPageId).pipe(
        tap((annotations: Annotation[]) => {
          if (annotations && annotations.length > 0) {
            this.currentPagesData[indexToUpdate].annotations = annotations;
          }
        }),
      );
    } else {
      return of([]);
    }
  }
}
