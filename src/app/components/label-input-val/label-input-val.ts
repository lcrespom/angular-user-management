import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'label-input-val',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelInputVal),
      multi: true,
    },
  ],
  templateUrl: './label-input-val.html',
  styleUrl: './label-input-val.css',
})
export class LabelInputVal implements ControlValueAccessor {
  @Input() label!: string;
  @Input() formGroup!: FormGroup;
  @Input() formControlName!: string;
  @Input() type: string = 'text';

  value: any;

  // Store the callbacks from Angular
  private onChange = (value: any) => {};
  private onTouched = () => {};

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Handle input changes
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    // Handle checkbox vs other input types
    if (this.type === 'checkbox') {
      this.value = target.checked;
    } else {
      this.value = target.value;
    }
    // Notify Angular of the change
    this.onChange(this.value);
  }

  // Handle blur events
  onBlur(): void {
    this.onTouched();
  }
}
