import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

export interface DialogData {
  title: string;
}

@Component({
    selector: 'dialog-overview-example-dialog',
    styleUrls: ['confirm-password.component.css'],
    templateUrl: 'confirm-password.component.html',
  })
  export class DialogOverviewExampleDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }