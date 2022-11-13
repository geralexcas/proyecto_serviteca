import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DatosServicio} from '../models';
import {DatosServicioRepository} from '../repositories';

export class DatosServicioController {
  constructor(
    @repository(DatosServicioRepository)
    public datosServicioRepository : DatosServicioRepository,
  ) {}

  @post('/datos-servicios')
  @response(200, {
    description: 'DatosServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(DatosServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosServicio, {
            title: 'NewDatosServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    datosServicio: Omit<DatosServicio, 'id'>,
  ): Promise<DatosServicio> {
    return this.datosServicioRepository.create(datosServicio);
  }

  @get('/datos-servicios/count')
  @response(200, {
    description: 'DatosServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DatosServicio) where?: Where<DatosServicio>,
  ): Promise<Count> {
    return this.datosServicioRepository.count(where);
  }

  @get('/datos-servicios')
  @response(200, {
    description: 'Array of DatosServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DatosServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DatosServicio) filter?: Filter<DatosServicio>,
  ): Promise<DatosServicio[]> {
    return this.datosServicioRepository.find(filter);
  }

  @patch('/datos-servicios')
  @response(200, {
    description: 'DatosServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosServicio, {partial: true}),
        },
      },
    })
    datosServicio: DatosServicio,
    @param.where(DatosServicio) where?: Where<DatosServicio>,
  ): Promise<Count> {
    return this.datosServicioRepository.updateAll(datosServicio, where);
  }

  @get('/datos-servicios/{id}')
  @response(200, {
    description: 'DatosServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DatosServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DatosServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<DatosServicio>
  ): Promise<DatosServicio> {
    return this.datosServicioRepository.findById(id, filter);
  }

  @patch('/datos-servicios/{id}')
  @response(204, {
    description: 'DatosServicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosServicio, {partial: true}),
        },
      },
    })
    datosServicio: DatosServicio,
  ): Promise<void> {
    await this.datosServicioRepository.updateById(id, datosServicio);
  }

  @put('/datos-servicios/{id}')
  @response(204, {
    description: 'DatosServicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() datosServicio: DatosServicio,
  ): Promise<void> {
    await this.datosServicioRepository.replaceById(id, datosServicio);
  }

  @del('/datos-servicios/{id}')
  @response(204, {
    description: 'DatosServicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.datosServicioRepository.deleteById(id);
  }
}
