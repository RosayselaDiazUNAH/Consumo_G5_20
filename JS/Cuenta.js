var urlcuentas = 'http://20.216.41.245:90/G5_20/controller/cuenta.php?opc=Get_Cuentas';
var urlInsertCuenta = 'http://20.216.41.245:90/G5_20/controller/cuenta.php?opc=InsertCuenta';
var urlgetcuenta ='http://20.216.41.245:90/G5_20/controller/cuenta.php?opc=Get_Cuenta';
var urlActualizarCuenta = 'http://20.216.41.245:90/G5_20/controller/cuenta.php?opc=UpdateCuenta';
var urlEliminarCuenta = 'http://20.216.41.245:90/G5_20/controller/cuenta.php?opc=EliminarCuenta'; 



$(document).ready(function(){
    CargarCuentas();
});



function CargarCuentas(){
$.ajax({
    url: urlcuentas,
    type:'GET',
    Datatype: 'JSON',
    success: function(response){
       var MiItems = response;
       var Valores='';

       for(i=0;i<MiItems.length; i++)
       Valores += '<tr>' +
       '<td>'+ MiItems[i].NumeroCuenta +'</td>' + 
       '<td>'+ MiItems[i].NombreCuenta+'</td>'  + 
       '<td>'+ MiItems[i].NumeroCliente +'</td>'  + 
       '<td>'+ MiItems[i].FechApertura +'</td>'  + 
       '<td>'+ MiItems[i].saldoActual +'</td>'  + 
       '<td>'+ MiItems[i].saldoRetenido +'</td>'  + 
       '<td>'+ MiItems[i].TipoMoneda +'</td>'  + 
       '<td>'+
       '<button class="btn btn-info" onclick="CargarCuenta('+ MiItems[i].NumeroCuenta +')">Editar Cuenta</button>'+
       '</td>'+
       '<td>'+
       '<button class="btn btn-danger" onclick="EliminarCuenta('+ MiItems[i].NumeroCuenta +')">Eliminar Cuenta</button>'+
       '</td>'+
   '</tr>';
   $('#DataCuenta').html(Valores);


    }
});

}

function AgregarCuenta(){
    var datoscuenta = {
        NumeroCuenta: $('#NumeroCuenta').val(),
        NombreCuenta: $('#NombreCuenta').val(),
        NumeroCliente: $('#NumeroCliente').val(),
        FechApertura: $('#FechApertura').val(),
        SaldoActual: $('#saldoActual').val(),
        SaldoRetenido: $('#saldoRetenido').val(),
        TipoMoneda:$('#TipoMoneda').val()
        };
        var datoscuentajson = JSON.stringify(datoscuenta);
    
        $.ajax({
            url: urlInsertCuenta,
            type:'POST',
            data: datoscuentajson,
            datatype: 'JSON',
            contenttype: 'application/json',
            success: function(reponse){
                console.log(reponse);
                alert('la cuenta a sido Agregada de Manera Exitosa');
            },
            error: function(textStatus, errorThrown){
                alert('Error al agregar la cuenta' + textStatus + errorThrown);
            }
        });
        alert('Aviso')


}


function CargarCuenta(NumeroCuenta){
    var datoscuenta = {
        NumeroCuenta: NumeroCuenta
    };
    var datosCuentajson = JSON.stringify(datoscuenta);

    $.ajax({
        url: urlgetcuenta, 
        type: 'POST',
        data: datosCuentajson,                                      
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            var MiItems = reponse;
            $('#NumeroCuenta').val(MiItems[0].NumeroCuenta);
            $('#NombreCuenta').val(MiItems[0].NombreCuenta);
            $('#NumeroCliente').val(MiItems[0].NumeroCliente);
            $('#FechApertura').val(MiItems[0].FechApertura);
            $('#saldoActual').val(MiItems[0].saldoActual);
            $('#saldoRetenido').val(MiItems[0].saldoRetenido);
            $('#TipoMoneda').val(MiItems[0].TipoMoneda);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarCuenta(' + MiItems[0].NumeroCuenta + ')"'+
            'value="Actualizar Cuenta" class="btn btn-primary"></input>';
            $('#btnagregarcuenta').html(btnactualizar);
        }
    });
}

function ActualizarCuenta(NumeroCuenta){
    var datoscuenta = {
        NumeroCuenta: NumeroCuenta,
        NombreCuenta: $('#NombreCuenta').val(),
        NumeroCliente: $('#NumeroCliente').val(),
        FechApertura: $('#FechApertura').val(),
        SaldoActual: $('#saldoActual').val(),
        SaldoRetenido: $('#saldoRetenido').val(),
        TipoMoneda:$('#TipoMoneda').val()
    };
    var datosCuentajson = JSON.stringify(datoscuenta);

    $.ajax({
        url: urlActualizarCuenta,
        type: 'PUT',
        data: datosCuentajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Cuenta Actualizado");
        },
        error: function(textStatus, errorThrown){
            alert('Error al actualizar Cuenta' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarCuenta(NumeroCuenta){
    var datoscuenta = {
        NumeroCuenta: NumeroCuenta
    };
    var datosCuentajson = JSON.stringify(datoscuenta);

    $.ajax({
        url: urlEliminarCuenta,
        type: 'DELETE',
        data: datosCuentajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response){
            console.log(response);
        }
    });
    alert("Cuenta Eliminada")
    CargarCuentas();
}

