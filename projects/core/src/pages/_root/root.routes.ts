import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./root.component').then((m) => m.RootComponent),
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        loadComponent: () => import('../main/main.component').then((m) => m.MainComponent),
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('../documents/documents.component').then((m) => m.DocumentsComponent),
      },
      {
        path: 'documents/:documentId/contents',
        loadComponent: () =>
          import('../document-contents/document-contents.component').then(
            (m) => m.DocumentContentsComponent,
          ),
      },
      {
        path: 'documents/:documentId/viewer',
        loadComponent: () =>
          import('../document-pages-viewer/document-pages-viewer.component').then(
            (m) => m.DocumentPagesViewerComponent,
          ),
      },
    ],
  },
];
