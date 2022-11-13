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
  Veiculo,
  DatosServicio,
} from '../models';
import {VeiculoRepository} from '../repositories';

export class VeiculoDatosServicioController {
  constructor(
    @repository(VeiculoRepository) protected veiculoRepository: VeiculoRepository,
  ) { }

  @get('/veiculos/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Array of Veiculo has many DatosServicio',
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
    return this.veiculoRepository.datosServicios(id).find(filter);
  }

  @post('/veiculos/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Veiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(DatosServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosServicio, {
            title: 'NewDatosServicioInVeiculo',
            exclude: ['id'],
            optional: ['veiculoId']
          }),
        },
      },
    }) datosServicio: Omit<DatosServicio, 'id'>,
  ): Promise<DatosServicio> {
    return this.veiculoRepository.datosServicios(id).create(datosServicio);
  }

  @patch('/veiculos/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Veiculo.DatosServicio PATCH success count',
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
    return this.veiculoRepository.datosServicios(id).patch(datosServicio, where);
  }

  @del('/veiculos/{id}/datos-servicios', {
    responses: {
      '200': {
        description: 'Veiculo.DatosServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DatosServicio)) where?: Where<DatosServicio>,
  ): Promise<Count> {
    return this.veiculoRepository.datosServicios(id).delete(where);
  }
}
