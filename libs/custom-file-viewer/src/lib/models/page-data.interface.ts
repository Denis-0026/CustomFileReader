import { Annotation } from '@libs/block-annotations';
import { PageImageData } from './page-image-data.interface';

export interface PageData {
  id: number;
  imageData?: PageImageData;
  annotations?: Annotation[];
}
