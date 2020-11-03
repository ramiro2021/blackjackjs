
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0, puntosComputadora = 0;



//referencias
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


// crea la baraja de manera aleatoria
const crearDeck = () => {
    // lleno el deck de las cartas del 2 al 10 junto con su tipo
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }

    }
    // lleno el deck de las cartas del As a la K junto con su tipo
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }


    // underscore shuffle devuelve el array ordenado de manera aleatoria
    deck = _.shuffle(deck);



    return deck;
}

// retorna una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;

}


// asignar valor a la carta
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : parseInt(valor);

    // console.log({ valor })

    // if (isNaN(valor)) {
    //     // no es un numero 
    //     puntos = (valor === 'A') ? 11 : 10;

    // } else {
    //     // es un numero
    //     puntos = parseInt(valor);
    // }

    // console.log(puntos)
}


crearDeck();

// turno de la computadora

const turnoComputadora = (puntosMinimos) => {

    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);

        puntosHTML[1].innerText = puntosComputadora;


        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {


        if (puntosComputadora === puntosMinimos) {
            alert('Empate');
        } else if (puntosMinimos > 21) {
            alert('Perdiste, gano la computadora');
        } else if (puntosComputadora > 21) {
            alert('Ganaste, Felicitaciones!');
        } else {
            alert('Perdiste, gano la computadora');
        }
    }, 500);
}

// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;


    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);


    if (puntosJugador > 21) {
        console.warn('Lo siento, perdiste :c');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21 exactos!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }




});


btnDetener.addEventListener('click', () => {

    btnDetener.disabled = true;

    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
});


btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});

