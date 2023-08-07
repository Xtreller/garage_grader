import { Component, Inject } from '@angular/core';
import { AdminComponent } from '../../admin/admin.component';
import { AdminService } from 'src/app/features/services/Admin/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/features/services/Roles/role.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent {

  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
    private roleService: RoleService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    protected dialogRef: MatDialogRef<AddEditRoleComponent>) {
    this.form = this.fb.group({
      name: new FormControl("", Validators.required),
      see: new FormControl(""),
      add: new FormControl(""),
      edit: new FormControl(""),
      delete: new FormControl(""),
    })
    if (this.data?.id) {
      this.roleService.getRole(this.data.id).subscribe((response:any)=>{
          if(response.data){
            this.form.patchValue(response.data);
          }

      })
    }

  }
  onSubmit() {
    if (this.form.valid) {
      if (!this.data?.id) {
        this.roleService.addRole(this.form.value).subscribe((response: any) => {
          if (response.data) {
            this.dialogRef.close(true);
            this.snackbar.open('Успешно добавена роля!')
          }
        })
      }
      else {
        this.roleService.editRole(this.data.id, this.form.value).subscribe((response: any) => {
          if (response.data) {
            this.dialogRef.close(true);
            this.snackbar.open('Успешно редактирана роля!')
          }
        })
      }
    }
  }
}
