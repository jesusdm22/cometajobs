export class Usuario {

    constructor(
        public _id: string, 
        public nombre: string, 
        public login: string, 
        public password: string,
        public movil: string,
        public email: string,
        public biografia: string,
        public acceso: string,
        public imagen: string,
        public created_at: string,
        public gettoken: string
    ){}
}