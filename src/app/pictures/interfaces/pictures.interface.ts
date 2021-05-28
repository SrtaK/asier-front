export interface PictureResp {
  ok:       boolean;
  pictures: ReqPicture[];
}

export interface OnePictureResp {
  ok:      boolean;
  picture: Picture;
}

interface ReqPicture {
  _id:        string;
  nombre:     string;
  annio:      string;
  imagen:     string;
  serie:      string;
  medidas:    string;
  tecnica:    string;
  soporte:    string;
  disponible: boolean;
  precio:     string;
  __v:        number;
}

export interface Picture {
  _id?:        string;
  nombre:     string;
  annio:      string;
  imagen:     string;
  serie:      string;
  medidas:    string;
  tecnica:    string;
  soporte:    string;
  disponible: boolean;
  precio:     string;
  __v?:        number;
}

export interface SerieForm{
  id: string;
  desc: string;

}

export enum Serie{
  ElCuerpoOrografico = "El cuerpo orográfico",
  WWI = "WWI",
  NosotrosLosPueblos = "Nosotros los pueblos",
  LasFormasDelDesnudo = "Las formas del desnudo"



}