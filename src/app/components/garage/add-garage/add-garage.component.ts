import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-garage',
  templateUrl: './add-garage.component.html',
  styleUrls: ['./add-garage.component.scss']
})
export class AddGarageComponent implements OnInit{
  form:FormGroup;
  title:string = "Добавяне на гараж";
  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      name:new FormControl("",Validators.required),
      description:new FormControl(),
      type:new FormControl("",Validators.required),
      services:new FormControl("",Validators.required),
      work_time:new FormControl("",Validators.required),
      phone:new FormControl("",Validators.required),
      mobile_service:new FormControl(),
      address:new FormControl(),
      town:new FormControl("",Validators.required),
      email:new FormControl(),
      pictures:new FormControl(),
    })
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  get f(){
    return this.form.controls;
  }
  submit(event:Event){
    console.log(event);
  }

}
