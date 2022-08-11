var UrlTransacciones = 'http://20.216.41.245:90/G5_20/controller/Transaccion.php?opc=GetTransasaciones';

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
    

