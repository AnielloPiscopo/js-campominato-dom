/* -------------------------------------------------------------------
INIZIALIZZAZIONI E DICHIARAZIONI GLOBALI */

// * INIZIALIZZAZIONI

// ? PRELIEVO DAL DOM
const mainElement = document.querySelector('main');
const playBtn = document.querySelector('.my-btn');





/* --------------------------------------------------------------------
CODICE PRINCIPALE */

// * EVENTI
playBtn.addEventListener('click' , function(){
    if(mainElement.innerText === ''){
        // ? DICHIARAZIONI E INIZIALIZZAZIONI INIZIALI
        const elemenstWithBomb = [];
        let score = 0;
        let isWinning = true;
        let i = 0;


        // ? RICHIESTA DEL NUMERO DI BOMBE ALL'UTENTE PRESENTI NEL GIOCO
        let numberOfBombs = parseInt(prompt('Quante bombe vuoi inserire?'));
        let remainingNumbers = 100 - numberOfBombs;


        // ? INSIMENTO DELLE INFO DELLA PARTITA NEL DOM

        // * Creazione delle costanti
        const infoMatch = getAnElement('div','my-info d-flex justify-content-between');
        const scoreContainer = getAnElement('span' , 'my-score-number');
        const remainingNumbersContainer = getAnElement('span','my-remaining-numbers');
        const numberOfBombsContainer = getAnElement('span','my-bombs-number')

        // * Inserimento del contenuto
        scoreContainer.innerHTML = 'Punteggio: 0';
        numberOfBombsContainer.innerHTML = `Bombe in partita:${numberOfBombs}`;
        remainingNumbersContainer.innerHTML = `Numeri rimanenti:`;

        // * Inserimento nel DOM
        infoMatch.append(scoreContainer);
        scoreContainer.after(numberOfBombsContainer);
        numberOfBombsContainer.after(remainingNumbersContainer);
        mainElement.append(infoMatch);


        // ? CAMBIAMENTO DEL CONTENUTO DEL BOTTONE
        playBtn.textContent ='Restart';


        // ? CREAZIONE E INSERIMENTO NEL DOM DELLA GRIGLIA
        const gridContainer = getAnElement('div','my-grid d-flex flex-wrap align-items-center');
        
        mainElement.append(gridContainer);

        
        // ? CREAZIONE DELLE BOMBE
        while(i<numberOfBombs){
            let elementOfTheListOfBombs = getARandomNumber(1 , 100);
            
            if(!elemenstWithBomb.includes(elementOfTheListOfBombs)){
                elemenstWithBomb.push(elementOfTheListOfBombs);
                i++;
            }
        }
        console.log(elemenstWithBomb)


        // ? CREAZIONE DI UN SINGOLO ELEMENTO DELLA GRIGLIA
        for(let i=1 ; i<=100 ; i++){
            // * Creazione e inserimento del singolo elemento della griglia
            let gridSingleElement = getAnElement('div' , 'my-square align-items-center justify-content-center d-flex');
            const gridNumber = getAnElement('span','my-number');
            let bombIcon;

            gridNumber.innerHTML = i;
            gridSingleElement.append(gridNumber);

            gridContainer.append(gridSingleElement);

            // * Aggiunta delle bombe alla griglia        
            if(elemenstWithBomb.includes(i)){
                bombIcon = getAnElement('i','fa fa-bomb my-icon d-none');
                gridSingleElement.append(bombIcon);
            }

            // * Aggiunta del evento per ogni singolo elemento della griglia
            gridSingleElement.addEventListener('click' , function(){
                if(isWinning){
                    gridSingleElement.classList.add('my-active');

                    if(elemenstWithBomb.includes(i)){
                        gridSingleElement.classList.add('my-failure');
                        alert('BOOOOOM!\nHai perso deficiente.');
                        
                        gridNumber.classList.add('d-none');
                        bombIcon.classList.remove('d-none');
                        
                        isWinning = false;
                        infoMatch.innerHTML = '<strong class="w-100 text-center text-uppercase">Hai perso</strong>'
                    }
                    else if(!gridSingleElement.classList.contains('my-point-number')){
                            gridSingleElement.classList.add('my-point-number');
                            score++;
                            scoreContainer.innerHTML = `Punteggio:${score}`;
                            remainingNumbers--;
                            remainingNumbersContainer.innerHTML = `Numeri rimanenti:${remainingNumbers}`;
                    }

                    
                    if(remainingNumbers === 0){
                        isWinning = false;
                        alert('HAI VINTO!!11!!11!!11!!!1!!')
                        infoMatch.innerHTML = `<strong class="w-100 text-center text-uppercase">Hai vinto</strong>`
                    }
                }else if(!isWinning && remainingNumbers!=0){
                    alert('Devi resettare');
                }
            })
        }
    }
    
    else{
        mainElement.firstElementChild.remove();
        mainElement.lastElementChild.remove();
        playBtn.textContent = 'Play';
    }
})





/* ------------------------------------------------------------------------
FUNZIONI */

// * FUNZIONE PER CREARE UN ELEMENTO CON UNA O PIU' CLASSI
function getAnElement(element , elementClasses){
    let htmlElement = document.createElement(element);

    htmlElement.className = elementClasses;

    return htmlElement;
}



// * FUNZIONE PER GENERARE UN NUMERO CASUALE
function getARandomNumber(minValue , maxValue){
    const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    return randomNumber;
}