import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  oldPassword=true;
  newPassword=true;
  confirmPassword=true;
  changePasswordForm:any=FormGroup;
  responseMessage:any;
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    public dialogRef:MatDialogRef<ChangePasswordComponent>,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService
  ){}
  ngOnInit(): void {
    this.changePasswordForm=this.formBuilder.group({
      oldPassword:[null,Validators.required],
      newPassword:[null,Validators.required],
      confirmPassword:[null,Validators.required],

    })
      
  }
  validateSubmit(){
    if(this.changePasswordForm.controls['newPassword'].value!=this.changePasswordForm.controls['confirmPassword'].value){
      return true;
    }else{
      return false;
    }
  }
  handlepasswordChangeSubmit(){
    this.ngxService.start();
    var formData = this.changePasswordForm.value;
    var data={
      oldPassword:formData.oldPassword,
      newPassword:formData.newPassword,
      confirmPassword:formData.confirmPassword
    }
    this.userService.changePassword(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      console.log(error);
      this.ngxService.stop();
      if(error.erro?.message){
        this.responseMessage=error.erro?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })

  }

}
