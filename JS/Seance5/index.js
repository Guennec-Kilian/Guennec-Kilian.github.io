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
        fetchCalendar("INFO2_G1_TP1.ics");
    };

    request.onupgradeneeded = (e) => {
        let db = e.target.result;
        let objectStore = db.createObjectStore('EDT', {keyPath: 'id', autoIncrement:true});
        objectStore.createIndex('summary', 'summary', {unique: false});
        objectStore.createIndex('uid', 'uid', {unique: true});
        objectStore.createIndex('loc', 'loc', {unique: false});
        objectStore.createIndex('desc', 'desc', {unique: false});
        objectStore.createIndex('evtStart', 'evtStart', {unique: false});
        objectStore.createIndex('evtEnd', 'evtEnd', {unique: false});
    };
};

function fetchCalendar(url) {
    fetch(url)
    .then((retour) => {
        if(!retour.ok){
            throw new Error(`erreur HTTP! statut: ${retour.status}`);
        }
        return retour;                         
    })
    .then((retour) =>{

        var cParser = new ICAL.ComponentParser();

        cParser.oncomplete = (e) => {

            var vCalendar = new ICAL.Component(e).getAllSubcomponent('vevent');
            vCalendar
            .forEach(event =>{
                var summary = event.getFirstPropertyValue('summary');
                var id = event.getFirstPropertyValue('uid');
                var loc = event.getFirstPropertyValue('location');
                var desc = event.getFirstPropertyValue('description');
                var evtStart = ICAL.Time.fromDateTimeString(event.getFirstPropertyValue('dtstart'));
                var evtEnd = ICAL.Time.fromDateTimeString(event.getFirstPropertyValue('dtend'));

                let newItem = 
                {
                    uid : id,
                    summary : summary,
                    loc : loc,
                    desc : desc,
                    evtStart : evtStart,
                    evtEnd : evtEnd
                };

                let transaction = db.transaction(['EDT'], 'readwrite');

                let objectStore = transaction.objectStore('EDT');

                objectStore.add(newItem);

                transaction.onsuccess = () => {
                    console.log('transaction reussi, modification apportee a la BDD');
                };

                transaction.onerror = () => {
                    console.log('transaction echoue, aucune modification apportee a la BDD');
                };

            });
        };

        cParser.process(retour);
    });
}