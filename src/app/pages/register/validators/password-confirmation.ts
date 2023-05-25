import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function notEqualPassword(): ValidatorFn {
    return (
        control: AbstractControl
    ): ValidationErrors | null => {
        const password = control.get("password")
        const passwordConfirmation = control.get("passwordConfirmation")

        if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
            passwordConfirmation.setErrors({ notEqualPassword: true })
            return { notEqualPassword: true }
        }
        return null
    }
}