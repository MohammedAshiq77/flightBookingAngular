import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-alert',
  templateUrl: './common-alert.component.html',
  styleUrls: ['./common-alert.component.scss']
})
export class CommonAlertComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CommonAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommonAlertComponent,
  ) { }

  ngOnInit(): void {
  }
  
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
