import { Component, Input } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-worktime',
  templateUrl: './worktime.component.html',
  styleUrls: ['./worktime.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class WorktimeComponent {
  //  @Input() f:FormControl;
  //  @Input() form:FormGroup;
  required: string[] = ['sat_start', 'sat_end', 'sun_start', 'sun_end'];
  parentForm!: FormGroup
  panelOpenState: boolean = false;
  constructor(private parent: FormGroupDirective, private fb: FormBuilder) {
    // this.
  }
  ngOnInit(): void {
    this.parentForm = this.parent.form;
    this.parentForm.addControl(
      'worktime',
      this.fb.group({
        always_open: new FormControl(""),
        mon_start: new FormControl("", Validators.required),
        mon_end: new FormControl("", Validators.required),
        tue_start: new FormControl("", Validators.required),
        tue_end: new FormControl("", Validators.required),
        wed_start: new FormControl("", Validators.required),
        wed_end: new FormControl("", Validators.required),
        thu_start: new FormControl("", Validators.required),
        thu_end: new FormControl("", Validators.required),
        fri_start: new FormControl("", Validators.required),
        fri_end: new FormControl("", Validators.required),
        sat_start: new FormControl(""),
        sat_end: new FormControl(""),
        sun_start: new FormControl(""),
        sun_end: new FormControl(""),
      })
    );
  }
  get worktimeControls() {
    return this.parentForm.controls['worktime'];
  }
  cheboxChecked(checked: boolean, event: any) {
    if (!checked) {
      Array((this.parentForm.get('worktime') as FormGroup)['controls']).forEach((element) => {
        Object.entries(element).forEach((key) => {
          if (!this.required.includes(key[0])) {
            key[1].addValidators(Validators.required);
          }
        })
      })
    }
    else {
      Array((this.parentForm.get('worktime') as FormGroup)['controls']).forEach((element) => {
        Object.entries(element).forEach((key) => {
          if (!this.required.includes(key[0])) {
            key[1].setValue('00:00');
            key[1].removeValidators(Validators.required);
          }
        })
      });
    }


  }
}
