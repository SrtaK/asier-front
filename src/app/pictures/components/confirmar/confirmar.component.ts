import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Picture } from '../../interfaces/pictures.interface';


@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  constructor(  private dialogRef:MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Picture ) { }

  ngOnInit(): void {
  //console.log(this.data)
  }


  borrar(){
  //cierra el diálogo confirmando los cambios
  this.dialogRef.close(true);
  }

  cerrar(){
  //cierra el diálogo sin borrar
  this.dialogRef.close();
}

}
