sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,library,JSONModel ) {
        "use strict";

        var urlObject = library.URLHelper;

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () { //onInit equivale a INITIALIZATION no ABAP
                let produto ="{}";
                let productModel = new JSONModel(produto);
                //this. no JS é igual o Me -> no ABAP pra estanciar a classe

               let view =  this.getView();
               view.setModel(productModel,"ModeloProduto");

                // alert("Meu Programa está no ar !!");
            },

            onClickImage: function (oEvent) {

                urlObject.redirect(oEvent.getSource().getSrc(), true );
            },

            onPressbuscar: function () {
                var input;
                input = this.byId("inpbusca");
                var valor = input.getValue();
                alert(valor);

                let parameters = {
                    url : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                    method: "GET",
                    async: true,
                    crossDomain: true
                };
               // promise = quando uma função retorna como parâmetro de exportação 
               // outra função
                $.ajax(parameters).done(function(response){

                    let oProdutoModel = this.getView().getModel("ModeloProduto");
                    // Clear no JS pra limpar os dados da tela quando for buscar novos dados

                    oProdutoModel.setData({});
                    oProdutoModel.refresh();
                    oProdutoModel.setData(response);
                    oProdutoModel.refresh();

                }.bind(this))// sucesso
                .fail(function(){

                }.bind(this));// exeption

                



                // Abaixo no código temos alguns exemplos de variáveis

                //variavel tipo texto - com aspas
                let material = "Agua Mineral Natural";

                //variavel do tipo numérico
                let peso = 500;
                let uom = "ml";

                // numérico com casas decimais
                let qtdsodio = 15.66;

                //booleaano - abap_bool
                let conteudoliquido = true;

                //tabela interna no JavaScript - array

                let composicao = ["bicarbonato", "magnesio", "sulfato", "brometo"];

                //estrutura - tipo com varias propriedades

                let produto = {
                    descricao: "chá verde",
                    marca: "quaker",
                    peso: 130,
                    uom: "g",
                }
            }
        });
    });
