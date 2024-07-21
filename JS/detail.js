const DW_API_KEY = 'ttbbonnystory_1348001';
let bookInfo = [];
let receivedISBN = '';
let forKakaoLink = '';

// URL에서 isbn 파라미터 추출
const urlParams = new URLSearchParams(window.location.search);
const isbn = decodeURIComponent(urlParams.get('isbn')); // 디코딩된 ISBN 값 사용
console.log(isbn);

if (isbn) {
    // ISBN 13자리와 10자리 추출
    const { isbn13, isbn10 } = getIsbn13And10(isbn);
    receivedISBN = isbn13 || isbn10;

    if (receivedISBN) {
        getDetailBookData();
    } else {
        console.error('No valid ISBN found');
        $('#bookInfo').html('<p>유효한 ISBN을 찾을 수 없습니다.</p>');
    }
}

// ISBN 문자열을 공백으로 나누어 13자리와 10자리 ISBN을 추출하는 함수
function getIsbn13And10(isbnString) {
    const isbnArray = isbnString.split(' ');
    const isbn13 = isbnArray.find(isbn => isbn.length === 13);
    const isbn10 = isbnArray.find(isbn => isbn.length === 10);
    return { isbn13, isbn10 };
}

// 책 정보를 가져오는 함수
function getDetailBookData() {
    const url = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${DW_API_KEY}&itemIdType=ISBN&ItemId=${receivedISBN}&Cover=Big&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList&callback=detailBookDisplay`;

    // AJAX 요청을 보냅니다. getJSON() 함수는 알라딘 API 대용으로 사용불가.
    $.ajax({
        url: url,
        jsonp: "detailBookDisplay",
        dataType: "jsonp"
    });

}

// 콜백 함수
function detailBookDisplay(success) {
    console.log(success);
    console.log(success.item[0]);
    console.log(success.item[0].title);
    bookInfo = success.item;
    console.log("bookInfo", bookInfo);
    console.log("bookInfo[0]", bookInfo[0]);
    detailRender();
}






// 책 세부 정보를 렌더링하는 함수
function detailRender() {
  const referrer = document.referrer;
  // 이전 페이지가 DVD.html인지 확인
  console.log(referrer, "ref");
  if (referrer.includes('dvd.html')) {
      // 버튼 숨기기
      console.log("refdvdin")
      document.getElementById('detail-book-buy-btn-kakao').style.display = 'none';
      document.getElementById('detail-desc').style.display = 'none';
  }
  if (bookInfo.length === 0) {
    console.log(bookInfo.length);
      $('#bookInfo').html('<p>책 정보를 로드할 수 없습니다.</p>');
      return;
  }

    let detailBookImgHTML = bookInfo[0].cover;
    document.getElementById('detail-img').src = detailBookImgHTML;

    let detailBookTitle = bookInfo[0].title;
    document.getElementById('detail-info-title').textContent = detailBookTitle;

    let detailBookAuthor = bookInfo[0].author;
    document.getElementById('detail-info-author').textContent = detailBookAuthor;

    let detailBookCate = bookInfo[0].categoryName;
    document.getElementById('detail-info-cate').textContent = detailBookCate;

    let detailBookPage = bookInfo[0].subInfo.itemPage;
    document.getElementById('detail-info-page').textContent = detailBookPage;

    let detailBookOTitle = bookInfo[0].subInfo.originalTitle;
    document.getElementById('detail-info-otitle').textContent = detailBookOTitle;

    let detailBookPub = bookInfo[0].publisher;
    document.getElementById('detail-info-pub').textContent = detailBookPub;

    let detailISBN = bookInfo[0].isbn;
    document.getElementById('detail-info-isbn').textContent = detailISBN;

    let detailDate = bookInfo[0].isbn;
    document.getElementById('detail-info-isbn').textContent = detailDate;

    let detailBookDesc = bookInfo[0].description;
    document.getElementById('detail-book-desc').textContent = detailBookDesc;

    /* 버튼 */
    // let detailBookBuyBtnKaKao = `https://search.daum.net/search?w=bookpage&bookId=${}&q=${detailBookTitle}`
    // let detailBookBuyBtnKaKao = `https://search.daum.net/search?w=bookpage&q=${detailBookTitle}}`
    // document.getElementById('detail-book-buy-btn-kakao').setAttribute('herf', detailBookBuyBtnKaKao);
    $('#detail-book-buy-btn-kakao').attr('href', `https://search.daum.net/search?w=bookpage&bookId=6686180&tab=introduction&DA=LB2&q=%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%9C%BC%EB%A1%9C%20%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94%20%EB%A1%9C%EB%B3%B4%EC%96%B4%EB%93%9C%EB%B0%94%EC%9D%B4%EC%A0%80%20-%20%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4%20%EC%B5%9C%EC%A0%81%ED%99%94%EC%97%90%EC%84%9C%20%EB%A7%88%EC%BC%93%ED%83%80%EC%9D%B4%EB%B0%8D%2C%20%ED%8C%A9%ED%84%B0%20%ED%88%AC%EC%9E%90%2C%20%EB%94%A5%EB%9F%AC%EB%8B%9D%EA%B9%8C%EC%A7%80`);

    let detailBookBuyBtnA = bookInfo[0].link;
    document.getElementById('detail-book-buy-btn-aladin').setAttribute('href', detailBookBuyBtnA);

    let detailTitleFind = detailBookTitle;
    let detailBookBuyBtnK = `https://search.kyobobook.co.kr/search?keyword=${detailTitleFind}&gbCode=TOT&target=total`;
    document.getElementById('detail-book-buy-btn-kyobo').setAttribute('href', detailBookBuyBtnK);

    let detailBookBuyBtnY = `https://www.yes24.com/Product/Search?domain=ALL&query=${detailTitleFind}`;
    document.getElementById('detail-book-buy-btn-yes24').setAttribute('href', detailBookBuyBtnY);

}

        // 검색 버튼 클릭 이벤트
        $('#customSearchBtn').click(function() {
            searchBooks();
        });
    
        // Enter 키 이벤트
        $('#customTextInput').keypress(function(event) {
            if (event.key === "Enter") {
                searchBooks();
            }
        });
    
        // 검색 함수
        function searchBooks() {
            const inputValue = $('#customTextInput').val();
            const newUrl = `search.html?query=${encodeURIComponent(inputValue)}`;
            window.location.href = newUrl;
            $('#customTextInput').val(''); // 입력 필드 비우기
        }
