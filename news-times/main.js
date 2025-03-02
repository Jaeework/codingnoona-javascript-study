let newsList = [];
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
let groupSize = 5;

const menus = document.querySelectorAll(".menus button:not(.close-button)");
menus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByCategory(event)));

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        getNewsByKeyword();
    }
});

const getNews = async() => {

    try {
        url.searchParams.set("page", page); // => &page=page
        url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url);
        const data = await response.json();

        if(response.status === 200) {
            if(data.articles.length === 0) {
                throw new Error("No result for this search");
            }

            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();
        } else {
            throw new Error(data.message);
        }

    } catch(error) {
        errorRender(error.message);
    }

}

const getLatestNews = async () => {
    menus.forEach(button => button.classList.remove("active"));
    menus[0].classList.add("active");

    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
    page = 1;
    await getNews(url);
};

const getNewsByCategory = async(event) => {
    menus.forEach(button => button.classList.remove("active"));
    event.target.classList.add("active");
    
    const category = event.target.textContent.toLowerCase();
    if(category === "all") {
        return getLatestNews();
    }
    page = 1;
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);   
    await getNews();
};

const getNewsByKeyword = async() => {
    const keyword = searchInput.value;
    if(!keyword) {
        searchInput.focus();
        return;
    }
    page = 1;
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
    await getNews();
}

const render = () => {
    const newsHTML = newsList.map((news) => {
        const title = document.createElement("div");
        title.textContent = news.title || "제목 없음";

        const description = document.createElement("div");
        description.textContent = news.description 
            ? (news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description)
            : "내용 없음";

        return `<div class="news-container" onclick="window.open('${news.url}')">
                    <div class="row news">
                        <div class="col-lg-4 news-img bg-dark">
                            <img src="${news.urlToImage || 'https://www.testo.com/images/not-available.jpg'}"
                            onerror="this.onerror=null; this.src='https://www.testo.com/images/not-available.jpg'">
                        </div>
                        <div class="col-lg-8 news-content">
                            <h2>${title.innerHTML}</h2>
                            <p>${description.innerHTML}</p>
                            <div>
                                ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}
                            </div>
                        </div>
                    </div>
                </div>`;
    }).join("");

    document.getElementById("news-board").innerHTML = newsHTML;
};


const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
                            ${errorMessage}
                        </div>`;

    document.getElementById("news-board").innerHTML = errorHTML;

}

const paginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);

    let lastPage = (pageGroup * groupSize > totalPages) ? totalPages : pageGroup * groupSize;
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = ``;

    if(page !== 1) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(1)">
                                <a class="page-link" aria-label="First">
                                    <span aria-hidden="true">&lt;&lt;</span>
                                </a>
                            </li>
                            <li class="page-item" onclick="moveToPage(${page-1})">
                                <a class="page-link" aria-label="Previous">
                                    <span aria-hidden="true">&lt;</span>
                                </a>
                            </li>`;
    }

    for(let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? "active" : ""}" 
                            onclick="moveToPage(${i})">
                                <a class="page-link">${i}</a>
                            </li>`;
    }

    if(page !== totalPages) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})">
                                <a class="page-link" aria-label="Next">
                                    <span aria-hidden="true">&gt;</span>
                                </a>
                        </li>
                        <li class="page-item" onclick="moveToPage(${totalPages})">
                            <a class="page-link" aria-label="Last">
                                <span aria-hidden="true">&gt;&gt;</span>
                            </a>
                        </li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
    page = pageNum;
    getNews();
}

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

