import { AnnotationType } from '../enums';
import { AnnotationPositionDto } from '.';
import { AnnotationSizeDto } from '.';

export interface AnnotationDto {
  id: number;
  documentId: number;
  pageId: number;
  type?: AnnotationType;
  value?: unknown;
  posotion: AnnotationPositionDto;
  size: AnnotationSizeDto;
}
