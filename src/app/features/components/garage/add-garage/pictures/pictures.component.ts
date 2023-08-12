import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import Garage from 'src/app/features/interfaces/Garage/garage.interface';
import { Image } from 'src/app/shared/interfaces/Images/image';
import { ImageService } from 'src/app/shared/services/Images/image.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class PicturesComponent implements OnInit {
  @Input() data: Garage;
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
  constructor(private parent: FormGroupDirective, private fb: FormBuilder, private imageService: ImageService) { }
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
    if (this.data) {
      this.coverPicture = this.data.cover.original_name;
    }
  }
  get f() {
    return (this.parentForm.get('pictures') as FormGroup).controls;
  }
  ngOnChanges(change: SimpleChanges) {
    if (change['data'] && this.data) {
      this.coverPicture = this.data.cover.original_name;
      this.data.content?.map((image: Image) => this.contentImages.push(image.original_name));
      this.profilePicture = this.data.profile.original_name
    }
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
  removeImage(type: string, contentImgName: string) {
    switch (type) {
      case 'cover':
        if (this.data.cover) {
          console.log(this.data.cover);
          this.imageService.removeImage(this.data.cover.id).subscribe((response:any)=>{
            console.log(response.data);
          })
        }
        this.coverPicture = '';
        break;
      case 'profile':
        if (this.data.profile) {
          this.imageService.removeImage(this.data.profile.id)
        }
        this.profilePicture = '';
        break;
      case 'content':
        if (this.data.content) {
          const image = (this.data.content?.find((image: Image) => image.original_name == contentImgName));
          if (typeof image == 'object') {
            const id = Number((image as Image).id);
            this.imageService.removeImage(id).subscribe((response: any) => {
              console.log(response);
            });
          }
        }
        let idx = this.contentImages.indexOf(contentImgName);
        console.log(idx);
        this.contentImages.splice(idx, 1);
        break;
    }
  }

}


