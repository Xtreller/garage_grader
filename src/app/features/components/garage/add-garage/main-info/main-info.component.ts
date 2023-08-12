import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer, Form, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';
import { Service } from 'src/app/features/interfaces/Services/service';
import { ServiceService } from 'src/app/features/services/Services/service.service';

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
  serviceTypes: Service[] = [];
  constructor(private fb: FormBuilder, private parent: FormGroupDirective, private servicesService: ServiceService) {
    this.servicesService.getServices().subscribe((response: any) => {
      this.serviceTypes = response.data;
    })
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
        services: new FormControl(""),
        phone: new FormControl("", Validators.required),
        mobile_service: new FormControl(),
        address: new FormControl(),
        town: new FormControl("", Validators.required),
        email: new FormControl(),
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data) {
        Array(this.f).forEach((element) => {
          Object.entries(element).forEach((key) => {
            if(key[0] == 'controls'){
              Array(key[1]).forEach(element => {
                  console.log(element);
                  // console.log(key[0],key[1]);
              });
            }
            // if (!this.required.includes(key[0])) {
              // key[1].setValue('');
              // key[1].addValidators(Validators.required);
            // }
          })
        })
        this.f.patchValue(this.data);
        this.f.controls['mobile_service']?.setValue(this.data.are_mobile_service == 1 ? true : false);
      }
    }
  }
  get f() { return (this.parentForm.get('main_info') as FormGroup) }
}
