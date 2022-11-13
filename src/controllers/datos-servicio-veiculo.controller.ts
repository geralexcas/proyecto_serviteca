import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DatosServicio,
  Veiculo,
} from '../models';
import {DatosServicioRepository} from '../repositories';

export class DatosServicioVeiculoController {
  constructor(
    @repository(DatosServicioRepository)
    public datosServicioRepository: DatosServicioRepository,
  ) { }

  @get('/datos-servicios/{id}/veiculo', {
    responses: {
      '200': {
        description: 'Veiculo belonging to DatosServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veiculo)},
          },
        },
      },
    },
  })
  async getVeiculo(
    @param.path.string('id') id: typeof DatosServicio.prototype.id,
  ): Promise<Veiculo> {
    return this.datosServicioRepository.veiculo(id);
  }
}
