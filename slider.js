
// fetch API meilleur film:
async function getPageInfos(url){
    const reponse = await fetch(url);
    const reponseJsObject = await reponse.json();
    // let reponseJson = JSON.stringify(reponseJsObject);
    // console.log(reponseJson);
    return reponseJsObject;
};

async function getBestFilmByScore(){
    
    const url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
    
    let pageInfos = await getPageInfos(url);
    console.log(pageInfos)

    const sectionBestFilm = document.querySelector(".bestFilmParameters");

    const bestFilmImg = document.createElement("img");
    bestFilmImg.className ="bestFilmParameters__image";
    bestFilmImg.src = pageInfos.results[0].image_url;

    const bestFilmTitre = document.createElement("h1");
    bestFilmTitre.className ="bestFilmParameters__titre"
    bestFilmTitre.innerText = pageInfos.results[0].title;

    sectionBestFilm.appendChild(bestFilmImg);
    sectionBestFilm.appendChild(bestFilmTitre);

    addModalBestFilm(pageInfos.results[0]);

};

async function getUrl(category){
    if(category === ""){
        const url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
        category = "TOP 7 films";
        let dictUrl = {"url":url, "category":"TOP 7 films"};
        return dictUrl
    }else{
        const url = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=${category}`;
        let dictUrl = {"url":url, "category":category};
        return dictUrl
    };
};

async function addModalBestFilm(pageInfo){
    // Get the modal
    var modal = document.getElementById("bestFilmParameters__modal");

    // Get the button that opens the modal
    var btn = document.getElementById("bestFilmParameters__moreInfo");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    let filmId = pageInfo.id

    const url = `http://localhost:8000/api/v1/titles/${filmId}`;

    let filmInformation = await getPageInfos(url);
    console.log(filmInformation);

    const modalContent = document.querySelector(".bestFilmParameters__modal-content");
    const filmImg = document.createElement("img");
    filmImg.src = filmInformation.image_url;
    filmImg.alt = `img: ${filmInformation.title}`;

    const modalText__titre = document.createElement("p");
    modalText__titre.innerText = `Titre: ${filmInformation.title ?? "N/A"}`;

    const modalText__genres = document.createElement("p");
    modalText__genres.innerText = `Genre: ${filmInformation.genres.toString() ?? "N/A"}`;

    const modalText__date_published = document.createElement("p");
    modalText__date_published.innerText = `Date de sortie: ${filmInformation.date_published ?? "N/A"}`;

    const modalText__rated = document.createElement("p");
    modalText__rated.innerText = `Rated: ${filmInformation.rated ?? "N/A"}`;

    const modalText__score = document.createElement("p");
    modalText__score.innerText = `Score Imdb: ${filmInformation.imdb_score ?? "N/A"}`;

    const modalText__realisateur = document.createElement("p");
    modalText__realisateur.innerText = `Genre: ${filmInformation.writers.toString() ?? "N/A"}`;

    const modalText__actors = document.createElement("p");
    modalText__actors.innerText = `Acteurs: ${filmInformation.actors.toString() ?? "N/A"}`;

    const modalText__timing = document.createElement("p");
    modalText__timing.innerText = `Durée: ${filmInformation.duration ?? "N/A"} min`;

    const modalText__country = document.createElement("p");
    modalText__country.innerText = `Pays d'origine: ${filmInformation.countries.toString()  ?? "N/A"}`;

    const modalText__boxOffice = document.createElement("p");
    modalText__boxOffice.innerText = `Résultat au Box Office: ${filmInformation.budget ?? "N/A"} $`;

    const modalText__description = document.createElement("p");
    modalText__description.innerText = `Résumé du film: ${filmInformation.description ?? "N/A"}`;
    

    modalContent.appendChild(filmImg);
    modalContent.appendChild(modalText__titre);
    modalContent.appendChild(modalText__genres);
    modalContent.appendChild(modalText__date_published);
    modalContent.appendChild(modalText__rated);
    modalContent.appendChild(modalText__score);
    modalContent.appendChild(modalText__realisateur);
    modalContent.appendChild(modalText__actors);
    modalContent.appendChild(modalText__timing);
    modalContent.appendChild(modalText__country);
    modalContent.appendChild(modalText__boxOffice);
    modalContent.appendChild(modalText__description);


};

async function getBestFilmsByCategory(category, nombre_films, categoryHtml){
    let dictUrl = []
    dictUrl = await getUrl(category);
    console.log(dictUrl);

    const divCategory = document.querySelector(`.film${categoryHtml}`);
    const categoryName = document.createElement("h1");
    // categoryName.innerText = category;
    categoryName.innerText = dictUrl["category"];

    divCategory.appendChild(categoryName);
    
    // let pageInfos = await getPageInfos(url);
    console.log(dictUrl.url)
    let pageInfos = await getPageInfos(dictUrl["url"]);

    let films = [];
    
    while (films.length < nombre_films && pageInfos.next != null){
        if (films.length === 0){
            for (let i = 0; i < pageInfos.results.length; i++) {
                films.push(pageInfos.results[i]);
            };
        }else{
            pageInfos = await getPageInfos(pageInfos.next)
            for (let i = 0; films.length < nombre_films; i++) {
                films.push(pageInfos.results[i]);
                };
            };
        };

        
        const sectionCategory = document.querySelector(`.film${categoryHtml}__carouselContainer`);

        for (let i = 0; i < nombre_films; i++) {

            const divCard = document.createElement("div");
            divCard.className ="carouselContainer__card";

            const divCardImage = document.createElement("div");
            divCardImage.className ="card__image";

            const filmImg = document.createElement("img");
            filmImg.src = films[i].image_url;
            filmImg.alt = `img: ${films[i].title}`;

            const filmTitre = document.createElement("div");
            filmTitre.className ="card__titre"
            filmTitre.innerText = films[i].title;

            sectionCategory.appendChild(divCard);
            divCard.appendChild(divCardImage);
            divCardImage.appendChild(filmImg);
            divCard.appendChild(filmTitre);
        };


        const prev = document.querySelector(`.${categoryHtml.toLowerCase()}_btns__prevBtn`);
        const next = document.querySelector(`.${categoryHtml.toLowerCase()}_btns__nextBtn`);

        const filmCategory__carouselContainer = document.querySelector(`.film${categoryHtml}__carouselContainer`);


        prev.addEventListener("click", () => {
            filmCategory__carouselContainer.scrollLeft -= 270
        });

        next.addEventListener("click", () => {
            filmCategory__carouselContainer.scrollLeft += 270
        });

};



getBestFilmByScore();
getBestFilmsByCategory("",7,"Category0");
getBestFilmsByCategory("Action",7,"Category1");
getBestFilmsByCategory("Adventure",7,"Category2");
getBestFilmsByCategory("Animation",7,"Category3");




