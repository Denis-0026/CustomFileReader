import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AnnotationDirective } from './directives';
import { ImgAnnotationComponent } from './components';
import { Annotation } from './models';

@Component({
  selector: 'lib-block-annotations',
  templateUrl: './block-annotations.component.html',
  styleUrl: './block-annotations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AnnotationDirective, ImgAnnotationComponent],
})
export class BlockAnnotationsComponent {
  public pageAnnotations: InputSignal<Annotation[] | undefined> = input<Annotation[] | undefined>();

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  public annotationsForm!: FormGroup;

  ngOnInit(): void {
    this.createAnnotationsControls();
  }

  public get annotationControls(): FormArray {
    return this.annotationsForm.get('annotationControls') as FormArray;
  }

  private createAnnotationsControls(): void {
    this.annotationsForm = this.formBuilder.group({
      annotationControls: this.formBuilder.array([]),
    });
    if (this.pageAnnotations()) {
      this.pageAnnotations()?.forEach((annotation) => {
        this.createAnnotationControl(annotation);
      });
    }
  }

  private createAnnotationControl(annotation: Annotation): void {
    const newControl = this.formBuilder.control(annotation.value || '');
    this.annotationControls.push(newControl);
  }
}
