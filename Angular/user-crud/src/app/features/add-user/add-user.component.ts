import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean = false;
  allowedFilesString = "'jpg', 'jpeg', 'png'";
  acceptedFileTypes = ['image/jpeg',
    'image/jpg',
    'image/png',
  ];
  transfer_confirmation: any = [];
  acceptedFileExtensionsMessage = '\'jpg\', \'jpeg\', \'png\'';
  isTransferFileSelected = false;
  selected_transfer_confirmation:any;

  @Output() userAdd: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      first_name: new FormControl('', [Validators.required,]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern(environment.email)]),
      phone_no: new FormControl('', [Validators.required, Validators.maxLength(10),Validators.pattern(environment.mobile_number)]
      )
    });
  }

  fileInput(event:any) {
    const response = this.fileUploadValidations(event, this.acceptedFileTypes, this.transfer_confirmation, this.acceptedFileExtensionsMessage);
    if (response.alerts) {
      if (response.alerts.status === 0) {
        alert(response.alerts.message);
      } else {
        alert(response.alerts.message);
      }
    }
    if (response.files) {
      this.transfer_confirmation = response.files;
    }
    event.srcElement.value = null;
    this.fileMaker();
    console.log('file name', this.transfer_confirmation);
  }

  fileMaker() {
    if (this.transfer_confirmation.length === 0) {
      this.isTransferFileSelected = false;
      // this.podTitle = languageLables.lbl_choose_a_file;
    } else {
      if (this.transfer_confirmation.length > 1) {
        this.transfer_confirmation.shift();
      }
      this.isTransferFileSelected = true;
      this.selected_transfer_confirmation = this.transfer_confirmation[0].name;
    }
  }

  fileUploadValidations(event: any, acceptedFileTypes: any, filesList: any, acceptedFileExtensionsMessage ?: any) {
    const temp: FileList = event.target.files;
    let acceptedFileTypeMessage = acceptedFileExtensionsMessage;
    let files: any = [];
    const filesArray: any = [];
    if (filesList && filesList.length > 0 ) {
      files.push(...filesList);
      for (let i = 0; i < temp.length; i++) {
        files.push(temp[i]);
      }
    } else {
      files = temp;
    }
    const  limit = 5 * 1024 * 1024;
    const fileArray = [];
    let errorObject: any;
    const rejectedFileArray: any = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        filesArray.push(files[i]);
        if (filesArray.length < 6 || fileArray.length < 5) {
          const fileSize = filesArray[i].size;
          if (acceptedFileTypes.indexOf(filesArray[i].type) === -1) {
            if (filesArray[i].type !== '') {
              rejectedFileArray.push(filesArray[i].type);
            } else {
              let data = acceptedFileTypeMessage;
              errorObject = {
                status: 0,
                message: ` Invalid File Format`
              };
              continue;
            }
          } else {
            if (fileSize > limit) {
              errorObject = {
                status: 0,
                message: 'Max file size to upload is 5MB.'
              };
              continue;
            } else {
              fileArray.push(filesArray[i]);
            }
          }
        } else {
          errorObject = {
            status: 0,
            message: 'Maximum 5 files can be uploaded.'
          };
        }
      }
    }
    if (rejectedFileArray.length > 0) {
      let data = '';
      const varType: any =  typeof  acceptedFileTypeMessage;
      if (varType !== 'string') {
        acceptedFileTypeMessage.forEach((element :any , index :any) => {
          const type = element.split('/');
          if (index !== (acceptedFileTypeMessage.length - 1 )) {
            data = data.concat(type[1]).concat(' , ');
          } else {
            data = data.concat(type[1]);
          }
        });
      } else {
        data = acceptedFileTypeMessage;
      }
  
      errorObject = {
        status: 0,
        message: ` Invalid File Format`
      };
    }
    return {
      files: fileArray,
      alerts: errorObject,
    };
  }

  submit() {
    this.submitted = true
    console.log(this.userForm.value)
    if (this.userForm.valid && this.isTransferFileSelected) {
      this.submitted = false;
      const formData = new FormData();
      formData.append('profile_image', this.transfer_confirmation[0], this.transfer_confirmation[0].name);
      formData.append('data', JSON.stringify(this.userForm.value));
      this.userAdd.emit(formData);
    }
  }

}
