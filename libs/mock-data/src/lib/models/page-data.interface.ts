import { AnnotationDto } from '.';
import { PageImageDataDto } from './page-image-data.interface';

export interface PageDataDto {
  id: number;
  imageUrl?: string;
  imageData?: PageImageDataDto;
  annotation?: AnnotationDto;
}
