let newsList = [];
const getLatestNews = async () => {
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);

    console.log("uuu", url);

    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;

    console.log("ddd", newsList);

    render();
};

const render = () => {
    const newsHTML = newsList.map((news) => {
                return  `<div class="row news">
                            <div class="col col-lg-4">
                                <img class="news-img-size" src="${news.urlToImage}">
                            </div>
                            <div class="col col-lg-8">
                                <h2>${news.title}</h2>
                                <p>
                                    ${news.description}
                                </p>
                                <div>
                                    ${news.source.name} * ${news.publishedAt}
                                </div>
                            </div>
                        </div>`
    }).join("");

    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

function openNav() {
    document.getElementsByClassName("menus")[0].style.width = "250px";
}

function closeNav() {
    document.getElementsByClassName("menus")[0].style.width = "0";
}

function toggleSearch() {
    document.getElementsByClassName("search-input-area")[0].classList.toggle("disabled");
}

