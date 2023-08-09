import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class PicturesComponent implements OnInit {
  @Input() data = {};
  @Output() images = new EventEmitter<any>();
  parentForm!: FormGroup;
  panelOpenState: boolean = false;
  srcResult: any;
  coverPicture: any;
  profilePicture: any;
  contentImages: string[] = [];
  formData: FormData = new FormData();
  preview: any;
  loading: boolean = false;
  constructor(private parent: FormGroupDirective, private fb: FormBuilder) { }
  ngOnInit(): void {

    this.parentForm = this.parent.form;
    this.parentForm.addControl(
      'pictures',
      this.fb.group({
        pictures: new FormControl(""),
        profile_picture: new FormControl(""),
        cover_picture: new FormControl(""),

      })
    );
  }
  get f() {
    return (this.parentForm.get('pictures') as FormGroup).controls;
  }
  onFileSelected(event: any, type: string = 'content') {
    this.loading = true;
    // const inputNode: any = document.querySelector('#file');
    const images = (event.target.files);

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        switch (type) {
          case 'profile':
            this.profilePicture = images[0].name;
            break;
          case 'cover':
            this.coverPicture = images[0].name;
            break;
          default:
            Array.from(images)
              .map((image: any) => {
                this.contentImages.push(image.name)
              })

            break;
        }
        this.loading = false;

      };
      // this.preview = reader.readAsDataURL(event.target.files[0]);
      this.images.emit({ 'type': type, 'files': images })
      reader.readAsArrayBuffer(event.target.files[0]);

    }
  }

}


