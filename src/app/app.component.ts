import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutAlertComponent } from './logout-alert/logout-alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flight';
  visible: boolean;

  constructor(
    public dialog: MatDialog,
    private router:Router,
   ) 
  {
     this.visible = true; 
  }

  hidetoolbar() { this.visible = false; }

  showtoolbar() { this.visible = true; }

  Logout() {
    const dialogRef = this.dialog.open(LogoutAlertComponent, {
      width: '30%',
      height: '30%'
    });

    dialogRef.afterClosed().subscribe((dialogResult: boolean) => {
      if (dialogResult == true) {
        localStorage.removeItem('Token');
        localStorage.removeItem('Tokenadmin');
        this.router.navigate(['/']);
      }
    })
  }
}
