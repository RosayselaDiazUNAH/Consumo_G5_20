var UrlTransacciones = 'http://20.216.41.245:90/G5_20/controller/Transaccion.php?opc=GetTransasaciones';
var UrlInsertransaccion = 'http://20.216.41.245:90/G5_20/controller/Transaccion.php?opc=insertransaccion';

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

   

