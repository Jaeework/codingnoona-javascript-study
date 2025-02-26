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
        const title = document.createElement("div");
        title.textContent = news.title || "제목 없음";

        const description = document.createElement("div");
        description.textContent = news.description 
            ? (news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description)
            : "내용 없음";

        return `<div class="row news">
                    <div class="col-lg-4">
                        <img class="news-img-size" src="${news.urlToImage || 'https://www.testo.com/images/not-available.jpg'}"
                        onerror="this.onerror=null; this.src='https://www.testo.com/images/not-available.jpg'">
                    </div>
                    <div class="col-lg-8">
                        <h2>${title.innerHTML}</h2>
                        <p>${description.innerHTML}</p>
                        <div>
                            ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}
                        </div>
                    </div>
                </div>`;
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
    document.getElementsByClassName("search-input-area")[0].classList.toggle("hide");
}

