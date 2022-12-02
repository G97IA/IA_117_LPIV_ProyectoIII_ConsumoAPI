"use strict";

var conn = require ("../config/db-connection"),
    VueloModel = () => {};

VueloModel.getAll = (cb) => conn.query("SELECT * FROM VUELO", cb);

VueloModel.getOne = (id, cb) => conn.query ("SELECT * FROM VUELO WHERE CODIGO_VUELO = $1", [id.codigo_vuelo], cb);

VueloModel.post = (data, cb) =>
            conn.query ("call public.sp_vuelo_insert ($1,$2,$3,$4,$5,$6,$7)",
            [
                data.codigo_vuelo,
                data.ciudad_origen,
                data.ciudad_destino,
                data.fecha_vuelo,
                data.cantidad_pasajeros,
                data.tipo_avion,
                data.distancia_km
            ],
            cb);

VueloModel.put = (data, cb) =>
            conn.query ("call public.sp_vuelo_update ($1,$2,$3,$4,$5,$6,$7)",
            [
                data.codigo_vuelo,
                data.ciudad_origen,
                data.ciudad_destino,
                data.fecha_vuelo,
                data.cantidad_pasajeros,
                data.tipo_avion,
                data.distancia_km
            ],
            cb);

VueloModel.delete = (id, cb) =>
    conn.query ("call public.sp_vuelo_delete ($1)", [id.codigo_vuelo], cb);

    module.exports = VueloModel;