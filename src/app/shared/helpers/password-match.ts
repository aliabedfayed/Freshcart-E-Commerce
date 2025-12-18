import { AbstractControl } from "@angular/forms"

export const passwordMatchValidator = (control: AbstractControl) => {
    return control.get('password')?.value === control.get('rePassword')?.value ? null : { misMatch: true }
}