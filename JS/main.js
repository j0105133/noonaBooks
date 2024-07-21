const API_KEY = `ttbbonnystory_1348001`;
let mdBookList = [];
let bestBookList = [];
let newBookList = [];
let tabBtn = document.querySelectorAll('.tab__item');


window.goToDetail = function(isbn) { // 상세 페이지로 이동하는 함수
  window.location.href = `searchDetail.html?isbn=${isbn}`;
};

// 메뉴별 화면 변경 함수
window.onload = function() {
  const referrer = document.referrer;
  // 이전 페이지가 DVD.html인지 확인
  if (referrer.includes('dvd.html')) {
      // URL에서 쿼리 파라미터를 추출하는 함수
      function getQueryParam(param) {
        let params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    // id 파라미터 값 가져오기
    let idValue = getQueryParam('id');

    if (idValue) {
      $('.nav__menu__item').removeClass('active');
      if(idValue == 'nav-dom'){
          categoryBookRender($('#nav-item-1').text());
          $('#nav-item-1').addClass('active');
      } else if(idValue == 'nav-for'){
          categoryBookRender($('#nav-item-2').text());
          $('#nav-item-2').addClass('active');
      } else if(idValue == 'nav-e'){
          categoryBookRender($('#nav-item-3').text());
          $('#nav-item-3').addClass('active');
      }
  }
  }


  let menu = document.querySelectorAll('.nav__menu__item');

  menu.forEach(menuItem => {
    menuItem.addEventListener('click', function(event) {
      // 메뉴 클릭 시 active 클래스 처리
      document.querySelectorAll('.nav__menu__item').forEach(item => item.classList.remove('active'));
      menuItem.classList.add('active');
      // 카테고리에 따라 책 데이터 렌더링
      categoryBookRender(event.target.textContent);
    });
  });
 
  // 탭 메뉴 클릭 시 데이터 요청 및 렌더링
  tabBtn.forEach(tabMenu => {
    tabMenu.addEventListener('click', function(event) {
      let category = document.querySelector('.nav__menu__item.active').textContent;
      let subCategory = event.target.textContent;
      let page = tabMenu.dataset.page; // 탭 메뉴의 데이터 속성 사용

      getBestBookRender(page, category, subCategory);
    });
  });
};

// 베스트 셀러 데이터 가져오기 및 렌더링
function getBestBookRender(page, category, subCategory) {
  let searchTarget = (category === '국내도서') ? 'Book' : (category === '외국도서') ? 'Foreign' : 'eBook';
  let bestBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&Cover=Big&QueryType=Bestseller&MaxResults=4&start=${page}&SearchTarget=${searchTarget}&output=js&Version=20131101&callback=bestBookDisplay`;

  // 베스트셀러 AJAX 요청
  $.ajax({
    url: bestBookUrl,
    jsonp: "bestBookDisplay",
    dataType: "jsonp",
    success: function(data) {
      bestBookDisplay(data);
    },
    error: function(err) {
      console.error('에러 : 베스트셀러 ajax 요청 실패', err);
    }
  });
}



// 베스트셀러 탭 메뉴 클릭 이벤트
for (let i = 0; i < tabBtn.length; i++){
  $('.tab__item').eq(i).on('click', function(){
    $('.tab__item').removeClass('tab__item--active'); 
    $('.tab__item').eq(i).addClass('tab__item--active');
  });
}





// 국내도서, 외국도서, eBook에 따라 데이터 요청 및 렌더링
function categoryBookRender(category) {
  if (category === "국내도서" || category === "외국도서" || category === "eBook") {
    let menu = (category === "외국도서") ? "Foreign" : (category === "eBook") ? "eBook" : "Book";
    menuBook(menu);
  }
  document.getElementById('theme__list').innerHTML = ``;
  $('.tab__item').removeClass('tab__item--active'); 
  $('.tab__item').eq(0).addClass('tab__item--active');
}




// 각 메뉴별 책 데이터 요청 및 렌더링
function menuBook(menu) {
  let newBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&Cover=Big&QueryType=ItemNewAll&MaxResults=6&start=1&SearchTarget=${menu}&output=js&Version=20131101&callback=newBookDisplay`;
  let bestBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&Cover=Big&QueryType=Bestseller&MaxResults=4&start=1&SearchTarget=${menu}&output=js&Version=20131101&callback=bestBookDisplay`;
  let mdBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&Cover=Big&QueryType=Bestseller&MaxResults=4&start=2&SearchTarget=${menu}&output=js&Version=20131101&callback=mdBookDisplay`;

  // AJAX 요청
  $.ajax({
    url: newBookUrl,
    jsonp: "newBookDisplay",
    dataType: "jsonp",
    success: function(data) {
      newBookDisplay(data);
    },
    error: function(err) {
      console.error('에러 : 신간도서 ajax 요청 실패', err);
    }
  });

  $.ajax({
    url: bestBookUrl,
    jsonp: "bestBookDisplay",
    dataType: "jsonp",
    success: function(data) {
      bestBookDisplay(data);
    },
    error: function(err) {
      console.error('에러 : 베스트셀러 ajax 요청 실패', err);
    }
  });

  $.ajax({
    url: mdBookUrl,
    jsonp: "mdBookDisplay",
    dataType: "jsonp",
    success: function(data) {
      mdBookDisplay(data);
    },
    error: function(err) {
      console.error('에러 : 편집자 추천 리스트 ajax 요청 실패', err);
    }
  });
}

let count = 2
// 편집자 추천 더보기 버튼
  document.getElementById('read-more').addEventListener('click', function(){
    let navActive = document.querySelector('.nav__menu__item.active').textContent;
    let category = (navActive == "국내도서") ? "book" : (navActive == "외국도서") ? "Foreign" : "eBook"

    let mdBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemNewSpecial&MaxResults=4&start=${count}&SearchTarget=${category}&output=js&Version=20131101&callback=mdBookDisplay`
      // 편집자 추천
      $.ajax({
        url: mdBookUrl,
        jsonp: "mdBookDisplay",
        dataType: "jsonp",
        success: function(data) {
          mdBookDisplay(data);
        },
        error: function(err) {
          console.error(err);
        }
      });
      count += 1
  })


// 최초 화면 렌더링
function getBookData (){
  // 신간
  let newBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&Cover=Big&QueryType=ItemNewAll&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101&callback=newBookDisplay`

  // 베스트셀러
  let bestBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&Cover=Big&QueryType=Bestseller&MaxResults=4&start=1&SearchTarget=Book&output=js&Version=20131101&callback=bestBookDisplay`
  
  // 편집자 추전
  let mdBookUrl = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&Cover=Big&QueryType=ItemEditorChoice&MaxResults=4&start=1&SearchTarget=Book&output=js&Version=20131101&callback=mdBookDisplay&CategoryId=3060`

  // AJAX 요청
  // 신간
  $.ajax({
    url: newBookUrl,
    jsonp: "newBookDisplay",
    dataType: "jsonp",
    success: function(data) {
      newBookDisplay(data);
    },
    error: function(err) {
      console.error('에러 : 최초화면 렌더링 신간도서 ajax 요청 실패', err);
    }
  });
  // 베스트셀러
  $.ajax({
    url: bestBookUrl,
    jsonp: "bestBookDisplay",
    dataType: "jsonp",
    success: function(data) {
      bestBookDisplay(data);
    },
    error: function(err) {
      console.error('에러 : 최초화면 렌더링 베스트셀러 리스트 ajax 요청 실패', err);
    }
  });
  // 편집자 추천
  $.ajax({
    url: mdBookUrl,
    jsonp: "mdBookDisplay",
    dataType: "jsonp",
    success: function(data) {
      mdBookDisplay(data);
    },
    error: function(err) {
      console.error('에러 : 최초화면 렌더링 편집자 추천 리스트 ajax 요청 실패', err);
    }
  });
}

getBookData();





// 신간 display 함수
function newBookDisplay(success) {
  newBookList = success.item;
  newBookRender();
}

// 베스트셀러 display 함수
function bestBookDisplay(success) {
  bestBookList = success.item;
  bestBookRender();
}

// 편집자 추천 도서 display 함수
function mdBookDisplay(success) {
  mdBookList = success.item;
  console.log(mdBookList);
  mdBookRender();
}

// 상세 페이지로 이동하는 함수
window.goToDetail2 = function(isbn) { 
  window.location.href = `view.html?isbn=${isbn}`;
  // window.location.href = `view.html?isbn=${removeLeadingK(isbn)}`;
  //window.location.href = `searchView.html?isbn=${isbn}`
};


// 신간 render 함수
function newBookRender() {
  let newBookHTML = newBookList.map(book => `
    <div class="book__item swiper-slide" onclick="goToDetail2('${book.isbn}')">
      <span class="book__img"><img class="bookImgSize" src=${book.cover} /></span>
      <dl class="book__text">
          <dt>${book.title}</dt>
          <dd>${book.author} / ${book.publisher}</dd>
      </dl>
    </div>`).join('');
  document.getElementById('book_list--roll').innerHTML = newBookHTML;
}

// 베스트셀러 render 함수
function bestBookRender() {
  let bestBookHTML = bestBookList.map(book => `
    <div class="book__item tab__book__item tab__book__display__none show " onclick="goToDetail2('${book.isbn}')">
      <div class="book__img"><img class="bookImgSize" src=${book.cover} /></div>
      <dl class="book__text">
          <dt>${book.title}</dt>
          <dd>${book.author} / ${book.publisher}</dd>
      </dl>
    </div>`).join('');

  document.getElementById('book__list').innerHTML = bestBookHTML;
}

// 편집자 추천도서 render 함수
function mdBookRender() {
  let mdBookHTML = mdBookList.map(book => `
    <div class="theme__item cursor-pointer" onclick="goToDetail2('${book.isbn}')">
      <div class="theme__img"><img class="bookImgSize" src=${book.cover} /></div>
      <dl class="theme__text">
          <dt>${book.title}</dt>
          <dd>${book.author} | ${book.publisher} | ${book.pubDate}</dd>
          <dd>${book.description}</dd>
      </dl>
    </div>`).join('');

  document.getElementById('theme__list').innerHTML += mdBookHTML;
}