import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgxUiLoaderBlurredDirective, NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategoryComponent } from '../dialog/category/category.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns:string[]=['name','edit'];
  dataSource:any;
  responseMessage:any;
  constructor(private categoryService:CategoryService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router){}
  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
      
  }
  tableData(){
    this.categoryService.getCategory().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource=new MatTableDataSource(response);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage=error.error?.messag;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    
  }
  handleAddAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    };
    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub =dialogRef.componentInstance.onAddCategory.subscribe((response)=>{
      this.tableData();
    })
    
  }
  handleEditAction(values:any){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:values
    };
    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub =dialogRef.componentInstance.onAddCategory.subscribe((response)=>{
      this.tableData();
    })

  }
  


}