export class Oferta {

    constructor(
        public _id: string, 
        public titulo: string, 
        public descripcion: string, 
        public experiencia: string,
        public sueldo: string,
        public ubicacion: string,
        public created_at: string,
        public empresa: string
    ){}
}