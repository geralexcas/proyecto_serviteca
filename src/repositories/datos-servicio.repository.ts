import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {BaceproyectoDataSource} from '../datasources';
import {DatosServicio, DatosServicioRelations, Servicio, Veiculo, Administrador} from '../models';
import {ServicioRepository} from './servicio.repository';
import {VeiculoRepository} from './veiculo.repository';
import {AdministradorRepository} from './administrador.repository';

export class DatosServicioRepository extends DefaultCrudRepository<
  DatosServicio,
  typeof DatosServicio.prototype.id,
  DatosServicioRelations
> {

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof DatosServicio.prototype.id>;

  public readonly veiculo: BelongsToAccessor<Veiculo, typeof DatosServicio.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof DatosServicio.prototype.id>;

  constructor(
    @inject('datasources.baceproyecto') dataSource: BaceproyectoDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('VeiculoRepository') protected veiculoRepositoryGetter: Getter<VeiculoRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(DatosServicio, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.veiculo = this.createBelongsToAccessorFor('veiculo', veiculoRepositoryGetter,);
    this.registerInclusionResolver('veiculo', this.veiculo.inclusionResolver);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
