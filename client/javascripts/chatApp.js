var proxy = angular.module('chatApp', []);

proxy.controller('WatsonController', WatsonController);

function WatsonController($scope, $http, $compile) {
    $scope.init = function () {
        Ola();
    };

    $scope.init();

    $scope.Enviar = function () {
        var texto = $("#digiteTexto").val();
        $("#digiteTexto").val('');
        var time = new Date();
        var divPessoa = '<div class="row usuario"><div class="right"><div class="spacer"></div><div class="usuarioColunaDireita"><div class="row"><div class="col s11 hora"><span>' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 mensagemUsuario">' + texto + '</div></div></div></div></div>';
        $(divPessoa).insertBefore("#ancora");
        Conversar(texto);
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
            MoverScrollParaBaixoLinha();
        }
    };

    function Ola() {
        $http.get('/watson/Ola')
            .then(function (success) {
                var time = new Date();
                $("#contexto").val(JSON.stringify(success.data['contexto']));
                var divBot = '<div class="row bot"><div class="col s3 m2 l1 avatar"><img src="/img/avatar.png" /></div><div class="col s9 m6 l11 mensagem"><div class="row"><div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 m12 l4"><span class="mensagemBot">' + success.data['retorno'].text[0] + '</span></div></div></div></div>';
                $(divBot).insertBefore("#ancora");
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
                var divBot = '<div class="row bot"><div class="col s3 m2 l1 avatar"><img src="/img/avatar.png" /></div><div class="col s9 m6 l11 mensagem"><div class="row"><div class="col s12"><span class="hora">' + time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + '</span></div><div class="col s12 m12 l4"><span class="mensagemBot">' + success.data['retorno'].text[0] + '</span></div></div></div></div>';
                $(divBot).insertBefore("#ancora");
                                
                if(success.data['retorno'].action != null) {
                    Integrar(success.data['retorno'].action, $compile, $scope);
                }

                if(success.data['retorno'].botao != null) {
                    CriarBotoes(success.data['retorno'].botao, $compile, $scope);
                }

                MoverScrollParaBaixo(success.data['retorno'].botao != null);
            },
            function (error) {
                console.log('Error');
            });
    };

    function Integrar(acao, compiler, scope) {
        $http.post('/integracao/integrar', { action: acao, contexto: JSON.parse($("#contexto").val()) })
            .then(function (success) {
                AvaliarRetornoIntegracao(success.data, compiler, scope);
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
            divBotao = '<div class="row resposta"><div class="col s9 offset-s3 m10 offset-m2 l11 offset-l1"><a href="#" ng-click="EnviarBotao($event);"><img id="Sim" src="img/btnSim.png" /></a><a href="#" ng-click="EnviarBotao($event);"><img id="Nao" src="img/btnNao.png" /></a></div></div>';
        } else if(tipo == "NegativoPositivo") {
            divBotao = '<div class="row resposta"><div class="col s9 offset-s3 m10 offset-m2 l11 offset-l1"><a href="#" id="Sim" ng-click="EnviarBotao($event);" class="positive">Sim</a><a href="#" id="Nao" ng-click="EnviarBotao(Nao);" class="negative">Não</a></div></div>';
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

    function MoverScrollParaBaixo(botao) {
        var heightMain = $("#chat").css("height").replace("px", "");

        if (botao) {
            heightMain = parseInt(heightMain) + 250;
        } else {
            heightMain = parseInt(heightMain) + 200;
        }

        $("#chat").css("height", heightMain + "px")
        $('html,body').animate({ scrollTop: $("#ancora").offset().top - 60 }, 800);
    };

    function MoverScrollParaBaixoLinha() {
        var heightMain = $("#chat").css("height").replace("px", "");
        heightMain = parseInt(heightMain) + 150;
        $("#chat").css("height", heightMain + "px")
        $('html,body').animate({ scrollTop: $("#ancora").offset().top - 60 }, 800);
    };

    function AvaliarRetornoIntegracao(retorno, compiler, scope) { 
        if (retorno.codigo == 0) {
            CriarGrid(retorno.resultado, retorno.filtro, compiler, scope);
        } else if (retorno.codigo == 1) {
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
        htmlGrid = htmlGrid.concat('<select ng-change="SelecionarItem()" ng-model="selectedItem" class="browser-default" multiple>');
        
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
        MoverScrollParaBaixo(true);
        $("#listaGrid").val(JSON.stringify(lista));
    }

    function ConsultaComMuitosRegistros(){
        //TODO: rever o que fazer, chamar o watson e refinar a pesquisa? ou mostrar mesmo assim?
        console.log("muitos registros no retorno");
    };

};