export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'actualizaDependencia' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Principal,
            'Err' : IDL.Variant({ 'DependenciaNoExiste' : IDL.Principal }),
          }),
        ],
        [],
      ),
    'borraDependencia' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Variant({
            'Ok' : IDL.Principal,
            'Err' : IDL.Variant({ 'DependenciaNoExiste' : IDL.Principal }),
          }),
        ],
        [],
      ),
    'crearDependencia' : IDL.Func(
        [IDL.Text, IDL.Text],
        [
          IDL.Record({
            'idDependencia' : IDL.Principal,
            'usuario' : IDL.Principal,
            'secretaria' : IDL.Text,
            'nombreDependencia' : IDL.Text,
          }),
        ],
        [],
      ),
    'crearSolicitud' : IDL.Func(
        [IDL.Text, IDL.Principal],
        [
          IDL.Record({
            'documentoAnexo' : IDL.Text,
            'validador' : IDL.Principal,
            'descripcion' : IDL.Text,
            'idDependencia' : IDL.Principal,
            'generador' : IDL.Principal,
            'mInfoPublica' : IDL.Text,
            'infoPublica' : IDL.Bool,
            'solicitante' : IDL.Principal,
            'idSolicitud' : IDL.Principal,
          }),
        ],
        [],
      ),
    'leerDependencia' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Opt(
            IDL.Record({
              'idDependencia' : IDL.Principal,
              'usuario' : IDL.Principal,
              'secretaria' : IDL.Text,
              'nombreDependencia' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'leerDependencias' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'idDependencia' : IDL.Principal,
              'usuario' : IDL.Principal,
              'secretaria' : IDL.Text,
              'nombreDependencia' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'leerSolicitud' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Opt(
            IDL.Record({
              'documentoAnexo' : IDL.Text,
              'validador' : IDL.Principal,
              'descripcion' : IDL.Text,
              'idDependencia' : IDL.Principal,
              'generador' : IDL.Principal,
              'mInfoPublica' : IDL.Text,
              'infoPublica' : IDL.Bool,
              'solicitante' : IDL.Principal,
              'idSolicitud' : IDL.Principal,
            })
          ),
        ],
        ['query'],
      ),
    'leerSolicitudes' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'documentoAnexo' : IDL.Text,
              'validador' : IDL.Principal,
              'descripcion' : IDL.Text,
              'idDependencia' : IDL.Principal,
              'generador' : IDL.Principal,
              'mInfoPublica' : IDL.Text,
              'infoPublica' : IDL.Bool,
              'solicitante' : IDL.Principal,
              'idSolicitud' : IDL.Principal,
            })
          ),
        ],
        ['query'],
      ),
    'responderSolicitud' : IDL.Func(
        [IDL.Principal, IDL.Bool, IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Principal,
            'Err' : IDL.Variant({ 'SolicitudNoExiste' : IDL.Principal }),
          }),
        ],
        [],
      ),
    'validarRespuesta' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Variant({
            'Ok' : IDL.Principal,
            'Err' : IDL.Variant({ 'SolicitudNoExiste' : IDL.Principal }),
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
