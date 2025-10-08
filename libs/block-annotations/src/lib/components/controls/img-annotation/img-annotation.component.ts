import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-img-annotation',
  templateUrl: './img-annotation.component.html',
  styleUrl: './img-annotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImgAnnotationComponent),
      multi: true,
    },
  ],
})
export class ImgAnnotationComponent {
  file: File | null = null;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (!value || value === '') this.file = null;
    else this.file = new File([value], 'filename.jpg');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      this.file = files.item(0)!;
      this.onChange(this.file);
    }
  }

  getImgURL(): string {
    return this.file ? URL.createObjectURL(this.file) : '';
  }
}
