import { Pipe, PipeTransform } from '@angular/core';
import { Picture } from '../interfaces/pictures.interface'

@Pipe({
  name: 'url',
  //se invoca el método transform cada vez que el argumento cambia:
  //para que la imagen de la seccion actualizar cambie en cuanto incluyes la url y no haya que refrescar
  //pure:false lo comento, no me interesa que esté todo el rato escuchando cambios
})

export class UrlPipe implements PipeTransform {

  //recibe el heroe como parametro y devuelve la ruta de la imagen
  transform(picture: Picture): string {
    var rutaSerie = picture.serie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-");

    return rutaSerie;

  }

}
