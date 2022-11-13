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
  Administrador,
  DatosServicio,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorDatosServicioController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Array of Administrador has many DatosServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DatosServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DatosServicio>,
  ): Promise<DatosServicio[]> {
    return this.administradorRepository.datosServicios(id).find(filter);
  }

  @post('/administradors/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(DatosServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosServicio, {
            title: 'NewDatosServicioInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) datosServicio: Omit<DatosServicio, 'id'>,
  ): Promise<DatosServicio> {
    return this.administradorRepository.datosServicios(id).create(datosServicio);
  }

  @patch('/administradors/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Administrador.DatosServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosServicio, {partial: true}),
        },
      },
    })
    datosServicio: Partial<DatosServicio>,
    @param.query.object('where', getWhereSchemaFor(DatosServicio)) where?: Where<DatosServicio>,
  ): Promise<Count> {
    return this.administradorRepository.datosServicios(id).patch(datosServicio, where);
  }

  @del('/administradors/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Administrador.DatosServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DatosServicio)) where?: Where<DatosServicio>,
  ): Promise<Count> {
    return this.administradorRepository.datosServicios(id).delete(where);
  }
}
