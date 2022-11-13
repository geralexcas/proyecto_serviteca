import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Veiculo,
  Cliente,
} from '../models';
import {VeiculoRepository} from '../repositories';

export class VeiculoClienteController {
  constructor(
    @repository(VeiculoRepository)
    public veiculoRepository: VeiculoRepository,
  ) { }

  @get('/veiculos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Veiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Veiculo.prototype.id,
  ): Promise<Cliente> {
    return this.veiculoRepository.cliente(id);
  }
}
