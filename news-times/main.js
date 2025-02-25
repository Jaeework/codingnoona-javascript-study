let news = [];
const getLatestNews = async () => {
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);

    console.log("uuu", url);

    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;

    console.log("ddd", news);
}

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

