import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BaceproyectoDataSource} from '../datasources';
import {Servicio, ServicioRelations} from '../models';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {
  constructor(
    @inject('datasources.baceproyecto') dataSource: BaceproyectoDataSource,
  ) {
    super(Servicio, dataSource);
  }
}
