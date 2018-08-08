import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponentComponent implements OnInit {

  mensaje: string;
  constructor(private dialogRef: MatDialogRef<DialogComponentComponent>,  @Inject(MAT_DIALOG_DATA) data) {
    this.mensaje = data.mensaje;
   }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }

}
