//esta interfaz va a contener los metodos del CRUD

export interface Repository<T = unknown> {
  create(data: T): Promise<T>;
  find(): Promise<T[]>; //retorna arreglo de users por eso []
}
