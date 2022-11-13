import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Servicio} from './servicio.model';
import {Veiculo} from './veiculo.model';
import {Administrador} from './administrador.model';

@model()
export class DatosServicio extends Entity {
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
  codigo_servicio: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion_cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  placa_carro: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_servicio: string;

  @property({
    type: 'string',
    required: true,
  })
  valor_servicio: string;

  @hasMany(() => Servicio)
  servicios: Servicio[];

  @belongsTo(() => Veiculo)
  veiculoId: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  constructor(data?: Partial<DatosServicio>) {
    super(data);
  }
}

export interface DatosServicioRelations {
  // describe navigational properties here
}

export type DatosServicioWithRelations = DatosServicio & DatosServicioRelations;
