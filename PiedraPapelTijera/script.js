const PIEDRA = "icon-rock";
const PAPEL = "icon-paper";
const TIJERA = "icon-scissors";

const EMPATE = 0;
const GANASTE = 1;
const PERDISTE = 2;

let isPlaying = false;

// Se obtienen los elementos del DOM 
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");

// Se agrega el evento click a los botones
rockBtn.addEventListener("click", () => {
    play(PIEDRA);
});
paperBtn.addEventListener("click", () => {
    play(PAPEL);
});
scissorsBtn.addEventListener("click", () => {
    play(TIJERA);
});

// Se crea la funcion play, que se encarga de todo el juego
function play(userOption) {
    if(isPlaying) return;

    isPlaying = true;

    userImg.src = "img/" + userOption + ".svg";

    resultText.innerHTML = "...Jugando...";

    const interval = setInterval(function(){
        const oponente = opcionAleatoriaOponente();
        machineImg.src = "img/" + oponente + ".svg";
    }, 200);

    setTimeout(function () {

        clearInterval(interval);

        const oponente = opcionAleatoriaOponente();
        const result = calcResult(userOption, oponente);

        machineImg.src = "img/" + oponente + ".svg";

        switch (result) {
            case EMPATE:
                resultText.innerHTML = "Haz empatado :|";
                break;
            case GANASTE:
                resultText.innerHTML = "Ganaste :)";
                break;
            case PERDISTE:
                resultText.innerHTML = "Perdiste :(";
                break;
        }
        isPlaying = false;
    }, 2000);
}

function opcionAleatoriaOponente() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return PIEDRA;
        case 1:
            return PAPEL;
        case 2:
            return TIJERA;
    }
}

function calcResult(userOption, oponente) {
    if (userOption === oponente) {
        return EMPATE;

    } else if (userOption === PIEDRA) {

        if (oponente === PAPEL) return PERDISTE;
        if (oponente === TIJERA) return GANASTE;

    } else if (userOption === PAPEL) {

        if (oponente === TIJERA) return PERDISTE;
        if (oponente === PIEDRA) return GANASTE;

    } else if (userOption === TIJERA) {

        if (oponente === PIEDRA) return PERDISTE;
        if (oponente === PAPEL) return GANASTE;

    }
}