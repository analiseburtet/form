$(document).ready(function(){
 
  $('#nascimento').mask('00/00/0000');
  $('#cep').mask('00000-000');
  $('#celular').mask('(00) 00000-0000');
  $('#cpf').mask('000.000.000-00', {reverse: true});
  $('#email').mask("A", {
    translation: {
      "A": { pattern: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, recursive: true }
    }
  });

  $( "#cep" ).blur(function() {
    let cep = $(this).val()
    cep.toString()
    buscarCep(cep)
  });

  function buscarCep(cep){
    $.ajax({url: "https://api.postmon.com.br/v1/cep/" + cep, success: function(res){
        const data = res
        const logradouro = data.logradouro
        const cidade = data.cidade
        const estado = data.estado
        const bairro = data.bairro
        preencherCamposCep(logradouro, cidade, estado, bairro)
    }});
  }

  function preencherCamposCep(logradouro, cidade, estado, bairro){
    $("#logradouro").val(logradouro).prop( "disabled", true );
    $("#cidade").val(cidade).prop( "disabled", true );
    $("#uf").val(estado).prop( "disabled", true );
    $("#bairro").val(bairro).prop( "disabled", true );
  }

  $("#form").validate({
    submitHandler: function() {
      let data = obtemData()
      console.log('dados corretos ' + data)
    }
  });

  function obtemData(){
    const data = []
    $("input").each(function(){
      let item = $(this).val()
      data.push(item)
    });
    return data
  }

});