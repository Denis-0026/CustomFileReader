import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { CustomTableComponent } from '@libs/custom-table';
import { DocumentsAppService } from './services';
import { Document } from './models';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CustomTableComponent],
})
export class DocumentsComponent implements OnInit {
  private readonly documentsAppService: DocumentsAppService = inject(DocumentsAppService);
  private readonly router: Router = inject(Router);

  public readonly documents: Signal<Document[] | undefined> = toSignal(
    this.documentsAppService.documents$,
  );

  ngOnInit(): void {
    this.getDicumentsList();
  }

  openDocument(documentId: number): void {
    this.router.navigate([`documents/${documentId}/contents`]);
  }

  private getDicumentsList(): void {
    this.documentsAppService.getDocumentsInfo();
  }
}
