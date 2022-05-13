import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
  public disabled: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AlertMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { dialogRef.disableClose = true; }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();

  }
}
