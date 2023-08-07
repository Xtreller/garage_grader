import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from 'src/app/features/services/Services/service.service';

@Component({
  selector: 'app-add-edit-service',
  templateUrl: './add-edit-service.component.html',
  styleUrls: ['./add-edit-service.component.scss']
})
export class AddEditServiceComponent {
  serviceControl: FormControl = new FormControl();
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
    private serviceService: ServiceService,
    protected dialogRef: MatDialogRef<AddEditServiceComponent>,
    private snackbar: MatSnackBar) {
    if (this.data?.id) {
      this.serviceService.getService(this.data.id).subscribe((response: any) => {
        if (response.data) {
          this.serviceControl.patchValue(response.data);
        }

      })
    }
  }
  onSubmit() {
    if (this.serviceControl.valid) {
      if (this.data?.id) {
        this.serviceService.addService({ 'name': this.serviceControl.value }).subscribe((response: any) => {
          if (response.data) {
            this.dialogRef.close();
            this.snackbar.open('Успешно добавен тип сервиз!','',{duration:2500});
          }
        });
      }
      else {
        this.serviceService.addService({ 'name': this.serviceControl.value }).subscribe((response: any) => {
          if (response.data) {
            this.dialogRef.close();
            this.snackbar.open('Успешно добавен тип сервиз!','',{duration:2500});
          }
        });
      }
    }
  }
}
