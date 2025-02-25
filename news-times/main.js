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
                                <img class="news-img-size" src="${news.urlToImage || 'https://www.testo.com/images/not-available.jpg'}">
                            </div>
                            <div class="col col-lg-8">
                                <h2>${news.title}</h2>
                                <p>
                                    ${!news.description ? "내용없음" 
                                        : news.description.length > 200
                                        ? news.description.substring(0, 200) + "..."
                                        : news.description}
                                </p>
                                <div>
                                    ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}
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

