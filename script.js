let order = []; //Ordem aleatória que irá acender durante o jogo
let clickedOrder = []; //Ordem que foi clicado
let score = 0;

// 0 - Verde
// 1 - Vermelho
// 2 - Amarelo
// 3 - Azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

//Função para sortear entre o 0 e 3
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    //Math.floor para arredondar o númer o o random multiplicado por quatro pois sempre será um número de 0 a 3
    //Atribuir o número gerado ao próximo da ordem que irá vir
    order[order.length] = colorOrder;
    clickedOrder = [];

    //Acender a cor que corresponde a luz do que foi sorteado
    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}
//Acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(()=>{
        setTimeout(() => {
        element.classList.add('selected');
        }, number - 250);
        setTimeout(() => {
        element.classList.remove('selected');
        }, number);
    },500);
    
}

//Checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

 //Função para o click do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);

}

//Função que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//Função para próximo nível do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//Função para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//Função de início do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

//Eventos de clicks para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//início do Jogo
playGame();