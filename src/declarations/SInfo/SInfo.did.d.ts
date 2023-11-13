import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'actualizaDependencia' : ActorMethod<
    [Principal, string, string],
    { 'Ok' : Principal } |
      { 'Err' : { 'DependenciaNoExiste' : Principal } }
  >,
  'borraDependencia' : ActorMethod<
    [Principal],
    { 'Ok' : Principal } |
      { 'Err' : { 'DependenciaNoExiste' : Principal } }
  >,
  'crearDependencia' : ActorMethod<
    [string, string],
    {
      'idDependencia' : Principal,
      'usuario' : Principal,
      'secretaria' : string,
      'nombreDependencia' : string,
    }
  >,
  'crearSolicitud' : ActorMethod<
    [string, Principal],
    {
      'documentoAnexo' : string,
      'validador' : Principal,
      'descripcion' : string,
      'idDependencia' : Principal,
      'generador' : Principal,
      'mInfoPublica' : string,
      'infoPublica' : boolean,
      'solicitante' : Principal,
      'idSolicitud' : Principal,
    }
  >,
  'leerDependencia' : ActorMethod<
    [Principal],
    [] | [
      {
        'idDependencia' : Principal,
        'usuario' : Principal,
        'secretaria' : string,
        'nombreDependencia' : string,
      }
    ]
  >,
  'leerDependencias' : ActorMethod<
    [],
    Array<
      {
        'idDependencia' : Principal,
        'usuario' : Principal,
        'secretaria' : string,
        'nombreDependencia' : string,
      }
    >
  >,
  'leerSolicitud' : ActorMethod<
    [Principal],
    [] | [
      {
        'documentoAnexo' : string,
        'validador' : Principal,
        'descripcion' : string,
        'idDependencia' : Principal,
        'generador' : Principal,
        'mInfoPublica' : string,
        'infoPublica' : boolean,
        'solicitante' : Principal,
        'idSolicitud' : Principal,
      }
    ]
  >,
  'leerSolicitudes' : ActorMethod<
    [],
    Array<
      {
        'documentoAnexo' : string,
        'validador' : Principal,
        'descripcion' : string,
        'idDependencia' : Principal,
        'generador' : Principal,
        'mInfoPublica' : string,
        'infoPublica' : boolean,
        'solicitante' : Principal,
        'idSolicitud' : Principal,
      }
    >
  >,
  'responderSolicitud' : ActorMethod<
    [Principal, boolean, string, string],
    { 'Ok' : Principal } |
      { 'Err' : { 'SolicitudNoExiste' : Principal } }
  >,
  'validarRespuesta' : ActorMethod<
    [Principal],
    { 'Ok' : Principal } |
      { 'Err' : { 'SolicitudNoExiste' : Principal } }
  >,
}
