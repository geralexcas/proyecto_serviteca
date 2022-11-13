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
  Administrador,
} from '../models';
import {DatosServicioRepository} from '../repositories';

export class DatosServicioAdministradorController {
  constructor(
    @repository(DatosServicioRepository)
    public datosServicioRepository: DatosServicioRepository,
  ) { }

  @get('/datos-servicios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to DatosServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof DatosServicio.prototype.id,
  ): Promise<Administrador> {
    return this.datosServicioRepository.administrador(id);
  }
}
