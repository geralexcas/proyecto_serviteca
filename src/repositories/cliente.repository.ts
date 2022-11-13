import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {BaceproyectoDataSource} from '../datasources';
import {Cliente, ClienteRelations, Servicio, Veiculo} from '../models';
import {ServicioRepository} from './servicio.repository';
import {VeiculoRepository} from './veiculo.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly servicio: BelongsToAccessor<Servicio, typeof Cliente.prototype.id>;

  public readonly veiculos: HasManyRepositoryFactory<Veiculo, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.baceproyecto') dataSource: BaceproyectoDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('VeiculoRepository') protected veiculoRepositoryGetter: Getter<VeiculoRepository>,
  ) {
    super(Cliente, dataSource);
    this.veiculos = this.createHasManyRepositoryFactoryFor('veiculos', veiculoRepositoryGetter,);
    this.registerInclusionResolver('veiculos', this.veiculos.inclusionResolver);
    this.servicio = this.createBelongsToAccessorFor('servicio', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
  }
}
