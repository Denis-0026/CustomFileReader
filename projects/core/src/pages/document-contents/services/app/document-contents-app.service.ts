import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { DocumentContent } from '../../models';
import { DocumentContentsApiService } from '..';

@Injectable({ providedIn: 'any' })
export class DocumentContentsAppService {
  private readonly documentContentsApiService: DocumentContentsApiService = inject(
    DocumentContentsApiService,
  );

  private readonly documentContentsBehavior: BehaviorSubject<DocumentContent[]> =
    new BehaviorSubject<DocumentContent[]>([]);
  public readonly documentContents$: Observable<DocumentContent[]> =
    this.documentContentsBehavior.asObservable();

  getDocumentContents(dicumentId?: number): void {
    this.documentContentsApiService
      .getContentsByDocumentId(dicumentId)
      .pipe(
        tap((contents: DocumentContent[]) => {
          this.documentContentsBehavior.next(contents);
        }),
      )
      .subscribe();
  }
}
