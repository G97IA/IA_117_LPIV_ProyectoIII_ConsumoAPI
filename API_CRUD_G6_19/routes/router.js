"use strict";

var PasajeroController = require('../controllers/pasajero-controller');
var AvionController = require('../controllers/avion-controller');
var VueloController = require('../controllers/vuelo-controller');
var ReservaController = require ("../controllers/reserva-controller");
const express = require('express');
const router = express.Router();

router.get("/pasajero/getall", PasajeroController.getAll);
router.post("/pasajero/getone/:codigo_pasajero", PasajeroController.getOne);
router.post("/pasajero/insertar/:codigo_pasajero", PasajeroController.post);
router.put("/pasajero/actualizar/:codigo_pasajero", PasajeroController.put);
router.delete("/pasajero/eliminar/:codigo_pasajero", PasajeroController.delete);
router.get("/vuelo/getall", VueloController.getAll);
router.post("/vuelo/getone/:codigo_vuelo", VueloController.getOne);
router.post("/vuelo/insertar/:codigo_vuelo", VueloController.post);
router.put("/vuelo/actualizar/:codigo_vuelo", VueloController.put);
router.delete("/vuelo/eliminar/:codigo_vuelo", VueloController.delete);
router.get("/avion/getall", AvionController.getAll);
router.post("/avion/getone/:numero_avion", AvionController.getOne);
router.post("/avion/insertar/:numero_avion", AvionController.post);
router.put("/avion/actualizar/:numero_avion", AvionController.put);
router.delete("/avion/eliminar/:numero_avion", AvionController.delete);
router.get("/reserva/getall", ReservaController.getAll)
router.post("/reserva/getone/:no_reserva", ReservaController.getOne)
router.post("/reserva/insertar/:no_reserva", ReservaController.post)
router.put("/reserva/actualizar/:no_reserva", ReservaController.put)
router.delete("/reserva/eliminar/:no_reserva", ReservaController.delete)
router.use(ReservaController.error404);
router.use(AvionController.error404);
router.use(VueloController.error404);
router.use(PasajeroController.error404);

module.exports = router;