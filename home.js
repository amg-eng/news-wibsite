const API_KEY="ffb93251669d4863894cd2a978ba9e48"
const url ="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=>fetchNews());

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
function reload()
{
    window.location.reload()
}
function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const cardstemp = document.getElementById("card-temp");
    cardsContainer.innerHTML="";
    if(document.getElementById('date').checked == true)
        if(document.getElementById('desc1').checked == true)
            articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        else
            articles.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = cardstemp.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}function fillDataInCard(cardClone,article){
    const newImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    newImg.src =article.urlToImage;
    newsTitle.innerHTML = article.title;
    
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Egypt",
    });
    newsSource.innerHTML = `${article.source.name}· ${date}`;
    newImg.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
    newsTitle.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
    newsSource.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
    newsDesc.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
let curSelectedNav = null;
var category="";
function onNaveItemClick(id){
    searchText.value='';
fetchNews(id);
const navItem = document.getElementById(id);
category=id;
curSelectedNav?.classList.remove('active');
curSelectedNav=navItem;
curSelectedNav.classList.add('active');
}
const searchButton=document.getElementById('search_button');
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click',()=>{
const query = searchText.value;
if(!query) return;
fetchNews(query);
curSelectedNav?.classList.remove('active');
curSelectedNav=null;
category='';
})
function sort(){
    if (category !=="")
    {
        const navItem = document.getElementById(category);
        fetchNews(category);
        curSelectedNav?.classList.remove('active');
        curSelectedNav=navItem;
        curSelectedNav.classList.add('active');
        searchText.value='';

    }
    else if(searchText.value !=="")
    {
        const query = searchText.value;
        if(!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove('active');
        curSelectedNav=null;
    }
        else
        {
            fetchNews();}

}
