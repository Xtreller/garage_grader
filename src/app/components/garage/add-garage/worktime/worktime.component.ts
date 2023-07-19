import { Component, Input } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

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
        always_open:new FormControl(""),
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
  cheboxChecked(checked:MatCheckboxChange){
    console.log(checked);
    if(!checked){
      this.parentForm.get('mon_start')?.addValidators(Validators.required);
      this.parentForm.get('mon_end')?.addValidators(Validators.required);
      this.parentForm.get('tue_start')?.addValidators(Validators.required);
      this.parentForm.get('tue_end')?.addValidators(Validators.required);
      this.parentForm.get('wed_start')?.addValidators(Validators.required);
      this.parentForm.get('wed_end')?.addValidators(Validators.required);
      this.parentForm.get('thu_start')?.addValidators(Validators.required);
      this.parentForm.get('thu_end')?.addValidators(Validators.required);
      this.parentForm.get('fri_start')?.addValidators(Validators.required);
      this.parentForm.get('fri_end')?.addValidators(Validators.required);
      this.parentForm.get('sat_start')?.addValidators(Validators.required);
      this.parentForm.get('sat_end')?.addValidators(Validators.required);
      this.parentForm.get('sun_start')?.addValidators(Validators.required);
      this.parentForm.get('sun_end')?.addValidators(Validators.required);
    }
    else{
      this.parentForm.get('mon_start')?.removeValidators(Validators.required);
      this.parentForm.get('mon_end')?.removeValidators(Validators.required);
      this.parentForm.get('tue_start')?.removeValidators(Validators.required);
      this.parentForm.get('tue_end')?.removeValidators(Validators.required);
      this.parentForm.get('wed_start')?.removeValidators(Validators.required);
      this.parentForm.get('wed_end')?.removeValidators(Validators.required);
      this.parentForm.get('thu_start')?.removeValidators(Validators.required);
      this.parentForm.get('thu_end')?.removeValidators(Validators.required);
      this.parentForm.get('fri_start')?.removeValidators(Validators.required);
      this.parentForm.get('fri_end')?.removeValidators(Validators.required);
      this.parentForm.get('sat_start')?.removeValidators(Validators.required);
      this.parentForm.get('sat_end')?.removeValidators(Validators.required);
      this.parentForm.get('sun_start')?.removeValidators(Validators.required);
      this.parentForm.get('sun_end')?.removeValidators(Validators.required);
    }


  }
}
