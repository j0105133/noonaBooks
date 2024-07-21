const API_KEY_DVD = `ttbbonnystory_1348001`
let queryType = "";
let dvdCallback = "";
let searchTarget= ""
let allDvdList = [];
let bestDvdList = [];


const getDvdData = () => {
    let queryType = "ItemNewAll";
    let dvdCallback = "dvdDisplay";
    let searchTarget= "DVD";
    let dvdUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY_DVD}&QueryType=${queryType}&MaxResults=10&start=1&SearchTarget=${searchTarget}&output=js&Version=20131101&callback=${dvdCallback}`;

    // AJAX 요청
    $.ajax({
        url : dvdUrl,
        jsonp: dvdCallback,
        dataType: "jsonp"
    });
}
const getBestDvdData = () => {
    let queryType = "ItemNewSpecial";
    let dvdCallback = "bestDvdDisplay";
    let searchTarget= "DVD";
    let dvdUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY_DVD}&QueryType=${queryType}&MaxResults=10&start=1&SearchTarget=${searchTarget}&output=js&Version=20131101&callback=${dvdCallback}`;

    // AJAX 요청
    $.ajax({
        url : dvdUrl,
        jsonp: dvdCallback,
        dataType: "jsonp"
    });
}
// 콜백 함수 
const dvdDisplay =(success)=>{
    allDvdList = success.item;
    console.log("dvd",allDvdList);
    DVDRender();
}
const bestDvdDisplay =(success)=>{
    ebookList = success.item;
    console.log("bestDVD",bestDvdList);
    bestDvdRender();
}


const DVDRender =()=>{
    let dvdListHTML = ``;
    // console.log("dvd list", allDvdList);
    dvdListHTML = allDvdList.map(dvd => `
        <div class="dvd__item" onclick="goToDetail2('${dvd.isbn13}')">
            <div class="dvd__img"><img class="bookImgSize" src=${dvd.cover} /></div>
            <dl class="dvd__text">
                <dt>${dvd.title}</dt>
                <dd class="dvd__author">${dvd.author}</dd>
                <dd>${dvd.description}</dd>
                <dd>${dvd.publisher}</dd>
            </dl>
        </div>        
      `).join('');
    // console.log("dvd isbn", allDvdList.isbn);
    document.getElementById('dvd__list').innerHTML = dvdListHTML;
}
const bestDvdRender =()=>{
    let ebookListHTML = ``;
    let itemsPerPage = 5;
    
    ebookListHTML = ebookList.slice(0, itemsPerPage).map(dvd => `
        <div class="dvd__item" onclick="goToDetail2('${dvd.isbn13}')">
            <div class="dvd__img"><img class="bookImgSize" src=${dvd.cover} /></div>
            <dl class="dvd__text">
                <dt>${dvd.title}</dt>
                <dd class="dvd__author">${dvd.author}</dd>
            </dl>
        </div>        
      `).join('');
  
    document.getElementById('dvd__best').innerHTML = ebookListHTML;
}
getDvdData();
getBestDvdData();