import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Document } from '../../models';
import { DocumentsApiService } from '..';

@Injectable({ providedIn: 'any' })
export class DocumentsAppService {
  private readonly documentsApiService: DocumentsApiService = inject(DocumentsApiService);

  private readonly documentsBehavior: BehaviorSubject<Document[]> = new BehaviorSubject<Document[]>(
    [],
  );
  public readonly documents$: Observable<Document[]> = this.documentsBehavior.asObservable();

  getDocumentsInfo(): void {
    this.documentsApiService
      .getDocumentsInfo()
      .pipe(
        tap((documents: Document[]) => {
          this.documentsBehavior.next(documents);
        }),
      )
      .subscribe();
  }
}
