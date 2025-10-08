import { AnnotationPosition, AnnotationSize } from '.';
import { AnnotationType } from '../enums';

export interface Annotation {
  id: number;
  documentId: number;
  pageId: number;
  value?: unknown;
  position: AnnotationPosition;
  size: AnnotationSize;
}
