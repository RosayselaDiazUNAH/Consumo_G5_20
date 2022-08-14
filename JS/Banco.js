  var urlbancos = 'http://20.216.41.245:90/G5_20/controller/Banco.php?opc=GetBancos'; 
  var urlInsertbanco = 'http://20.216.41.245:90/G5_20/controller/Banco.php?opc=InsertBanco'; 
  var urlGetbanco = 'http://20.216.41.245:90/G5_20/controller/Banco.php?opc=GetBanco';
  var urlUpdatebanco = 'http://20.216.41.245:90/G5_20/controller/Banco.php?opc=UpdateBanco'; 
  var urlEliminarbanco = 'http://20.216.41.245:90/G5_20/controller/Banco.php?opc=DeleteBanco'; 

 $(document).ready(function(){
    CargarBancos();
 });



 function CargarBancos(){
  $.ajax({
    url: urlbancos,
    type:'GET',
    Datatype: 'JSON',
    success: function(response){
       var MiItems = response;
       var Valores='';
       

       for(i=0;i<MiItems.length; i++){
    
       Valores += '<tr>' +      
       '<td>'+ MiItems[i].CodigoBanco +'</td>' + 
       '<td>'+ MiItems[i].NombreBanco+'</td>'  + 
       '<td>'+ MiItems[i].OficinaPrincipal +'</td>'  + 
       '<td>'+ MiItems[i].CantidadSucursales +'</td>'  + 
       '<td>'+ MiItems[i].FechaFundacion +'</td>'  + 
       '<td>'+ MiItems[i].Pais +'</td>'  + 
       '<td>'+ MiItems[i].RTN +'</td>'  + 
       '<td>'+
                '<button class="btn btn-info" onclick="CargarBanco('+ response[i].CodigoBanco +')">Editar Banco</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarBanco('+ response[i].CodigoBanco +')">Eliminar Banco</button>'+
                '</td>'+
            '</tr>';
            $('#DataBancos').html(Valores);
    
            console.log(response[i].CodigoBanco);//Muestra en consola del navegador los codigos de banco
    }
    
}
});

}
function AgregarBanco(){
    var datosbanco = {
    CodigoBanco: $('#CodigoBanco').val(),
    NombreBanco: $('#NombreBanco').val(),
    OficinaPrincipal: $('#OficinaPrincipal').val(),
    CantidadSucursales: $('#CantidadSucursales').val(),
    FechaFundacion: $('#FechaFundacion').val(),
    Pais: $('#Pais').val(),
    RTN:$('#RTN').val()
    };
    var datosbancojson = JSON.stringify(datosbanco);

    $.ajax({
        url: urlInsertbanco,
        type:'POST',
        data: datosbancojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Banco Agregado de Manera Exitosa');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar Banco' + textStatus + errorThrown);
        }
    });
    alert('Aviso')
}
function CargarBanco(CodigoBanco){
    console.log(CodigoBanco);//Verifica en consola del navegador si cargar banco recibe el parametro de la tabla
    var datosbanco = {
        CodigoBanco: CodigoBanco
    };
    var datosbancojson = JSON.stringify(datosbanco);

    $.ajax({
        url: urlGetbanco, 
        type: 'POST',
        data: datosbancojson,                                      
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            var MiItems = reponse;
            $('#CodigoBanco').val(MiItems[0].CodigoBanco);
            $('#NombreBanco').val(MiItems[0].NombreBanco);
            $('#OficinaPrincipal').val(MiItems[0].OficinaPrincipal);
            $('#CantidadSucursales').val(MiItems[0].CantidadSucursales);
            $('#FechaFundacion').val(MiItems[0].FechaFundacion);
            $('#Pais').val(MiItems[0].Pais);
            $('#RTN').val(MiItems[0].RTN);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarBanco(' + MiItems[0].CodigoBanco + ')"'+
            'value="Actualizar banco" class="btn btn-primary"></input>';
            $('#btnagregarbanco').html(btnactualizar);
        }
    });
}

function ActualizarBanco(CodigoBanco){
    var datosbanco = {
        CodigoBanco: CodigoBanco,
        NombreBanco: $('#NombreBanco').val(),
        OficinaPrincipal: $('#OficinaPrincipal').val(),
        CantidadSucursales: $('#CantidadSucursales').val(),
        FechaFundacion: $('#FechaFundacion').val(),
        Pais: $('#Pais').val(),
        RTN:$('#RTN').val()
    };
    var datosbancojson = JSON.stringify(datosbanco);

    $.ajax({
        url: urlUpdatebanco,
        type: 'PUT',
        data: datosbancojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Banco Actualizado");
        },
        error: function(textStatus, errorThrown){
            alert('Error al actualizar Banco' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarBanco(CodigoBanco){
    var datosbanco = {
        CodigoBanco: CodigoBanco
    };
    var datosbancojson = JSON.stringify(datosbanco);

    $.ajax({
        url: urlEliminarbanco,
        type: 'DELETE',
        data: datosbancojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response){
            console.log(response);
        }
    });
    alert("Banco Eliminado")
    CargarBancos();
}
