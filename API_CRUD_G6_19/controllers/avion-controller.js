"use strict"

var AvionModel = require ('../models/avion-model'),
AvionController = () => {}

AvionController.getAll = (req, res, next) => { 
    AvionModel.getAll ((err, rows) => {
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
            title : 'Lista de aviones',
            data : rows
            }
            res.status(200).send(rows.rows)
        }         
    }) 
}   

AvionController.getOne = (req, res, next) => {
    let avion = {
        numero_avion : req.body.numero_avion
    }
    console.log(avion)

    AvionModel.getOne (avion, (err, rows) => {
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
            title : 'Avion',
            data : rows
            }
            res.status(200).send(rows.rows)
        }         
    })
}

AvionController.post = (req, res, next) => {
    let avion = {
        numero_avion : req.body.numero_avion,
        tipo_avion  : req.body.tipo_avion,
        horas_de_vuelo  : req.body.horas_de_vuelo,
        capacidad_de_pasajeros  : req.body.capacidad_de_pasajeros,
        fecha_primer_vuelo  : req.body.fecha_primer_vuelo,
        pais_de_construccion  : req.body.pais_de_construccion,
        cantidad_de_vuelos  : req.body.cantidad_de_vuelos
    }
    console.log(avion)

    AvionModel.post(avion, (err) => {
        if (err)
        {
            let locals = {
                title : `Error al salvar el registro con el id: ${avion.numero_avion}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Avion ingresado de forma correcta')
        }
    })
}
AvionController.put = (req, res, next) => {
    let avion = {
        numero_avion : req.body.numero_avion,
        tipo_avion  : req.body.tipo_avion,
        horas_de_vuelo  : req.body.horas_de_vuelo,
        capacidad_de_pasajeros  : req.body.capacidad_de_pasajeros,
        fecha_primer_vuelo  : req.body.fecha_primer_vuelo,
        pais_de_construccion  : req.body.pais_de_construccion,
        cantidad_de_vuelos  : req.body.cantidad_de_vuelos
    }
    console.log(avion)

    AvionModel.put(avion, (err) => {
        if (err)
        {
            let locals = {
                title : `Error al salvar el registro con el id: ${avion.numero_avion}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Avion actualizado de forma correcta')
        }
    })
}

AvionController.delete = (req, res, next) => {
    let avion = {
        numero_avion : req.body.numero_avion
    }
    console.log(avion)
    
    AvionModel.delete (avion, (err, rows) => {
        console.log(err, '---', rows)
        if (err)
        {
            let locals = {
                title : `Error al eliminar el registro con el id: ${numero_avion}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Avion eliminado de forma correcta')
        }
    })
}

AvionController.addForm = (req, res, next) => 
res.render('add-avion', { title : 'Agregar Avion' })

AvionController.error404 = (req, res, next) => {
    
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

module.exports = AvionController;