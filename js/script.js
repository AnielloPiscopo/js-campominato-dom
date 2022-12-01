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
        // ? CREAZIONE E INSERIMENTO NEL DOM DEL CONTENITORE GRIGLIA
        const gridContainer = getAnElement('div','my-grid d-flex flex-wrap align-items-center');
        
        mainElement.append(gridContainer);

        
        // ? CREAZIONE DI UN SINGOLO ELEMENTO DELLA GRIGLIA
        for(let i=1 ; i<=100 ; i++){
            // * Creazione e inserimento del singolo elemento della griglia
            let gridSingleElement = getAnElement('div' , 'my-square align-items-center justify-content-center d-flex');

            gridSingleElement.innerHTML = i;

            gridContainer.append(gridSingleElement);

            // * Aggiunta del evento per ogni singolo elemento della griglia
            gridSingleElement.addEventListener('click' , function(){
                console.log(i);

                gridSingleElement.classList.toggle('active');
            })
        }
    }
    
    else{
        mainElement.firstElementChild.remove();
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