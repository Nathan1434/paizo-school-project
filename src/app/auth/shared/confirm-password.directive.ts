import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null;

        const passwordField = control.parent?.get('password');
        if (!passwordField?.value) return { passwordMissing: { value: true } };

        const isSame = passwordField.value === control.value;
        return !isSame ? { confirm: { value: true } } : null;
    };
}