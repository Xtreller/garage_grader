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
        always_open: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        mon_start: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        mon_end: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        tue_start: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        tue_end: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        wed_start: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        wed_end: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        thu_start: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        thu_end: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        fri_start: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        fri_end: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        sat_start: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        sat_end: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        sun_start: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
        sun_end: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
      })
    );
    this.f['mon_start'].valueChanges.subscribe(val => console.log(val));
  }
  get f() {
    return (this.parentForm.get('worktime') as FormGroup).controls;
  }
  cheboxChecked(checked: boolean, event: any) {
    if (!checked) {
      this.setValidators
    }
    else {
      this.removeValidators()
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data) {
        Object.entries(this.data).map((key) => {
          // console.log(Object.keys(this.f));
          if (Object.keys(this.f).includes(key[0]) && key[0] != 'always_open') {
            // console.log(key[0],'=>',key[1],'=>',this.f['mon_start'].value);
            // console.log(key[0],'=>',key[1]);
            //   // console.log(key[1], new Date(`1970-01-01T${key[1]}Z`));
            //   // const [hours, minutes, seconds] = key[1].split(":").map(Number);
            //   // console.log(hours, minutes, seconds)
            //   // const now = new Date();
            //   const dateObject = new Date(new Date().setHours(0, 0, 0, 0));
            //   // console.log(dateObject);
            // this.f[key[0]].setValue(time);
          }
        });
        // this.parentForm.patchValue(this.data);
        if (this.data.always_open) {
          this.setValidators()
        }
        this.f['always_open']?.setValue(this.data.always_open == 1 ? true : false);
      }
    }
  }
  setTime(time:string) {
    return time.split(':').slice(0,2).join(':');

  }
  setValidators() {
    Array(this.f).forEach((element) => {
      Object.entries(element).forEach((key) => {
        if (!this.required.includes(key[0])) {
          key[1].setValue('');
          key[1].addValidators(Validators.required);
        }
      })
    })
  }
  removeValidators() {
    Array(this.f).forEach((element) => {
      console.log(element);
      Object.entries(element).forEach((key) => {
        if (!this.required.includes(key[0])) {
          key[1].patchValue(new Date(new Date().setHours(0, 0, 0, 0)));
          key[1].removeValidators(Validators.required);
        }
      })
    });
  }
}
