import {
  HttpEvent,
  HttpHandlerFn,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { dematerialize, materialize, mergeMap, Observable, of } from 'rxjs';

import DocumentsList from './data/documents-list.json';
import DocumentContents from './data/document-contents.json';
import PagesIdsList from './data/pages-info-list.json';
import PageDataImage from './data/page-data.json';
import PageAnnotations from './data/page-annotations.json';
import { DocumentDto, DocumentContentDto, PageDataDto, AnnotationDto } from './models';
import { PageImageDataDto } from './models/page-image-data.interface';

export function mockDataInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return of(null).pipe(mergeMap(handleRoute)).pipe(materialize()).pipe(dematerialize());

  function handleRoute() {
    switch (true) {
      case req.url.endsWith('/documents') && req.method === 'GET':
        return getDocuments();
      case req.url.endsWith('/document-contents') && req.method === 'GET':
        return getDocumentContents();
      case req.url.endsWith('/pages') && req.method === 'GET':
        return getDocumentPagesIds(req.params);
      case req.url.endsWith('/page-image') && req.method === 'GET':
        return getPageImage(req.params);
      case req.url.endsWith('/page-annotations') && req.method === 'GET':
        return getPageAnnotations(req.params);
      default:
        return next(req);
    }
  }

  function getDocuments() {
    const documents: DocumentDto[] = DocumentsList as unknown as DocumentDto[];
    return ok(documents);
  }

  function getDocumentContents() {
    const pages: DocumentContentDto[] = DocumentContents as unknown as DocumentContentDto[];
    return ok(pages);
  }

  function getDocumentPagesIds(params: HttpParams) {
    const pages: PageDataDto[] = PagesIdsList as unknown as PageDataDto[];
    return ok(pages);
  }

  function getPageImage(params: HttpParams) {
    const pageId: string | null = params.get('pageId');
    let pageDataImage: PageImageDataDto = PageDataImage as unknown as PageImageDataDto;
    pageDataImage.id = Number(pageId);
    return ok(pageDataImage);
  }

  function getPageAnnotations(params: HttpParams) {
    const pageId: string | null = params.get('pageId');
    const annotationsData: AnnotationDto[] = PageAnnotations as unknown as AnnotationDto[];
    const newAnnotationsData: AnnotationDto[] = annotationsData.filter(
      (annotation: AnnotationDto) => annotation.pageId === Number(pageId),
    );
    return ok(newAnnotationsData);
  }

  function ok(body: any) {
    return of(
      new HttpResponse<DocumentDto | PageDataDto | PageImageDataDto>({
        status: 200,
        body,
      }),
    );
  }
}
