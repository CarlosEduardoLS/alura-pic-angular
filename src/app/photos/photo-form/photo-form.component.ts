import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  photoForm: FormGroup;
  file: File;
  preview: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router
  ) {
    this.photoForm = formBuilder.group({});
    this.file = new File([], '');
  }

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  fileUpload(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target?.result);
    reader.readAsDataURL(this.file);
  }

  upload() {
    const description = this.photoForm.get('description')!.value;
    const allowComments = this.photoForm.get('allowComments')!.value;
    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => this.router.navigate(['']));
  }
}
