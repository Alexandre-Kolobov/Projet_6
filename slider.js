
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

    const sectionBestFilm = document.querySelector(".bestFilmParameters");

    const bestFilmImg = document.createElement("img");
    bestFilmImg.className ="bestFilmParameters__image";
    bestFilmImg.src = pageInfos.results[0].image_url;

    const bestFilmTitre = document.createElement("h1");
    bestFilmTitre.className ="bestFilmParameters__titre"
    bestFilmTitre.innerText = pageInfos.results[0].title;

    sectionBestFilm.appendChild(bestFilmImg);
    sectionBestFilm.appendChild(bestFilmTitre);

};

async function getBestFilmsByCategory(category, nombre_films, categoryHtml){
    const url = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=${category}`;

    const divCategory = document.querySelector(`.film${categoryHtml}`);
    const categoryName = document.createElement("h1");
    categoryName.innerText = category;

    divCategory.appendChild(categoryName);
    
    let pageInfos = await getPageInfos(url);

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
getBestFilmsByCategory("Action",7,"Category1");
getBestFilmsByCategory("Adventure",7,"Category2");
getBestFilmsByCategory("Animation",7,"Category3");