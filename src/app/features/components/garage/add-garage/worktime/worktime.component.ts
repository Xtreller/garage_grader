import { Component, Input, SimpleChanges } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { elementAt } from 'rxjs';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';

@Component({
  selector: 'app-worktime',
  templateUrl: './worktime.component.html',
  styleUrls: ['./worktime.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class WorktimeComponent {
  @Input() data: Garage;

  required: string[] = ['sat_start', 'sat_end', 'sun_start', 'sun_end', 'always_open'];
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
        sat_start: new FormControl(new Date(new Date().setHours(0,0,0,0))),
        sat_end: new FormControl(new Date(new Date().setHours(0,0,0,0))),
        sun_start: new FormControl(new Date(new Date().setHours(0,0,0,0))),
        sun_end: new FormControl(new Date(new Date().setHours(0,0,0,0))),
      })
    );
  }
  get f() {
    return (this.parentForm.get('worktime') as FormGroup).controls;
  }
  cheboxChecked(checked: boolean, event: any) {
    if (!checked) {
      Array(this.f).forEach((element) => {
        console.log(element);
        Object.entries(element).forEach((key) => {
          if (!this.required.includes(key[0])) {
            key[1].setValue('');
            key[1].addValidators(Validators.required);
          }
        })
      })
    }
    else {
      Array(this.f).forEach((element) => {
        console.log(element);
        Object.entries(element).forEach((key) => {
          if (!this.required.includes(key[0])) {
            console.log(key[1]);
            key[1].patchValue(new Date(new Date().setHours(0,0,0,0)) );
            key[1].removeValidators(Validators.required);
          }
        })
      });
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data) {
        this.parentForm.patchValue(this.data);

        this.f['always_open']?.setValue(this.data.always_open == 1 ? true : false);
      }
    }
  }
}
