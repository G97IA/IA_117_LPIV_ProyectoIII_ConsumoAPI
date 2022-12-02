"use strict"

var ReservaModel = require ('../models/reserva-model'),
ReservaController = () => {}

ReservaController.getAll = (req, res, next) => { 
    ReservaModel.getAll ((err, rows) => {
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
            title : 'Lista de reservas',
            data : rows
            }
            res.status(200).send(rows.rows)
        }         
    }) 
}   

ReservaController.getOne = (req, res, next) => {
    let RetornarReserva = {
        no_reserva : req.body.no_reserva
    } 
    console.log(RetornarReserva)
    
    ReservaModel.getOne (RetornarReserva, (err, rows) => {
        if (err)
        {
            let locals = {
            tittle : `Error al consultar la base de datos con el ID:  ${RetornarReserva.no_reserva}`,
            description : 'Error de sintaxis SQL',
            error : err
            }
            res.render ('error', locals)
        }
        else
        {
            let locals = {
            title : 'Reserva seleccionada',
            data : rows
            }
            res.status(200).send(rows.rows)
        }         
    })
}

ReservaController.post = (req, res, next) => {
    let reserva = {
        no_reserva : req.body.no_reserva,
        codigo_vuelo : req.body.codigo_vuelo,
        codigo_pasajero  : req.body.codigo_pasajero,
        nombre_pasajero  : req.body.nombre_pasajero,
        ciudad_destino  : req.body.ciudad_destino,
        fecha_vuelo  : req.body.fecha_vuelo,
        precio_vuelo  : req.body.precio_vuelo
    }
    console.log(reserva)

    ReservaModel.post(reserva, (err) => {
        if (err)
        {
            let locals = {
                title : `Error al salvar el registro con el id: ${reserva.no_reserva}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Reserva ingresada de forma correcta')
        }
    })
}
ReservaController.put = (req, res, next) => {
    let reserva = {
        no_reserva : req.body.no_reserva,
        codigo_vuelo : req.body.codigo_vuelo,
        codigo_pasajero  : req.body.codigo_pasajero,
        nombre_pasajero  : req.body.nombre_pasajero,
        ciudad_destino  : req.body.ciudad_destino,
        fecha_vuelo  : req.body.fecha_vuelo,
        precio_vuelo  : req.body.precio_vuelo
    }
    console.log(reserva)

    ReservaModel.put(reserva, (err) => {
        if (err)
        {
            let locals = {
                title : `Error al salvar el registro con el id: ${reserva.no_reserva}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Reserva actualizada de forma correcta')
        }
    })
}

ReservaController.delete = (req, res, next) => {
    let ReservaEliminar = {
        no_reserva : req.body.no_reserva
    }
    console.log(ReservaEliminar)

    ReservaModel.delete (ReservaEliminar, (err, rows) => {
        console.log(err, '---', rows)
        if (err)
        {
            let locals = {
                title : `Error al eliminar el registro con el id: ${no_reserva}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Reserva eliminada de forma correcta')
        }
    })
}

ReservaController.addForm = (req, res, next) => 
res.render('add-reserva', { title : 'Agregar Reserva' })

ReservaController.error404 = (req, res, next) => {
    
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

module.exports = ReservaController;