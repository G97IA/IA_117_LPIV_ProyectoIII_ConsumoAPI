"use strict"

var VueloModel = require ('../models/vuelo-model'),
VueloController = () => {}

VueloController.getAll = (req, res, next) => { 
    VueloModel.getAll ((err, rows) => {
        if (err)
        {
            let locals = {
            tittle : 'Error al consultar la base de datos',
            description : 'Error de sintaxis SQL',
            error : err
            }
            res.render ('error', locals)
        }
        else
        {
            let locals = {
            title : 'Lista de Vuelos',
            data : rows
            }
            res.status(200).send(rows.rows)
        }         
    }) 
}   

VueloController.getOne = (req, res, next) => {
    let RetornarVuelo = {
        codigo_vuelo : req.body.codigo_vuelo
    } 
    console.log(RetornarVuelo)
    VueloModel.getOne (RetornarVuelo, (err, rows) => {
        if (err)
        {
            let locals = {
            tittle : 'Error al consultar la base de datos',
            description : 'Error de sintaxis SQL',
            error : err
            }
            res.render ('error', locals)
        }
        else
        {
            let locals = {
            title : 'Vuelo Seleccionado',
            data : rows
            }
            res.status(200).send(rows.rows)
        }         
    })
}

VueloController.post = (req, res, next) => {
    let vuelo = {
        codigo_vuelo : req.body.codigo_vuelo,
        ciudad_origen  : req.body.ciudad_origen,
        ciudad_destino  : req.body.ciudad_destino,
        fecha_vuelo  : req.body.fecha_vuelo,
        cantidad_pasajeros  : req.body.cantidad_pasajeros,
        tipo_avion  : req.body.tipo_avion,
        distancia_km  : req.body.distancia_km
    }
    console.log(vuelo)

    VueloModel.post(vuelo, (err) => {
        if (err)
        {
            let locals = {
                title : `Error al salvar el registro con el id: ${vuelo.codigo_vuelo}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Codigo de vuelo ingresado de forma correcta')
        }
    })
}
VueloController.put = (req, res, next) => {
    let vuelo = {
        codigo_vuelo : req.body.codigo_vuelo,
        ciudad_origen : req.body.ciudad_origen,
        ciudad_destino  : req.body.ciudad_destino,
        fecha_vuelo  : req.body.fecha_vuelo,
        cantidad_pasajeros  : req.body.cantidad_pasajeros,
        tipo_avion  : req.body.tipo_avion,
        distancia_km  : req.body.distancia_km
    }
    console.log(vuelo)

    VueloModel.put(vuelo, (err) => {
        if (err)
        {
            let locals = {
                title : `Error al salvar el registro con el id: ${vuelo.codigo_vuelo}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Codigo de vuelo actualizado de forma correcta')
        }
    })
}

VueloController.delete = (req, res, next) => {
    let VueloEliminar = {
        codigo_vuelo : req.body.codigo_vuelo
    }
    console.log(VueloEliminar)

    VueloModel.delete (VueloEliminar, (err, rows) => {
        console.log(err, '---', rows)
        if (err)
        {
            let locals = {
                title : `Error al eliminar el registro con el id: ${codigo_vuelo}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Codigo de vuelo eliminado de forma correcta')
        }
    })
}

VueloController.addForm = (req, res, next) => 
res.render('add-vuelo', { title : 'Agregar Vuelo' })

VueloController.error404 = (req, res, next) => {
    
    let error = new Error(),
    locals = {
    title : 'Error 404',
    description : 'Recurso No Encontrado',
    error : error 
    }

    error.status = 404

    res.render('error', locals)

    next()
}

module.exports = VueloController;