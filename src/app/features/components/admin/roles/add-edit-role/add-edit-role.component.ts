import { Component } from '@angular/core';
import { AdminComponent } from '../../admin/admin.component';
import { AdminService } from 'src/app/features/services/Admin/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/features/services/Roles/role.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent {

  form: FormGroup;
  constructor(private roleService: RoleService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl("", Validators.required),
      see: new FormControl(""),
      add: new FormControl(""),
      edit: new FormControl(""),
      delete: new FormControl(""),
    })

  }
  onSubmit() {
    if (this.form.valid) {
      this.roleService.addRole(this.form.value).subscribe((response: any) => {
        if (response.data) {
          console.log(response);
        }
      })
    }
  }
}
