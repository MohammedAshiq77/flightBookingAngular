import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-alert',
  templateUrl: './logout-alert.component.html',
  styleUrls: ['./logout-alert.component.scss']
})
export class LogoutAlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LogoutAlertComponent) { }

  ngOnInit(): void {
  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
