const form = document.querySelector("#myform");
const url = document.querySelector('#enterurl');
const submitBtn = document.querySelector('#submiturl');
const forgetBtn = document.querySelector('#forgeturl');

form.addEventListener('submit', function(e) {
    e.preventDefault();
});

submitBtn.addEventListener('click', function() {
    localStorage.setItem('url', url.value);
});

forgetBtn.addEventListener('click', function() {
    localStorage.removeItem('url');
});

let db;


window.onload = () => {
    let request = window.indexedDB.open('EDT', 1);

    request.onerror = () => {
        console.log('Erreur lors de l\'acces à la BDD');
    };

    request.onsuccess = () => {
        console.log('Ouverture de la BDD reussie');
        db = request.result;
    };

    request.onupgradeneeded = (e) => {
        let db = e.target.result;
        let objectStore = db.createObjectStore('EDT', {keyPath: 'id', autoIncrement:true});
        objectStore.createIndex('', '', {unique: false});
    };

};

var iCalendar = fetch("INFO2_G1_TP1.ics").then((retour) => {
    if(!retour.ok){
        throw new Error(`erreur HTTP! statut: ${retour.status}`);
    }
    return ICAL.parse(iCalendarData);                         
}).then((retour) =>{
    return retour;
});

console.log(iCalendar);