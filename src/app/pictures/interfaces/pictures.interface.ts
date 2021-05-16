export interface PictureResp {
  ok:       boolean;
  pictures: ReqPicture[];
}

export interface Picture {
  _id:        string;
  nombre:     string;
  annio:      string;
  imagen:     string;
  serie:      string;
  medidas:    string;
  tecnica:    string;
  soporte:    string;
  disponible: boolean;
  precio:     number;
  __v:        number;
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
  precio:     number;
  __v:        number;
}

export interface OnePictureResp {
  ok:      boolean;
  picture: Picture;
}

