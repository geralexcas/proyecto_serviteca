import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {Llaves} from '../config/llaves';

const config = {
  name: 'baceproyecto',
  connector: 'mongodb',
  url: `${Llaves.cadenaConexion}`,
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BaceproyectoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'baceproyecto';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.baceproyecto', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
