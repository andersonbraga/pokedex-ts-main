import { PokemonService } from '../../services/pokemon.service';
import './tela-inicio.css';
export class TelaInicio {
    constructor() {
        this.pokemonService = new PokemonService();
        this.registrarElementos();
        this.registrarEventos();
        this.pokemonService.selecionarPokemons()
            .then(pokemons => this.gerarGridPokemons(pokemons));
    }
    gerarGridPokemons(pokemons) {
        const pnlGrid = document.createElement('div');
        pnlGrid.classList.add('grid-pokemons');
        for (let pokemon of pokemons) {
            const card = this.obterCard(pokemon);
            pnlGrid.appendChild(card);
        }
        this.pnlConteudo.appendChild(pnlGrid);
    }
    obterCard(pokemon) {
        const id = document.createElement("p");
        const imagem = document.createElement("img");
        const nomePokemon = document.createElement("p");
        id.textContent = pokemon.id.toString();
        nomePokemon.textContent = pokemon.nome;
        imagem.src = pokemon.spriteUrl;
        const cardPokemon = document.createElement('div');
        cardPokemon.classList.add('card-pokemon');
        cardPokemon.appendChild(id);
        cardPokemon.appendChild(imagem);
        cardPokemon.appendChild(nomePokemon);
        return cardPokemon;
    }
    registrarElementos() {
        this.formPrincipal = document.getElementById("formPrincipal");
        this.txtPesquisa = document.getElementById("txtPesquisa");
        this.btnLimpar = document.getElementById("btnLimpar");
        this.pnlConteudo = document.getElementById("pnlConteudo");
    }
    registrarEventos() {
        this.formPrincipal
            .addEventListener('submit', (sender) => this.buscar(sender));
        this.btnLimpar
            .addEventListener('click', () => this.limparCard());
    }
    buscar(sender) {
        sender.preventDefault();
        if (!this.txtPesquisa.value)
            return;
        const nome = this.txtPesquisa.value;
        this.txtPesquisa.value = '';
        this.limparCard();
        this.pesquisarPokemonPorNome(nome);
    }
    limparCard() {
        var _a;
        (_a = this.pnlConteudo.querySelector('.card-pokemon')) === null || _a === void 0 ? void 0 : _a.remove();
    }
    pesquisarPokemonPorNome(nome) {
        this.pokemonService.selecionarPokemonPorNome(nome)
            .then(poke => this.gerarCard(poke))
            .catch((erro) => this.exibirNotificacao(erro));
    }
    gerarCard(pokemon) {
        const lblId = document.createElement("p");
        const lblNome = document.createElement("p");
        const imgSprite = document.createElement("img");
        lblId.textContent = pokemon.id.toString();
        lblNome.textContent = pokemon.nome;
        imgSprite.src = pokemon.spriteUrl;
        const pnlPokemon = document.createElement('div');
        pnlPokemon.classList.add('card-pokemon');
        pnlPokemon.appendChild(lblId);
        pnlPokemon.appendChild(lblNome);
        pnlPokemon.appendChild(imgSprite);
        this.pnlConteudo.appendChild(pnlPokemon);
    }
    exibirNotificacao(erro) {
        const divNotificacao = document.createElement('div');
        divNotificacao.textContent = erro.message;
        divNotificacao.classList.add('notificacao');
        divNotificacao
            .addEventListener('click', (sender) => {
            sender.target.remove();
        });
        document.body.appendChild(divNotificacao);
        setTimeout(() => {
            divNotificacao.remove();
        }, 5000);
    }
}
window.addEventListener('load', () => new TelaInicio());
