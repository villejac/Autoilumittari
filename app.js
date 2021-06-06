// Luodaan muuttujat
let form = document.getElementById('form');
let matka = document.getElementById('matka');
let nopeus1 = document.getElementById('nopeus1');;
let nopeus2 = document.getElementById('nopeus2');
let nopeus1Vastaus = document.getElementById('nopeus1-vastaus');;
let nopeus2Vastaus = document.getElementById('nopeus2-vastaus');
let erotusVastaus = document.getElementById('erotus-vastaus');

// Luodaan sovellus lomakkeen sisälle
form.onsubmit = function() {

    // Funktio joka muuttaa ajan minuuteiksi ja tunneiksi
    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + " h ja " + rminutes + " min.";
        }
        
        
    // Lasketaan matkaan kuluva aika ja muunnetaan yksiköt metreiksi/sekunneiksi ja tuodaan vastaus minuutteina/tunteina ja minuutteina. Y tarkoittaa sekunteja
    let y = Math.round(((matka.value * 1000) / (nopeus1.value * 0.277777778) + Number.EPSILON) * 100) / 100;
    let z = y / 60;
    
    //  x tarkoittaa sekunteja
    let x = Math.round(((matka.value * 1000) / (nopeus2.value * 0.277777778) + Number.EPSILON) * 100) / 100;
    let c = x / 60;
    


    // Jos aika on tunti tai alle, niin näytetään minuutteina ja muuten tunteina + minuutteina
    if(Math.round(z) <= 60) {
        nopeus1Vastaus.innerHTML = "Nopeudella 1: " + Math.round(z) + 'min.';
  
    } else {
        nopeus1Vastaus.innerHTML = "Nopeudella 1: " + timeConvert(Math.round(z));
        
    }
    if(Math.round(c) <= 60) {
        nopeus2Vastaus.innerHTML = "Nopeudella 2: " + Math.round(c) + 'min.';
    } else {
        nopeus2Vastaus.innerHTML = "Nopeudella 2: " + timeConvert(Math.round(c));
    }

   
    // Selvitetään kumpi luku on isompi ja kumpi pienempi, jotta voidaan laskea kuinka paljon eroa eri nopeuksilla on ajallisesti
    var obj = { y, x };

    var max= Number.NEGATIVE_INFINITY;
    var max_key=undefined; 
    
    var min= Number.POSITIVE_INFINITY;
    var min_key=undefined; 
    

    for(var key in obj){
    if(obj[key] > max)
    {
        max_key = key;
        max = obj[key];
    }
    if(obj[key] < min)
    {
        min_key = key;
        min = obj[key];
    }
    }
    
    /*
    console.log("The key with the maximum value is: "+max_key+" whose value is: "+max);
    console.log("The key with the minimun value is: "+min_key+" whose value is: "+min);*/

    // Erotus sekunteina -> muutetaan minuuteiksi
    let erotus = (max - min) / 60;
    






        // Selvitetään kumpi nopeus on nopeampi ja tuodaan se näkyviin sovellukseen
        if(Number(nopeus1.value) > Number(nopeus2.value)) {
          
                // Jos aika on tunti tai alle, niin näytetään minuutteina ja muuten tunteina + minuutteina
                if(Math.round(erotus) <= 60) {
                    erotusVastaus.innerHTML = "Nopeus 1 on " + Math.round(erotus) + "min. nopeampi";
                } else {
                    erotusVastaus.innerHTML = "Nopeus 1 on " + timeConvert(Math.round(erotus)) + " nopeampi";
                    
                }
        }
        else if(Number(nopeus1.value) == Number(nopeus2.value)) {

            erotusVastaus.innerHTML = "";
        } 
        else {
            

                // Jos aika on tunti tai alle, niin näytetään minuutteina ja muuten tunteina + minuutteina
                if(Math.round(erotus) <= 60) {
                    erotusVastaus.innerHTML = "Nopeus 2 on " + Math.round(erotus) + "min. nopeampi";
                } else {
                    erotusVastaus.innerHTML = "Nopeus 2 on " + timeConvert(Math.round(erotus)) + " nopeampi";
                    
                }
            
        }






    // Bensankulutus

    let nopeus1Kulutus = document.getElementById('nopeus1-kulutus');
    let nopeus2Kulutus = document.getElementById('nopeus2-kulutus');
    let erotusKulutus = document.getElementById('erotus-kulutus');

    // Haetaan autolistan vetolaatikko
    let valinta = document.getElementById('autot');

    // Selvitetään mikä auto on valittuna
    if (valinta.value === 'Auto A') {

        /* Lasketaan kulutus kaavalla: 1,009 potenssiin nopeus * litrakulutus sadalla(1km/h). Saadaan kulutus kullakin nopeudella sadalla kilometrillä.
            matka * edellinen vastaus / sadalla niin saadaan lopullinen vastaus eri nopeuksilla */
        let nopeus1KulutusVastaus = (Math.pow(1.009, nopeus1.value) * 3);
        let lopullinenKulutus1 = (matka.value * nopeus1KulutusVastaus) / 100;
        nopeus1Kulutus.innerHTML = "Nopeudella 1: " + Math.round(lopullinenKulutus1 * 100) / 100 + 'l';

        let nopeus2KulutusVastaus = (Math.pow(1.009, nopeus2.value) * 3);
        let lopullinenKulutus2 = (matka.value * nopeus2KulutusVastaus) / 100;
        nopeus2Kulutus.innerHTML = "Nopeudella 2: " + Math.round(lopullinenKulutus2 * 100) / 100 + 'l';

 

      
     
        // Pyritään välttämään pyöristyserot tulosten näyttämisessä pyöristämällä tässä vaiheessa kulutuslukuja
        let pyoristettyLopullinenKulutus1 = Math.round((( lopullinenKulutus1 ) + Number.EPSILON) * 100) / 100
        let pyoristettyLopullinenKulutus2 = Math.round((( lopullinenKulutus2 ) + Number.EPSILON) * 100) / 100
         
            // Selvitetään kumpi kulutus on isompi luku, jotta voidaan suorittaa erotuksen laskeminen
            var obj2 = { pyoristettyLopullinenKulutus1, pyoristettyLopullinenKulutus2 };

            var max2= Number.NEGATIVE_INFINITY;
            var max_key2=undefined; 
            
            var min2= Number.POSITIVE_INFINITY;
            var min_key2=undefined; 
            
        
            for(var key2 in obj2){
            if(obj2[key2] > max2)
            {
                max_key2 = key2;
                max2 = obj2[key2];
            }
            if(obj2[key2] < min2)
            {
                min_key2 = key2;
                min2 = obj2[key2];
            }
            }
        

            // Erotus
            let erotus2 = (max2 - min2);
        



        // Lasketaan kulutuksen erotus
        
        
        if(lopullinenKulutus1 > lopullinenKulutus2) {

            erotusKulutus.innerHTML = "Nopeus 1 kuluttaa " + Math.round((( erotus2 ) + Number.EPSILON) * 100) / 100 + "l enemmän";

        } else if(lopullinenKulutus1 == lopullinenKulutus2) {

            erotusKulutus.innerHTML = "";

        } else {

            erotusKulutus.innerHTML = "Nopeus 2 kuluttaa " + Math.round((( erotus2 ) + Number.EPSILON) * 100) / 100 + "l enemmän";
        }
 
        


  

    } else if (valinta.value === 'Auto B') {

        let nopeus1KulutusVastaus = (Math.pow(1.009, nopeus1.value) * 3.5);
        let lopullinenKulutus1 = (matka.value * nopeus1KulutusVastaus) / 100;
        nopeus1Kulutus.innerHTML = "Nopeudella 1: " + Math.round((( lopullinenKulutus1 ) + Number.EPSILON) * 100) / 100 + 'l';

        let nopeus2KulutusVastaus = (Math.pow(1.009, nopeus2.value) * 3.5);
        let lopullinenKulutus2 = (matka.value * nopeus2KulutusVastaus) / 100;
        nopeus2Kulutus.innerHTML = "Nopeudella 2: " + Math.round((( lopullinenKulutus2 ) + Number.EPSILON) * 100) / 100 + 'l';

        // Pyritään välttämään pyöristyserot tulosten näyttämisessä pyöristämällä tässä vaiheessa kulutuslukuja
        let pyoristettyLopullinenKulutus1 = Math.round((( lopullinenKulutus1 ) + Number.EPSILON) * 100) / 100
        let pyoristettyLopullinenKulutus2 = Math.round((( lopullinenKulutus2 ) + Number.EPSILON) * 100) / 100
             
        // Selvitetään kumpi kulutus on isompi luku, jotta voidaan suorittaa erotuksen laskeminen
            var obj2 = { pyoristettyLopullinenKulutus1, pyoristettyLopullinenKulutus2 };

             var max2= Number.NEGATIVE_INFINITY;
             var max_key2=undefined; 
             
             var min2= Number.POSITIVE_INFINITY;
             var min_key2=undefined; 
             
         
             for(var key2 in obj2){
             if(obj2[key2] > max2)
             {
                 max_key2 = key2;
                 max2 = obj2[key2];
             }
             if(obj2[key2] < min2)
             {
                 min_key2 = key2;
                 min2 = obj2[key2];
             }
             }
         
 
             // Erotus
             let erotus2 = (max2 - min2);
            
       
                // Lasketaan kulutuksen erotus
        
        if(lopullinenKulutus1 > lopullinenKulutus2) {

            erotusKulutus.innerHTML = "Nopeus 1 kuluttaa " + Math.round((( erotus2 ) + Number.EPSILON) * 100) / 100 + "l enemmän";

        } else if(lopullinenKulutus1 == lopullinenKulutus2) {

            erotusKulutus.innerHTML = "";

        } else {

            erotusKulutus.innerHTML = "Nopeus 2 kuluttaa " + Math.round((( erotus2 ) + Number.EPSILON) * 100) / 100 + "l enemmän";
        }


     


    } else {

        let nopeus1KulutusVastaus = (Math.pow(1.009, nopeus1.value) * 4);
        let lopullinenKulutus1 = (matka.value * nopeus1KulutusVastaus) / 100;
        nopeus1Kulutus.innerHTML = "Nopeudella 1: " + Math.round((( lopullinenKulutus1 ) + Number.EPSILON) * 100) / 100 + 'l';

        let nopeus2KulutusVastaus = (Math.pow(1.009, nopeus2.value) * 4);
        let lopullinenKulutus2 = (matka.value * nopeus2KulutusVastaus) / 100;
        nopeus2Kulutus.innerHTML = "Nopeudella 2: " + Math.round((( lopullinenKulutus2 ) + Number.EPSILON) * 100) / 100 + 'l';

        let pyoristettyLopullinenKulutus1 = Math.round((( lopullinenKulutus1 ) + Number.EPSILON) * 100) / 100
        let pyoristettyLopullinenKulutus2 = Math.round((( lopullinenKulutus2 ) + Number.EPSILON) * 100) / 100

                // Selvitetään kumpi kulutus on isompi luku, jotta voidaan suorittaa erotuksen laskeminen
                var obj2 = { pyoristettyLopullinenKulutus1, pyoristettyLopullinenKulutus2 };

                var max2= Number.NEGATIVE_INFINITY;
                var max_key2=undefined; 
                
                var min2= Number.POSITIVE_INFINITY;
                var min_key2=undefined; 
                
            
                for(var key2 in obj2){
                if(obj2[key2] > max2)
                {
                    max_key2 = key2;
                    max2 = obj2[key2];
                }
                if(obj2[key2] < min2)
                {
                    min_key2 = key2;
                    min2 = obj2[key2];
                }
                }
            
    
                // Erotus
                let erotus2 = (max2 - min2);
                


                // Lasketaan kulutuksen erotus
        
        if(lopullinenKulutus1 > lopullinenKulutus2) {

            erotusKulutus.innerHTML = "Nopeus 1 kuluttaa " + Math.round((( erotus2 ) + Number.EPSILON) * 100) / 100 + "l enemmän";

        } else if(lopullinenKulutus1 == lopullinenKulutus2) {

            erotusKulutus.innerHTML = "";

        } else {

            erotusKulutus.innerHTML = "Nopeus 2 kuluttaa " + Math.round((( erotus2 ) + Number.EPSILON) * 100) / 100 + "l enemmän";
        }


       

    }


















    // Kirjoitetaan kesto ja kulutus -otsikot
    document.getElementById('matkan-kesto').innerHTML = "Matkan kesto"
    document.getElementById('matkan-kulutus').innerHTML = "Kulutus"

    

    // Autoanimaatio ku painetaan submit-nappia
    document.getElementById("car-div").classList.add("anim");

    // Poistetaan animaatio-luokka, jotta animaatio tapahtuu uudestaan ilman, että sivua tarvitsee päivittää
    /*document.getElementById('submit-btn').onclick = function() {
        setTimeout(
          function() {
            document.getElementById("car-div").classList.remove("anim");
          }, 10000);
      }*/



    // Estetään lomakkeen lähteminen
    return false;
  }
