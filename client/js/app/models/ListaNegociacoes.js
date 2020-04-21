class ListaNegociacoes {

    constructor() {    
        this._negociacoes = [];
    }

    adicionar(negociacao) {
        this._negociacoes.push(negociacao);
    }

    apagar() {
        this._negociacoes = [];
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

}