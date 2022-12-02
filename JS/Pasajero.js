var UrlApiGetAll = 'http://localhost:5006/pasajero/getall';
var UrlApiInsert = 'http://localhost:5006/pasajero/insertar/:codigo_pasajero';
var UrlApiGetOne = 'http://localhost:5006/pasajero/getone/:codigo_pasajero';
var UrlApiUpdate ='http://localhost:5006/pasajero/actualizar/:codigo_pasajero';
var UrlApiDelete = 'http://localhost:5006/pasajero/eliminar/:codigo_pasajero';

$(document).ready(function(){
    CargarPasajeros();
});

function CargarPasajeros(){
    $.ajax({
        url: UrlApiGetAll,
        type: 'GET',
        datatype: 'JSON',
        success: function (response){
            var MisItems = response;
            var Valores = '';
            for (i = 0; i < MisItems.length; i++){
                Valores += 
                '<tr>' +
                '<td>' + MisItems[i].codigo_pasajero   + '</td>' +
                '<td>' + MisItems[i].nombres           + '</td>' +
                '<td>' + MisItems[i].apellidos         + '</td>' +
                '<td>' + MisItems[i].fecha_de_registro + '</td>' +
                '<td>' + MisItems[i].nacionalidad      + '</td>' +
                '<td>' + MisItems[i].numero_telefonico + '</td>' +
                '<td>' + MisItems[i].email             + '</td>' +
                '<td>' +
                '<button class="btn btn-info" onclick="CargarPasajero('+'`' +MisItems[i].codigo_pasajero+'`' +')">Editar</button>' +
                '</td>'+
                '<td>' +
                '<button class="btn btn-danger" onclick="EliminarPasajero('+'`' +MisItems[i].codigo_pasajero+'`'+')">Eliminar</button>' +
                '</td>'+
                '</tr>';
                $('#DatosPasajeros').html(Valores);
            }
        }
    });
}

function AgregarPasajero(){
    var datospasajeros = {
        codigo_pasajero :$('#CODIGOPASAJERO').val(),
        nombres :$('#NOMBRES').val(),
        apellidos :$('#APELLIDOS').val(),
        fecha_de_registro :$('#FECHADEREGISTRO').val(),
        nacionalidad :$('#NACIONALIDAD').val(),
        numero_telefonico :$('#NUMEROTELEFONICO').val(),
        email :$('#EMAIL').val()  
    };
    var datospasajerosjson = JSON.stringify(datospasajeros);
    $.ajax({
        url : UrlApiInsert,
        type : 'POST', 
        data : datospasajerosjson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            console.log(response);
            alert("Pasajero agregado de manera correcta.");
        },
        error: function (textStatus, errorThrown) {
            alert('Error al agregar Pasajero' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarPasajero(p_codigo_pasajero){
    var datospasajero = {
        codigo_pasajero : p_codigo_pasajero
    };

    var datospasajerojson = JSON.stringify(datospasajero);
    $.ajax({
        url : UrlApiGetOne,
        type : 'POST', 
        data : datospasajerojson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            var MisItems = response;
            for (i=0; i<MisItems.length; i++){
                $('#CODIGOPASAJERO').val(MisItems[i].codigo_pasajero);
                $('#NOMBRES').val(MisItems[i].nombres);
                $('#APELLIDOS').val(MisItems[i].apellidos);
                $('#FECHADEREGISTRO').val(MisItems[i].fecha_de_registro);
                $('#NACIONALIDAD').val(MisItems[i].nacionalidad);
                $('#NUMEROTELEFONICO').val(MisItems[i].numero_telefonico);
                $('#EMAIL').val(MisItems[i].email);
                var btnactualizar = '<input type="submit" id="btnagregar" onclick="ActualizarPasajero('+'`'+ MisItems[i].codigo_pasajero+'`'+')" value="Actualizar Pasajero" class="btn btn-primary"></input>';
                $('#btnagregarpasajero').html(btnactualizar);
            }
        }
    });
}

function ActualizarPasajero(p_codigo_pasajero){
    var datospasajero = {
        codigo_pasajero : p_codigo_pasajero,
        nombres :$('#NOMBRES').val(),
        apellidos :$('#APELLIDOS').val(),
        fecha_de_registro :$('#FECHADEREGISTRO').val(),
        nacionalidad :$('#NACIONALIDAD').val(),
        numero_telefonico :$('#NUMEROTELEFONICO').val(),
        email :$('#EMAIL').val()  
    };
    var datospasajerojson = JSON.stringify(datospasajero);
    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: datospasajerojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
          console.log(response);
          alert("Pasajero Actualizado");
        },
        error: function (textStatus, errorThrown) {
          alert('Error al Actualizar el Pasajero' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
    CargarPasajeros();
}

function EliminarPasajero(p_codigo_pasajero) {
  var datospasajero = {
    codigo_pasajero : p_codigo_pasajero
  };
  var datospasajerojson = JSON.stringify(datospasajero);
  $.ajax({
    url: UrlApiDelete,
    type: 'DELETE',
    data: datospasajerojson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function (response) {
      console.log(response);
    }
  });
  alert("Pasajero Eliminado");
  CargarPasajeros();
}