import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '@app/core/tokens';
import { PageData, PageImageData } from '@libs/custom-file-viewer';
import { Annotation } from '@libs/block-annotations';

@Injectable({ providedIn: 'any' })
export class DocumentPagesViewerApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseURL: string = inject(API_BASE_URL);

  getPagesByDocumentId(documentId: number): Observable<PageData[]> {
    return this.http.get<PageData[]>(`${this.baseURL}/pages`, {
      params: { documentId: documentId },
    });
  }

  getPageImageById(pageId: number): Observable<PageImageData> {
    const params = { pageId: pageId };
    return this.http.get<PageImageData>(`${this.baseURL}/page-image`, {
      params: params,
    });
  }

  getPageAnnotationsById(pageId: number): Observable<Annotation[]> {
    const params = { pageId: pageId };
    return this.http.get<Annotation[]>(`${this.baseURL}/page-annotations`, {
      params: { pageId: pageId },
    });
  }
}
