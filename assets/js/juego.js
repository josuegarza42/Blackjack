
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugardor = 0;
let puntosComputadora = 0;

// referencias html
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

// console.log(btnPedir);

const puntosHTML = document.querySelectorAll('small');

const divJugadorCartas = document.querySelector('#jugador-cartas');
const divComputadoraCartas = document.querySelector('#computadora-cartas');

// crea una nueva baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        // deck.push(i + 'C');
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    }
    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

// esta funcion permite pedir una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'Ya no hay cartas.';
    }
    const carta = deck.pop();

    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}

// turno PC
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        // console.log(carta)
        puntosComputadora += valorCarta(carta);
        // console.log(puntosJugardor);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divComputadoraCartas.append(imgCarta);
        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana');
        } else if (puntosMinimos > 21) {
            alert('Computadora Gana');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana');
        } else {
            alert('Computadora Gana');
        }
    }, 10);
}

// eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    // console.log(carta)
    puntosJugardor += valorCarta(carta);
    // console.log(puntosJugardor);
    puntosHTML[0].innerText = puntosJugardor;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divJugadorCartas.append(imgCarta);

    if (puntosJugardor > 21) {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugardor);
    } else if (puntosJugardor === 21) {

        btnDetener.disabled = true;
        turnoComputadora(puntosJugardor);
    }
});

btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;

    turnoComputadora(puntosJugardor);
});


btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugardor = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divComputadoraCartas.innerHTML = '';
    divJugadorCartas.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});




