"use strict"

var PasajeroModel = require ('../models/pasajero-model'),
PasajeroController = () => {}

PasajeroController.getAll = (req, res, next) => { 
    PasajeroModel.getAll ((err, rows) => {
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
            title : 'Lista de pasajeros',
            data : rows
            }
            res.status(200).send(rows.rows)
        }         
    }) 
}   

PasajeroController.getOne = (req, res, next) => {
    let RetornarPasajero = {
        codigo_pasajero : req.body.codigo_pasajero
    } 
    console.log(RetornarPasajero)
    PasajeroModel.getOne (RetornarPasajero, (err, rows) => {
        if (err)
        {
            let locals = {
            tittle : `Error al consultar la base de datos con el ID:  ${RetornarPasajero.codigo_pasajero}`,
            description : 'Error de sintaxis SQL',
            error : err
            }
            res.render ('error', locals)
        }
        else
        {
            let locals = {
            title : 'Pasajero seleccionado',
            data : rows
            }
            res.status(200).send(rows.rows)
        }         
    })
}

PasajeroController.post = (req, res, next) => {
    let pasajero = {
        codigo_pasajero : req.body.codigo_pasajero,
        nombres  : req.body.nombres,
        apellidos  : req.body.apellidos,
        fecha_de_registro  : req.body.fecha_de_registro,
        nacionalidad  : req.body.nacionalidad,
        numero_telefonico  : req.body.numero_telefonico,
        email  : req.body.email
    }
    console.log(pasajero)

    PasajeroModel.post(pasajero, (err) => {
        if (err)
        {
            let locals = {
                title : `Error al salvar el registro con el id: ${pasajero.codigo_pasajero}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Pasajero ingresado de forma correcta')
        }
    })
}
PasajeroController.put = (req, res, next) => {
    let pasajero = {
        codigo_pasajero : req.body.codigo_pasajero,
        nombres  : req.body.nombres,
        apellidos  : req.body.apellidos,
        fecha_de_registro  : req.body.fecha_de_registro,
        nacionalidad  : req.body.nacionalidad,
        numero_telefonico  : req.body.numero_telefonico,
        email  : req.body.email
    }
    console.log(pasajero)

    PasajeroModel.put(pasajero, (err) => {
        if (err)
        {
            let locals = {
                title : `Error al salvar el registro con el id: ${pasajero.codigo_pasajero}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Pasajero actualizado de forma correcta')
        }
    })
}
PasajeroController.delete = (req, res, next) => {
    let PasajeroEliminar = {
        codigo_pasajero : req.body.codigo_pasajero
    }
    console.log(PasajeroEliminar)

    PasajeroModel.delete (PasajeroEliminar, (err, rows) => {
        console.log(err, '---', rows)
        if (err)
        {
            let locals = {
                title : `Error al eliminar el registro con el id: ${codigo_pasajero}`,
                description : "Error de sintaxis SQL",    
                error : err
            }    
            res.status(520).json(err);
        }
        else {
            res.send ('Pasajero eliminado de forma correcta')
        }
    })
}

PasajeroController.addForm = (req, res, next) => 
res.render('add-pasajero', { title : 'Agregar Pasajero' })

PasajeroController.error404 = (req, res, next) => {
    
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

module.exports = PasajeroController;