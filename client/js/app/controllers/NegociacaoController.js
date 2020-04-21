class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        let self = this;
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            get(target, prop, receiver) {

                if (["adicionar", "apagar"].includes(prop) && typeof (target[prop]) == typeof (Function)) {
                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }

                return Reflect.get(target, prop, receiver);

            }
        });

        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagem"));
        this._mensagemView.update(this._mensagem);
    }

    adicionar(event) {

        event.preventDefault();

        this._listaNegociacoes.adicionar(this._criarNegociacao());

        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._mensagemView.update(this._mensagem);

        this._limparCampos();
    }

    apagar(event) {

        this._listaNegociacoes.apagar();

        this._mensagem.texto = "Negociações removidas com sucesso!";
        this._mensagemView.update(this._mensagem);
    }

    _criarNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limparCampos() {
        this._inputQuantidade.value = "1";
        this._inputValor.value = "0.0";
        this._inputData.value = "";
        this._inputData.focus();
    }

}