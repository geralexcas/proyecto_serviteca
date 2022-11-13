import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  DatosServicio,
  Servicio,
} from '../models';
import {DatosServicioRepository} from '../repositories';

export class DatosServicioServicioController {
  constructor(
    @repository(DatosServicioRepository) protected datosServicioRepository: DatosServicioRepository,
  ) { }

  @get('/datos-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of DatosServicio has many Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.datosServicioRepository.servicios(id).find(filter);
  }

  @post('/datos-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'DatosServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DatosServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInDatosServicio',
            exclude: ['id'],
            optional: ['datosServicioId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.datosServicioRepository.servicios(id).create(servicio);
  }

  @patch('/datos-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'DatosServicio.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.datosServicioRepository.servicios(id).patch(servicio, where);
  }

  @del('/datos-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'DatosServicio.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.datosServicioRepository.servicios(id).delete(where);
  }
}
