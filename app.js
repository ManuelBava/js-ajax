// DOM REFS
const listEl = document.getElementById('main-list');
const btnFetch = document.getElementById('fetch');
const spinner = document.getElementById('loading-spinner');
const containerMails = document.getElementById('container-mails');

// SETUP API
const endpoint = 'https://flynn.boolean.careers/exercises/api/random/mail';


async function getMails() {
    try {
        // Mostra lo spinner (nel caso fosse stato nascosto in precedenza)
        spinner.classList.remove('d-none');

        // CHIAMATA HTTP ASYNC con await specifichiamo che non andremo avanti nel corpo della funzione finchè non otterremo risposta dal server
        const mails = [];
        for (let i = 0; i < 10; i++) {
            const response = await fetch(endpoint);
            const data = await response.json();
            mails.push(data.response);
        }
        mails.forEach(mail => {
            listEl.innerHTML += `<li class="text-center"><p>${mail}</p></li>`;
        });
    } catch (errore) {
        // Gestione dell'errore se la chiamata fallisce
        console.error("Errore durante il caricamento:", errore);
        listEl.innerHTML = '';
        containerMails.innerHTML = `<p class="text-danger">Impossibile caricare i contenuti.</p>`;
    } finally {
        // Nascondi lo spinner usando la classe 'd-none' di Bootstrap
        spinner.classList.add('d-none');
    }
};


getMails();

btnFetch.addEventListener('click', event => {
    listEl.innerHTML = '';
    getMails();
});