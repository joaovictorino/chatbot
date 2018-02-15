var proxy = angular.module('chatApp', []);

proxy.controller('WatsonController', WatsonController);

function WatsonController($scope, $http, $compile) {
    $scope.init = function () {
        Ola();
    };

    $scope.init();

    $scope.SelecionarTodosCheckbox = function (evento) {
        $(".checkbox").prop('checked', $(this).prop("checked"));
    };

    $scope.SelecionarItemCheckbox = function (evento) {
        if (false == $(this).prop("checked")) {
            $("#select_all").prop('checked', false);
        }
        if ($('.checkbox:checked').length == $('.checkbox').length) {
            $("#select_all").prop('checked', true);
        }
    };

    $scope.Enviar = function () {
        var texto = $("#digiteTexto").val();
        $("#digiteTexto").val('');
        var time = new Date();
        var divPessoa = '<div class="row usuario"><div class="right"><div class="spacer"></div><div class="usuarioColunaDireita"><div class="row"><div class="col s11 hora"><span>' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 mensagemUsuario">' + texto + '</div></div></div></div></div>';
        $(divPessoa).insertBefore("#ancora");
        Conversar(texto);
    };

    $scope.ValidarAtendimento = function () {
        var time = new Date();
        var divBot = '<div class="row bot"><div class="col s3 m2 l1 avatar"><img src="/img/avatar.png" /></div><div class="col s9 m6 l11 mensagem"><div class="row"><div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 m12 l4"><span class="mensagemBot">Esta resposta foi útil?</span></div></div></div></div>';
        $(divBot).insertBefore("#ancora");
        CriarBotoes("SimNao", $compile, $scope);
        MoverScrollParaBaixo();
        $("#digiteTexto").focus();
    };

    $scope.QualificarAtendimento = function (evento) {
        var time = new Date();
        var divPessoa = '<div class="row usuario"><div class="right"><div class="spacer"></div><div class="usuarioColunaDireita"><div class="row"><div class="col s11 hora"><span>' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 mensagemUsuario">' + evento.target.id + '</div></div></div></div></div>';
        $(divPessoa).insertBefore("#ancora");
        var divBot = '<div class="row bot"><div class="col s3 m2 l1 avatar"><img src="/img/avatar.png" /></div><div class="col s9 m6 l11 mensagem"><div class="row"><div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 m12 l4"><span class="mensagemBot">O que você achou deste atendimento?</span></div></div></div></div>';
        $(divBot).insertBefore("#ancora");
        CriarBotoes("PositivoNegativo", $compile, $scope);
        MoverScrollParaBaixo();
        $("#digiteTexto").focus();
    };

    $scope.FinalizarAtendimento = function (evento) {
        var time = new Date();
        var divPessoa = null;

        if(evento.target.id == 'Sim')
            divPessoa = '<div class="row usuario"><div class="right"><div class="spacer"></div><div class="usuarioColunaDireita"><div class="row"><div class="col s11 hora"><span>' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 mensagemUsuario"><img src="img/hand.png" /></div></div></div></div></div>';
        else
            divPessoa = '<div class="row usuario"><div class="right"><div class="spacer"></div><div class="usuarioColunaDireita"><div class="row"><div class="col s11 hora"><span>' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 mensagemUsuario"><img src="img/hand-neg.png" /></div></div></div></div></div>';

        $(divPessoa).insertBefore("#ancora");
        var divBot = '<div class="row bot"><div class="col s3 m2 l1 avatar"><img src="/img/avatar.png" /></div><div class="col s9 m6 l11 mensagem"><div class="row"><div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 m12 l4"><span class="mensagemBot">Encerrar atendimento?</span></div></div></div></div>';
        $(divBot).insertBefore("#ancora");
        divBotao = '<div class="row resposta"><div class="col s9 offset-s3 m10 offset-m2 l11 offset-l1"><a href="/" target="_self"><img id="Sim" src="img/btnSim.png" /></a><a href="#"><img id="Nao" src="img/btnNao.png" /></a></div></div>';
        $(divBotao).insertBefore("#ancora");
        MoverScrollParaBaixo();
        $("#digiteTexto").focus();
    };

    $scope.EnviarBotao = function (evento) {
        var elemento = angular.element(evento.srcElement);
        var texto = BuscarTexto(elemento[0].id);
        evento.preventDefault();
        var time = new Date();
        var divPessoa = '<div class="row usuario"><div class="right"><div class="spacer"></div><div class="usuarioColunaDireita"><div class="row"><div class="col s11 hora"><span>' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 mensagemUsuario">' + texto + '</div></div></div></div></div>';
        $(divPessoa).insertBefore("#ancora");
        Conversar(texto);
    };

    $scope.SelecionarItem = function () {
        var sql = $scope.selectedItem[0];
        var lista = JSON.parse($("#listaGrid").val());
        var itemLista = null;

        lista.forEach(item => {
            if (item.sql == sql) {
                itemLista = item;
            }
        });

        if (itemLista != null) {
            var texto = itemLista.tipoRua + " " + itemLista.rua + ", " + itemLista.numero + " " + itemLista.complemento;
            var time = new Date();
            var divPessoa = '<div class="row usuario"><div class="right"><div class="spacer"></div><div class="usuarioColunaDireita"><div class="row"><div class="col s11 hora"><span>' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 mensagemUsuario">' + texto + '</div></div></div></div></div>';
            $(divPessoa).insertBefore("#ancora");
            var divBot = '<div class="row bot"><div class="col s3 m2 l1 avatar"><img src="/img/avatar.png" /></div><div class="col s9 m6 l11 mensagem"><div class="row"><div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 m12 l4"><span class="mensagemBot">Ok, estou pesquisando seus débitos, um momento</span></div></div></div></div>';
            $(divBot).insertBefore("#ancora");
            MoverScrollParaBaixo();
            Integrar("consultaDebitos", itemLista.sql, $compile, $scope);
        }

        $("#digiteTexto").focus();
    };

    function Ola() {
        $http.get('/watson/Ola')
            .then(function (success) {
                var time = new Date();
                $("#contexto").val(JSON.stringify(success.data['contexto']));
                var divBot = '<div class="row bot"><div class="col s3 m2 l1 avatar"><img src="/img/avatar.png" /></div><div class="col s9 m6 l11 mensagem"><div class="row"><div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 m12 l4"><span class="mensagemBot">' + success.data['retorno'].text[0] + '</span></div></div></div></div>';
                $(divBot).insertBefore("#ancora");
                $("#digiteTexto").focus();
            },
            function (error) {
                console.log('Error');
            });
    };

    function Conversar(texto) {
        $http.post('/watson/Conversar', { msg: texto, contexto: JSON.parse($("#contexto").val()) })
            .then(function (success) {
                var time = new Date();
                $("#contexto").val(JSON.stringify(success.data['contexto']));
                var divBot = '<div class="row bot"><div class="col s3 m2 l1 avatar"><img src="/img/avatar.png" /></div><div class="col s9 m6 l11 mensagem"><div class="row"><div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 m12 l4"><span class="mensagemBot">' + tratarRetornoBot(success.data['retorno'].text[0]) + '</span></div></div></div></div>';
                $(divBot).insertBefore("#ancora");
                                
                if(success.data['retorno'].action != null) {
                    Integrar(success.data['retorno'].action, JSON.parse($("#contexto").val()), $compile, $scope);
                }

                if(success.data['retorno'].botao != null) {
                    CriarBotoes(success.data['retorno'].botao, $compile, $scope);
                }

                MoverScrollParaBaixo();
                $("#digiteTexto").focus();
            },
            function (error) {
                console.log('Error');
            });
    };

    function tratarRetornoBot(texto) {
        if(texto.indexOf("http") > -1){
            return texto.replace("http://notcertiptu.prefeitura.sp.gov.br/PaginasRestritas/frm001_Gerar_Notif_Lanc.aspx", "<a target='_blank' href='http://notcertiptu.prefeitura.sp.gov.br/PaginasRestritas/frm001_Gerar_Notif_Lanc.aspx'>Gerar notificação lançamento</a>");
        }else{
            return texto;
        }
    };

    function Integrar(acao, conteudo, compiler, scope) {
        $http.post('/integracao/integrar', { action: acao, contexto: conteudo })
            .then(function (success) {
                AvaliarRetornoIntegracao(acao, success.data, compiler, scope);
            },
            function (error) {
                console.log('Error');
            });
    };

    function CriarBotoes(tipo, compiler, scope) {
        var divBotao = null;

        if(tipo == "NaoSei") {
            divBotao = '<div class="row resposta"><div class="col s9 offset-s3 m10 offset-m2 l11 offset-l1"><a href="#" ng-click="EnviarBotao($event);"><img id="NaoSei" src="img/btnNaoSei.png" /></a></div></div>';
        } else if(tipo == "SimNao") {
            divBotao = '<div class="row resposta"><div class="col s9 offset-s3 m10 offset-m2 l11 offset-l1"><a href="#" ng-click="QualificarAtendimento($event);"><img id="Sim" src="img/btnSim.png" /></a><a href="#" ng-click="QualificarAtendimento($event);"><img id="Nao" src="img/btnNao.png" /></a></div></div>';
        } else if(tipo == "PositivoNegativo") {
            divBotao = '<div class="row resposta"><div class="col s9 offset-s3 m10 offset-m2 l11 offset-l1"><a href="#" id="Sim" ng-click="FinalizarAtendimento($event);" class="positive">Sim</a><a href="#" id="Nao" ng-click="FinalizarAtendimento($event);" class="negative">Não</a></div></div>';
        }

        $(divBotao).insertBefore("#ancora");
        compiler($("#chat"))(scope);
    };

    function BuscarTexto(id) {
        if(id == "NaoSei") {
            return "Não sei";
        } else if(id == "Nao") {
            return "Não";
        }
    };

    function MoverScrollParaBaixo() {
        var heightMain = $("#chat").css("height").replace("px", "");
        var heightDivs = 0;

        for(var i = 0; i < $("#chat")[0].childNodes.length; i++){
            heightDivs += $("#chat")[0].childNodes[i].clientHeight;
        }

        heightDivs += 210;

        $("#chat").css("height", heightDivs + "px");
        $('html,body').animate({ scrollTop: $("#ancora").offset().top - 60 }, 800);
    };

    function AvaliarRetornoIntegracao(acao, retorno, compiler, scope) { 
        if (retorno.codigo == 0) {
            if(acao == "consultaDebitos"){
                CriarTabela(retorno.resultado, retorno.filtro, compiler, scope);
            }else{
                CriarGrid(retorno.resultado, retorno.filtro, compiler, scope);
            }
        } else if (retorno.codigo == 1) {
            ConsultaComMuitosRegistros();
        }else {
            ConsultaComMuitosRegistros();
        }
    };

    function CriarGrid(lista, filtro, compiler, scope)
    {
        var time = new Date();
        var htmlGrid = '<div class="row bot">';
        htmlGrid = htmlGrid.concat('<input id="listaGrid" type="hidden" />');
        htmlGrid = htmlGrid.concat('<div class="col s3 m2 l1 avatar"><img src="img/avatar.png" /></div>');
        htmlGrid = htmlGrid.concat('<div class="col s9 m10 l11 mensagem">');
        htmlGrid = htmlGrid.concat('<div class="row">');
        htmlGrid = htmlGrid.concat('<div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div>');
        htmlGrid = htmlGrid.concat('<div class="col s12 m12 l8">');
        htmlGrid = htmlGrid.concat('<span class="mensagemBot selectOptions">');
        htmlGrid = htmlGrid.concat('Encontramos os seguintes endereços para "' + filtro + '".');
        htmlGrid = htmlGrid.concat('<select id="gridRetornoEndereco" ng-change="SelecionarItem()" ng-model="selectedItem" class="browser-default" multiple>');
        
        lista.forEach(item => {
            htmlGrid = htmlGrid.concat('<option value="' + item.sql + '">' + item.tipoRua + " " + item.rua + ", " + item.numero + " " + item.complemento + '</option>');
        });
        
        htmlGrid = htmlGrid.concat('</select>');
        htmlGrid = htmlGrid.concat('</span>');
        htmlGrid = htmlGrid.concat('</div>');
        htmlGrid = htmlGrid.concat('</div>');
        htmlGrid = htmlGrid.concat('</div>');
        htmlGrid = htmlGrid.concat('</div>');

        $(htmlGrid).insertBefore("#ancora");
        compiler($("#chat"))(scope);
        $("#listaGrid").val(JSON.stringify(lista));
        AlterarTamanhoGrid(lista);
        MoverScrollParaBaixo();
    }

    function AlterarTamanhoGrid(lista){
        if(lista.length == 1) {
            $("#gridRetornoEndereco").css({"height" : "60px"});
        } else if(lista.length == 2) {
            $("#gridRetornoEndereco").css({"height" : "120px"});
        } else if(lista.length == 3) {
            $("#gridRetornoEndereco").css({"height" : "180px"});
        } else {
            MoverScrollParaBaixo();
        }
    }

    function CriarTabela(lista, filtro, compiler, scope)
    {
        var time = new Date();
        var htmlGrid = '<div class="row bot">';
        htmlGrid = htmlGrid.concat('<div class="col s3 m2 l1 avatar"><img src="img/avatar.png" /></div>');
        htmlGrid = htmlGrid.concat('<div class="col s9 m10 l11 mensagem">');
        htmlGrid = htmlGrid.concat('<div class="row">');
        htmlGrid = htmlGrid.concat('<div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div>');
        htmlGrid = htmlGrid.concat('<div class="col s12 m12 l8">');
        htmlGrid = htmlGrid.concat('<span class="mensagemBot multipleOptions">');
        htmlGrid = htmlGrid.concat('Selecione as prestações a pagar:');
        htmlGrid = htmlGrid.concat('<div class="row prestacoes">');
        htmlGrid = htmlGrid.concat('<div class="col s12">');
        htmlGrid = htmlGrid.concat('<div class="row headerParcelas">');
        htmlGrid = htmlGrid.concat('<div class="col s2 m2 l2 center">Ano</div>');
        htmlGrid = htmlGrid.concat('<div class="col s10 m10 l10 center">Parcelas Pendentes</div>');
        htmlGrid = htmlGrid.concat('</div>');
        htmlGrid = htmlGrid.concat('</div>');

        for(var i = 0; i < lista.length; i++) {

            if(!lista[i].dividaAtiva) {
                htmlGrid = htmlGrid.concat('<div class="col s12">');
                htmlGrid = htmlGrid.concat('<div class="row">');

                htmlGrid = htmlGrid.concat('<div class="col s2 m2 l2 ano">');
                htmlGrid = htmlGrid.concat(lista[i].anoExercicio);
                htmlGrid = htmlGrid.concat('</div>');
                htmlGrid = htmlGrid.concat('<div class="col s10 m10 l10">');
                htmlGrid = htmlGrid.concat('<div class="row">');

                var parcelas = lista[i].parcelas;

                for(var j = 0; j < parcelas.length; j++) {
                    htmlGrid = htmlGrid.concat('<div class="col s1 m1 l1">');
                    htmlGrid = htmlGrid.concat(parcelas[j].numero + '<br />');
                    htmlGrid = htmlGrid.concat('<input class="checkbox filled-in" type="checkbox" name="check[]" id="item' + lista[i].anoExercicio + parcelas[j].numero + '" />');
                    htmlGrid = htmlGrid.concat('<label for="item' + lista[i].anoExercicio + parcelas[j].numero + '"></label>');
                    htmlGrid = htmlGrid.concat('</div>');
                }

                htmlGrid = htmlGrid.concat('</div>');
                htmlGrid = htmlGrid.concat('</div>');

                htmlGrid = htmlGrid.concat('</div>');
                htmlGrid = htmlGrid.concat('</div>');
            } else {
                htmlGrid = htmlGrid.concat('<div class="col s12">');
                htmlGrid = htmlGrid.concat('<div class="row">');

                htmlGrid = htmlGrid.concat('<div class="col s2 m2 l2 ano">'+ lista[i].anoExercicio + '</div>');
                htmlGrid = htmlGrid.concat('<div class="col s10 m10 l10 dividaAtiva">em Dívida Ativa, procurar a PGM</div>');

                htmlGrid = htmlGrid.concat('</div>');
                htmlGrid = htmlGrid.concat('</div>');   
            }
        }
        
        htmlGrid = htmlGrid.concat('</div>');

        htmlGrid = htmlGrid.concat('<a href="/boleto/iptusimp.pdf" download="boleto" ng-click="ValidarAtendimento();" class="btn btnConfirmar waves-effect waves-light">');
        htmlGrid = htmlGrid.concat('Confirmar');
        htmlGrid = htmlGrid.concat('</a>');
        htmlGrid = htmlGrid.concat('</span>');
        htmlGrid = htmlGrid.concat('</div>');
        htmlGrid = htmlGrid.concat('</div>');
        htmlGrid = htmlGrid.concat('</div>');
        htmlGrid = htmlGrid.concat('</div>');

        $(htmlGrid).insertBefore("#ancora");
        compiler($("#chat"))(scope);
        MoverScrollParaBaixo();
    }

    function ConsultaComMuitosRegistros(){
        var divBot = '<div class="row bot"><div class="col s3 m2 l1 avatar"><img src="/img/avatar.png" /></div><div class="col s9 m6 l11 mensagem"><div class="row"><div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 m12 l4"><span class="mensagemBot">Desculpe, mas houve um erro na consulta</span></div></div></div></div>';
        $(divBot).insertBefore("#ancora");
    };

};