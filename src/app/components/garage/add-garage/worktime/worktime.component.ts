import { Component, Input } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-worktime',
  templateUrl: './worktime.component.html',
  styleUrls: ['./worktime.component.scss'],
 viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class WorktimeComponent {
  //  @Input() f:FormControl;
  //  @Input() form:FormGroup;
    parentForm!: FormGroup
  panelOpenState: boolean = false;
  constructor(private parent: FormGroupDirective,private fb:FormBuilder) {
    // this.
  }
  ngOnInit(): void {
    this.parentForm = this.parent.form;
    this.parentForm.addControl(
      'worktime',
      this.fb.group({
        mon_start:new FormControl("",Validators.required),
        mon_end:new FormControl("",Validators.required),
        tue_start:new FormControl("",Validators.required),
        tue_end:new FormControl("",Validators.required),
        wed_start:new FormControl("",Validators.required),
        wed_end:new FormControl("",Validators.required),
        thu_start:new FormControl("",Validators.required),
        thu_end:new FormControl("",Validators.required),
        fri_start:new FormControl("",Validators.required),
        fri_end:new FormControl("",Validators.required),
        sat_start:new FormControl("",Validators.required),
        sat_end:new FormControl("",Validators.required),
        sun_start:new FormControl("",Validators.required),
        sun_end:new FormControl("",Validators.required),
      })
    );
  }
}
