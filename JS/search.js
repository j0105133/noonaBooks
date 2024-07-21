const API_KEY = 'f4aacc94a442dd1e084f37ce4cad76cb';
var input = document.getElementById('text-input');
const searchBtn = document.getElementById('search-btn');
let bookList = [];

searchBtn.addEventListener('click', function(){
  search();
});

function search (){
  let inputValue = input.value;
  console.log("IV",inputValue)
  $.ajax({
    method: "GET",
    url: "https://dapi.kakao.com/v3/search/book",
    data: { query: inputValue },
    headers: { Authorization: `KakaoAK ${API_KEY}` }
  })
  .done(function(data) {
    console.log("Done in")
    console.log(data);
    bookList = data.documents;
    console.log(bookList);
    localStorage.setItem('bookList', JSON.stringify(bookList));
    //window.location.href = 'search.html';
    window.location.href = `search.html?query=${inputValue}`;
  });
}