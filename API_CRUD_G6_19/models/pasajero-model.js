"use strict"

var conn = require ("../config/db-connection"),
    PasajeroModel = () => {};

PasajeroModel.getAll = (cb) => conn.query("SELECT * FROM PASAJERO", cb);

PasajeroModel.getOne = (id, cb) => conn.query ("SELECT * FROM PASAJERO WHERE CODIGO_PASAJERO = $1", [id.codigo_pasajero], cb);

PasajeroModel.post = (data, cb) =>
            conn.query ("call public.sp_pasajero_insert ($1,$2,$3,$4,$5,$6,$7)",
            [
                data.codigo_pasajero,
                data.nombres,
                data.apellidos,
                data.fecha_de_registro,
                data.nacionalidad,
                data.numero_telefonico,
                data.email
            ],
            cb);

PasajeroModel.put = (data, cb) =>
            conn.query ("call public.sp_pasajero_update ($1,$2,$3,$4,$5,$6,$7)",
            [
                data.codigo_pasajero,
                data.nombres,
                data.apellidos,
                data.fecha_de_registro,
                data.nacionalidad,
                data.numero_telefonico,
                data.email
            ],
            cb);

PasajeroModel.delete = (id, cb) =>
    conn.query ("call public.sp_pasajero_delete ($1)", [id.codigo_pasajero], cb);

    module.exports = PasajeroModel;