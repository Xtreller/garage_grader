import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class PicturesComponent implements OnInit {
  @Input() data = {};

  parentForm!: FormGroup;
  panelOpenState: boolean = false;
  srcResult: any;

  constructor(private parent: FormGroupDirective, private fb: FormBuilder) { }
  ngOnInit(): void {

    this.parentForm = this.parent.form;
    this.parentForm.addControl(
      'pictures',
      this.fb.group({
        pictures:new FormControl([])
      })
    );
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
