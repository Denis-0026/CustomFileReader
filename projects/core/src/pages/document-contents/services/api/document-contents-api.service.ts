import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '@app/core/tokens';
import { DocumentContent } from '../../models';

@Injectable({ providedIn: 'any' })
export class DocumentContentsApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseURL: string = inject(API_BASE_URL);

  getContentsByDocumentId(documentId?: number): Observable<DocumentContent[]> {
    return this.http.get<DocumentContent[]>(`${this.baseURL}/document-contents`);
  }
}
