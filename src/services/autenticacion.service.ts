import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Administrador} from '../models';
import {AdministradorRepository} from '../repositories';

const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository
  ) { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }
  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
  Identificaradministrador(usuario: string, clave: string) { /*parametros*/
    try {
      let p = this.administradorRepository.findOne({ /*llmamos am metodo findOne*/
        where: {
          correo: usuario,
          clave: clave
        }
      });
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }
  GenerarTokenJWT(administrador: Administrador) {
    let token = jwt.sign({
      data: {
        id: administrador.id,
        correo: administrador.correo,
        nombres: administrador.nombres + " " + administrador.nombres
      }
    },
      Llaves.llaveJWT);
    return token;
  }
  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.llaveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}

