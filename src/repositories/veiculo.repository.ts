import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {BaceproyectoDataSource} from '../datasources';
import {Veiculo, VeiculoRelations, DatosServicio, Cliente} from '../models';
import {DatosServicioRepository} from './datos-servicio.repository';
import {ClienteRepository} from './cliente.repository';

export class VeiculoRepository extends DefaultCrudRepository<
  Veiculo,
  typeof Veiculo.prototype.id,
  VeiculoRelations
> {

  public readonly datosServicios: HasManyRepositoryFactory<DatosServicio, typeof Veiculo.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Veiculo.prototype.id>;

  constructor(
    @inject('datasources.baceproyecto') dataSource: BaceproyectoDataSource, @repository.getter('DatosServicioRepository') protected datosServicioRepositoryGetter: Getter<DatosServicioRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Veiculo, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.datosServicios = this.createHasManyRepositoryFactoryFor('datosServicios', datosServicioRepositoryGetter,);
    this.registerInclusionResolver('datosServicios', this.datosServicios.inclusionResolver);
  }
}
