var UrlApiGetAll = 'http://localhost:5006/vuelo/getall';
var UrlApiInsert = 'http://localhost:5006/vuelo/insertar/:codigo_vuelo';
var UrlApiGetOne = 'http://localhost:5006/vuelo/getone/:codigo_vuelo';
var UrlApiUpdate ='http://localhost:5006/vuelo/actualizar/:codigo_vuelo';
var UrlApiDelete = 'http://localhost:5006/vuelo/eliminar/:codigo_vuelo';

$(document).ready(function(){
    CargarVuelos();
});

function CargarVuelos(){
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
                '<td>' + MisItems[i].codigo_vuelo       + '</td>' +
                '<td>' + MisItems[i].ciudad_origen      + '</td>' +
                '<td>' + MisItems[i].ciudad_destino     + '</td>' +
                '<td>' + MisItems[i].fecha_vuelo        + '</td>' +
                '<td>' + MisItems[i].cantidad_pasajeros + '</td>' +
                '<td>' + MisItems[i].tipo_avion         + '</td>' +
                '<td>' + MisItems[i].distancia_km       + '</td>' +
                '<td>' +
                '<button class="btn btn-info" onclick="CargarVuelo('+'`'+ MisItems[i].codigo_vuelo+'`'+')">Editar</button>' +
                '</td>'+
                '<td>' +
                '<button class="btn btn-danger" onclick="EliminarVuelo('+'`'+ MisItems[i].codigo_vuelo+'`'+')">Eliminar</button>' +
                '</td>'+
                '</tr>';
                $('#DatosVuelos').html(Valores);
            }
        }
    });
}

function AgregarVuelo(){
    var datosvuelos = {
        codigo_vuelo :$('#CODIGOVUELO').val(),
        ciudad_origen :$('#CIUDADORIGEN').val(),
        ciudad_destino :$('#CIUDADDESTINO').val(),
        fecha_vuelo :$('#FECHAVUELO').val(),
        cantidad_pasajeros :$('#CANTIDADPASAJEROS').val(),
        tipo_avion :$('#TIPOAVION').val(),
        distancia_km :$('#DISTANCIAKM').val()  
    };
    var datosvuelosjson = JSON.stringify(datosvuelos);
    $.ajax({
        url : UrlApiInsert,
        type : 'POST', 
        data : datosvuelosjson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            console.log(response);
            alert("Vuelo se agregado de manera correcta.");
        },
        error: function (textStatus, errorThrown) {
            alert('Error al agregar Vuelo' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarVuelo(p_codigo_vuelo){
    var datosvuelos = {
        codigo_vuelo : p_codigo_vuelo
    };

    var datosvuelosjson = JSON.stringify(datosvuelos);
    $.ajax({
        url : UrlApiGetOne,
        type : 'POST', 
        data : datosvuelosjson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            var MisItems = response;
            for (i=0; i<MisItems.length; i++){
                $('#CODIGOVUELO').val(MisItems[i].codigo_vuelo);
                $('#CIUDADORIGEN').val(MisItems[i].ciudad_origen);
                $('#CIUDADDESTINO').val(MisItems[i].ciudad_destino);
                $('#FECHAVUELO').val(MisItems[i].fecha_vuelo);
                $('#CANTIDADPASAJEROS').val(MisItems[i].cantidad_pasajeros);
                $('#TIPOAVION').val(MisItems[i].tipo_avion);
                $('#DISTANCIAKM').val(MisItems[i].distancia_km);
                var btnactualizar = '<input type="submit" id="btnactualizar" onclick="ActualizarVuelo('+'`'+ MisItems[i].codigo_vuelo+'`'+')" value="Actualizar Vuelo" class="btn btn-primary"></input>';
                $('#btnagregarvuelo').html(btnactualizar);
            }
        }
    });
}

function ActualizarVuelo(p_codigo_vuelo){
    var datosvuelos = {
        codigo_vuelo : p_codigo_vuelo,
        ciudad_origen :$('#CIUDADORIGEN').val(),
        ciudad_destino :$('#CIUDADDESTINO').val(),
        fecha_vuelo:$('#FECHAVUELO').val(),
        cantidad_pasajeros :$('#CANTIDADPASAJEROS').val(),
        tipo_avion:$('#TIPOAVION').val(),
        distancia_km :$('#DISTANCIAKM').val()  
    };
    var datosvuelosjson = JSON.stringify(datosvuelos);
    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: datosvuelosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
          console.log(response);
          alert("Vuelo Actualizado");
        },
        error: function (textStatus, errorThrown) {
          alert('Error al Actualizar el Vuelo' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
    CargarVuelos();
}

function EliminarVuelo(p_codigo_vuelo) {
  var datosvuelos= {
    codigo_vuelo : p_codigo_vuelo
  };
  var datosvuelosjson = JSON.stringify(datosvuelos);
  $.ajax({
    url: UrlApiDelete,
    type: 'DELETE',
    data: datosvuelosjson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function (response) {
      console.log(response);
    }
  });
  alert("Vuelo Eliminado");
  CargarVuelos();
}