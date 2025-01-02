//PATRON REPOSITORIO
//esta interfaz va a contener los metodos del CRUD

export interface Repository<T = unknown> {
  create(data: T): Promise<T>;
  find(): Promise<T[]>; //retorna arreglo de users por eso []
  findById(id: string): Promise<T | null>;
  //Partial es un utilitario de TS que permite mandar parte de los datos
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
