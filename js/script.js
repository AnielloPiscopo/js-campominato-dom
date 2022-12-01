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
        let numberOfBombs = 16;
        const elemenstWithBomb = [];
        let score = 0;


        // ? INSIMENTO DELLE INFO DELLA PARTITA NEL DOM

        // * Creazione delle costanti
        const infoMatch = getAnElement('div','info');
        const scoreContainer = getAnElement('span' , 'score-number');
        const numberOfBombsContainer = getAnElement('span','bombs-number')

        // * Inserimento del contenuto
        scoreContainer.innerHTML = 'Punteggio: 0';
        numberOfBombsContainer.innerHTML = `Bombe in partita:${numberOfBombs};`

        // * Inserimento nel DOM
        infoMatch.append(scoreContainer);
        scoreContainer.after(numberOfBombsContainer);
        mainElement.append(infoMatch);


        // ? CAMBIAMENTO DEL CONTENUTO DEL BOTTONE
        playBtn.textContent ='Restart';


        // ? CREAZIONE E INSERIMENTO NEL DOM DELLA GRIGLIA
        const gridContainer = getAnElement('div','my-grid d-flex flex-wrap align-items-center');
        
        mainElement.append(gridContainer);

        
        // ? CREAZIONE DELLE BOMBE
        for(let i=0 ; i<numberOfBombs ; i++){
            let elementsOfTheListOfBombs = getARandomNumber(1 , 100);
            elemenstWithBomb.push(elementsOfTheListOfBombs);
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
                console.log(i);

                gridSingleElement.classList.add('my-active');

                if(elemenstWithBomb.includes(i)){
                    gridSingleElement.classList.add('my-failure');
                    alert('BOOOOOM!\nHai perso deficiente.');
                    
                    gridNumber.classList.add('d-none');
                    bombIcon.classList.remove('d-none');
                }
                else if(!gridSingleElement.classList.contains('my-point-number')){
                        gridSingleElement.classList.add('my-point-number');
                        score++;
                        scoreContainer.innerHTML = `Punteggio:${score}`;
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