import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {BaceproyectoDataSource} from '../datasources';
import {Administrador, AdministradorRelations, DatosServicio} from '../models';
import {DatosServicioRepository} from './datos-servicio.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly datosServicios: HasManyRepositoryFactory<DatosServicio, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.baceproyecto') dataSource: BaceproyectoDataSource, @repository.getter('DatosServicioRepository') protected datosServicioRepositoryGetter: Getter<DatosServicioRepository>,
  ) {
    super(Administrador, dataSource);
    this.datosServicios = this.createHasManyRepositoryFactoryFor('datosServicios', datosServicioRepositoryGetter,);
    this.registerInclusionResolver('datosServicios', this.datosServicios.inclusionResolver);
  }
}
