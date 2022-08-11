var UrlClientes = 'http://20.216.41.245:90/G5_20/controller/Cliente.php?opc=GetClientes';
var UrlInsertCliente = 'http://20.216.41.245:90/G5_20/controller/Cliente.php?opc=InsertCliente';

$(document).ready(function(){
    CargarClientes();
});

function CargarClientes(){
    $.ajax({
        url: UrlClientes, 
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i<MiItems.length; i++){
                Valores += '<tr>' +
                '<td>'+ MiItems[i].NumeroCliente +'</td>' + 
                '<td>'+ MiItems[i].Nombres+'</td>'  + 
                '<td>'+ MiItems[i].Apellidos +'</td>'  + 
                '<td>'+ MiItems[i].RTN +'</td>'  + 
                '<td>'+ MiItems[i].FechaAfiliacion +'</td>'  + 
                '<td>'+ MiItems[i].SaldoActual +'</td>'  + 
                '<td>'+ MiItems[i].NumeroCuenta +'</td>'  + 
            '</tr>';
            $('#DataClientes').html(Valores);
            }
        }
    });
}

function AgregarCliente(){
    var datoscliente = {
    NumeroCliente: $('#NumeroCliente').val(),
    Nombres: $('#Nombres').val(),
    Apellidos: $('#Apellidos').val(),
    RTN: $('#RTN').val(),
    FechaAfiliacion: $('#FechaAfiliacion').val(),
    SaldoActual: $('#SaldoActual').val(),
    NumeroCuenta:$('#NumeroCuenta').val()
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlInsertCliente,
        type:'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Cliente Agregado de Manera Exitosa');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar cliente' + textStatus + errorThrown);
        }
    });
    alert('Aviso')
}