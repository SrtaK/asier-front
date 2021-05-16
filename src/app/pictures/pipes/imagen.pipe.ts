import { Pipe, PipeTransform } from '@angular/core';
import { Picture } from '../interfaces/pictures.interface'

@Pipe({
  name: 'imagen',
  //se invoca el método transform cada vez que el argumento cambia:
  //para que la imagen de la seccion actualizar cambie en cuanto incluyes la url y no haya que refrescar
  //pure:false lo comento, no me interesa que esté todo el rato escuchando cambios
})

export class ImagenPipe implements PipeTransform {

  //recibe el heroe como parametro y devuelve la ruta de la imagen
  transform(picture: Picture): string {

    //cuando agregas un heroe
    if(!picture.imagen){
      return 'assets/pictures/no-image.jpg';
    }else if(picture.imagen){
      console.log('-', picture.imagen , '-');
      return picture.imagen;
    }else if(picture.imagen == ''){
      return 'assets/pictures/no-image.jpg';
    }
    return `assets/pictures/${picture.imagen}.jpg`;

  }

}
