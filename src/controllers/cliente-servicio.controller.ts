import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Servicio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteServicioController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/servicio', {
    responses: {
      '200': {
        description: 'Servicio belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async getServicio(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Servicio> {
    return this.clienteRepository.servicio(id);
  }
}
