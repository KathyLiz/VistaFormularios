import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponentComponent>) { }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }

}
