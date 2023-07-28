import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorsService {
getFormValidationErrors(controls:FormControl,form:FormGroup) {
  Object.keys(controls).forEach(key => {
    console.log(key, form.get(key)?.valid);
    const controlErrors: (ValidationErrors | any)= form.get(key)?.errors;
    console.log(controlErrors);
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {
        console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
      });
    }
  });
}
}
