var UrlTransacciones =      'http://20.216.41.245:90/G5_20/controller/Transaccion.php?opc=GetTransasaciones';
var UrlInsertransaccion =   'http://20.216.41.245:90/G5_20/controller/Transaccion.php?opc=insertransaccion';
var UrlGetTransaccion =      'http://20.216.41.245:90/G5_20/controller/Transaccion.php?opc=GetTransaccion';
var UrlActualizarTransaccion =   'http://20.216.41.245:90/G5_20/controller/Transaccion.php?opc=updateTransaccion';
var UrlEliminartransaccion = 'http://20.216.41.245:90/G5_20/controller/Transaccion.php?opc=Eliminartransaccion';
$(document).ready(function(){
    CargarTransacciones();
});

function CargarTransacciones(){
    $.ajax({
        url: UrlTransacciones,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';
            for(i=0; i<MiItems.length; i++){
                Valores += '<tr>' +
                '<td>'+ MiItems[i].CodigoTransaccion +'</td>' + 
                '<td>'+ MiItems[i].TipoTransaccion+'</td>'  + 
                '<td>'+ MiItems[i].CodigoCliente +'</td>'  + 
                '<td>'+ MiItems[i].FechaTransaccion +'</td>'  + 
                '<td>'+ MiItems[i].MontoTransaccion +'</td>'  + 
                '<td>'+ MiItems[i].Sucursal +'</td>'  + 
                '<td>'+ MiItems[i].NumeroCuenta +'</td>'  + 
                '<td>'+
                '<button  class="btn btn-outline-primary" onclick="Cargartransaccion('+ MiItems[i].CodigoTransaccion +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button  class="btn btn-outline-danger" onclick="Eliminartransaccion('+ MiItems[i].CodigoTransaccion +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
                 
            $('#DataTransaccion').html(Valores);
            }
        }
    });
}
function AgregarT(){
    var datostransaccion = {
    CodigoTransaccion: $('#CodigoTransaccion').val(),
    TipoTransaccion: $('#TipoTransaccion').val(),
    CodigoCliente: $('#CodigoCliente').val(),
    FechaTransaccion: $('#FechaTransaccion').val(),
    MontoTransaccion: $('#MontoTransaccion').val(),
    Sucursal: $('#Sucursal').val(),
    NumeroCuenta:$('#NumeroCuenta').val()
    };
    var datostransaccionjson = JSON.stringify(datostransaccion);

    $.ajax({
        url: UrlInsertransaccion,
        type:'POST',
        data: datostransaccionjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Transacción Agregado de Manera Exitosa');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar Transacción' + textStatus + errorThrown);
        }
    });
    alert('Aviso')
}

function Cargartransaccion(CodigoTransaccion){
    var datostransaccion = {
        CodigoTransaccion: CodigoTransaccion
    };
    var datostransaccionjson = JSON.stringify(datostransaccion);

    $.ajax({
        url: UrlGetTransaccion, 
        type: 'POST',
        data: datostransaccionjson,                                      
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse) {
            var MiItems = reponse;
            $('#CodigoTransaccion').val(MiItems[0].CodigoTransaccion);
            $('#TipoTransaccion').val(MiItems[0].TipoTransaccion);
            $('#CodigoCliente').val(MiItems[0].CodigoCliente);
            $('#FechaTransaccion').val(MiItems[0].FechaTransaccion);
            $('#MontoTransaccion').val(MiItems[0].MontoTransaccion);
            $('#Sucursal').val(MiItems[0].Sucursal);
            $('#NumeroCuenta').val(MiItems[0].NumeroCuenta);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarTransaccion(' + MiItems[0].CodigoTransaccion + ')"'+
            'value="Actualizar Transaccion" class="btn btn-outline-primary"></input>';
            $('#btnagregartransaccion').html(btnactualizar);
        }
    });
}

function ActualizarTransaccion(CodigoTransaccion){
    var datostransaccion = {
        CodigoTransaccion: CodigoTransaccion,
        TipoTransaccion: $('#TipoTransaccion').val(),
        CodigoCliente: $('#CodigoCliente').val(),
        FechaTransaccion: $('#FechaTransaccion').val(),
        MontoTransaccion: $('#MontoTransaccion').val(),
        Sucursal: $('#Sucursal').val(),
        NumeroCuenta:$('#NumeroCuenta').val()
    };
    var datostransaccionjson = JSON.stringify(datostransaccion);
    $.ajax({
        url: UrlActualizarTransaccion,
        type: 'PUT',
        data: datostransaccionjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Transacción Actualizada con Exito!!");
        },
        error: function(textStatus, errorThrown){
            alert('Error al actualizar Transacción' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}
  
function Eliminartransaccion(CodigoTransaccion){
    var datostransaccion = {
        CodigoTransaccion: CodigoTransaccion
    };
    var datostransaccionjson = JSON.stringify(datostransaccion);

    $.ajax({
        url: UrlEliminartransaccion,
        type: 'DELETE',
        data: datostransaccionjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response){
            console.log(response);
        }
    });
    alert("Transaccion Eliminada")
    CargarTransacciones();
}




   

