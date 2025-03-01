let newsList = [];
const menus = document.querySelectorAll(".menus button:not(.close-button)");
menus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByCategory(event)));
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
let groupSize = 5;

const getNews = async() => {

    try {
        url.searchParams.set("page", page); // => &page=page
        url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url);
        const data = await response.json();
        console.log('data', data)
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
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
    page = 1;
    await getNews(url);
};

const getNewsByCategory = async(event) => {
    const category = event.target.textContent.toLowerCase();
    page = 1;
    if(category === "all") {
        return getLatestNews();
    }
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);   
    await getNews();
};

const getNewsByKeyword = async() => {
    const keyword = document.getElementById("search-input").value;
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

        return `<div class="row news">
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
    // totalResult,
    // page
    // pageSize
    // groupSize

    // totalPages
    const totalPages = Math.ceil(totalResults / pageSize);
    // pageGroup
    const pageGroup = Math.ceil(page / groupSize);
    // last page
    // 마지막 페이지 그룹이 그룹사이즈보다 작다?
    let lastPage = (pageGroup * groupSize > totalPages) ? totalPages : pageGroup * groupSize;

    // first page
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = `<li class="page-item ${page === 1? 'disabled' : ''}"
                        ${page !== 1 ? `onclick="moveToPage(${page-1})"` : ''}>
                                <a class="page-link" aria-label="Previous">
                                    <span aria-hidden="true">&lt;</span>
                                </a>
                            </li>`;

    for(let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? "active" : ""}" 
                            onclick="moveToPage(${i})">
                                <a class="page-link">${i}</a>
                            </li>`;
    }

    paginationHTML += `<li class="page-item ${page === totalPages ? 'disabled' : ''}"
                        ${page !== totalPages ? `onclick="moveToPage(${page+1})"` : ''}>
                            <a class="page-link" aria-label="Next">
                                <span aria-hidden="true">&gt;</span>
                            </a>
                        </li>`;

    document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
    console.log("movetopage", pageNum);
    page = pageNum;
    getNews();

    // window.scrollTo({top: 0, behavior: "smooth"});
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

