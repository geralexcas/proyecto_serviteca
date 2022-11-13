import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {DatosServicio} from './datos-servicio.model';
import {Cliente} from './cliente.model';

@model()
export class Veiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  year: string;

  @hasMany(() => DatosServicio)
  datosServicios: DatosServicio[];

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<Veiculo>) {
    super(data);
  }
}

export interface VeiculoRelations {
  // describe navigational properties here
}

export type VeiculoWithRelations = Veiculo & VeiculoRelations;
