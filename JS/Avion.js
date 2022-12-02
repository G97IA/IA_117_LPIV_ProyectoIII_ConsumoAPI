var UrlApiGetAll = 'http://localhost:5006/avion/getall';
var UrlApiInsert = 'http://localhost:5006/avion/insertar/:numero_avion';
var UrlApiGetOne = 'http://localhost:5006/avion/getone/:numero_avion';
var UrlApiUpdate = 'http://localhost:5006/avion/actualizar/:numero_avion';
var UrlApiDelete = 'http://localhost:5006/avion/eliminar/:numero_avion';

$(document).ready(function(){
    CargarAviones();
});

function CargarAviones(){
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
                '<td>' + MisItems[i].numero_avion           + '</td>' +
                '<td>' + MisItems[i].tipo_avion             + '</td>' +
                '<td>' + MisItems[i].horas_de_vuelo         + '</td>' +
                '<td>' + MisItems[i].capacidad_de_pasajeros + '</td>' +
                '<td>' + MisItems[i].fecha_primer_vuelo     + '</td>' +
                '<td>' + MisItems[i].pais_de_construccion   + '</td>' +
                '<td>' + MisItems[i].cantidad_de_vuelos     + '</td>' +
                '<td>' +
                '<button class="btn btn-info" onclick="CargarAvion('+'`'+MisItems[i].numero_avion+'`'+')">Editar</button>' +
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarAvion('+'`'+MisItems[i].numero_avion+'`'+')">Eliminar</button>' +
                '</td>'+
                '</tr>';
                $('#DatosAviones').html(Valores);
            }
        }
    });
}

function AgregarAvion(){
    var datosavion = {
        numero_avion :$('#NUMERO_AVION').val(),
        tipo_avion :$('#TIPO_AVION').val(),
        horas_de_vuelo :$('#HORAS_DE_VUELO').val(),
        capacidad_de_pasajeros :$('#CAPACIDAD_DE_PASAJEROS').val(),
        fecha_primer_vuelo :$('#FECHA_PRIMER_VUELO').val(),
        pais_de_construccion :$('#PAIS_DE_CONSTRUCCION').val(),
        cantidad_de_vuelos :$('#CANTIDAD_DE_VUELOS').val()  
    };
    var datosavionjson = JSON.stringify(datosavion);
    $.ajax({
        url : UrlApiInsert,
        type : 'POST', 
        data : datosavionjson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            console.log(response);
            alert("Avión agregado de manera correcta.");
        },
        error: function (textStatus, errorThrown) {
            alert('Error al agregar el Avión' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarAvion(p_numero_avion){
    var datosavion = {
        numero_avion : p_numero_avion
    };

    var datosavionjson = JSON.stringify(datosavion);
    $.ajax({
        url : UrlApiGetOne,
        type : 'POST', 
        data : datosavionjson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            var MisItems = response;
            for (i=0; i<MisItems.length; i++){
                $('#NUMERO_AVION').val(MisItems[i].numero_avion);
                $('#TIPO_AVION').val(MisItems[i].tipo_avion);
                $('#HORAS_DE_VUELO').val(MisItems[i].horas_de_vuelo);
                $('#CAPACIDAD_DE_PASAJEROS').val(MisItems[i].capacidad_de_pasajeros);
                $('#FECHA_PRIMER_VUELO').val(MisItems[i].fecha_primer_vuelo);
                $('#PAIS_DE_CONSTRUCCION').val(MisItems[i].pais_de_construccion);
                $('#CANTIDAD_DE_VUELOS').val(MisItems[i].cantidad_de_vuelos);
                var btnactualizar = '<input type="submit" id="btnactualizar" onclick="ActualizarAvion('+'`'+ MisItems[i].numero_avion+'`'+')" value="Actualizar Avión" class="btn btn-primary"></input>';
                $('#btnagregaravion').html(btnactualizar);
            }
        }
    });

    var id = document.getElementById('NUMERO_AVION');
    id.disabled = true;

}

function ActualizarAvion(p_numero_avion){
    var datosavion = {
        numero_avion : p_numero_avion,
        tipo_avion :$('#TIPO_AVION').val(),
        horas_de_vuelo :$('#HORAS_DE_VUELO').val(),
        capacidad_de_pasajeros :$('#CAPACIDAD_DE_PASAJEROS').val(),
        fecha_primer_vuelo :$('#FECHA_PRIMER_VUELO').val(),
        pais_de_construccion :$('#PAIS_DE_CONSTRUCCION').val(),
        cantidad_de_vuelos :$('#CANTIDAD_DE_VUELOS').val()  
    };
    var datosavionjson = JSON.stringify(datosavion);
    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: datosavionjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
          console.log(response);
          alert("Avión Actualizado");
        },
        error: function (textStatus, errorThrown) {
          alert('Error al Actualizar el Avión' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
    CargarAviones();
}

function EliminarAvion(p_numero_avion) {
    var datosavion = {
        numero_avion : p_numero_avion
    };
    var datosavionjson = JSON.stringify(datosavion);
    $.ajax({
      url: UrlApiDelete,
      type: 'DELETE',
      data: datosavionjson,
      datatype: 'JSON',
      contentType: 'application/json',
      success: function (response) {
        console.log(response);
      }
    });
    alert("Avión Eliminado");
    CargarAviones();
  }