import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormValidationUtils {
  private static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This is a required field';
        case 'minlength':
          return `This field requires at least ${errors[key].requiredLength} characters`;
        case 'maxlength':
          return `This field requires at most ${errors[key].requiredLength} characters`;
        default:
          return `Invalid field (${key})`;
      }
    }
    return null; // No validation errors
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    return FormValidationUtils.getTextError(errors);
  }

  static compareFields(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : { fieldsNotEqual: true };
    };
  }
}
