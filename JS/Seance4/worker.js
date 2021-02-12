function myRandom(max){
    return Math.round(Math.random()*max)
}

var getteur;

var HttpGetter = function(){
    this.get = function(url, funcRetour){
        fetch(url).then((retour) => {
            if(!retour.ok){
                throw new Error(`erreur HTTP! statut: ${retour.status}`);
            }
            return retour.json();                         
        }).then((retour) =>{
            funcRetour(retour);
        });
    }
};

getteur = new HttpGetter()

var limite = myRandom(100);
var z = 0;
var waitID = self.setInterval(() => {

    z = z + 1;
    
    if(z % limite === 0){
        getteur.get(`https://stwom.herokuapp.com/600`, (retour)=> { 
            postMessage(retour);
            limite = myRandom(100);
        });
    }

    if(z === 10000){
        self.clearInterval(waitID);
    }
}, 1);