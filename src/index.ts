import {
    bool,
    Canister,
    blob,
    Opt,
    query,
    StableBTreeMap,
    text,
    update,
    Principal,
    Record,
    Vec,
    Variant,
    ic,
    Result,
    Err,
    Ok
} from 'azle';

const Dependencia=Record({
    idDependencia: Principal,
    usuario: Principal,
    nombreDependencia: text,
    secretaria: text,
});

const Solicitud=Record({
    solicitante: Principal,
    idSolicitud: Principal,
    descripcion: text,
    idDependencia: Principal,
    infoPublica: bool,
    mInfoPublica: text,
    respuesta: text, //se definio texto al no poder integrar un blob nullo
    generador: Principal,
    validador: Principal,
});

const DependenciaError=Variant({
    DependenciaNoExiste: Principal,
});

const SolicitudError=Variant({
    SolicitudNoExiste: Principal,
});

// Estas son las variables estables para mantener a lo largo del tiempo
let solicitudes = StableBTreeMap(Principal, Solicitud, 0);
let dependencias = StableBTreeMap(Principal, Dependencia, 0);

let message =" ";

export default Canister({
    crearDependencia: update([text, text],Dependencia,
        (nombreDependencia, secretaria) => {
            const id=generaIdDependencia();
            const dependencia: typeof Dependencia = {
                idDependencia:id,
                usuario: ic.caller(),
                nombreDependencia,
                secretaria,
            };
        dependencias.insert(id,dependencia);
        return dependencia
        }),
    
    leerDependencias: query ([],Vec(Dependencia),()=>{
        return dependencias.values()
    }),

    leerDependencia: query([Principal],Opt(Dependencia),(id)=>{
        return dependencias.get(id)
    }),   

    actualizaDependencia: update([Principal, text,text], Result (Principal, DependenciaError), (idDependencia,nombreDependencia, secretaria) => {
        
        const DependenciaOpt = dependencias.get(idDependencia);

        if ('None' in DependenciaOpt) {
            return Err({
                DependenciaNoExiste: idDependencia
            });
        }

        const nuevaDependencia: typeof Dependencia = {
            idDependencia: idDependencia,
            usuario: ic.caller(),
            nombreDependencia,
            secretaria
        };

        dependencias.insert(idDependencia, nuevaDependencia);

        return Ok(idDependencia);
    }),
 
    borraDependencia: update([Principal], Result(Principal, DependenciaError), (idDependencia) => {
        const DependenciaOpt = dependencias.get(idDependencia);

        if ('None' in DependenciaOpt) {
            return Err({
                DependenciaNoExiste: idDependencia
            });
        }
        dependencias.remove(idDependencia);
        
        return Ok(idDependencia);
    }),

    crearSolicitud: update([text, Principal],Solicitud,
        (descripcion, idDependencia) => {
            const id=generaIdSolicitud();
            const solicitud: typeof Solicitud = {
                solicitante: ic.caller(),
                idSolicitud: id,
                descripcion: descripcion,
                idDependencia: idDependencia,
                infoPublica: false,
                mInfoPublica: " ",
                respuesta: " ",
                generador:   ic.caller(),
                validador: ic.caller()

            };
        solicitudes.insert(id,solicitud);
        return solicitud
        }),

    leerSolicitudes: query ([],Vec(Solicitud),()=>{
        return solicitudes.values();
    }),
   
    leerSolicitud: query([Principal],Opt(Solicitud),(id)=>{
        return solicitudes.get(id)
    }),

 
    
    responderSolicitud: update([Principal, bool,text,text], Result (Principal, SolicitudError), (idSolicitud, infoPublica, mInfoPublica, respuesta) => {
        
        const SolicitudOpt = solicitudes.get(idSolicitud);

        if ('None' in SolicitudOpt) {
            return Err({
                SolicitudNoExiste: idSolicitud
            });
        }

       const Solicitul = SolicitudOpt.Some;

       if(Solicitul.solicitante==Solicitul.generador){} //Esta línea verificaria que la solicitud no hubiese sido contestada

       const nuevaSolicitud: typeof Dependencia = {
                ...Solicitul,
                infoPublica,
                mInfoPublica,
                respuesta,
                generador: ic.caller(),
                validador: ic.caller()
        };

        solicitudes.insert(idSolicitud, nuevaSolicitud);

        return Ok(idSolicitud);
    }),
    validarRespuesta: update([Principal], Result (Principal, SolicitudError), (idSolicitud) => {
        
        const SolicitudOpt = solicitudes.get(idSolicitud);

         if ('None' in SolicitudOpt) {
            return Err({
                SolicitudNoExiste: idSolicitud
            });
        }

        const Solicitul = SolicitudOpt.Some;
        if(Solicitul.validador!=Solicitul.generador){}//Esta línea verificaria que la solicitud no hubiese sido verificada

      const nuevaSolicitud: typeof Solicitud = {
            ...Solicitul,
            validador: ic.caller()
    };

       solicitudes.insert(idSolicitud, nuevaSolicitud);

      return Ok(idSolicitud);
    }),


});

//Funciones privadas solo para consumo dentro del canister
function generaIdSolicitud(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}

function generaIdDependencia(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}