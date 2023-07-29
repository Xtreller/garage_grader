import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer, Form, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class MainInfoComponent implements OnInit {
  // @Input() form: FormGroup;
  @Input('data') data: Garage;
  parentForm!: FormGroup;
  mainInfoOpen: boolean = true;
  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {

  }
  ngOnInit(): void {
    this.mainInfoOpen = true;
    this.parentForm = this.parent.form;
    this.parentForm.addControl(
      'main_info',
      this.fb.group({
        name: new FormControl("", Validators.required),
        description: new FormControl(),
        type: new FormControl("", Validators.required),
        services: new FormControl("", Validators.required),
        phone: new FormControl("", Validators.required),
        mobile_service: new FormControl(),
        address: new FormControl(),
        town: new FormControl("", Validators.required),
        email: new FormControl(),
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['data']) {
      if(this.data) {
        this.f.patchValue(this.data);
        this.f.get('mobile_service')?.setValue(this.data.are_mobile_service==1 ? true:false);
      }
    }
  }
  get f() { return this.parentForm.get('main_info') as FormControl }
}
