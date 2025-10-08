import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '@app/core/tokens';
import { Document } from '../../models';

@Injectable({ providedIn: 'any' })
export class DocumentsApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseURL: string = inject(API_BASE_URL);

  getDocumentsInfo(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseURL}/documents`);
  }
}
