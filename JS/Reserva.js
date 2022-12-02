var UrlApiGetAll = 'http://localhost:5006/reserva/getall';
var UrlApiInsert = 'http://localhost:5006/reserva/insertar/:no_reserva';
var UrlApiGetOne = 'http://localhost:5006/reserva/getone/:no_reserva';
var UrlApiUpdate ='http://localhost:5006/reserva/actualizar/:no_reserva';
var UrlApiDelete = 'http://localhost:5006/reserva/eliminar/:no_reserva';

$(document).ready(function(){
    CargarReservas();
});

function CargarReservas(){
    
    $.ajax({
        url: UrlApiGetAll,
        type:'GET',
        datatype:'JSON',
        success: function (response){
            var MisItems = response;
            var Valores = '';
             for (i = 0; i < MisItems.length; i++)
            {
                Valores += 
                '<tr>' +
                '<td>' + MisItems[i].no_reserva      + '</td>' +
                '<td>' + MisItems[i].codigo_vuelo    + '</td>' +
                '<td>' + MisItems[i].codigo_pasajero + '</td>' +
                '<td>' + MisItems[i].nombre_pasajero + '</td>' +
                '<td>' + MisItems[i].ciudad_destino  + '</td>' +
                '<td>' + MisItems[i].fecha_vuelo     + '</td>' +
                '<td>' + MisItems[i].precio_vuelo    + '</td>' +
                '<td>' +
                '<button class="btn btn-info" onclick="CargarReserva('+'`'+MisItems[i].no_reserva+'`'+')">Editar</button>' +
                '</td>'+
                '<td>' +
                '<button class="btn btn-danger" onclick="EliminarReserva('+'`'+MisItems[i].no_reserva+'`'+')">Eliminar</button>' +
                '</td>'+
                '</tr>';
                $('#DatosReserva').html(Valores);
            }
        }
    });
}

function AgregarReserva(){
    var datosreservas = {
        no_reserva :$('#NUMERORESERVA').val(),
        codigo_vuelo  :$('#CODIGOVUELO').val(),
        codigo_pasajero :$('#CODIGOPASAJERO').val(),
        nombre_pasajero :$('#NOMBREPASAJERO').val(),
        ciudad_destino :$('#CIUDADDESTINO').val(),
        fecha_vuelo :$('#FECHAVUELO').val(),
        precio_vuelo :$('#PRECIOVUELO').val()  
    };
    var datosreservasjson = JSON.stringify(datosreservas);
    $.ajax({
        url : UrlApiInsert,
        type : 'POST', 
        data : datosreservasjson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            console.log(response);
            alert("Reserva agregada de manera correcta.");
        },
        error: function (textStatus, errorThrown) {
            alert('Error al agregar Reserva' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}
function CargarReserva(p_no_reserva){
    var datosreserva = {
        no_reserva : p_no_reserva
    };

    var datosreservajson = JSON.stringify(datosreserva);
    $.ajax({
        url : UrlApiGetOne,
        type : 'POST', 
        data : datosreservajson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            var MisItems = response;
            for (i=0; i<MisItems.length; i++){
                $('#NUMERORESERVA').val(MisItems[i].no_reserva);
                $('#CODIGOVUELO').val(MisItems[i].codigo_vuelo );
                $('#CODIGOPASAJERO').val(MisItems[i].codigo_pasajero);
                $('#NOMBREPASAJERO').val(MisItems[i].nombre_pasajero);
                $('#CIUDADDESTINO').val(MisItems[i].ciudad_destino);
                $('#FECHAVUELO').val(MisItems[i].fecha_vuelo);
                $('#PRECIOVUELO').val(MisItems[i].precio_vuelo);
                var btnactualizar = '<input type="submit"  class="btn btn-primary"'+
                'id="btnagregar" onclick="ActualizarReserva('+'`' +MisItems[i].no_reserva +'`'+')" value="Actualizar Reserva" >';
                $('#btnagregarreserva').html(btnactualizar);
            }
        }
    });
}
function ActualizarReserva(p_no_reserva){
    var datosreserva = {
        no_reserva :p_no_reserva,
        codigo_vuelo  :$('#CODIGOVUELO').val(),
        codigo_pasajero :$('#CODIGOPASAJERO').val(),
        nombre_pasajero :$('#NOMBREPASAJERO').val(),
        ciudad_destino :$('#CIUDADDESTINO').val(),
        fecha_vuelo :$('#FECHAVUELO').val(),
        precio_vuelo :$('#PRECIOVUELO').val() 
    };
    var datosreservajson = JSON.stringify(datosreserva);
    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: datosreservajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
          console.log(response);
          alert("Reserva Actualizada");
        },
        error: function (textStatus, errorThrown) {
          alert('Error al Actualizar el Reserva' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
    CargarReservas();
}

function EliminarReserva(p_no_reserva) {
    var datosreserva = {
        no_reserva : p_no_reserva
    };
    var datosreservajson = JSON.stringify(datosreserva);
    $.ajax({
      url: UrlApiDelete,
      type: 'DELETE',
      data: datosreservajson,
      datatype: 'JSON',
      contentType: 'application/json',
      success: function (response) {
        console.log(response);
      }
    });
    alert("Reserva Eliminada");
    CargarReservas();
  }