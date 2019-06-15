var schools;
function get(url) {
    return new Promise(resolve => {
    let req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if (req.status >= 200 && req.status < 400) {
                        resolve(JSON.parse(req.responseText));
                    } 
                }
            };
    req.send();
    });
} 
function getWriters(){
    let url = "https://query.wikidata.org/sparql?query=SELECT%20%3FitemLabel%20%3Fimage%20WHERE%20%7B%0A%20%3Fitem%20wdt%3AP19%20wd%3AQ12273.%0A%20%3Fitem%20wdt%3AP31%20wd%3AQ5.%0A%20%3Fitem%20wdt%3AP106%20wd%3AQ36180.%0A%20%3Fitem%20wdt%3AP18%20%3Fimage%0A%20SERVICE%20wikibase%3Alabel%20%7B%0A%09bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%20.%0A%7D%0A%20%20%7D%0A%0A&format=json";
    proccessResponse(url,"writers");
    let button = document.getElementsByClassName('writers_button')[0];
    button.disabled = true;
    button.className="disabled";
}
function getNintendoGames(){
    let url = "https://query.wikidata.org/sparql?query=SELECT%20%3FitemLabel%20%3Ffoto%20WHERE%20%7B%0A%20%3Fitem%20wdt%3AP31%20wd%3AQ7889%20.%0A%20%3Fitem%20wdt%3AP18%20%3Ffoto%20.%0A%20%3Fitem%20wdt%3AP123%20wd%3AQ8093.%0A%20%3Fitem%20wdt%3AP577%20%3Fdate.%0A%20FILTER%28%3Fdate%20%3E%20%222015-05-23T10%3A20%3A13%2B05%3A30%22%5E%5Exsd%3AdateTime%29%0A%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%7D%0A%0A&format=json";
   proccessResponse(url,"games");
   let button = document.getElementsByClassName('games_button')[0];
   button.disabled = true;
   button.className="disabled";
}
function getSchools(){
    let url = "https://query.wikidata.org/sparql?query=SELECT%20%3FitemLabel%20%3Furl%20WHERE%20%7B%0A%20%3Fitem%20wdt%3AP31%20wd%3AQ3914%20.%0A%20%3Fitem%20wdt%3AP856%20%3Furl%20.%0A%20%3Fitem%20wdt%3AP131%20wd%3AQ12273%0A%20SERVICE%20wikibase%3Alabel%20%7B%0A%09bd%3AserviceParam%20wikibase%3Alanguage%20\"en\"%20.%0A%7D%0A%20%20%7D%0A%0A&format=json";
   proccessResponse(url,"schools");
   let button = document.getElementsByClassName('schools_button')[0];
   button.disabled = true;
   button.className="disabled";
}

function proccessResponse(url,type){
    let response = get(url);
    response.then(function response(data){
        schools=data;
        data.results.bindings.forEach((element,index) => {
            if(type=="writers"){
                createCards(element.image.value, element.itemLabel.value, type, index);
            }
            else if (type=="games"){
                createCards(element.foto.value, element.itemLabel.value, type, index);
            }
            else {
                createCards("", element.itemLabel.value, type, index);
            }
        });
    })
}
function createCards(imageUrl, text, label, index){
    let card = document.createElement('div');
    card.className = 'card';
    if(imageUrl !== ""){
    let imagen = document.createElement("img");
    imagen.setAttribute("src", imageUrl);
    imagen.className="image";
    card.appendChild(imagen);
    }
    else{
        let icon = document.createElement("i");
        let button = document.createElement("button");
        button.id = index;
        button.addEventListener("click", deleted, false);
        icon.className="fas fa-times";
        button.appendChild(icon)
        card.appendChild(button);
    }
    let name = document.createElement("p");
    name.className="name";
    name.appendChild(document.createTextNode(text));
    card.appendChild(name);
    document.getElementsByClassName(label)[0].appendChild(card);
}

function deleted(e){
    let index = e.target.id;
    let url = 'https://www.mediawiki.org//w/api.php?action=delete&format=json&pageId=64578347&token=%2B%5C'
    /*let req = new XMLHttpRequest();
            req.open('POST', url, true);
            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if (req.status >= 200 && req.status < 400) {
                       alert("elemento borrado");
                    } 
                }
            };
    req.send();
    */

    let url2=  'https://www.wikidata.org/w/api.php?action=wbgetentities&format=xml&props=sitelinks&ids=Q64578347&sitefilter=enwiki'
    let req2 = new XMLHttpRequest();
    req2.open('POST', url2, true);
    req2.onreadystatechange = function() {
        if (req2.readyState === 4) {
            if (req2.status >= 200 && req2.status < 400) {
               console.log(req2.responseText);
            } 
        }
    };
    req2.send();
}
  