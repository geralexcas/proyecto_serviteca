import {Model, model, property} from '@loopback/repository';

@model()
export class Crdenciales extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<Crdenciales>) {
    super(data);
  }
}

export interface CrdencialesRelations {
  // describe navigational properties here
}

export type CrdencialesWithRelations = Crdenciales & CrdencialesRelations;
