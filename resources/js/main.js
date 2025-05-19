let sec7SwiperSlide; // sec7 슬라이더 선언
let locationPath = window.location.search
let params = new URLSearchParams(locationPath);
let lang = params.get('lang'); // "KO"
let selectedLanguageOption = lang ? lang : localStorage.getItem('selectedOption') || 'KR';
if(lang) {
  localStorage.setItem('selectedOption', lang);
}

document.addEventListener("DOMContentLoaded", function(){
  /* [공통 상단] */
  const originalPath = window.location.pathname === '/' ? '/index' : window.location.pathname.replace('.html', '');
  const path = originalPath.replace('.html', '')
  // console.log(originalPath)
  // 로컬 스토리지에 activeNavPath가 없으면 기본값으로 설정
  let activePath = path || '/index'
  const flagImages = {
    KR: 'korea_4.png',
    EN: 'america_4.png',
    JP: 'japan_4.png',
    VN: 'viet.svg',
    CN:'china.png'
  };
  function rendererHeader(selectedOption) {
    let selectedFlagImage = flagImages[selectedOption];
    // 선택값 또는 이미지 파일명이 유효하지 않다면, 기본값으로 변경
    if(!selectedFlagImage) {
      selectedOption = selectedLanguageOption;
    }
    // console.log(selectedFlagImage,selectedOption)
    // header html 추가
    const headerHtml = `
        <header>
          <div class="inner-wrap">
            <h1><a href="/"><img src="/resources/images/header/proKids_logo.svg" alt="ProKids"></a></h1>
            <nav>
              <ul>
                <li><a href="/">About</a></li>
                <li><a href="/pages/contact">Contact</a></li>
                <li>
                  <div class="select-box dropdown1">
                    <button class="label" data-value="${selectedOption}">
                      <img src="/resources/images/header/${selectedFlagImage}" alt="" class="label-img" />
                      <span>${selectedOption}</span>
                    </button>
                    <ul class="option-list">
   
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      `;
    let templateHeader = document.createElement('template');
    templateHeader.innerHTML = headerHtml;

    /* footer */
    const footerHtml = `
      <footer>
        <div class="inner-wrap">
            <div class="logo-wrap">
                <h2><img src="/resources/images/footer/iea.svg" alt="IEA - 아이이에이"/></h2>
            </div>
            <div class="footer-info-wrap">
                <div>
                <div class="policySwiper swiper">
                   <ul class="policy-wrap swiper-wrapper">
                        <li class="swiper-slide"><a href="/pages/policy/terms-of-policy" data-translate="footer_1">이용약관</a></li>
                        <li class="swiper-slide"><a href="/pages/policy/privacy-policy" data-translate="footer_2">개인정보처리방침</a></li>
                        <li class="swiper-slide"><button type="button" data-translate="footer_3"  onclick="openModal('#modla1')">이메일무단수집거부</button></li>
                    </ul>
                </div>
                    <p class="em" data-translate="footer_cop">(주)아이이에이</p>
                    <ul class="place-info">
                      <li data-translate="footer_pi_1">대표이사 : 최중배</li>
                      <li data-translate="footer_pi_2">사업자등록번호 : 315-81-37674</li>
                      <li data-translate="footer_pi_3">통신판매업신고 : 제 2020-서울송파-2351호</li>
                    </ul>
                    <ul class="place-info">
                      <li data-translate="footer_pi_4">주소 : 서울특별시 송파구 법원로8길 8 SKV1 910호 (05855)</li>
                      <li data-translate="footer_pi_5">고객센터 : 02-6269-0630</li>
                      <li><span data-translate="footer_pi_6">이메일: </span> <a href="mailto:prokidsbook@iea.co.kr"  data-translate="footer_pi_6">prokidsbook@iea.co.kr</a></li> 
                    </ul>
                    <p class="copyright" data-translate="footer_pi_7">Copyright ⓒ IEA. All Rights Reserved.</p>
                </div>
                <div class="select-box dropdown2">
                    <button class="label" data-value="Family Site">
                        <span data-translate="footer_family_site">패밀리 사이트</span>
                    </button>
                    <ul class="option-list">
                    </ul>
                </div>
            </div>
        </div>
    </footer>
        <!-- [팝업] 스크래핑(서류 제출 자동화 서비스 이용동의서) -->
    <div id="modla1" class="dy-modal">
        <div class="dy-modal-content">
            <div class="dy-header">
                <h5 data-translate="popup_email">이메일주소 무단수집 거부</h5>
                <button type="button" class="dy-close-btn close" onclick="closeModal('#modla1')"><span class="blind-txt">닫기</span></button>
            </div>
            <div class="dy-body">
                <p data-translate="popup_email_desc">
                  본 홈페이지에 게시된 이메일 주소가 전자우편 수집 프로그램이나<br class="pc-only">
                  그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며,<br class="pc-only">
                  이를 위반 시 정보통신망법에 의해 형사 처벌됨을 유념하시기 바랍니다.
                </p>
                <p class="em" data-translate="popup_email_date">게시일: 2025년 1월 1일</p>
            </div>
            <div class="btn-wrap">
                <button type="button" class="btn small-ver2" data-translate="popup_btn" onclick="closeModal('#modla1')">확인</button>
            </div>
        </div>
    </div>
    <!-- // 팝업추가 -->
    `
    let templateFooter = document.createElement('template');
    templateFooter.innerHTML = footerHtml;

    /* 실행문 */
    document.body.append(templateFooter.content);
    document.body.prepend(templateHeader.content);
  }
  /* 초기 설정(KR) : localstorage에 저장된 값이 없을 시 */
  rendererHeader(selectedLanguageOption)
  translateText(selectedLanguageOption, path)

  const navItems = document.querySelectorAll('nav ul li a');
  const logoLink = document.querySelector('h1 a');

  // 페이지 로드 시 저장된 경로를 기준으로 'on' 클래스 적용
  navItems.forEach((item) => {
    if (item.getAttribute('href').replace('.html','') === activePath) {
      item.parentElement.classList.add('on');
    }
  });

  // 각 <li>의 <a>에 클릭 이벤트 추가하여 로컬 스토리지에 경로 저장
  navItems.forEach((item) => {
    item.addEventListener('click', function() {
      localStorage.setItem('activeNavPath', this.getAttribute('href'));
    });
  });

  // 로고 클릭 시에도 로컬 스토리지에 경로 저장
  if (logoLink) {
    logoLink.addEventListener('click', function() {
      localStorage.setItem('activeNavPath', this.getAttribute('href'));
    });
  }

  /* 헤더 스크롤 */
  const content = document.querySelector('#contents')
  const header = document.querySelector('header');
  if (content.classList.contains('sub')) {
    header.classList.add('sub','scroll');
  }
  window.addEventListener('scroll', function() {
    if (content.classList.contains('sub')) {
      header.classList.add('scroll');
    } else {
      if (window.scrollY === 0) {
        header.classList.remove('scroll');
      } else if(window.scrollY >= 500) {
        header.classList.add('scroll');
      } else {
        header.classList.add('scroll');
      }
    }
  });
  /* [공통] ########################  */
  /* 1. Dropdown : header, footer
  * 특정 드롭다운을 초기화하는 함수
    @param {HTMLElement} dropdownEl 드롭다운 컨테이너 요소
    @param {Array} options 옵션 배열 (예: ['KR', 'EN', 'JP'])
    @param {Function} renderOption 옵션을 렌더링하는 커스텀 함수
  * */
  function initDropdown(dropdownEl, options, renderOption, footer) {
    const label = dropdownEl.querySelector('.label');
    const labelText = label.querySelector('span');
    const optionList = dropdownEl.querySelector('.option-list');

    // 옵션 렌더링 함수
    function renderOptions(selected) {
      // console.log('renderOptions 선택',selected)
      optionList.innerHTML = ''; // 기존 옵션 초기화
      let filteredOptions = "";
      if(footer){
        filteredOptions = options;
      }else{
        filteredOptions = options.filter(option => option !== selected);
      }
      filteredOptions.forEach((option, index) => {
        const li = document.createElement('li');
        li.classList.add('option-item');
        // li.setAttribute('data-value', option);

        // 외부에서 정의한 렌더링 방식 호출
        renderOption(li, option, dropdownEl);

        // 옵션 클릭 이벤트 바인딩
        li.addEventListener('click', (event) => {
          handleSelect(option, event);
        });
        optionList.appendChild(li);
      });
    }

    // 옵션 선택 핸들러
    function handleSelect(option) {
      if (typeof option === 'object') {
        // 객체 옵션의 경우 링크 이동
        window.open(option.link, '_blank'); // 링크로 이동
        dropdownEl.classList.remove('active'); // 드롭다운 닫기
      } else {
        localStorage.setItem('selectedOption', option);
        labelText.textContent = option; // 라벨 텍스트 업데이트
        label.setAttribute('data-value', option); // 라벨의 데이터 속성 업데이트

        // 선택한 이미지로 라벨 이미지 업데이트
        const flagImages = {
          KR: '/resources/images/header/korea_4.png',
          EN: '/resources/images/header/america_4.png',
          CN: '/resources/images/header/china.svg',
          JP: '/resources/images/header/japan_4.png',
          VN: '/resources/images/header/viet.svg',
        };
        label.querySelector('.label-img').src = flagImages[option]; // 라벨 이미지 업데이트
        label.querySelector('.label-img').alt = `${option} flag`; // alt 속성 업데이트

        // 드롭다운 닫기 및 옵션 재렌더링
        dropdownEl.classList.remove('active');
        renderOptions(option); // 선택된 항목 제외한 옵션 렌더링
        // Now handle path specifically
        if (path.startsWith("/pages/manual")) {
          let url = new URL(window.location.href);
          url.searchParams.set('lang', option);
          window.history.replaceState({}, '', url);
        }
        // 번역
        translateText(option,path)
        if(path === '/' || path === '/index') {
          sec7SwiperSlide.destroy(true, true)
        }
      }
    }

    // 라벨 클릭 핸들러 (드롭다운 열기/닫기)
    label.addEventListener('click', () => {
      const isActive = dropdownEl.classList.toggle('active');
      // 드롭다운을 열 때, 현재 선택된 값으로 옵션 렌더링
      renderOptions((localStorage.getItem('selectedOption') ? localStorage.getItem('selectedOption') : 'KR'));
    });
    // 초기 옵션 렌더링
  }
  function translateText (option,path) {
    // 번역
    fetch(`/resources/translation-data/${option}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        updateLanguage(data, path, option); // 언어 데이터 업데이트 호출
        setTimeout(function() {
          destroyFooterSwiper();
          setTimeout(function() {
            callFooterSwiper();
          });
        },20);
      })
      .catch(error => {
        console.error("Error fetching translation data:", error);
      });
  }
  // 1-1. 이미지 포함 옵션 렌더링 함수
  function renderOptionWithImage(li, option) {
    const img = document.createElement('img');
    const flagImages = {
      KR: '/resources/images/header/korea_4.png',
      EN: '/resources/images/header/america_4.png',
      CN: '/resources/images/header/china.svg',
      JP: '/resources/images/header/japan_4.png',
      VN: '/resources/images/header/viet.svg'
    };
    img.src = flagImages[option];
    img.alt = `${option} flag`;
    img.classList.add('option-img');

    const span = document.createElement('span');
    span.textContent = option;

    li.appendChild(img);
    li.appendChild(span);
  }
  // 1-2. 텍스트만 포함된 옵션 렌더링 함수 (링크 이동)
  function renderOptionTextOnly(li, item,dropdownEl) {
    const a = document.createElement('a');
    const selectOption = lang ? lang : (localStorage.getItem('selectedOption') ? localStorage.getItem('selectedOption') : 'KR');
    a.textContent = item.option[selectOption];
    a.href = item.link;
    a.target = '_blank';
    a.addEventListener('click', (event) => {
      event.stopPropagation(); // 부모 이벤트 전파 방지
      dropdownEl.classList.remove('active'); // 드롭다운 닫기
    });
    // let ss = `<span>${selectOption}</span>`
    li.setAttribute('data-value', item.option[selectOption])
    li.appendChild(a);
  }
  // 언어 번역
  function updateLanguage(language, path, option) {
    switch (path) {
      case "/index":
        indexPageTranslate(language);
        break;
      case "/":
        indexPageTranslate(language);
        break;
      case "/pages/contact":
        contactPageTranslate(language);
        break;
      case "/pages/policy/privacy-policy":
        privacyPolicyPageTranslate(language);
        termsOfPrivacyDesc(option);
        break;
      case "/pages/policy/terms-of-policy":
        termsOfPolicy(language);
        termsOfPolicyDesc(option)
        break;
      case "/pages/manual":
        manaulTranslate(language);
        break;
      default:
        break;
    }
  }
  // 1-3. 각 드롭다운에 맞게 초기화
  // 실행문 : header dropdown
  const dropdown1 = document.querySelector('.dropdown1');
  initDropdown(dropdown1, ['KR', 'EN', 'CN','JP','VN'], renderOptionWithImage); //['KR', 'EN', 'JP','VN']

  // 실행문 : footer dropdown
  const dropdown2 = document.querySelector('.dropdown2');
  initDropdown(dropdown2, [
    {
      option: {
        'KR':'프로',
        'EN':'Pro',
        'CN':'Pro',
        'JP':'Pro',
        'VN':'Pro',
      },
      link: 'https://procorp.co.kr/'
    },
    {
      option: {
        'KR':'IEA',
        'EN':'IEA',
        'CN':'IEA',
        'JP':'IEA',
        'VN':'IEA',
      },
      link: 'https://www.iea.co.kr/'
    },
    {
      option: {
        'KR':'제이비트리',
        'EN':'JBTree',
        'CN':'JBTree',
        'JP':'JBTree',
        'VN':'JBTree',
      },
      link: 'https://jbtree.co.kr/'
    },
  ], renderOptionTextOnly, true);
});

var policySwiper; // Swiper 인스턴스에 전역 접근 가능하도록 변수 정의

function callFooterSwiper() {
  policySwiper = new Swiper('.policySwiper', {
    slidesPerView: "auto",
    watchOverflow: true,
  });
}

function destroyFooterSwiper() {
  if (policySwiper) {
    policySwiper.destroy(); // Swiper 인스턴스 파괴
  }
}

/* 팝업 */
/* popup창 열기 */
/* 모달창 열기 */
/* popup - 높이 잡기(반응형, 모바일 하단 바 고려) */
function adjustPopupHeight(modalName) {
  const iw = window.innerWidth;
  const popup = document.querySelector(modalName);
  const modalContent = popup.querySelector('.dy-modal-content');
  const modalBody = modalContent.querySelector(`.dy-body`);

  if (iw <= 767) {
    const vh = `200px`;
    modalContent.style.height = `${100 * vh}px`;
    modalContent.style.maxHeight = 'initial'; // 기존 스타일 초기화
    // modalBody.style.height = `calc(${100 * vh}px - 144px)`;
  } else {
    modalContent.style.height = 'auto';
    modalContent.style.maxHeight = '850px';
    // modalBody.style.height = `598px`;
  }
}
function openModal (modalName) {
  openModalName = modalName
  adjustPopupHeight(modalName);
  document.body.style.overflow = 'hidden';
  setTimeout(function() {
    document.querySelector(modalName).style.display = 'flex';
  },10)
}
/* 모달창 닫기 */
function closeModal(modalName) {
  const modalElement = document.querySelector(modalName);
  if (modalElement) { // 해당 요소가 존재하는지 확인
    /* [공통 기능] */
    modalElement.style.display = 'none';
    document.body.style.overflow = 'auto';
    openModalName = ''
  }
}
/* [번역] */
/* 인덱스 페이지 */
function indexPageTranslate(language) {
  document.querySelector('[data-translate="meta_title"]').innerText = language.meta_title
  /* sec1 번역 */
  document.querySelector('[data-translate="sec1_text1"]') ? document.querySelector('[data-translate="sec1_text1"]').innerHTML = language.sec1_text1 : "";
  document.querySelector('[data-translate="sec1_text2"]').innerHTML = language.sec1_text2;
  document.querySelector('[data-translate="sec1_apple"]').src = language.sec1_apple.src;
  document.querySelector('[data-translate="sec1_apple"]').alt = language.sec1_apple.alt;
  document.querySelector('[data-translate="sec1_google"]').src = language.sec1_google.src;
  document.querySelector('[data-translate="sec1_google"]').alt = language.sec1_google.alt;
  let elementSec1 = document.querySelector('[data-translate="sec1_class"]');
  let elementSec1ClassNames = [...elementSec1.classList];
  elementSec1ClassNames.forEach(className => {
    if(className !== "inner-wrap") {
      elementSec1.classList.remove(className)
    }
  })
  document.querySelector('[data-translate="sec1_class"]').classList.add(language.sec1_class);
  /* sec2 번역 */
  document.querySelector('[data-translate="sec2_title"]').innerHTML = language.sec2_title;
  document.querySelector('[data-translate="sec2_desc"]').innerHTML = language.sec2_desc;
  document.querySelector('[data-translate="sec2_dress_alt"]').alt = language.sec2_dress_alt;
  document.querySelector('[data-translate="sec2_dress_alt"]').src = language.sec2_dress_src;
  document.querySelector('[data-translate="sec2_cloud1_alt"]').alt = language.sec2_cloud1_alt;
  document.querySelector('[data-translate="sec2_cloud1_alt"]').src = language.sec2_cloud1_src;
  document.querySelector('[data-translate="sec2_cloud2_alt"]').alt = language.sec2_cloud2_alt;
  document.querySelector('[data-translate="sec2_cloud2_alt"]').src = language.sec2_cloud2_src;
  document.querySelector('[data-translate="sec2_phone2"]').src = language.sec2_phone2;
  /* sec3 번역 */
  document.querySelector('[data-translate="sec3_title1"]').innerText = language.sec3_title1;
  document.querySelector('[data-translate="sec3_desc1"]').innerHTML = language.sec3_desc1;
  document.querySelector('[data-translate="sec3_title2"]').innerHTML = language.sec3_title2;
  document.querySelector('[data-translate="sec3_desc2"]').innerHTML = language.sec3_desc2;
  document.querySelector('[data-translate="sec3_title3"]').innerHTML = language.sec3_title3;
  document.querySelector('[data-translate="sec3_desc3"]').innerHTML = language.sec3_desc3;
  /* sec4, sec5 번역 */
  document.querySelector('[data-translate="sec4_title"]').innerHTML = language.sec4_title;
  document.querySelector('[data-translate="sec4_desc"]').innerHTML = language.sec4_desc;
  document.querySelector('[data-translate="sec4_phone1"]').src = language.sec4_phone1;
  document.querySelector('[data-translate="sec4_phone2"]').src = language.sec4_phone2;
  document.querySelector('[data-translate="sec5_title"]').innerHTML = language.sec5_title;
  document.querySelector('[data-translate="sec5_desc"]').innerHTML = language.sec5_desc;
  document.querySelector('[data-translate="sec5_phone1"]').src = language.sec5_phone1;
  document.querySelector('[data-translate="sec5_phone2"]').src = language.sec5_phone2;
  let elementSec4 = document.querySelector('[data-translate="sec4_class"]');
  let elementSec4ClassNames = [...elementSec4.classList];
  elementSec4ClassNames.forEach(className => {
    if(className !== "image-wrap") {
      elementSec4.classList.remove(className)
    }
  })
  document.querySelector('[data-translate="sec4_class"]').classList.add(language.sec4_class);
  let elementSec5 = document.querySelector('[data-translate="sec5_class"]');
  let elementSec5ClassNames = [...elementSec5.classList];
  elementSec5ClassNames.forEach(className => {
    if(className !== "image-wrap") {
      elementSec5.classList.remove(className)
    }
  })
  document.querySelector('[data-translate="sec5_class"]').classList.add(language.sec5_class);
  /* sec6 */
  document.querySelector('[data-translate="sec6_title"]').innerHTML = language.sec6_title;
  document.querySelector('[data-translate="sec6_desc"]').innerHTML = language.sec6_desc;
  /* sec7 */
  document.querySelector('[data-translate="sec7_title"]').innerHTML = language.sec7_title;
  document.querySelector('[data-translate="sec7_desc"]').innerHTML = language.sec7_desc;
  document.querySelector('[data-translate="sec7_img1"]').src = language.sec7_img1;
  document.querySelector('[data-translate="sec7_img2"]').src = language.sec7_img2;
  document.querySelector('[data-translate="sec7_img3"]').src = language.sec7_img3;
  document.querySelector('[data-translate="sec7_img4"]').src = language.sec7_img4;
  function loadSec7Slider() {
    // 너비에 따라 Swiper 초기화
    if (window.innerWidth >= 500) {
      sec7SwiperSlide = new Swiper(".sec7_swiper_slide", {
        effect: "slide",
        slidesPerView: window.innerWidth >= 1024 ? 4 : 2,
        spaceBetween: 18,
        loop: false,
        grabCursor: true,
        pagination: {
          el: ".sec7_swiper_slide .swiper-pagination",
          clickable: true,
        },
      });
    } else {
      sec7SwiperSlide = new Swiper(".sec7_swiper_slide", {
        effect: "cards",
        slidesPerView: 1,
        loop: false,
        grabCursor: true,
        pagination: {
          el: ".sec7_swiper_slide .swiper-pagination",
          clickable: true,
        },
      });
    }
  }
  // sec7 슬라이더 실행
  loadSec7Slider();

  // resize 시 swiper 초기화
  window.addEventListener("resize", () => {
    if (sec7SwiperSlide) {
      sec7SwiperSlide.destroy(true, true);
    }
    loadSec7Slider();
  });

  /* sec8 */
  document.querySelector('[data-translate="sec8_star"]').style = language.sec8_star;
  document.querySelector('[data-translate="sec8_btn"]').innerHTML = language.sec8_btn;
  document.querySelector('[data-translate="footer_1"]').innerText = language.footer_1;
  document.querySelector('[data-translate="footer_2"]').innerText = language.footer_2;
  document.querySelector('[data-translate="footer_3"]').innerText = language.footer_3;
  document.querySelector('[data-translate="footer_cop"]').innerText = language.footer_cop;
  document.querySelector('[data-translate="footer_pi_1"]').innerText = language.footer_pi_1;
  document.querySelector('[data-translate="footer_pi_2"]').innerText = language.footer_pi_2;
  document.querySelector('[data-translate="footer_pi_3"]').innerText = language.footer_pi_3;
  document.querySelector('[data-translate="footer_pi_4"]').innerText = language.footer_pi_4;
  document.querySelector('[data-translate="footer_pi_5"]').innerText = language.footer_pi_5;
  document.querySelector('[data-translate="footer_pi_6"]').innerText = language.footer_pi_6;
  document.querySelector('[data-translate="footer_pi_7"]').innerText = language.footer_pi_7;
  document.querySelector('[data-translate="footer_family_site"]').innerText = language.footer_family_site;
  /* popup */
  document.querySelector('[data-translate="popup_email"]').innerText = language.popup_email;
  document.querySelector('[data-translate="popup_email_desc"]').innerHTML = language.popup_email_desc;
  document.querySelector('[data-translate="popup_email_date"]').innerText = language.popup_email_date;
  document.querySelector('[data-translate="popup_btn"]').innerText = language.popup_btn;
}
/* Contact 페이지 */
function contactPageTranslate (language) {
  document.querySelector('[data-translate="meta_title_contact"]').innerText = language.meta_title_contact
  document.querySelector('[data-translate="contact_1"]').innerHTML = language.contact_1;
  document.querySelector('[data-translate="contact_2"]').innerText = language.contact_2;
  document.querySelector('[data-translate="contact_3"]').innerText = language.contact_3;
  document.querySelector('[data-translate="contact_4"]').placeholder = language.contact_4;
  document.querySelector('[data-translate="contact_5"]').innerText = language.contact_5;
  document.querySelector('[data-translate="contact_6"]').placeholder = language.contact_6;
  document.querySelector('[data-translate="contact_7"]').innerText = language.contact_7;
  document.querySelector('[data-translate="contact_8"]').placeholder = language.contact_8;
  document.querySelector('[data-translate="contact_9"]').innerText = language.contact_9;
  document.querySelector('[data-translate="contact_10"]').placeholder = language.contact_10;
  document.querySelector('[data-translate="contact_11"]').innerHTML = language.contact_11;
  document.querySelector('[data-translate="contact_12"]').placeholder = language.contact_12;
  document.querySelector('[data-translate="contact_13"]').innerHTML = language.contact_13;
  document.querySelector('[data-translate="contact_14"]').placeholder = language.contact_14;
  document.querySelector('[data-translate="contact_15"]').innerHTML = language.contact_15;
  document.querySelector('[data-translate="contact_16"]').placeholder = language.contact_16;
  document.querySelector('[data-translate="contact_17"]').innerText = language.contact_17;
  document.querySelector('[data-translate="contact_18"]').innerHTML = language.contact_18;
  document.querySelector('[data-translate="footer_1"]').innerText = language.footer_1;
  document.querySelector('[data-translate="footer_2"]').innerText = language.footer_2;
  document.querySelector('[data-translate="footer_3"]').innerText = language.footer_3;
  document.querySelector('[data-translate="footer_cop"]').innerText = language.footer_cop;
  document.querySelector('[data-translate="footer_pi_1"]').innerText = language.footer_pi_1;
  document.querySelector('[data-translate="footer_pi_2"]').innerText = language.footer_pi_2;
  document.querySelector('[data-translate="footer_pi_3"]').innerText = language.footer_pi_3;
  document.querySelector('[data-translate="footer_pi_4"]').innerText = language.footer_pi_4;
  document.querySelector('[data-translate="footer_pi_5"]').innerText = language.footer_pi_5;
  document.querySelector('[data-translate="footer_pi_6"]').innerText = language.footer_pi_6;
  document.querySelector('[data-translate="footer_pi_7"]').innerText = language.footer_pi_7;
  document.querySelector('[data-translate="footer_family_site"]').innerText = language.footer_family_site;
  /* popup */
  document.querySelector('[data-translate="popup_email"]').innerText = language.popup_email;
  document.querySelector('[data-translate="popup_email_desc"]').innerHTML = language.popup_email_desc;
  document.querySelector('[data-translate="popup_email_date"]').innerText = language.popup_email_date;
  document.querySelector('[data-translate="popup_btn"]').innerText = language.popup_btn;
}
/* 개인정보처리방침 페이지 */
function privacyPolicyPageTranslate(language) {
  document.querySelector('[data-translate="meta_title_ppt"]').innerText = language.meta_title_ppt
  document.querySelector('[data-translate="ppt_title"]').innerHTML = language.ppt_title;
  document.querySelector('[data-translate="footer_1"]').innerText = language.footer_1;
  document.querySelector('[data-translate="footer_2"]').innerText = language.footer_2;
  document.querySelector('[data-translate="footer_3"]').innerText = language.footer_3;
  document.querySelector('[data-translate="footer_cop"]').innerText = language.footer_cop;
  document.querySelector('[data-translate="footer_pi_1"]').innerText = language.footer_pi_1;
  document.querySelector('[data-translate="footer_pi_2"]').innerText = language.footer_pi_2;
  document.querySelector('[data-translate="footer_pi_3"]').innerText = language.footer_pi_3;
  document.querySelector('[data-translate="footer_pi_4"]').innerText = language.footer_pi_4;
  document.querySelector('[data-translate="footer_pi_5"]').innerText = language.footer_pi_5;
  document.querySelector('[data-translate="footer_pi_6"]').innerText = language.footer_pi_6;
  document.querySelector('[data-translate="footer_pi_7"]').innerText = language.footer_pi_7;
  document.querySelector('[data-translate="footer_family_site"]').innerText = language.footer_family_site;
  /* popup */
  document.querySelector('[data-translate="popup_email"]').innerText = language.popup_email;
  document.querySelector('[data-translate="popup_email_desc"]').innerHTML = language.popup_email_desc;
  document.querySelector('[data-translate="popup_email_date"]').innerText = language.popup_email_date;
  document.querySelector('[data-translate="popup_btn"]').innerText = language.popup_btn;
}
/* 이용약관 페이지 */
function termsOfPolicy(language) {
  document.querySelector('[data-translate="meta_title_top"]').innerText = language.meta_title_top
  document.querySelector('[data-translate="top_title"]').innerHTML = language.top_title;
  document.querySelector('[data-translate="footer_1"]').innerText = language.footer_1;
  document.querySelector('[data-translate="footer_2"]').innerText = language.footer_2;
  document.querySelector('[data-translate="footer_3"]').innerText = language.footer_3;
  document.querySelector('[data-translate="footer_cop"]').innerText = language.footer_cop;
  document.querySelector('[data-translate="footer_pi_1"]').innerText = language.footer_pi_1;
  document.querySelector('[data-translate="footer_pi_2"]').innerText = language.footer_pi_2;
  document.querySelector('[data-translate="footer_pi_3"]').innerText = language.footer_pi_3;
  document.querySelector('[data-translate="footer_pi_4"]').innerText = language.footer_pi_4;
  document.querySelector('[data-translate="footer_pi_5"]').innerText = language.footer_pi_5;
  document.querySelector('[data-translate="footer_pi_6"]').innerText = language.footer_pi_6;
  document.querySelector('[data-translate="footer_pi_7"]').innerText = language.footer_pi_7;
  document.querySelector('[data-translate="footer_family_site"]').innerText = language.footer_family_site;

  /* popup */
  document.querySelector('[data-translate="popup_email"]').innerText = language.popup_email;
  document.querySelector('[data-translate="popup_email_desc"]').innerHTML = language.popup_email_desc;
  document.querySelector('[data-translate="popup_email_date"]').innerText = language.popup_email_date;
  document.querySelector('[data-translate="popup_btn"]').innerText = language.popup_btn;
}
/* manual 페이지 */
function manaulTranslate (language) {
  document.querySelector('[data-translate="m_title"]').innerHTML = language.m_title;
  document.querySelector('[data-translate="m_sub"]').innerHTML = language.m_sub;
  document.querySelector('[data-translate="m_title1"]').innerHTML = language.m_title1;
  document.querySelector('[data-translate="m_sub1-1"]').innerHTML = language['m_sub1-1'];
  document.querySelector('[data-translate="m_sub1-2"]').innerHTML = language['m_sub1-2'];
  document.querySelector('[data-translate="m_sub1-3"]').innerHTML = language['m_sub1-3'];
  document.querySelector('[data-translate="m_title2"]').innerHTML = language.m_title2;
  document.querySelector('[data-translate="m_title3"]').innerHTML = language.m_title3;
  document.querySelector('[data-translate="m_sub3-1"]').innerHTML = language['m_sub3-1'];
  document.querySelector('[data-translate="m_sub3-2"]').innerHTML = language['m_sub3-2'];
  document.querySelector('[data-translate="m_title4"]').innerHTML = language.m_title4;
  document.querySelector('[data-translate="m_sub4-1"]').innerHTML = language['m_sub4-1'];
  document.querySelector('[data-translate="m_sub4-2"]').innerHTML = language['m_sub4-2'];
  document.querySelector('[data-translate="m_title5"]').innerHTML = language['m_title5'];
  document.querySelector('[data-translate="m_sub5-1"]').innerHTML = language['m_sub5-1'];
  document.querySelector('[data-translate="m_sub5-2"]').innerHTML = language['m_sub5-2'];
  document.querySelector('[data-translate="m_title6"]').innerHTML = language.m_title6;
  document.querySelector('[data-translate="m_sub6-1"]').innerHTML = language['m_sub6-1'];
  document.querySelector('[data-translate="m_sub6-2"]').innerHTML = language['m_sub6-2'];
  document.querySelector('[data-translate="m_title7"]').innerHTML = language.m_title7;
  document.querySelector('[data-translate="m_sub7-1"]').innerHTML = language['m_sub7-1'];
  document.querySelector('[data-translate="m_title8"]').innerHTML = language.m_title8;
  document.querySelector('[data-translate="m_sub8-1"]').innerHTML = language['m_sub8-1'];
  document.querySelector('[data-translate="m_sub8-2"]').innerHTML = language['m_sub8-2'];
  document.querySelector('[data-translate="m_comment1"]').innerHTML = language.m_comment1;
  document.querySelector('[data-translate="m_comment2"]').innerHTML = language.m_comment2;
  /* footer */
  document.querySelector('[data-translate="footer_1"]').innerText = language.footer_1;
  document.querySelector('[data-translate="footer_2"]').innerText = language.footer_2;
  document.querySelector('[data-translate="footer_3"]').innerText = language.footer_3;
  document.querySelector('[data-translate="footer_cop"]').innerText = language.footer_cop;
  document.querySelector('[data-translate="footer_pi_1"]').innerText = language.footer_pi_1;
  document.querySelector('[data-translate="footer_pi_2"]').innerText = language.footer_pi_2;
  document.querySelector('[data-translate="footer_pi_3"]').innerText = language.footer_pi_3;
  document.querySelector('[data-translate="footer_pi_4"]').innerText = language.footer_pi_4;
  document.querySelector('[data-translate="footer_pi_5"]').innerText = language.footer_pi_5;
  document.querySelector('[data-translate="footer_pi_6"]').innerText = language.footer_pi_6;
  document.querySelector('[data-translate="footer_pi_7"]').innerText = language.footer_pi_7;
  document.querySelector('[data-translate="footer_family_site"]').innerText = language.footer_family_site;
  /* popup */
  document.querySelector('[data-translate="popup_email"]').innerText = language.popup_email;
  document.querySelector('[data-translate="popup_email_desc"]').innerHTML = language.popup_email_desc;
  document.querySelector('[data-translate="popup_email_date"]').innerText = language.popup_email_date;
  document.querySelector('[data-translate="popup_btn"]').innerText = language.popup_btn;
}

function termsOfPolicyDesc(language) {
  const element = document.querySelector('[data-translate="data_terms_policy"]');
  if (!element) return;

  if (language === 'KR') {
    element.innerHTML = TOP_KR;  // TOP_KR 변수의 내용으로 교체
  } else if (language === 'EN') {
    element.innerHTML = TOP_EN;
  } else if (language === 'JP') {
    element.innerHTML = TOP_JP;
  } else if (language === 'CN') {
    element.innerHTML = TOP_CN;
  } else {
    element.innerHTML = TOP_VN;
  }
}

function termsOfPrivacyDesc(language) {
  const element = document.querySelector('[data-translate="data_privacy_policy"]');
  if (!element) return;

  if (language === 'KR') {
    element.innerHTML = PPH_KR;  // PPH_KR 변수의 내용으로 교체
  } else if (language === 'EN') {
    element.innerHTML = PPH_EN;
  } else if (language === 'JP') {
    element.innerHTML = PPH_JP;
  } else if (language === 'CN') {
    element.innerHTML = PPH_CN;
  } else {
    element.innerHTML = PPH_VN;
  }
}


/* 이용약관 */
const TOP_KR = `
        <div class="inner-wrap scroll-ver">
            <div class="info-box">
                <p>제1조 (목적)</p>
                <ul>
                    <li>이 약관은 프로키즈북(이하 “회사”라 합니다)이 동화책 제작 모바일 애플리케이션 (이하 “프로키즈북앱” 이라 합니다)의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제2조 (정의)</p>
                <ul>
                    <li>“서비스”이라 함은 전자책 저작 및 온, 오프라인 공유 등 회원의 모바일 애플리케이션 사용을 통해서 제공하는 모든 서비스를 말합니다.<br/>
                         ”회원”이라 함은 “프로키즈북앱” 계정을 갖고 있는 자 중에서 이 약관에 따라 회사와 이용계약을 체결하고, 모바일 애플리케이션을 사용하는 자를 말합니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제3조 (약관의 게시와 개정)</p>
                <ul class="style-list">
                    <li>회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 모바일 애플리케이션 화면에 게시합니다.</li>
                    <li>회사는 약관의 규제에 관한 법률 등 관련 법을 위반하지 않는 범위에서 이 약관을 변경할 수 있습니다.</li>
                    <li>회사가 약관을 변경할 경우에는 적용일자 및 개정사유를 명시하여 모바일 애플리케이션에서 적용일자 7일 전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리한 내용으로 개정되는 경우 적용일자 30일 전에 제9조 제1항에서 정한 통지 수단으로 개별 통지합니다.</li>
                    <li>회사가 전항에 따라 변경약관을 공지 또는 통지하면서 회원에게 일정 기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 공지 또는 통지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한 경우 회원이 변경약관에 동의한 것으로 봅니다.</li>
                    <li>회원이 변경약관의 적용에 동의하지 않는 경우 회사는 변경약관의 내용을 적용할 수 없으며, 이 경우 회원은 이용계약을 해지할 수 있습니다. 다만, 기존 약관을 적용할 수 없는 특별한 사정이 있는 경우 회사는 이용계약을 해지할 수 있습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제4조 (약관의 해석)</p>
                <ul class="style-list">
                    <li>회사는 서비스 제공과 관련하여 별도의 서비스 운영정책(이하 “운영정책”이라 합니다)을 둘 수 있습니다.</li>
                    <li>이 약관에서 정하지 아니한 사항이나 해석에 대해서는 운영정책 및 관계법령 또는 상관례에 따릅니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제5조 (서비스 회원 가입의 성립)</p>
                <ul class="style-list">
                    <li>서비스 회원의 가입은 회원이 되고자 하는 자(이하 “가입신청자”라고 합니다)가 약관의 내용에 대하여 동의를 한 다음 회사가 정한 절차에 따라 회원가입신청을 하고, 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.</li>
                    <li>
                        회사는 가입신청자의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, 회사은 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
                        <ul class="sub-list">
                            <li>가. 가입신청자가 이 약관의 의하여 이전에 회원자격을 상실한 적이 있는 경우. 다만, 회사의 회원 재가입 승낙을 얻은 경우에는 예외로 함.</li>
                            <li>나. 실명이 아니거나 타인의 명의를 이용한 경우</li>
                            <li>다. 허위의 정보를 기재한 경우</li>
                            <li>라. 14세 미만 “이용자”의 부모 등 법정대리인은 아동에 대한 개인정보의 열람, 정정, 갱신을 요청하거나 회원 가입에 대한 동의를 철회할 수 있으며, 이러한 경우에 “회사”는 지체 없이 필요한 조치를 취해야 합니다.</li>
                            <li>마. 가입신청자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</li>
                        </ul>
                    </li>
                    <li>회사는 서비스를 전연령을 대상으로 제공하나, 단말기 소유자가 미성년자임을 회사에 알리지 않는 경우에 서비스 이용 연령에 따른 차이를 두지 않습니다. 단말기 소유자가 미성년자임이 밝혀진 경우 회사가 정한 절차에 따른 부모등 법정대리인의 동의절차를 거쳐야 합니다.</li>
                    <li>회사는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제6조 (회원정보의 변경)</p>
                <ul class="style-list">
                    <li>회원은 모바일 애플리케이션을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다.</li>
                    <li>회원은 회원가입신청시 기재한 사항이 변경되었을 경우 모바일 애플리케이션을 통하여 수정을 하거나 전자우편 기타 방법으로 회사에 대하여 그 변경사항을 알려야 합니다.</li>
                    <li>전항의 변경사항을 회사에 알리지 않아 발생한 불이익에 대하여 회사는 책임을 부담하지 않습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제7조 (개인정보보호 의무)</p>
                <ul>
                    <li>회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령에서 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련 법령 및 개인정보취급방침이 적용됩니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제8조 (회원의 계정 관리에 대한 의무)</p>
                <ul class="style-list">
                    <li>회원의 모바일 애플리케이션 계정에 대한 관리책임은 회원에게 있으며, 이를 제3자가 이용하도록 하여서는 안됩니다.</li>
                    <li>회원은 계정이 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 회사에 통지하고 회사의 안내에 따라야 합니다.</li>
                    <li>전항의 경우에 해당 회원이 회사에 그 사실을 통지하지 않거나, 통지한 경우에도 회사의 안내에 따르지 않아 발생한 불이익에 대하여 회사는 책임을 부담하지 않습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제9조 (회원에 대한 통지)</p>
                <ul class="style-list">
                    <li>회원에 대한 통지를 하는 경우 회사는 회원이 등록한 전자우편 주소 또는 SMS 등으로 할 수 있습니다.</li>
                    <li>회사는 회원의 연락처 미기재, 변경 등으로 인하여 개별 통지가 어렵거나 불특정 다수 회원에 대한 통지를 하는 경우 모바일 애플리케이션 게시판 등에 게시함으로써 개별 통지에 갈음할 수 있습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제10조 (회사의 의무)</p>
                <ul class="style-list">
                    <li>회사는 관련 법령과 이 약관을 준수하며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여 노력합니다.</li>
                    <li>회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보(신용정보 포함) 보호를 위하여 보안시스템을 갖추어야 하며, 개인정보취급방침을 공시하고 준수합니다.</li>
                    <li>회사는 서비스 이용과 관련하여 회원으로부터 제기된 의견이나 불만이 정당하다고 인정될 경우 이를 처리하여야 하며, 모바일 애플리케이션 내 게시판, 전자우편 등을 통하여 회원에게 처리과정 및 결과를 전달할 수 있습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제11조 (회원의 의무)</p>
                <ul class="style-list">
                    <li>회원은 관계법령, 이 약관, 운영정책, 이용안내 및 회사를 통해 공지하거나 통지한 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.</li>
                    <li>
                        회사는 가입신청자의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
                        <ul class="sub-list">
                            <li>가. 다른 회원 및 제3자의 회사 계정을 부정사용 하는 행위</li>
                            <li>나. 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위</li>
                            <li>다. 타인의 지적재산권 등의 권리를 침해하는 행위</li>
                            <li>라. 해킹행위 또는 컴퓨터바이러스 등의 유포행위</li>
                            <li>마. 회사가 안내하는 방법 이외의 다른 방법을 사용하여 서비스에 접근하는 행위</li>
                            <li>바. 회사의 이용자 정보를 무단으로 수집, 이용하거나 다른 사람에게 제공하는 행위</li>
                            <li>사. 서비스를 영리목적으로 이용하는 행위</li>
                            <li>아. 음란 및 저작권 침해 등 법령을 위반하는 내용의 모바일 애플리케이션을 개발하는 행위</li>
                            <li>자. 회사가 제공하는 모든 서비스 또는 이에 포함된 소프트웨어의 일부를 복사, 수정, 배포, 판매, 양도, 대여, 담보제공하거나, 타인에게 그 이용을 허락하는 행위와 소프트웨어를 역설계하거나 소스 코드의 추출을 시도하는 등의 행위</li>
                            <li>차. 회사의 명시적인 동의 없이 상표 및 로고 등의 영업표지를 무단으로 사용하는 행위</li>
                            <li>카. 기타서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위</li>
                        </ul>
                    </li>
                    <li>회원은 회사를 이용하여 얻은 정보를 회사의 사전 승낙 없이, 복사, 복제, 변경, 번역, 출판, 방송 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다.</li>
                    <li>회원은 서비스 제공 또는 이 약관 위반을 확인하기 위해 회사가 자료 또는 접근권한의 제공 및 관련사실에 대한 소명을 요청하는 경우에는 이에 성실히 임하여야 합니다.</li>
                    <li>회원은 소프트웨어개발키트(SDK)를 비롯하여 서비스를 통해 회사가 제공하는 기능에 대한 버전 업데이트를 수시로 확인하여야 합니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제12조 (콘텐츠서비스의 제공 등)</p>
                <ul class="style-list">
                    <li>회사가 제공하는 서비스는 회원의 자격에 따라 차등 제공받을 수 있습니다.</li>
                    <li>한 연중무휴, 서비스의 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다.</li>
                    <li>회사는 컴퓨터 등 정보통신설비의 보수점검, 교체, 고장, 장애, 통신두절 또는 운영상 합리적인 사유가 있는 경우 서비스 제공을 일시적으로 중단할 수 있습니다. 이 경우 회사는 제9조에 정한 방법으로 회원에게 통지합니다. 다만, 회사가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다</li>
                    <li>회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 모바일 애플리케이션을 통해 공지한 바에 따릅니다.</li>
                    <li>만들어진 동화는 모두 공개되며, 이를 원치 않을 시 회사에 연락하면 콘텐츠를 지울 수 있습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제13조 (콘텐츠서비스의 변경)</p>
                <ul class="style-list">
                    <li>회사는 안정적인 서비스 제공을 위하여 서비스의 내용, 운영상 또는 기술상 사항 등을 변경할 수 있습니다.</li>
                    <li>회사는 서비스를 변경할 경우 변경 내용과 적용일자를 명시하여 모바일 애플리케이션에서 사전 공지합니다.</li>
                    <li>회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.</li>
                    <li>모든 페이지가 완성되지 않고 게시된 콘텐츠에 한해서 회사는 회원의 동의 없이 게시물을 삭제할 수 있습니다.</li>
                    <li>음란 및 저작권 침해의 콘텐츠일 경우 회사는 회원의 동의 없이 게시물을 삭제할 수 있습니다.</li>
                    <li>다른 회원에게 불쾌한 감정을 주는 콘텐츠일 경우 회사는 회원의 동의 없이 만들어진 동화를 삭제할 수 있습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제14조 (권리의 귀속)</p>
                <ul class="style-list">
                    <li>서비스에 대한 저작권(저작인접권) 및 지적재산권은 회사에 귀속됩니다.</li>
                    <li>회사는 서비스와 관련하여 회원에게 회사가 정한 이용조건에 따라 계정, 모바일 애플리케이션 등을 이용할 수 있는 이용권만을 부여하며, 회원은 이를 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다.</li>
                    <li>회원이 서비스 내에 게시하는 게시물은 서비스 내 자체 검색결과나 포털사이트의 검색결과에 노출될 수 있고, 회사와 서비스에 관한 언론보도, PR, 출판, 콘테스트 홍보, 타 애플리케이션과의 자료 공유 등의 목적으로 무상으로 사용될 수 있으며, 이를 위해 회원이 게시판 게시물은 필요한 범위 내에서 일부 수정, 복제, 편집될 수 있습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제15조 (서비스 이용계약의 해지)</p>
                <ul class="style-list">
                    <li>회원은 언제든지 모바일 애플리케이션에 접속하여 서비스 이용계약의 해지를 신청할 수 있으며, 회사는 법령이 정하는 바에 따라 회원의 해지 신청을 신속히 처리합니다.</li>
                    <li>회원의 해지 처리가 완료되는 경우 회사는 관련 법령 및 개인정보취급방침에 따라 보유하는 회원의 정보를 제외한 회원의 모든 정보를 삭제합니다.</li>
                    <li>회원의 서비스 이용계약 해지가 완료되는 경우 서비스 운영정책에서 정하는 바에 따라 탈퇴한 회원의 정보로 다시 가입하는 것이 제한 될 수 있습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제16조 (이용제한)</p>
                <ul class="style-list">
                    <li>회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 경고, 일시정지, 이용계약의 해지 등으로 서비스 이용을 단계적으로 제한할 수 있습니다</li>
                    <li>회사는 전항에도 불구하고, 회원이 현행 법령을 위반한 경우에는 즉시 서비스 이용계약을 해지할 수 있습니다.</li>
                    <li>본 조에 따라 서비스 이용을 제한하거나 계약을 해지하는 경우 회사는 제9조에 따라 회원에게 통지합니다.</li>
                    <li>회원은 본 조에 따른 이용제한 등에 대해 회사가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는 경우 회사는 즉시 서비스의 이용을 재개합니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제17조 (책임제한)</p>
                <ul class="style-list">
                    <li>회사는 천재지변, 디도스(DDOS) 공격, IDC장애, 기간통신사업자의 회선 장애 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임을 부담하지 않습니다.</li>
                    <li>회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 부담하지 않습니다.</li>
                    <li>회사는 회원이 개발한 서비스의 신뢰도, 정확성, 적법성 등에 대하여 보증하니 않으며, 관련하여 어떠한 책임도 부담하지 않습니다.</li>
                    <li>회사는 서비스를 통해 회원의 모바일 애플리케이션 개발에 부가적인 기능을 제공할 뿐이며, 서비스를 사용에 따른 어떠한 효과 향상도 보증하지 않습니다.</li>
                    <li>회사는 무료로 제공되는 서비스 이용과 관련하여 관련법령에 특별한 규정이 없는 한 책임을 부담하지 않습니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제18조 (준거법 및 재판관할)</p>
                <ul class="style-list">
                    <li>회사와 회원 간 제기된 소송은 대한민국법을 준거법으로 합니다.</li>
                    <li>회사와 회원간 발생한 분쟁에 관한 소송은 민사소송법 상의 관할법원에 제소합니다.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제19조 (권한 요구사항)</p>
                <ul class="style-list">
                    <li>회사는 서비스를 이용함에 있어 저작권자의 저작권 보호를 위한 정책을 수립하여 운영하며 회원은 회사의 저작권 정책을 준수하여야 합니다.</li>
                    <li>서비스 내 콘텐츠 모두 저작권자가 별도로 존재합니다. 회원은 콘텐츠를 불법 이용, 도용, 활용, 복제, 복사, 배포할 수 없으며 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 이용하거나 제3자에게 이용하게 할 수 없습니다. 만약 회원이 이를 위반할 시 회원은 이에 대한 일체의 책임을 부담하며 만약 원 저작권자가 회원의 행위로 인하여 회사에게 연대 또는 단독하여 손해배상을 청구할 경우 회원은 자신의 책임과 비용(저작권자와 소송 시 발생하는 변호사비용, 소송비용을 포함하나 이에 한정하지 않음)으로 회사를 완전히 면책시켜야 합니다. </li>
                    <li>회원이 공유하여 게시한 결과물이 제3자의 지식재산권(저작권, 디자인권 등을 포함하나 이에 한정되지 않습니다) 및 인격권(연예인 등 사회 유명인사는 물론 동의 없이 타인의 이미지, 목소리를 이용하는 제반 행위가 모두 포함됩니다)을 침해하는 경우 회원은 그에 대한 책임을 전적으로 부담하며, 회원은 자신의 책임과 비용(변호사비용, 소송비용을 포함하나 이에 한정하지 않음)으로 회사를 완전히 면책시켜야 합니다. </li>
                    <li>서비스 내 각 콘텐츠의 저작권자는 일부의 경우를 제외하고는 모두 다릅니다. 회원은 회사와의 법률관계에 대한 자신이 독자적 판단을 근거로 자신이 저작권 중 일부에 대한 권한을 가졌다고 해석할 수 없으며, 회원이 서비스 및 콘텐츠 일부의 저작권을 주장하기 위해서는 이와 관련된 모든 저작권자와는 물론 회사와도 별도로 각 당사자가 기명날인한 서면 합의가 있어야 함을 양지하시기 바랍니다. </li>
                    <li>
                        회원이 회사의 서비스를 이용하면서 작성한 게시물이 타인의 저작권을 침해할 경우, 회사는 다음 각 호 저작권법 제103조의 책임을 준수하는 것 이외에 그 어떤 책임도 지지 않습니다.
                        <ul class="sub-list">
                            <li>가) 회사는 회사의 서비스를 이용한 저작물등의 복제ㆍ전송에 따라 저작권, 그 밖에 이 법에 따라 보호되는 자신의 권리가 침해됨을 주장하는 자가 그 사실을 소명하여 회사에게 그 저작물등의 복제ㆍ전송을 중단시킬 것을 요구할 경우 즉시 그 저작물등의 복제ㆍ전송을 중단시키고 권리주장자에게 그 사실을 통보할 것이며 이를 그 저작물등의 복제ㆍ전송자에게 통보할 것입니다. </li>
                            <li>나) 만약 전 항의 통보를 받은 복제ㆍ전송자가 자신의 복제ㆍ전송이 정당한 권리에 의한 것임을 소명하여 그 복제ㆍ전송의 재개를 요구하는 경우 회사는 재개요구사실 및 재개예정일을 권리주장자에게 지체 없이 통보하고 그 예정일에 복제ㆍ전송을 재개시킬 것입니다. 다만, 권리주장자가 복제ㆍ전송자의 침해행위에 대하여 소를 제기한 사실을 재개예정일 전에 회사에게 통보한 경우에는 그러하지 않습니다.</li>
                            <li>
                                다) 회사는 저작물 복제ㆍ전송의 중단 및 그 재개의 요구를 받을 자를 아래와 같이 지정하여 자신의 설비 또는 서비스를 이용하는 자들이 쉽게 알 수 있도록 공지합니다.
                                <div class="py-custom-table">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th><div class="th-wrap">성명</div></th>
                                            <td><div class="td-wrap">최중배</div></td>
                                        </tr>
                                        <tr>
                                            <th><div class="th-wrap">전자우편</div></th>
                                            <td><div class="td-wrap">prokidsbook@iea.co.kr</div></td>
                                        </tr>
                                        <tr>
                                            <th><div class="th-wrap">전화번호</div></th>
                                            <td><div class="td-wrap">02-6263-0630</div></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        회원이 작성한 리뷰 등의 게시글은 회사 정책에 따라 일정기간 노출되며 해당 기간 경과 후 삭제조치 될 수 있습니다.
                    </li>
                    <li>회사가 작성한 저작물에 대한 저작권 기타 지식재산권은 회사에 귀속합니다.</li>
                    <li>회원은 회사의 서비스 내에서 자신의 저작권이 침해된 경우 회사가 운영하는 신고센터 제도를 이용하여 신고 및 필요조치를 요청할 수 있고, 회사는 관련법에 따라 조치를 취합니다.</li>
                    <li>회원은 유무상을 불문하고 회사가 제공하는 서비스 및 서비스를 활용하여 제작한 콘텐츠를 재판매할 수 없고 이에 대한 전부 또는 일부(이미지, 영상, 로고, 템플릿, 슬로건 등을 포함하나 이에 한정하지 않음)를 제3자에게 배포하거나 그 소유권을 이전하여 줄 수 없으며 이를 재판매하거나 공유하는 행위 역시 모두 금지됩니다. 만약 회원은 회사에게 서비스 및 서비스를 활용하여 제작한 콘텐츠를 판매한 수익은 물론 이에 대하여 회사가 개발에 소요한 비용 전액을 지급하는 것을 포함하여 회사에게 그 모든 민형사상 책임을 부담해야 합니다. </li>
                    <li>회원이 추출하여 소지하는 동화 pdf 파일은 상업적인 용도로 활용될 수 없으며, 회원은 어플리케이션 내 게시물의 공유 기능 이외에 회사의 동의 없이 콘텐츠를 이용, 재현, 변경, 각색, 편집, 출판, 2차 저작물 제작, 배포, 공연, 홍보, 전시 및 진열할 수 없습니다(권리를 행사하는 방법은 매체, 인터넷 등을 통한 방식 및 현 시점에 알려지지 않았거나 아직 개발되지 않은 기술에 의한 것도 포함되나 이에 한정하지 않습니다). 만약 회원이 회사 동의 없이 전 항의 행위를 하였을 경우 이에 대한 저작권은 전속적이며 영구적이고 국가 및 지역에 제한 없이 회사에게 귀속되며, 회사는 회원의 의사와 무관하게 무상(royalty-free)으로 이에 대한 회원의 2차 저작물에 대한 제반 권리를 양수할 수 있고 그에 대한 일체의 권리를 그 제작 시점부터 회사에게 이를 자유로이 활용할 수 있는 것으로 간주합니다. </li>
                    <li>만약 회원이 어플리케이션 내 게시물의 공유 기능 이외에 회사의 동의 없이 콘텐츠를 이용, 재현, 변경, 각색, 편집, 출판, 2차 저작물 제작, 배포, 공연, 홍보, 전시 및 진열할 경우 회사는 귀하에게 손해의 배상을 청구할 것이며, 귀사는 회사가 손해액을 산정함에 있어 귀사가 취득한 제반 이익의 3배를 손해배상액의 예정으로 산정함에 동의합니다</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제20조 권한 요구사항</p>
                <ul class="style-list">
                    <li>카메라(선택): 캐릭터 제작 시, 사진 촬영을 위해 필요한 권한</li>
                    <li>저장공간(선택): 콘텐츠 저장/읽기/수정/삭제 권한</li>
                    <li>알림(선택): 서버로부터 알림을 수신하기 위한 권한</li>
                </ul>
            </div>
        </div>
`;
const TOP_CN = `
      <div class="inner-wrap scroll-ver">
            <div class="info-box">
                <p>第1条 目的</p>
                <ul>
                    <li>本条款旨在规定PROKIDSBOOK（以下简称“公司”）与用户之间关于使用童话书制作移动应用程序（以下简称“PROKIDSBOOK应用”）的权利、义务和责任事项。 </li>
                </ul>
            </div>
            <div class="info-box">
                <p>第2条 定义</p>
                <ul class="style-list">
                    <li>“服务”指通过PROKIDSBOOK应用提供的所有功能，包括电子书创作、在线和离线共享等服务。</li>
                    <li>“会员”指拥有PROKIDSBOOK应用账户，并根据本条款与公司签订使用协议并使用该应用程序的用户。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第3条 条款的公布与修改</p>
                <ul class="style-list">
                    <li>公司将在移动应用程序界面上公布本条款，以便会员可以轻松查看。</li>
                    <li>公司可在不违反《条款规制相关法律》等相关法律的前提下修改本条款。</li>
                    <li>若公司修改本条款，将在移动应用程序上提前7天公告生效日期及修改原因。但如果修改内容对会员不利，则公司将在生效日期前30天按照第9条第1项规定的方式单独通知会员。</li>
                    <li>如果公司已按照上述方式公告或通知修改条款，并明确告知会员在一定期限内未表达异议即视为同意修改条款，而会员未明确表示反对，则视为会员已同意修改后的条款。 </li>
                    <li>如果会员不同意修改后的条款，公司将无法适用修改后的条款，会员可以终止使用协议。但在特殊情况下，若无法适用原条款，公司也可终止使用协议。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第4条 条款的解释</p>
                <ul class="style-list">
                    <li>公司可以就服务的提供另行制定运营政策（以下简称“运营政策”）。</li>
                    <li>本条款未规定或需要解释的事项，适用运营政策、相关法律或一般惯例。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第5条 服务会员注册的成立</p>
                <ul class="style-list">
                    <li>会员注册的成立以希望成为会员的用户（以下简称“注册申请人”）同意本条款内容，并按照公司规定的程序提交会员注册申请，公司批准该申请后，即可建立使用协议。</li>
                    <li>
                        公司原则上批准注册申请人的服务使用申请。但在以下情况下，公司可以拒绝批准或在事后解除使用协议
                        <ul class="sub-list">
                            <li>1) 申请人曾因违反本条款而被取消会员资格。但若获得公司重新批准注册的，例外处理。</li>
                            <li>2) 申请人使用虚假姓名或他人名义注册。</li>
                            <li>3) 申请人提供虚假信息。</li>
                            <li>4) 若用户未满14周岁，其父母或法定监护人可以请求访问、更正、更新用户的个人信息，信息，对注册的同意。在此情况下，公司须立即采取必要措施。</li>
                            <li>5) 申请人的原因导致无法批准，或违反其他规定的事项。</li>
                        </ul>
                    </li>
                    <li>公司向所有年龄段提供服务，但若设备持有人未告知公司其为未成年人，公司将不设置年龄使用限制。然而，如发现设备持有人为未成年人，则需按照公司规定的程序取得父母或法定监护人的同意。</li>
                    <li>若服务相关设施不足，或因技术、业务等问题存在特殊情况，公司可以保留批准权。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第6条 会员信息的变更</p>
                <ul class="style-list">
                    <li>会员可随时通过移动应用程序查看和修改其个人信息。</li>
                    <li>若会员注册时填写的信息发生变更，应及时在移动应用程序中修改或通过电子邮件等方式通知公司。</li>
                    <li>若会员未通知公司信息变更，导致任何损失，公司不承担任何责任。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第7条 个人信息保护义务</p>
                <ul>
                    <li>公司将依据《促进信息通信网络利用及信息保护法》等相关法律，努力保护会员的个人信息。个人信息的保护与使用适用相关法律及隐私政策。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第8条 会员账户管理义务</p>
                <ul class="style-list">
                    <li>会员应自行管理其移动应用程序账户，不得允许第三方使用。</li>
                    <li>若会员发现其账户被盗用或被第三方使用，应立即通知公司并遵循公司的指引。</li>
                    <li>若会员未通知公司或未遵循公司的指引，导致的损失，公司不承担任何责任。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第9条 会员通知</p>
                <ul class="style-list">
                    <li>公司可通过会员注册的电子邮件地址或短信发送通知。</li>
                    <li>若因会员未提供或更改联系方式，导致个别通知困难，或需要通知多个会员，公司可通过移动应用程序公告替代个别通知。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第10条 公司的义务</p>
                <ul class="style-list">
                    <li>公司遵守相关法律及本条款，并努力持续稳定地提供服务。</li>
                    <li>公司应建立安全系统，以保护会员的个人信息（包括信用信息），并公布和遵守隐私政策。 </li>
                    <li>若会员针对服务使用提出的意见或投诉被认定为合理，公司应予以处理，并可通过移动应用程序公告、电子邮件等方式通知会员处理过程及结果。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第11条 会员的义务</p>
                <ul class="style-list">
                    <li>会员必须遵守相关法律法规、本条款、运营政策、使用指南以及公司通过公告或通知提供的信息，并不得从事妨碍公司业务的行为。</li>
                    <li>
                        会员不得从事以下行为，如有违反，公司可暂停该会员的服务使用或终止使用协议。
                        <ul class="sub-list">
                            <li>① 盗用其他会员或第三方的公司账户</li>
                            <li>② 以犯罪为目的或与犯罪行为相关的活动</li>
                            <li>③ 侵犯他人的知识产权等权利</li>
                            <li>④ 进行黑客攻击或传播计算机病毒等</li>
                            <li>⑤ 采用公司指示方式以外的方法访问服务</li>
                            <li>⑥ 擅自收集、使用公司用户信息或向他人提供用户信息</li>
                            <li>⑦ 将服务用于营利目的</li>
                            <li>⑧ 开发包含淫秽内容或侵犯版权等违法内容的移动应用程序</li>
                            <li>⑨ 复制、修改、分发、销售、转让、出租、提供担保或允许他人使用公司提供的所有服务或其中的软件部分，以及进行逆向工程或尝试提取源代码</li>
                            <li>⑩ 未经公司明确同意，擅自使用商标及标志等商业标识</li>
                            <li>⑪ 其他可能影响服务稳定运营或可能导致服务运营中断的行为</li>
                        </ul>
                    </li>
                    <li>会员不得在未经公司事先批准的情况下，将从公司获得的信息以复制、复印、修改、翻译、出版、广播等方式使用或提供给他人。</li>
                    <li>会员必须诚实履行公司对提供资料或访问权限的请求，以确认服务提供情况或是否违反本条款。</li>
                    <li>会员应随时确认软件开发工具包（SDK）及公司提供的其他功能的版本更新。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第12条 内容服务的提供</p>
                <ul class="style-list">
                    <li>公司提供的服务根据会员的资格不同而有所差异。</li>
                    <li>除非因业务或技术上的特殊原因，公司原则上全年无休、每天24小时提供服务。</li>
                    <li>如因计算机等信息通信设备维护、替换、故障、通信中断或其他合理的运营原因导致服务暂时中断，公司将按照第9条规定的方式通知会员。但若因特殊情况无法事先通知，公司可在事后进行通知。</li>
                    <li>公司可根据需要进行定期维护，并将维护时间通过移动应用程序公告。</li>
                    <li>所有生成的童话故事将公开，如不希望公开，会员可联系公司申请删除内容。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第13条 内容服务的变更</p>
                <ul class="style-list">
                    <li>为了提供稳定的服务，公司可变更服务的内容、运营方式或技术事项。</li>
                    <li>若公司变更服务内容，将在移动应用程序上提前公告变更内容及适用日期。</li>
                    <li>公司可根据政策及运营需求，修改、暂停或变更部分或全部免费提供的服务，并且除非相关法律有特殊规定，否则不对会员提供补偿。</li>
                    <li>若内容页面尚未完成，公司可在未经会员同意的情况下删除该内容。</li>
                    <li>如内容涉及淫秽或侵犯版权，公司可在未经会员同意的情况下删除该内容。</li>
                    <li>若内容使其他会员感到不快，公司可在未经会员同意的情况下删除该童话故事。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第14条 权利归属</p>
                <ul class="style-list">
                    <li>服务的著作权（邻接权）及知识产权归公司所有。</li>
                    <li>公司仅向会员授予按照公司规定的使用条件使用账户、移动应用程序等的使用权，会员不得转让、出售或提供担保等。</li>
                    <li>会员在服务内发布的内容可被公司用于内部搜索、门户网站搜索结果、媒体报道、宣传、出版、竞赛推广及其他应用，并可能被部分修改、复制或编辑。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第15条 服务使用协议的终止</p>
                <ul class="style-list">
                    <li>会员可随时通过移动应用程序申请终止服务使用协议，公司将根据法律规定迅速处理会员的解除申请。</li>
                    <li>会员的解除申请完成后，公司将根据相关法律及隐私政策，删除除依法需保留的信息外的所有会员信息。</li>
                    <li>若会员解除服务使用协议，根据服务运营政策，可能会限制该会员使用已注销信息再次注册。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第16条 使用限制</p>
                <ul class="style-list">
                    <li>如会员违反本条款的义务或妨碍服务正常运营，公司可采取警告、暂时停止使用、终止使用协议等措施，逐步限制会员的服务使用。</li>
                    <li>尽管有前款规定，如会员违反现行法律，公司可立即终止服务使用协议。</li>
                    <li>若公司根据本条款限制会员使用服务或终止协议，将按照第9条规定的方式通知会员。</li>
                    <li>会员可根据公司规定的程序对限制措施提出异议。如公司认定异议合理，将立即恢复会员的服务使用权限。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第17条 责任限制</p>
                <ul class="style-list">
                    <li>由于自然灾害、DDoS攻击、IDC故障、电信运营商线路问题或其他不可抗力因素导致公司无法提供服务时，公司不承担任何责任。</li>
                    <li>由于会员自身原因导致的服务使用障碍，公司不承担责任。</li>
                    <li>公司不对会员开发的服务的可靠性、准确性及合法性作任何担保，并不承担任何相关责任。</li>
                    <li>公司仅提供辅助功能，帮助会员开发移动应用程序，不保证因使用服务而带来任何效果提升。</li>
                    <li>对于免费提供的服务，公司在相关法律无特别规定的情况下不承担任何责任。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第18条 适用法律及管辖权</p>
                <ul class="style-list">
                    <li>公司与会员之间发生的任何纠纷均适用大韩民国法律。</li>
                    <li>公司与会员之间发生的争议诉讼，应按照《民事诉讼法》的规定向具有管辖权的法院提起。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第19条 版权政策</p>
                <ul class="style-list">
                    <li>公司制定并实施政策，以保护服务使用过程中版权持有人的权利，会员必须遵守公司的版权政策。</li>
                    <li>服务中的所有内容均属于独立的版权持有人。会员不得非法使用、盗用、利用、复制、仿制、分发内容，亦不得在未经公司事先书面同意的情况下，以复制、传播、出版、分发、广播等方式使用或允许第三方使用内容。如会员违反本条规定，需承担全部责任。如因会员的行为导致原版权持有人向公司提出连带或单独赔偿要求，会员须自行承担所有相关责任及费用（包括但不限于律师费、诉讼费），并完全免除公司的一切责任。</li>
                    <li>若会员共享或发布的内容侵犯了第三方的知识产权（包括但不限于版权、设计权等）或人格权（包括但不限于未经同意使用他人肖像、声音，适用于公众人物及普通个人），会员须自行承担全部责任，并负责支付所有相关费用（包括但不限于律师费、诉讼费），确保公司不承担任何法律责任。</li>
                    <li>除特殊情况外，服务中的各项内容版权归不同的版权所有者所有。会员不得基于与公司之间的法律关系，擅自认为自己拥有部分版权。如会员希望主张对服务及部分内容的版权，必须与所有相关版权持有人以及公司单独签订书面协议，并经各方签字确认。</li>
                    <li>
                        若会员发布的内容侵犯了他人的版权，公司仅需遵守《著作权法》第103条规定的责任，不承担其他任何责任
                        <ul class="sub-list">
                            <li>a) 若版权持有人证明其版权因公司提供的服务而受到侵犯，并要求公司停止复制或传播其作品，公司将立即停止相关内容的复制和传播，并通知权利主张方及发布方。</li>
                            <li>b) 若发布方接到通知后主张其复制或传播的合法性，并要求恢复相关内容，公司将在通知权利主张方后，于指定日期恢复内容。但若权利主张方在恢复日期前通知公司已提起诉讼，公司则不恢复内容。</li>
                            <li>
                                c) 公司指定以下联系方式，以便相关人员提交关于停止或恢复内容的请求
                                <div class="py-custom-table">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th><div class="th-wrap">姓名</div></th>
                                            <td><div class="td-wrap">Choi Joong-Bae</div></td>
                                        </tr>
                                        <tr>
                                            <th><div class="th-wrap">电子邮件</div></th>
                                            <td><div class="td-wrap">prokidsbook@iea.co.kr</div></td>
                                        </tr>
                                        <tr>
                                            <th><div class="th-wrap">联系电话</div></th>
                                            <td><div class="td-wrap">+82-2-6263-0630</div></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        会员发布的评论等帖子可能会根据公司的政策在一定期限内公开，并在期限届满后被删除。
                    </li>
                    <li>由公司创作的作品，其著作权及其他知识产权归公司所有。</li>
                    <li>如果会员认为其版权在服务中受到侵犯，可通过公司运营的举报中心进行申诉，公司将依法处理。</li>
                    <li>无论是有偿还是无偿，会员均不得转售公司提供的服务及利用该服务制作的内容，也不得将部分或全部内容（包括但不限于图片、视频、标志、模板、口号等）分发给第三方或转让其所有权。若会员违反本条规定，不仅须向公司支付因销售所得的全部利润，还须承担公司为开发服务所投入的全部成本及所有法律责任。</li>
                    <li>会员提取并保存的故事书PDF文件不得用于商业目的。除应用内的分享功能外，会员不得在未经公司许可的情况下，使用、复制、修改、改编、编辑、出版、创作衍生作品、分发、演示、宣传、展示内容（适用于所有传播方式，包括但不限于现有或未来开发的技术）。若会员未经公司许可从事上述行为，则相关版权将永久性、独占性地归公司所有，不受地域限制。此外，公司将自动获得会员所有衍生作品的无偿（royalty-free）权利，并可自由使用该内容，而无需征得会员同意。</li>
                    <li>若会员未经公司同意，在应用分享功能之外使用、复制、修改、改编、编辑、出版、创作衍生作品、分发、演示、宣传、展示内容，公司有权要求会员赔偿损失。会员同意，公司有权按照会员因违规行为所获得的总收益的三倍计算赔偿金额。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第20条 权限要求</p>
                <ul class="style-list">
                    <li>相机（可选）：用于创建角色时拍摄照片。</li>
                    <li>存储（可选）：用于保存、读取、修改和删除内容。</li>
                    <li>通知（可选）：用于接收来自服务器的通知。</li>
                </ul>
            </div>
        </div>
`;
const TOP_EN = `
        <div class="inner-wrap scroll-ver">
            <div class="info-box">
                <p>Article 1 (Purpose)</p>
                <ul>
                    <li>These Terms of Service define the rights, obligations, and responsibilities between PROKIDSBOOK (hereinafter referred to as the "Company") and users regarding the use of the mobile application for creating storybooks (hereinafter referred to as the "PROKIDSBOOK App").</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 2 (Definitions)</p>
                <ul class="style-list">
                    <li>The term "Service" refers to all services provided through the use of the mobile application, including electronic book creation, online and offline sharing, and other related features.</li>
                    <li>The term "Member" refers to a person who has an account for the PROKIDSBOOK App, has entered into a service agreement with the Company under these Terms, and uses the mobile application. </li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 3 (Publication and Modification of the Terms of Service)</p>
                <ul class="style-list">
                    <li>The Company shall post these Terms on the mobile application screen in a manner that allows members to easily access and understand them.</li>
                    <li>The Company may amend these Terms within the scope that does not violate applicable laws, including regulations related to the regulation of terms and conditions.</li>
                    <li>If the Company amends these Terms, it shall specify the effective date and the reason for the amendment and notify members via the mobile application at least seven (7) days prior to the effective date. However, if the amendment is disadvantageous to members, the Company shall provide individual notice through the communication methods specified in Article 9, Paragraph 1, at least thirty (30) days before the effective date.</li>
                    <li>If the Company notifies or announces the amended Terms according to the preceding paragraph and clearly states that failure to express intent within a specified period will be deemed as acceptance, and the member does not explicitly express rejection, the member shall be considered to have agreed to the amended Terms.</li>
                    <li>If a member does not agree to the application of the amended Terms, the Company shall not apply them to that member. In such cases, the member may terminate the service agreement. However, if there are special circumstances where the existing Terms cannot be applied, the Company may terminate the service agreement.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 4 (Interpretation of Terms)</p>
                <ul class="style-list">
                    <li>The Company may establish separate service operation policies (hereinafter referred to as "Operational Policies") related to the provision of services.</li>
                    <li>Any matters not specified in these Terms or issues regarding their interpretation shall be governed by the Operational Policies, relevant laws, or customary practices.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 5 (Establishment of Service Membership Registration)</p>
                <ul class="style-list">
                    <li>Membership registration is completed when an individual who wishes to become a member (hereinafter referred to as the "applicant") agrees to these Terms, submits a membership application according to the procedures established by the Company, and the Company approves the application.</li>
                    <li>
                        The Company, in principle, approves the applicant’s request for service use. However, the Company may refuse approval or terminate the service agreement afterward if any of the following applies.
                        <ul class="sub-list">
                            <li>1) The applicant has previously lost membership status under these Terms. However, this does not apply if the Company has approved the re-registration. </li>
                            <li>2) The applicant is not using their real name or is using another person’s identity.</li>
                            <li>3) The applicant has provided false information.</li>
                            <li>4) If the user is under the age of 14, their parent or legal guardian may request access to, correction of, or updates to the child's personal information or withdraw consent for membership registration. In such cases, the Company must take the necessary actions without delay.</li>
                            <li>5) The approval is not possible due to reasons attributable to the applicant, or if the application violates other specified conditions.</li>
                        </ul>
                    </li>
                    <li>The Company provides services for all age groups; however, if the owner of the device does not notify the Company that they are a minor, the service usage will not be restricted based on age. If it is later discovered that the device owner is a minor, the Company may require the consent of the parent or legal guardian according to its procedures.</li>
                    <li>The Company may defer approval if there is insufficient service infrastructure or if there are technical or operational difficulties.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 6 (Modification of Member Information)</p>
                <ul class="style-list">
                    <li>Members may access and modify their personal information at any time through the mobile application.</li>
                    <li>If there are changes to the details submitted during membership registration, members must update the information through the mobile application or notify the Company via email or other appropriate methods.</li>
                    <li>The Company is not responsible for any disadvantages resulting from a member's failure to notify the Company of such changes.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 7 (Obligation to Protect Personal Information)</p>
                <ul>
                    <li>The Company shall make efforts to protect the personal information of members in accordance with applicable laws, including the Act on Promotion of Information and Communications Network Utilization and Information Protection. The protection and use of personal information shall be governed by relevant laws and the Company's privacy policy.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 8 (Obligation of Members to Manage Their Accounts)</p>
                <ul class="style-list">
                    <li>Members are responsible for managing their mobile application accounts and must not allow third parties to use them.</li>
                    <li>If a member becomes aware that their account has been compromised or used by a third party, they must immediately notify the Company and follow the Company's instructions.</li>
                    <li>If a member fails to notify the Company or does not follow the Company's instructions after notification, the Company shall not be held liable for any resulting disadvantages.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 9 (Notification to Members)</p>
                <ul class="style-list">
                    <li>The Company may notify members using the email address or SMS information provided during registration. </li>
                    <li>If individual notification is difficult due to incorrect or missing contact information, or if the notification is intended for an unspecified number of members, the Company may substitute individual notification by posting an announcement on the mobile application’s notice board.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 10 (Obligations of the Company)</p>
                <ul class="style-list">
                    <li>The Company shall comply with applicable laws and these Terms and make every effort to provide continuous and stable services.</li>
                    <li>The Company shall establish a security system to protect members' personal information (including credit information) and disclose and comply with its privacy policy to ensure the safe use of services.</li>
                    <li>If a member raises a legitimate complaint regarding service use, the Company shall process it and may notify the member of the handling process and results through the mobile application notice board or email.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 11 (Obligations of Members)</p>
                <ul class="style-list">
                    <li>Members shall comply with applicable laws, these terms, operational policies, user guides, and any other notices or instructions provided by the company. Members shall not engage in any activities that interfere with the company’s operations.</li>
                    <li>
                        Members shall not engage in any of the following activities when using the service. If a member violates any of the following, the company may suspend their service usage or terminate the service agreement
                        <ul class="sub-list">
                            <li>1) Unauthorized use of another member’s or third party’s company account</li>
                            <li>2) Engaging in criminal activities or activities related to criminal offenses</li>
                            <li>3) Infringing on the intellectual property rights or other rights of others</li>
                            <li>4) Engaging in hacking or distributing computer viruses</li>
                            <li>5) Accessing the service through methods other than those provided by the company</li>
                            <li>6) Collecting, using, or providing user information of the company without authorization</li>
                            <li>7) Using the service for commercial purposes</li>
                            <li>8) Developing mobile applications that contain illegal content, such as obscene material or copyright infringement</li>
                            <li>9) Copying, modifying, distributing, selling, transferring, renting, pledging, or granting permission for others to use any part of the services or included software, as well as reverse-engineering or attempting to extract source code</li>
                            <li>10) Using the company's trademarks, logos, or business marks without explicit consent</li>
                            <li>11) Engaging in any other activities that disrupt or may disrupt the stable operation of the service</li>
                        </ul>
                    </li>
                    <li>Members shall not use the information obtained through the service for purposes such as copying, reproducing, modifying, translating, publishing, or broadcasting without prior approval from the company, nor shall they provide such information to third parties.</li>
                    <li>If the company requests the provision of materials, access rights, or explanations to verify compliance with these terms or service provisions, the member shall cooperate in good faith.</li>
                    <li>Members shall regularly check for version updates of the software development kit (SDK) and other functions provided by the company through the service.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 12 (Provision of Content Services)</p>
                <ul class="style-list">
                    <li>The services provided by the company may differ based on the member’s qualifications.</li>
                    <li>Unless there are special technical or operational difficulties, the service is available 24 hours a day, 365 days a year.</li>
                    <li>The company may temporarily suspend service provision due to maintenance, system replacement, malfunctions, communication disruptions, or other operationally reasonable circumstances. In such cases, the company shall notify members in accordance with Article 9. However, if prior notice is not feasible due to unavoidable circumstances, the company may notify members afterward.</li>
                    <li>The company may conduct periodic maintenance necessary for service provision, and the maintenance schedule will be announced through the mobile application.</li>
                    <li>All created storybooks are publicly accessible. If a member wishes to remove their content, they may contact the company to request its deletion.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 13 (Changes to Content Services)</p>
                <ul class="style-list">
                    <li>The company may modify the content, operational aspects, or technical details of the service to ensure stable service provision.</li>
                    <li>If changes are made to the service, the company shall announce the details and effective date through the mobile application in advance.</li>
                    <li>The company may modify, suspend, or change part or all of the free services based on its policies and operational needs, and unless otherwise specified by law, no compensation will be provided to members in such cases.</li>
                    <li>The company may delete incomplete content that has been posted without the member’s consent.</li>
                    <li>The company may delete content without the member’s consent if it contains obscene material or infringes copyrights.</li>
                    <li>The company may delete a created storybook without the member’s consent if the content is deemed offensive to other members.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 14 (Ownership of Rights) </p>
                <ul class="style-list">
                    <li>Copyrights, neighboring rights, and intellectual property rights related to the service belong to the company.</li>
                    <li>The company grants members only the right to use their account and the mobile application according to the terms set by the company. Members may not transfer, sell, pledge, or otherwise dispose of these rights.</li>
                    <li>Content posted by members within the service may appear in search results, media reports, promotions, publications, contests, or other forms of content sharing with other applications. Such content may be used free of charge for these purposes, and within the necessary scope, the company may modify, reproduce, or edit the posted content.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 15 (Termination of the Service Agreement)</p>
                <ul class="style-list">
                    <li>Members may terminate the service agreement at any time by accessing the mobile application and submitting a request. The company shall promptly process the request in accordance with applicable laws.</li>
                    <li>Upon completion of the termination process, the company shall delete all of the member’s information except for that which must be retained under applicable laws and the company’s privacy policy.</li>
                    <li>Once a service agreement has been terminated, re-registration using the same member information may be restricted in accordance with the service’s operational policy.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 16 (Restrictions on Use)</p>
                <ul class="style-list">
                    <li>If a member violates these terms or interferes with the normal operation of the service, the company may impose restrictions in stages, such as warnings, temporary suspensions, or termination of the service agreement.</li>
                    <li>Notwithstanding the preceding paragraph, if a member violates applicable laws, the company may immediately terminate the service agreement.</li>
                    <li>If the company restricts a member’s service usage or terminates the service agreement under this article, the company shall notify the member in accordance with Article 9.</li>
                    <li>Members may file an objection to such restrictions following the procedures set by the company. If the company determines that the objection is valid, the service usage shall be reinstated immediately.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 17 (Limitation of Liability)</p>
                <ul class="style-list">
                    <li>The Company shall not be liable for service interruptions caused by force majeure events such as natural disasters, DDoS attacks, IDC failures, network failures of telecommunication providers, or other similar circumstances beyond its control.</li>
                    <li>The Company shall not be responsible for service disruptions caused by reasons attributable to the Member.</li>
                    <li>The Company does not guarantee the reliability, accuracy, or legality of the services developed by Members and assumes no liability in this regard.</li>
                    <li>The Company only provides additional functionalities for mobile application development through the Service and does not guarantee any performance improvements from using the Service.</li>
                    <li>The Company shall not be liable for the use of free Services unless otherwise specified by applicable laws.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 18 (Governing Law and Jurisdiction)</p>
                <ul class="style-list">
                    <li>Any disputes between the Company and Members shall be governed by the laws of the Republic of Korea.</li>
                    <li>Any litigation arising from disputes between the Company and Members shall be submitted to the court of jurisdiction in accordance with the Civil Procedure Act.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 19 (Copyright Policy)</p>
                <ul class="style-list">
                    <li>The Company establishes and enforces policies to protect copyright holders, and Members must comply with the Company’s copyright policy.</li>
                    <li>All content within the Service has individual copyright holders. Members shall not illegally use, steal, utilize, reproduce, copy, or distribute content, nor shall they reproduce, transmit, publish, distribute, or broadcast such content without the Company’s prior approval or allow third parties to do so. If a Member violates this provision, they shall bear full responsibility for any consequences. If the original copyright holder claims damages against the Company due to the Member’s actions, the Member shall indemnify the Company at their own expense, including but not limited to attorney fees and litigation costs.</li>
                    <li>If content shared or posted by a Member infringes on a third party’s intellectual property rights (including copyrights, design rights, etc.) or personality rights (including but not limited to using another person's image or voice without consent, including celebrities and public figures), the Member shall bear full responsibility for such infringement and shall indemnify the Company at their own expense, including attorney fees and litigation costs.</li>
                    <li>Except for specific cases, different copyright holders own each piece of content within the Service. Members shall not assume that they hold any rights to copyrights based solely on their relationship with the Company. To claim any copyright ownership over Service content, a Member must have a separate written agreement, duly signed by all relevant copyright holders and the Company.</li>
                    <li>
                        If a Member's posted content infringes on another party’s copyright, the Company shall comply with Article 103 of the Copyright Act but assumes no further responsibility beyond the following obligations.
                        <ul class="sub-list">
                            <li>1) If a copyright holder claims that their rights have been infringed due to content reproduction or transmission via the Company's Service and provides supporting evidence, the Company shall immediately suspend the reproduction or transmission of the content and notify both the claimant and the uploader of such actions.</li>
                            <li>2) If the uploader, upon receiving notification, provides evidence that their reproduction or transmission was legally justified and requests reinstatement, the Company shall promptly notify the copyright claimant and reinstate the content on the specified date. However, if the copyright claimant informs the Company before the reinstatement date that legal action has been initiated, reinstatement shall not proceed.</li>
                            <li>
                                3) The Company designates the following contact information for copyright-related disputes so that users of its Services can easily file claims.
                                <div class="py-custom-table">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th><div class="th-wrap">Name</div></th>
                                            <td><div class="td-wrap">Choi Jung-bae</div></td>
                                        </tr>
                                        <tr>
                                            <th><div class="th-wrap">Email</div></th>
                                            <td><div class="td-wrap">prokidsbook@iea.co.kr</div></td>
                                        </tr>
                                        <tr>
                                            <th><div class="th-wrap">Phone</div></th>
                                            <td><div class="td-wrap">+82-2-6263-0630</div></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        Reviews and other posts created by Members may be displayed for a certain period based on the Company’s policy and may be deleted after that period.
                    </li>
                    <li>The Company retains copyright and other intellectual property rights for materials it creates.</li>
                    <li>If a Member believes their copyright has been infringed within the Service, they may report the issue through the Company's designated reporting system, and the Company shall take action in accordance with applicable laws.</li>
                    <li>Members, whether paid or unpaid, shall not resell the Service or content created using the Service. Members may not distribute or transfer ownership of all or part of the Service (including images, videos, logos, templates, and slogans) to third parties. If a Member violates this provision, they shall be liable to compensate the Company, including repaying any profits obtained from unauthorized sales and covering all costs incurred by the Company in Service development.</li>
                    <li>PDF files of storybooks extracted by Members shall not be used for commercial purposes. Members may not use, reproduce, modify, adapt, edit, publish, create derivative works, distribute, perform, promote, exhibit, or display content without the Company's consent, except for using the built-in sharing function. This prohibition applies regardless of the medium, internet usage, or any unknown or future technology. If a Member engages in such activities without the Company’s consent, the copyright to the derivative works shall be exclusively and permanently owned by the Company without geographical restrictions. The Company shall have royalty-free rights to such derivative works and may freely utilize them from the time of creation, regardless of the Member's intent.</li>
                    <li>If a Member violates the above provision and uses content beyond the built-in sharing function without the Company's consent, the Company may claim damages. In such a case, the Member agrees that the Company shall calculate the damages based on three times the total profits obtained by the Member from such unauthorized activities.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Article 20 (Permission Requirements)</p>
                <ul class="style-list">
                    <li>Camera (Optional): Required for taking photos when creating characters</li>
                    <li>Storage (Optional): Required for saving, reading, modifying, and deleting content</li>
                    <li>Notifications (Optional): Required for receiving notifications from the server</li>
                </ul>
            </div>
        </div>
`;
const TOP_JP = `
      <div class="inner-wrap scroll-ver">
            <div class="info-box">
                <p>第1条 目的</p>
                <ul>
                    <li>本規約は、Prokidsbook（以下「当社」といいます）が提供する童話制作モバイルアプリケーション（以下「Prokidsbookアプリ」といいます）の利用に関し、当社と利用者の権利、義務および責任事項などを定めることを目的とします。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>제2조 (정의)</p>
                <ul>
                    <li>「サービス」とは、電子書籍の制作およびオンライン・オフラインでの共有など、会員がモバイルアプリケーションを通じて利用できるすべてのサービスを指します。</li>
                    <li>「会員」とは、「Prokidsbookアプリ」のアカウントを保有し、本規約に基づき当社と利用契約を締結し、モバイルアプリケーションを使用する者を指します。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第3条 規約の掲示および改定</p>
                <ul class="style-list">
                    <li>当社は、本規約の内容を会員が容易に確認できるように、モバイルアプリケーションの画面上に掲示します。</li>
                    <li>当社は、「約款の規制に関する法律」など関連法を違反しない範囲で、本規約を変更することができます。</li>
                    <li>当社が規約を変更する場合、その適用日および改定理由を明示し、モバイルアプリケーション上で適用日の7日前から適用日前日まで告知します。ただし、会員にとって不利な内容に変更される場合、適用日の30日前までに第9条第1項で定めた通知手段により個別通知します。</li>
                    <li>当社が前項に従い変更規約を告知または通知し、一定期間内に会員が意思表示をしなかった場合、意思表示があったものとみなす 旨を明確に告知または通知したにもかかわらず、会員が明示的に拒否の意思を表明しなかった場合、会員は変更規約に同意したものとみなします。</li>
                    <li>会員が変更規約の適用に同意しない場合、当社は変更規約を適用することはできず、この場合、会員は利用契約を解約することができます。ただし、既存の規約を適用できない特別な事情がある場合、当社は利用契約を解約することができます。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第4条 規約の解釈</p>
                <ul class="style-list">
                    <li>当社は、サービス提供に関し、別途サービス運営方針（以下「運営方針」といいます）を定めることができます。本規約で定められていない事項や規約の解釈については、運営方針および関連法令、または一般的な商慣習に従います。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第5条 サービス会員登録の成立</p>
                <ul class="style-list">
                    <li>サービスの会員登録は、会員になろうとする者（以下「登録申請者」といいます）が本規約の内容に同意し、当社が定めた手続きに従い会員登録を申請し、当社がこれを承認することで成立します。</li>
                    <li>
                        当社は、登録申請者の申請に対し、原則としてサービス利用を承認します。ただし、以下のいずれかに該当する申請については、承認を行わない場合や、承認後であっても利用契約を解除することがあります。
                        <ul class="sub-list">
                            <li>① 登録申請者が本規約に基づき、過去に会員資格を喪失した経歴がある場合。ただし、当社が会員の再登録を承認した場合は例外とします。</li>
                            <li>② 実名ではない、または他人の名義を使用した場合。</li>
                            <li>③ 虚偽の情報を記載した場合。</li>
                            <li>④ 14歳未満の「利用者」の親権者などの法定代理人は、子どもの個人情報の閲覧、訂正、更新を請求することができ、また会員登録に対する同意を撤回することができます。この場合、当社は速やかに必要な措置を講じるものとします。</li>
                            <li>⑤ 登録申請者の責に帰すべき事由により承認が不可能である場合、またはその他の規定に違反した申請を行った場合。</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="info-box">
                <p>第6条 会員情報の変更</p>
                <ul class="style-list">
                    <li>会員は、モバイルアプリケーションを通じて、いつでも自身の個人情報を閲覧および修正することができます。</li>
                    <li>会員は、会員登録時に記載した事項に変更が生じた場合、モバイルアプリケーションを通じて修正するか、電子メールその他の方法で当社にその変更内容を通知しなければなりません。</li>
                    <li>前項の変更事項を当社に通知しなかったことにより生じた不利益について、当社は一切の責任を負いません。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第7条 個人情報保護の義務</p>
                <ul>
                    <li>当社は、「情報通信網利用促進および情報保護等に関する法律」など関連法令に基づき、会員の個人情報を保護するために努めます。個人情報の保護および利用については、関連法令およびプライバシーポリシーが適用されます。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第8条 会員のアカウント管理に関する義務</p>
                <ul class="style-list">
                    <li>会員のモバイルアプリケーションアカウントの管理責任は会員にあり、第三者に利用させてはなりません。</li>
                    <li>会員は、自身のアカウントが不正に使用された場合、または第三者が使用していることを認識した場合には、直ちに当社に通知し、当社の指示に従わなければなりません。</li>
                    <li>前項に該当する場合、会員が当社に通知しなかった、または通知した場合でも当社の指示に従わなかったことにより生じた不利益について、当社は一切の責任を負いません。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第9条 会員への通知</p>
                <ul class="style-list">
                    <li>当社が会員に通知を行う場合、会員が登録した電子メールアドレスまたはSMSなどを利用することができます。</li>
                    <li>当社は、会員の連絡先未登録・変更などにより個別通知が困難な場合、または不特定多数の会員に対する通知が必要な場合、モバイルアプリケーションの掲示板などに掲載することで、個別通知に代えることができます。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第10条 会社の義務</p>
                <ul class="style-list">
                    <li>会社は、関連法令および本規約を遵守し、継続的かつ安定的にサービスを提供するために最善を尽くします。</li>
                    <li>会社は、会員が安全にサービスを利用できるように、個人情報（信用情報を含む）を保護するためのセキュリティシステムを備え、プライバシーポリシーを公表し、遵守します。</li>
                    <li>会社は、サービス利用に関して会員から提起された意見や苦情が正当であると認められる場合、それを適切に処理し、モバイルアプリケーション内の掲示板、電子メールなどを通じて会員に処理過程および結果を通知することができます。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第11条 会員の義務</p>
                <ul class="style-list">
                    <li>会員は、関連法令、本規約、運営方針、利用ガイド、会社が通知または告知した事項を遵守し、会社の業務を妨害する行為をしてはなりません。</li>
                    <li>
                        会員は、サービス利用に関して以下の行為を行ってはならず、以下の行為を行った場合、会社は該当会員のサービス利用を中止し、または利用契約を解除することができます。
                        <ul class="sub-list">
                            <li>① 他の会員または第三者の会社アカウントを不正に使用する行為</li>
                            <li>② 犯罪行為を目的とする、または犯罪行為に関連する行為</li>
                            <li>③ 他者の知的財産権等の権利を侵害する行為</li>
                            <li>④ ハッキング行為またはコンピュータウイルスの拡散行為</li>
                            <li>⑤ 会社が案内する方法以外の方法でサービスにアクセスする行為</li>
                            <li>⑥ 会社の利用者情報を無断で収集・利用したり、他人に提供する行為</li>
                            <li>⑦ サービスを営利目的で利用する行為</li>
                            <li>⑧ わいせつな内容や著作権侵害など、法令に違反する内容のモバイルアプリケーションを開発する行為</li>
                            <li>⑨ 会社が提供する全てのサービスまたはそれに含まれるソフトウェアの一部を複製、改変、配布、販売、譲渡、貸与、担保提供、または第三者に利用を許可する行為、ならびにソフトウェアのリバースエンジニアリングやソースコードの抽出を試みる行為</li>
                            <li>⑩ 会社の明示的な同意なしに、商標およびロゴなどの営業標識を無断で使用する行為</li>
                            <li>⑪ その他、サービスの安定的な運営を妨害する、またはその恐れがある一切の行為</li>
                        </ul>
                    </li>
                    <li>会員は、会社を通じて得た情報を、会社の事前承諾なしに、複製、複写、改変、翻訳、出版、放送、その他の方法で使用または第三者に提供することはできません。</li>
                    <li>会員は、サービス提供または本規約の違反を確認するために、会社が資料またはアクセス権の提供および関連事項について説明を求めた場合、誠実に対応しなければなりません。</li>
                    <li>会員は、ソフトウェア開発キット（SDK）を含む、サービスを通じて会社が提供する機能のバージョンアップデートを定期的に確認しなければなりません。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第12条 コンテンツサービスの提供等</p>
                <ul class="style-list">
                    <li>会社が提供するサービスは、会員の資格に応じて異なる形で提供される場合があります。</li>
                    <li>サービスの利用は、会社の業務上または技術上の特別な支障がない限り、年中無休・24時間利用を原則とします。</li>
                    <li>会社は、コンピュータ等の情報通信設備の保守点検、交換、故障、障害、通信断絶、または運営上合理的な理由がある場合、サービス提供を一時的に中断することがあります。この場合、会社は第9条に定める方法で会員に通知します。ただし、会社が事前に通知できないやむを得ない事由がある場合、事後に通知することができます。</li>
                    <li>会社は、サービスの提供に必要な場合、定期点検を実施することができ、定期点検時間はモバイルアプリケーションを通じて告知された内容に従います。</li>
                    <li>作成された童話はすべて公開され、非公開を希望する場合は会社に連絡することでコンテンツを削除することができます。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第13条 コンテンツサービスの変更</p>
                <ul class="style-list">
                    <li>会社は、安定的なサービス提供のために、サービス内容、運営上または技術上の事項を変更することができます。</li>
                    <li>会社は、サービスを変更する場合、変更内容および適用日を明示し、モバイルアプリケーション上で事前に告知します。</li>
                    <li>会社は、無料で提供されるサービスの一部または全部を、会社の方針および運営上の必要に応じて修正・中断・変更することができ、これに対し関連法に特別な規定がない限り、会員に対して個別の補償は行いません。</li>
                    <li>すべてのページが完成していない状態で投稿されたコンテンツについては、会社は会員の同意なしに削除することができます。</li>
                    <li>わいせつな内容や著作権を侵害するコンテンツである場合、会社は会員の同意なしに投稿を削除することができます。</li>
                    <li>他の会員に不快感を与えるコンテンツである場合、会社は会員の同意なしに作成された童話を削除することができます。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第14条 権利の帰属</p>
                <ul class="style-list">
                    <li>サービスに関する著作権（著作隣接権）および知的財産権は、会社に帰属します。</li>
                    <li>会社は、サービスに関連して会員に対し、会社が定める利用条件に従ってアカウントやモバイルアプリケーションを利用する権利のみを付与し、会員はこれを譲渡、販売、担保提供等の処分行為を行うことはできません。</li>
                    <li>会員がサービス内に掲載する投稿は、サービス内の検索結果やポータルサイトの検索結果に表示されることがあり、会社およびサービスに関する報道、PR、出版、コンテストの宣伝、他のアプリケーションとのデータ共有などの目的で、無償で使用されることがあります。これに伴い、会員が掲示板に投稿した内容は、必要な範囲内で一部修正、複製、編集される場合があります。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第15条 サービス利用契約の解除</p>
                <ul class="style-list">
                    <li>会員は、いつでもモバイルアプリケーションにアクセスし、サービス利用契約の解除を申請することができ、会社は法令の定めるところに従い、会員の解除申請を迅速に処理します。</li>
                    <li>会員の解除処理が完了した場合、会社は関連法令およびプライバシーポリシーに従い、保有する会員情報を除き、すべての会員情報を削除します。</li>
                    <li>会員のサービス利用契約解除が完了した場合、サービス運営方針に基づき、退会した会員の情報で再登録することが制限される場合があります。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第16条 利用制限</p>
                <ul class="style-list">
                    <li>会社は、会員が本規約上の義務を違反した場合、またはサービスの正常な運営を妨害した場合、警告、一定期間の利用停止、利用契約の解除など、段階的にサービス利用を制限することができます。</li>
                    <li>会社は、前項にかかわらず、会員が現行法令に違反した場合には、直ちにサービス利用契約を解除することができます。</li>
                    <li>本条に基づき、サービス利用を制限したり契約を解除する場合、会社は第9条に従い、会員に通知します。</li>
                    <li>会員は、本条に基づく利用制限等に関し、会社が定める手続きに従って異議申立てを行うことができます。この際、会社が異議申立てが正当であると認めた場合、直ちにサービスの利用を再開します。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第17条 責任制限</p>
                <ul class="style-list">
                    <li>会社は、天災地変、DDoS（分散型サービス妨害）攻撃、IDC（インターネットデータセンター）の障害、通信事業者の回線障害、またはこれに準ずる不可抗力によってサービスを提供できない場合、サービス提供に関する責任を負いません。</li>
                    <li>会社は、会員の過失によって発生したサービス利用の障害について、一切の責任を負いません。</li>
                    <li>会社は、会員が開発したサービスの信頼性、正確性、適法性等について保証せず、これに関するいかなる責任も負いません。</li>
                    <li>会社は、サービスを通じて会員のモバイルアプリケーション開発を補助する機能を提供するのみであり、サービス利用による成果の向上を保証するものではありません</li>
                    <li>会社は、無料で提供されるサービスの利用に関し、関連法令に特別な規定がない限り、一切の責任を負いません。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第18条 準拠法および裁判管轄</p>
                <ul class="style-list">
                    <li>会社と会員の間で提起された訴訟は、大韓民国の法律を準拠法とします。</li>
                    <li>会社と会員の間で発生した紛争に関する訴訟は、「民事訴訟法」に定める管轄裁判所に提起するものとします。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第19条 著作権ポリシー</p>
                <ul class="style-list">
                    <li>会社は、サービスの利用において著作権者の権利を保護するためのポリシーを策定し、運用しています。会員は、会社の著作権ポリシーを遵守しなければなりません。</li>
                    <li>サービス内のすべてのコンテンツには、それぞれ個別の著作権者が存在します。会員は、コンテンツを違法に利用、盗用、流用、複製、コピー、配布することはできず、会社の事前承諾なしに複製、送信、出版、配布、放送、その他の方法により利用したり、第三者に使用させることはできません。会員がこれに違反した場合、その責任を全て負うものとし、原著作権者が会員の行為により会社に対して損害賠償を請求した場合、会員は自己の責任と費用（著作権者との訴訟にかかる弁護士費用、訴訟費用を含むがこれに限定されない）により会社を完全に免責しなければなりません。</li>
                    <li>会員が共有・投稿したコンテンツが第三者の知的財産権（著作権、意匠権などを含むがこれに限定されない）および人格権（著名人の肖像権のほか、他人の画像・声を無断で使用する一切の行為を含む）を侵害した場合、その責任は全て会員が負うものとし、会員は自己の責任と費用（弁護士費用、訴訟費用を含むがこれに限定されない）により会社を完全に免責しなければなりません。</li>
                    <li>サービス内の各コンテンツの著作権者は、一部例外を除きそれぞれ異なります。会員は、会社との法律関係に基づき、自らが一部の著作権を有すると解釈することはできません。会員がサービスおよびコンテンツの一部について著作権を主張するためには、関係するすべての著作権者だけでなく、会社とも個別に書面での合意（当事者全員の記名・捺印を含む）が必要であることを理解しなければなりません。</li>
                    <li>
                        会員が会社のサービスを利用して作成したコンテンツが他者の著作権を侵害する場合、会社は以下の著作権法第103条の責任を遵守することを除き、一切の責任を負いません。
                        <ul class="sub-list">
                            <li>1) 会社は、サービスを利用した著作物等の複製・送信により著作権その他の保護対象となる権利が侵害されたと主張する者から、当該著作物の複製・送信を停止するよう求められた場合、直ちに該当する複製・送信を停止し、その旨を権利主張者および複製・送信者に通知します。</li>
                            <li>2) もし、複製・送信の停止通知を受けた当事者が、自己の行為が正当な権利に基づくものであることを証明し、複製・送信の再開を要求した場合、会社は再開要求の事実および再開予定日を権利主張者に速やかに通知し、予定日に複製・送信を再開します。ただし、権利主張者が再開予定日までに当該行為に関して訴訟を提起した事実を会社に通知した場合、この限りではありません。</li>
                            <li>
                                3) 会社は、著作物の複製・送信の停止および再開の要求を受ける担当者を以下のとおり指定し、自社設備やサービスを利用する者が容易に確認できるよう告知します。
                                <div class="py-custom-table">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th><div class="th-wrap">氏名</div></th>
                                            <td><div class="td-wrap">Choi Joong-bae</div></td>
                                        </tr>
                                        <tr>
                                            <th><div class="th-wrap">電子メール</div></th>
                                            <td><div class="td-wrap">prokidsbook@iea.co.kr</div></td>
                                        </tr>
                                        <tr>
                                            <th><div class="th-wrap">電話番号</div></th>
                                            <td><div class="td-wrap">+82-2-6263-0630</div></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        会員が作成したレビュー等の投稿は、会社のポリシーに基づき一定期間掲載され、その期間が経過すると削除されることがあります。
                    </li>
                    <li>会社が作成した著作物に関する著作権およびその他の知的財産権は、会社に帰属します。</li>
                    <li>会員は、会社のサービス内で自身の著作権が侵害された場合、会社が運営する報告センター制度を利用して通報し、必要な措置を求めることができます。会社は、関連法に基づいて対応を行います。</li>
                    <li>会員は、無償・有償を問わず、会社が提供するサービスおよびサービスを利用して作成したコンテンツを第三者に販売、配布、譲渡することはできません。これを違反した場合、会員は会社に対し、サービスおよびコンテンツの販売収益はもちろん、開発に要した全費用を補償し、すべての民事・刑事責任を負うものとします。</li>
                    <li>会員がダウンロードまたは保有する童話のPDFファイルは、商業目的で利用することはできません。また、会員はアプリケーション内の投稿共有機能を除き、会社の同意なしにコンテンツを利用、再現、改変、翻案、編集、出版、二次創作、配布、公演、宣伝、展示および陳列することはできません。これに違反した場合、当該著作権は排他的かつ永久的に、地域を問わず会社に帰属し、会社は会員の意思に関わらず、無償（ロイヤリティフリー）で二次著作物に関するすべての権利を取得し、自由に活用できるものとします。</li>
                    <li>もし会員が、アプリ内の共有機能を除き、会社の同意なしにコンテンツを利用、再現、改変、翻案、編集、出版、二次著作物の制作、配布、公演、宣伝、展示した場合、会社は会員に対し損害賠償を請求します。会員は、会社が損害額を算定する際、会員が得た利益の3倍の額を損害賠償額として算定することに同意するものとします。</li>
                </ul>
            </div>
            <div class="info-box">
                <p>第20条 権限の要求事項</p>
                <ul class="style-list">
                    <li>カメラ（任意）: キャラクター制作時に写真撮影のために必要な権限</li>
                    <li>ストレージ（任意）: コンテンツの保存/読み込み/修正/削除のために必要な権限</li>
                    <li>通知（任意）: サーバーからの通知を受信するために必要な権限</li>
                </ul>
            </div>
        </div>
`;
const TOP_VN = `
        <div class="inner-wrap scroll-ver">
            <div class="info-box">
                <p>Điều 1 (Mục đích)</p>
                <ul>
                    <li>Điều khoản này quy định về quyền, nghĩa vụ và trách nhiệm giữa PROKIDSBOOK (sau đây gọi là "Công ty") và người sử dụng liên quan đến việc sử dụng ứng dụng di động tạo sách truyện (sau đây gọi là "Ứng dụng PROKIDSBOOK").</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 2 (Định nghĩa)</p>
                <ul>
                    <li>"Dịch vụ" là tất cả các dịch vụ được cung cấp thông qua ứng dụng di động, bao gồm việc tạo sách điện tử, chia sẻ trực tuyến và ngoại tuyến, cũng như các chức năng liên quan khác.</li>
                    <li>"Thành viên" là người sở hữu tài khoản của Ứng dụng PROKIDSBOOK, đã ký kết hợp đồng dịch vụ với Công ty theo Điều khoản này và sử dụng ứng dụng di động.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 3 (Công bố và sửa đổi Điều khoản)</p>
                <ul class="style-list">
                    <li>Công ty sẽ công bố nội dung của Điều khoản này trên màn hình của ứng dụng di động để Thành viên có thể dễ dàng tiếp cận và tìm hiểu.</li>
                    <li>Công ty có thể sửa đổi Điều khoản này trong phạm vi không vi phạm các quy định pháp luật liên quan, bao gồm Luật Điều chỉnh Điều khoản Hợp đồng.</li>
                    <li>Khi sửa đổi Điều khoản, Công ty sẽ thông báo trên ứng dụng di động về ngày áp dụng và lý do sửa đổi ít nhất 7 ngày trước ngày có hiệu lực. Tuy nhiên, nếu sửa đổi có nội dung bất lợi cho Thành viên, Công ty sẽ thông báo riêng lẻ theo phương thức quy định tại Khoản 1, Điều 9 ít nhất 30 ngày trước ngày có hiệu lực.</li>
                    <li>Nếu Công ty đã thông báo hoặc công bố rõ ràng rằng nếu Thành viên không thể hiện ý kiến trong một khoảng thời gian nhất định thì sẽ được coi là đã đồng ý với Điều khoản sửa đổi, và Thành viên không đưa ra phản đối rõ ràng, thì sẽ được coi là đã đồng ý với Điều khoản sửa đổi.</li>
                    <li>Nếu Thành viên không đồng ý với Điều khoản sửa đổi, Công ty không thể áp dụng Điều khoản sửa đổi đó với Thành viên. Trong trường hợp này, Thành viên có thể chấm dứt hợp đồng dịch vụ. Tuy nhiên, nếu có hoàn cảnh đặc biệt khiến Công ty không thể tiếp tục áp dụng Điều khoản hiện tại, Công ty có thể chấm dứt hợp đồng dịch vụ.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 4 (Diễn giải Điều khoản)</p>
                <ul class="style-list">
                    <li>Công ty có thể thiết lập một chính sách vận hành dịch vụ riêng biệt (sau đây gọi là "Chính sách vận hành") liên quan đến việc cung cấp dịch vụ.</li>
                    <li>Các vấn đề không được quy định trong Điều khoản này hoặc những nội dung cần giải thích sẽ được thực hiện theo Chính sách vận hành, pháp luật liên quan và thông lệ chung.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 5 (Thiết lập tư cách thành viên dịch vụ)</p>
                <ul class="style-list">
                    <li>Việc đăng ký thành viên dịch vụ được hoàn tất khi người muốn trở thành thành viên (sau đây gọi là "Người đăng ký") đồng ý với nội dung của Điều khoản này, nộp đơn đăng ký thành viên theo quy trình do Công ty quy định, và Công ty chấp nhận đơn đăng ký đó.</li>
                    <li>
                        Công ty, về nguyên tắc, chấp thuận đơn đăng ký của Người đăng ký để sử dụng dịch vụ. Tuy nhiên, Công ty có thể từ chối hoặc hủy bỏ hợp đồng dịch vụ trong những trường hợp sau.
                        <ul class="sub-list">
                            <li>1) Người đăng ký đã từng bị mất tư cách thành viên theo Điều khoản này trước đây. Tuy nhiên, nếu Công ty chấp thuận cho phép đăng ký lại, trường hợp này được miễn trừ.</li>
                            <li>2) Người đăng ký sử dụng tên giả hoặc danh tính của người khác.</li>
                            <li>3) Người đăng ký cung cấp thông tin sai sự thật.</li>
                            <li>4) Nếu người sử dụng dưới 14 tuổi, cha mẹ hoặc người giám hộ hợp pháp có quyền yêu cầu truy cập, chỉnh sửa, cập nhật thông tin cá nhân của trẻ hoặc rút lại sự đồng ý đối với việc đăng ký thành viên. Trong những trường hợp này, Công ty phải thực hiện các biện pháp cần thiết mà không chậm trễ.</li>
                            <li>5) Nếu việc phê duyệt không thể thực hiện được do lý do thuộc về Người đăng ký hoặc nếu đơn đăng ký vi phạm các quy định khác của Công ty.</li>
                        </ul>
                    </li>
                    <li>Công ty cung cấp dịch vụ cho tất cả các độ tuổi. Tuy nhiên, nếu chủ sở hữu thiết bị không thông báo với Công ty rằng họ là người chưa thành niên, Công ty sẽ không áp dụng bất kỳ hạn chế nào về độ tuổi sử dụng dịch vụ. Nếu phát hiện chủ sở hữu thiết bị là người chưa thành niên, họ phải hoàn tất thủ tục xác nhận sự đồng ý của cha mẹ hoặc người giám hộ hợp pháp theo quy định của Công ty.</li>
                    <li>Công ty có thể trì hoãn phê duyệt đơn đăng ký nếu không có đủ cơ sở hạ tầng dịch vụ hoặc có vấn đề về kỹ thuật hay vận hành.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 6 (Thay đổi thông tin thành viên)</p>
                <ul class="style-list">
                    <li>Thành viên có thể truy cập và chỉnh sửa thông tin cá nhân của mình bất cứ lúc nào thông qua ứng dụng di động.</li>
                    <li>Nếu có sự thay đổi trong thông tin đã cung cấp khi đăng ký thành viên, Thành viên phải cập nhật thông tin thông qua ứng dụng di động hoặc thông báo cho Công ty qua email hoặc các phương thức khác.</li>
                    <li>Công ty không chịu trách nhiệm đối với bất kỳ bất lợi nào phát sinh do Thành viên không thông báo những thay đổi nêu trên.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 7 (Nghĩa vụ bảo vệ thông tin cá nhân)</p>
                <ul>
                    <li>Công ty sẽ nỗ lực bảo vệ thông tin cá nhân của Thành viên theo quy định của pháp luật liên quan, bao gồm Luật Thúc đẩy Sử dụng Mạng Thông tin và Truyền thông và Bảo vệ Thông tin. Việc bảo vệ và sử dụng thông tin cá nhân sẽ tuân theo các quy định pháp luật liên quan và Chính sách bảo vệ quyền riêng tư của Công ty.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 8 (Nghĩa vụ quản lý tài khoản của Thành viên)</p>
                <ul class="style-list">
                    <li>Thành viên có trách nhiệm quản lý tài khoản ứng dụng di động của mình và không được phép cho bên thứ ba sử dụng tài khoản đó.</li>
                    <li>Nếu Thành viên phát hiện tài khoản của mình bị đánh cắp hoặc bị sử dụng trái phép bởi bên thứ ba, họ phải ngay lập tức thông báo cho Công ty và tuân theo hướng dẫn của Công ty.</li>
                    <li>Nếu Thành viên không thông báo cho Công ty về sự việc nêu trên hoặc không tuân theo hướng dẫn của Công ty sau khi thông báo, Công ty sẽ không chịu trách nhiệm đối với bất kỳ tổn thất nào phát sinh.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 9 (Thông báo đến Thành viên)</p>
                <ul class="style-list">
                    <li>Công ty có thể thông báo đến Thành viên qua địa chỉ email hoặc số điện thoại được đăng ký trong hệ thống.</li>
                    <li>Nếu Thành viên không cung cấp hoặc thay đổi thông tin liên lạc khiến việc thông báo riêng lẻ trở nên khó khăn, hoặc nếu thông báo cần gửi đến một số lượng lớn Thành viên, Công ty có thể thay thế việc thông báo cá nhân bằng cách đăng tải thông báo trên bảng tin của ứng dụng di động.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 10 (Nghĩa vụ của Công ty)</p>
                <ul class="style-list">
                    <li>Công ty sẽ tuân thủ các quy định pháp luật liên quan và Điều khoản này, đồng thời nỗ lực hết sức để cung cấp dịch vụ một cách ổn định và liên tục.</li>
                    <li>Công ty phải thiết lập hệ thống bảo mật để bảo vệ thông tin cá nhân (bao gồm cả thông tin tín dụng) của Thành viên, đồng thời công bố và tuân thủ Chính sách bảo vệ quyền riêng tư.</li>
                    <li>Nếu ý kiến hoặc khiếu nại của Thành viên liên quan đến việc sử dụng dịch vụ được xác định là hợp lý, Công ty phải giải quyết và thông báo quá trình xử lý cũng như kết quả cho Thành viên thông qua bảng tin của ứng dụng di động hoặc email.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 11 (Nghĩa vụ của Thành viên)</p>
                <ul class="style-list">
                    <li>Thành viên phải tuân thủ các quy định pháp luật liên quan, Điều khoản này, Chính sách vận hành, hướng dẫn sử dụng và các thông báo từ Công ty, đồng thời không được thực hiện bất kỳ hành vi nào gây cản trở hoạt động của Công ty.</li>
                    <li>
                        Thành viên không được thực hiện các hành vi sau đây trong quá trình sử dụng dịch vụ. Nếu vi phạm, Công ty có quyền đình chỉ dịch vụ hoặc chấm dứt hợp đồng dịch vụ với Thành viên.
                        <ul class="sub-list">
                            <li>1) Sử dụng trái phép tài khoản của Thành viên khác hoặc tài khoản của bên thứ ba.</li>
                            <li>2) Thực hiện hành vi phạm tội hoặc liên quan đến các hoạt động phạm tội.</li>
                            <li>3) Xâm phạm quyền sở hữu trí tuệ hoặc quyền lợi của người khác.</li>
                            <li>4) Thực hiện hành vi tấn công mạng hoặc phát tán virus máy tính.</li>
                            <li>5) Truy cập dịch vụ bằng các phương thức không được Công ty hướng dẫn.</li>
                            <li>6) Thu thập, sử dụng hoặc cung cấp thông tin người dùng của Công ty mà không được phép.</li>
                            <li>7) Sử dụng dịch vụ cho mục đích thương mại.</li>
                            <li>8) Phát triển ứng dụng di động có nội dung vi phạm pháp luật, bao gồm nội dung khiêu dâm hoặc vi phạm bản quyền.</li>
                            <li>9) Sao chép, chỉnh sửa, phân phối, bán, chuyển nhượng, cho thuê, cung cấp tài sản thế chấp hoặc cấp quyền sử dụng một phần hoặc toàn bộ dịch vụ và phần mềm liên quan mà Công ty cung cấp; thực hiện kỹ thuật đảo ngược hoặc cố gắng trích xuất mã nguồn.</li>
                            <li>10) Sử dụng trái phép nhãn hiệu và logo của Công ty mà không có sự đồng ý rõ ràng.</li>
                            <li>11) Thực hiện bất kỳ hành vi nào có thể gây ảnh hưởng hoặc cản trở hoạt động ổn định của dịch vụ.</li>
                        </ul>
                    </li>
                    <li>Thành viên không được sử dụng thông tin thu thập được từ dịch vụ để sao chép, nhân bản, chỉnh sửa, dịch thuật, xuất bản, phát sóng hoặc cung cấp cho bên thứ ba dưới bất kỳ hình thức nào mà không có sự chấp thuận trước bằng văn bản từ Công ty.</li>
                    <li>Nếu Công ty yêu cầu cung cấp tài liệu hoặc quyền truy cập để xác minh việc tuân thủ Điều khoản hoặc điều tra vi phạm, Thành viên phải hợp tác đầy đủ.</li>
                    <li>Thành viên phải thường xuyên kiểm tra và cập nhật các phiên bản của bộ công cụ phát triển phần mềm (SDK) và các chức năng khác do Công ty cung cấp thông qua dịch vụ.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 12 (Cung cấp dịch vụ nội dung)</p>
                <ul class="style-list">
                    <li>Dịch vụ do Công ty cung cấp có thể được phân loại và sử dụng theo tư cách thành viên của người dùng.</li>
                    <li>Việc sử dụng dịch vụ được đảm bảo hoạt động liên tục 24/7, trừ trường hợp có trở ngại đặc biệt về mặt vận hành hoặc kỹ thuật.</li>
                    <li>Công ty có thể tạm thời gián đoạn dịch vụ để bảo trì, thay thế, khắc phục sự cố máy tính, thiết bị viễn thông, hoặc do các lý do hợp lý khác liên quan đến vận hành. Trong trường hợp này, Công ty sẽ thông báo cho Thành viên theo phương thức quy định tại Điều 9. Tuy nhiên, nếu có lý do bất khả kháng khiến Công ty không thể thông báo trước, Công ty có thể thông báo sau khi dịch vụ đã bị gián đoạn.</li>
                    <li>Công ty có thể thực hiện kiểm tra định kỳ khi cần thiết để đảm bảo cung cấp dịch vụ, và thời gian kiểm tra định kỳ sẽ được thông báo trước thông qua ứng dụng di động.</li>
                    <li>Các câu chuyện đã tạo sẽ được công khai. Nếu Thành viên không muốn nội dung của mình hiển thị công khai, họ có thể liên hệ với Công ty để yêu cầu xóa nội dung.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 13 (Thay đổi dịch vụ nội dung)</p>
                <ul class="style-list">
                    <li>Công ty có thể thay đổi nội dung, quy trình vận hành hoặc các yếu tố kỹ thuật của dịch vụ để đảm bảo cung cấp dịch vụ ổn định.</li>
                    <li>Khi có thay đổi đối với dịch vụ, Công ty sẽ công bố nội dung thay đổi và ngày áp dụng trên ứng dụng di động trước khi thay đổi có hiệu lực.</li>
                    <li>Công ty có thể sửa đổi, tạm ngừng hoặc thay đổi một phần hoặc toàn bộ dịch vụ miễn phí theo chính sách của mình. Trừ khi có quy định đặc biệt trong pháp luật liên quan, Công ty không có nghĩa vụ bồi thường cho Thành viên đối với các thay đổi này.</li>
                    <li>Công ty có thể xóa các nội dung chưa hoàn chỉnh mà không cần sự đồng ý của Thành viên.</li>
                    <li>Nếu nội dung vi phạm thuần phong mỹ tục hoặc bản quyền, Công ty có thể xóa nội dung mà không cần sự đồng ý của Thành viên.</li>
                    <li>Nếu nội dung gây cảm giác khó chịu hoặc phản cảm đối với Thành viên khác, Công ty có thể xóa câu chuyện mà không cần sự đồng ý của Thành viên đã tạo nội dung đó.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 14 (Quyền sở hữu nội dung)</p>
                <ul class="style-list">
                    <li>Quyền tác giả và quyền sở hữu trí tuệ đối với dịch vụ thuộc về Công ty.</li>
                    <li>Công ty cấp quyền sử dụng tài khoản, ứng dụng di động và các nội dung liên quan theo các điều kiện do Công ty quy định. Thành viên không được chuyển nhượng, bán, cầm cố hoặc sử dụng chúng làm tài sản thế chấp.</li>
                    <li>Nội dung do Thành viên đăng tải trên dịch vụ có thể xuất hiện trong kết quả tìm kiếm của dịch vụ hoặc trên các công cụ tìm kiếm bên ngoài. Ngoài ra, Công ty có thể sử dụng miễn phí các nội dung này cho mục đích truyền thông, PR, xuất bản, quảng bá cuộc thi, chia sẻ tài liệu với các ứng dụng khác, v.v. Trong phạm vi cần thiết, nội dung của Thành viên có thể bị chỉnh sửa, sao chép hoặc biên tập.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 15 (Chấm dứt hợp đồng sử dụng dịch vụ)</p>
                <ul class="style-list">
                    <li>Thành viên có thể yêu cầu chấm dứt hợp đồng dịch vụ bất cứ lúc nào bằng cách truy cập vào ứng dụng di động. Công ty sẽ xử lý yêu cầu theo quy định của pháp luật.</li>
                    <li>Khi xử lý yêu cầu chấm dứt hợp đồng, Công ty sẽ xóa tất cả thông tin cá nhân của Thành viên ngoại trừ những dữ liệu được giữ lại theo quy định của pháp luật và Chính sách bảo vệ quyền riêng tư.</li>
                    <li>Sau khi Thành viên chấm dứt hợp đồng, việc đăng ký lại tài khoản bằng thông tin cũ có thể bị hạn chế theo chính sách vận hành của Công ty.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 16 (Hạn chế sử dụng dịch vụ)</p>
                <ul class="style-list">
                    <li>Nếu Thành viên vi phạm Điều khoản này hoặc cản trở hoạt động bình thường của dịch vụ, Công ty có thể áp dụng các biện pháp hạn chế theo từng cấp độ như cảnh cáo, tạm đình chỉ hoặc chấm dứt hợp đồng dịch vụ.</li>
                    <li>Nếu Thành viên vi phạm pháp luật hiện hành, Công ty có thể ngay lập tức chấm dứt hợp đồng dịch vụ.</li>
                    <li>Khi áp dụng các biện pháp hạn chế sử dụng dịch vụ hoặc chấm dứt hợp đồng, Công ty sẽ thông báo cho Thành viên theo Điều 9.</li>
                    <li>Thành viên có thể khiếu nại về việc hạn chế dịch vụ theo quy trình do Công ty quy định. Nếu khiếu nại được xác nhận là hợp lý, Công ty sẽ ngay lập tức khôi phục quyền sử dụng dịch vụ cho Thành viên.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 17 (Giới hạn trách nhiệm)</p>
                <ul class="style-list">
                    <li>Công ty không chịu trách nhiệm về việc gián đoạn dịch vụ do các sự kiện bất khả kháng như thiên tai, tấn công DDoS, sự cố IDC, gián đoạn đường truyền của nhà cung cấp dịch vụ viễn thông hoặc các tình huống tương tự khác.</li>
                    <li>Công ty không chịu trách nhiệm đối với sự cố dịch vụ do lỗi của Thành viên.</li>
                    <li>Công ty không đảm bảo độ tin cậy, tính chính xác hoặc tính hợp pháp của các dịch vụ do Thành viên phát triển và không chịu bất kỳ trách nhiệm nào liên quan đến nội dung đó.</li>
                    <li>Công ty chỉ cung cấp các chức năng bổ sung để hỗ trợ Thành viên phát triển ứng dụng di động và không đảm bảo bất kỳ sự cải thiện hiệu suất nào khi sử dụng dịch vụ.</li>
                    <li>Công ty không chịu trách nhiệm về việc sử dụng dịch vụ miễn phí trừ khi có quy định cụ thể trong pháp luật liên quan.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 18 (Luật áp dụng và Thẩm quyền xét xử)</p>
                <ul class="style-list">
                    <li>Các tranh chấp giữa Công ty và Thành viên sẽ được điều chỉnh theo luật pháp của Cộng hòa Hàn Quốc.</li>
                    <li>Các vụ kiện phát sinh từ tranh chấp giữa Công ty và Thành viên sẽ được giải quyết tại tòa án có thẩm quyền theo Luật Tố tụng Dân sự.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 19 (Chính sách Bản quyền)</p>
                <ul class="style-list">
                    <li>Công ty xây dựng và thực thi các chính sách nhằm bảo vệ bản quyền của chủ sở hữu khi sử dụng dịch vụ, và Thành viên phải tuân thủ chính sách bản quyền của Công ty.</li>
                    <li>Mọi nội dung trong dịch vụ đều có chủ sở hữu bản quyền riêng. Thành viên không được sử dụng, chiếm đoạt, khai thác, sao chép, nhân bản, phân phối nội dung một cách trái phép, cũng như không được sao chép, truyền tải, xuất bản, phân phối hoặc phát sóng nội dung mà không có sự đồng ý trước bằng văn bản của Công ty. Nếu Thành viên vi phạm điều này, họ phải chịu hoàn toàn trách nhiệm. Nếu chủ sở hữu bản quyền yêu cầu Công ty bồi thường thiệt hại do hành vi vi phạm của Thành viên, Thành viên có trách nhiệm hoàn toàn miễn trừ Công ty khỏi mọi tổn thất, bao gồm nhưng không giới hạn ở phí luật sư và chi phí tố tụng.</li>
                    <li>Nếu nội dung do Thành viên chia sẻ vi phạm quyền sở hữu trí tuệ (bao gồm nhưng không giới hạn ở bản quyền, quyền thiết kế) hoặc quyền cá nhân (bao gồm việc sử dụng hình ảnh, giọng nói của người khác mà không có sự đồng ý, kể cả của người nổi tiếng), Thành viên phải chịu trách nhiệm hoàn toàn và phải tự chi trả các khoản phí luật sư và chi phí tố tụng để miễn trừ Công ty khỏi mọi trách nhiệm pháp lý.</li>
                    <li>Trừ một số trường hợp ngoại lệ, mỗi nội dung trong dịch vụ đều có chủ sở hữu bản quyền riêng. Thành viên không được tự ý cho rằng mình có quyền sở hữu một phần bản quyền chỉ dựa trên mối quan hệ pháp lý với Công ty. Để yêu cầu quyền sở hữu bản quyền đối với nội dung của dịch vụ, Thành viên phải có thỏa thuận bằng văn bản với tất cả chủ sở hữu bản quyền liên quan và Công ty, có chữ ký xác nhận của các bên liên quan.</li>
                    <li>
                        Nếu Thành viên đăng tải nội dung vi phạm bản quyền của người khác, Công ty sẽ tuân thủ trách nhiệm theo Điều 103 của Luật Bản quyền và không chịu bất kỳ trách nhiệm nào khác ngoài những quy định sau.
                        <ul class="sub-list">
                            <li>a) Nếu một cá nhân chứng minh rằng quyền bản quyền của họ bị xâm phạm do nội dung được sao chép hoặc truyền tải thông qua dịch vụ của Công ty và yêu cầu Công ty dừng hành vi sao chép hoặc truyền tải, Công ty sẽ ngay lập tức thực hiện yêu cầu này và thông báo cho cả người yêu cầu và người đăng nội dung.</li>
                            <li>b) Nếu người đăng tải nội dung phản đối và chứng minh rằng việc sao chép hoặc truyền tải của họ là hợp pháp, họ có thể yêu cầu khôi phục nội dung. Trong trường hợp này, Công ty sẽ thông báo cho bên yêu cầu và khôi phục nội dung vào ngày được chỉ định. Tuy nhiên, nếu bên yêu cầu chứng minh rằng họ đã khởi kiện trước ngày khôi phục, Công ty sẽ không thực hiện khôi phục nội dung.</li>
                            <li>
                                c) Công ty chỉ định thông tin liên hệ dưới đây để tiếp nhận các yêu cầu liên quan đến việc ngừng hoặc khôi phục nội dung vi phạm bản quyền.
                                <div class="py-custom-table">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th><div class="th-wrap">Tên</div></th>
                                            <td><div class="td-wrap">Choi Joong-bae</div></td>
                                        </tr>
                                        <tr>
                                            <th><div class="th-wrap">Email</div></th>
                                            <td><div class="td-wrap">prokidsbook@iea.co.kr</div></td>
                                        </tr>
                                        <tr>
                                            <th><div class="th-wrap">Số điện thoại</div></th>
                                            <td><div class="td-wrap">+82-2-6263-0630</div></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        Các bài đánh giá và nội dung khác do Thành viên đăng tải có thể được hiển thị trong một khoảng thời gian nhất định theo chính sách của Công ty và có thể bị xóa sau khi thời gian hiển thị kết thúc.
                    </li>
                    <li>Quyền tác giả và quyền sở hữu trí tuệ khác đối với các nội dung do Công ty tạo ra thuộc về Công ty.</li>
                    <li>Nếu Thành viên tin rằng quyền bản quyền của họ bị xâm phạm trong dịch vụ, họ có thể báo cáo thông qua hệ thống khiếu nại do Công ty vận hành. Công ty sẽ xử lý theo quy định của pháp luật.</li>
                    <li>Thành viên không được phép bán lại dịch vụ hoặc nội dung được tạo ra bằng dịch vụ, dù có tính phí hay miễn phí. Thành viên cũng không được phép phân phối hoặc chuyển giao toàn bộ hoặc một phần dịch vụ (bao gồm nhưng không giới hạn ở hình ảnh, video, logo, mẫu thiết kế, khẩu hiệu) cho bên thứ ba. Nếu vi phạm, Thành viên sẽ phải bồi thường toàn bộ lợi nhuận thu được từ hành vi vi phạm, đồng thời chịu trách nhiệm thanh toán toàn bộ chi phí phát triển dịch vụ cho Công ty.</li>
                    <li>Các tệp PDF của truyện do Thành viên xuất ra không được sử dụng cho mục đích thương mại. Thành viên không được sử dụng, sao chép, chỉnh sửa, chuyển thể, biên tập, xuất bản, tạo tác phẩm phái sinh, phân phối, trình diễn, quảng bá, trưng bày nội dung mà không có sự đồng ý của Công ty, ngoại trừ chức năng chia sẻ có sẵn trong ứng dụng. Quyền sử dụng này bao gồm nhưng không giới hạn ở các phương thức truyền tải qua phương tiện truyền thông, internet hoặc công nghệ chưa được phát triển. Nếu Thành viên vi phạm quy định này, toàn bộ quyền tác giả đối với nội dung phái sinh sẽ thuộc về Công ty một cách độc quyền, vĩnh viễn và không giới hạn lãnh thổ. Công ty sẽ có quyền sở hữu miễn phí (royalty-free) đối với các tác phẩm phái sinh mà không cần sự đồng ý của Thành viên.</li>
                    <li>Nếu Thành viên sử dụng nội dung ngoài chức năng chia sẻ có sẵn mà không có sự đồng ý của Công ty, Công ty có quyền yêu cầu bồi thường thiệt hại. Trong trường hợp này, Thành viên đồng ý rằng mức bồi thường sẽ được xác định bằng ba lần tổng lợi nhuận mà Thành viên đã thu được từ hành vi vi phạm.</li>
                </ul>
            </div>
            <div class="info-box">
                <p>Điều 20 (Yêu cầu về quyền truy cập)</p>
                <ul class="style-list">
                    <li>Camera (Tùy chọn): Cần thiết để chụp ảnh khi tạo nhân vật.</li>
                    <li>Bộ nhớ (Tùy chọn): Cần thiết để lưu, đọc, chỉnh sửa và xóa nội dung.</li>
                    <li>Thông báo (Tùy chọn): Cần thiết để nhận thông báo từ máy chủ.</li>
                </ul>
            </div>
        </div>
`;

/* 개인정보 처리방침 */
const PPH_KR = `
            <div class="inner-wrap scroll-ver">
                <div class="info-box">
                    <p>(주)아이이에이는 개인정보보호법, 정보통신망 이용 촉진 및 정보보호 등에 관한 법률 등 정보통신 서비스 제공자가 준수 하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다. 회사의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.</p>
                    <ul class="style-list">
                        <li>수집하는 이용자의 개인정보</li>
                        <li>개인정보의 수집 및 이용 목적</li>
                        <li>개인정보를 수집하는 방법</li>
                        <li>개인정보를 취급 위탁</li>
                        <li>개인정보의 보유 및 이용 기간</li>
                        <li>개인정보 파기절차 및 방법 </li>
                        <li>이용자 개인정보 정확성을 위한 내용</li>
                        <li>이용자의 개인정보안전을 위해 취해질 수 있는 서비스 일지 중단조치</li>
                        <li>제 3자와의 정보공유 및 제공 관련 내용</li>
                        <li>이용자의 개인정보 비밀유지를 위한내용</li>
                        <li>이용자가 자신의 개인정보를 보호하기 위해 알아야할 사항</li>
                        <li>인지 못한 이용자의 개인정보 및 기타 불만사항에 관한 처리</li>
                        <li>개인정보 취급자의 제한에 관한 내용</li>
                        <li>이용자 및 법정대리인의 권리와 그 행사방법</li>
                        <li>개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</li>
                        <li>개인정보관리 책임자 및 담당자의 연락처</li>
                        <li>고지의 의무</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>1. 수집하는 이용자의 개인정보</p>
                    <ul class="text-list">
                        <li>
                            가. 수집하는 개인정보의 항목
                            <ul class="sub-list text-ver">
                                <li>
                                    <p>[ 회원가입시 ]</p>
                                    <span>성명,생년월일,휴대폰 번호, 이메일 주소, 비밀번호, 기기정보[사용통신사명, 접속 기기정보(ADID 및 IDFA 포함), 접속 기기의 IP Address, 쿠키]</span>
                                </li>
                                <li>
                                    <p>[ 서비스 이용시 ]</p>
                                    <span>이용자 ID, 사진, 목소리 데이터, 사용자의 플레이 데이터, 비밀번호, 휴대전화번호, 이메일 주소, 카카오 계정정보, 구글 계정정보 암호화된 이용자 확인값(CI), 구글 계정정보, 사업자 등록번호, 상호명, 대표자명, 서비스 이용기록, 접속 로그, 쿠키, 접속 IP정보, 결제기록 등 이용자가 서비스 이용을 위해 직접 입력하는 개인정보</span>
                                </li>
                                <li>
                                    <p>[ 유료 서비스 결제 시 ]</p>
                                    <span>신용/체크 카드사명, 신용/체크 카드번호, 결제 승인번호, 은행 명 계좌번호</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            나. 개인정보 수집방법
                            <p>회사는 다음과 같은 방법으로 개인정보를 수집하고 있습니다.</p>
                            <ul class="style-list">
                                <li>모바일 앱, 웹 사이트, 서면 양식, 팩스, 전화, 상담게시판, 이메일, 이벤트 응모</li>
                                <li>협력회사로부터 공동 제휴 및 협력을 통한 정보 수집</li>
                                <li>생성정보 수집 툴을 통한 정보 수집</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>2. 개인정보의 수집 및 이용 목적</p>
                    <ul class="text-list">
                        <li>
                            가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산에 활용합니다.
                            <ul class="sub-list dot-ver">
                                <li>컨텐츠 제공, 특정 맞춤 서비스 제공, 본인인증, 컨텐츠 구매 및 요금결제,요금추심</li>
                            </ul>
                        </li>
                        <li>
                            나. 이용자 관리를 위해 일부 이용자 정보를 활용합니다.
                            <ul class="sub-list dot-ver">
                                <li>서비스 이용 신청에 따른 본인 확인, 개인식별, 불량 이용자(이용약관을. 위반하거나 성실히 수행하지 않은 이용자)의 부정 이용자와 비인가 사용방지,  서비스 이용 신청 횟수제한, 분쟁 조정을 위한 기록 보존, 불만처리 등 민원처리, 고지사항 전달</li>
                            </ul>
                        </li>
                        <li>
                            다. 신규 서비스 개발 및 마케팅, 광고에 활용합니다.
                            <ul class="sub-list dot-ver">
                                <li>신규 서비스 개발 및 인증 서비스, 맞춤 서비스제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 접속 빈도 파악, 이용자의 서비스 이용에 대한 통계, 서비스의 유효성 확인</li>
                            </ul>
                        </li>
                        <li>
                            라. 사용자 얼굴 사진 수집 목적
                            <ul class="sub-list dot-ver">
                                <li>얼굴 이미지는 AI 이미지 생성 기능을 제공하기 위해 사용되며, 사용자 동의하에 수집됩니다. 얼굴 이미지는 이미지 생성 작업 완료 후 즉시 삭제되며, 별도로 저장되지 않습니다. 수집된 얼굴 이미지는 AI 모델 학습이나 기타 용도로 사용되지 않으며, 오직 사용자가 요청한 이미지 생성 작업을 수행하는 데만 활용됩니다.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>3. 개인정보를 수집하는 방법</p>
                    <ul class="text-list">
                        <li>가. 서비스 가입 또는 사용 중 이용자의 자발적 제공을 통한 수집</li>
                        <li>나. 회사가 제공하는 서비스를 실행 또는 사용함으로써 자동으로 수집
                            모든 이용자가 회사로부터 서비스를 제공받기 위해서는 이용자의 개인정보가 필요하며 개인정보는 서비스 이용 신청 시 신청 양식에 신청자의 동의를 통해 수집됩니다. </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>4. 개인정보의 취급위탁</p>
                    <ul class="text-list">
                        <li>회사는 서비스 향상을 위해서 귀하의 개인정보를 외부에 위탁하여 처리할 수 있습니다.</li>
                        <li>가. 개인정보의 처리를 위탁하는 경우에 미리 그 사실을 귀하에게 고지하겠습니다.</li>
                        <li>나. 개인정보의 처리를 위탁하는 경우에는 위탁계약 등을 통하여 서비스제공자의 개인정보보호 관련 지시 업무, 개인정보에 관한 비밀유지, 제 3자의 제공의 금지 및 사고시의 책임부담 등을 명확히 규정하고 당해 계약내용을 서면 또는 전자적으로 보관하겠습니다.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>5. 개인정보의 보유 및 이용기간</p>
                    <ul class="text-list">
                        <li>회원탈퇴, 개인정보의 수집 및 이용목적이 달성된 경우 회원의 개인정보를 지체 없이 파기합니다. 단, 아래 각 사유 및 기간에 한하여 예외적으로 회원의 개인정보를 보유합니다.</li>
                        <li>
                            가. 얼굴 이미지 보유 및 이용기간
                            <ul class="sub-list dot-ver">
                                <li>
                                   얼굴이미지는 이미지 생성을 위해 30초 이내로 보관되며 이미지 생성된 이후 자동으로 삭제되어 별로도 보관되지 않습니다.
                                </li>
                            </ul>
                        </li>                        
                        <li>
                            나. 회사 내부 정책에 의한 경우 불량 이용자의 재가입 방지, 부정이용 방지, 기타 민원 및 질의 응답 대응
                            <ul class="sub-list dot-ver">
                                <li>
                                    <em>보유기간:</em> (일반 회원의 탈퇴 후 재가입 방지를 위한 경우) 탈퇴 후 30일간(부정이용 및 이용규정 위반 대응을 위한 경우-불량이용자의 재가입 방지포함) 해당 부정이용 및 이용규정 위반 대응 사항에 대한 분쟁 해결 시 까지 로 하며, 분쟁 해결이 원만하지 않을 경우 이와 관련하여 관련 법령의 분쟁 조정 절차에 따르도록 합니다. (민원 또는 서비스 질의응답에 대한 경우) 해당 민원 또는 질의 응답 해결시까지
                                </li>
                                <li>
                                    <em>보유정보:</em>이메일 주소(ID), 휴대전화번호, 닉네임, 성명, 중복 가입 또는 부정가입 방지 목적을 위한 식별 정보(이용자 사진, 계정정보, 이용자 기기정보 등), 중복가입 확인정보, 가입일, 탈퇴일, 승인일, 해당 민원/질의응답 내용 또는 부정/위반 이용행위 내용 기록
                                </li>
                            </ul>
                        </li>
                        <li>
                            다. 회원이 직접 개인정보의 보전을 요청한 경우 또는 회사가 개별적으로 회원의 동의를 얻은 경우
                            <ul class="sub-list dot-ver">
                                <li>
                                    <em>보유기간 및 보유정보:</em> 회원의 요청 또는 동의를 얻는 항복/기간에 한하여 해당 기간 동안 보유
                                </li>
                            </ul>
                        </li>
                        <li>
                            라. 법령에 의거, 이용자의 동의 없이 보존할 것을 정한 경우’전자상거래 등에서의 소비자보호에 관한 법률’에 의하여 아래의 명시 기간 동안 보관 관리합니다.
                            <ul class="sub-list insert-ver">
                                <li>가. 계약, 청약철회, 이용자 서비스 이용 내역 등의 거래에 관련한 기록: 5년 (본’가’항에 해당하는 기록의 경우 이용자 파악을 위한 식별자료는 최소한의 정보인 이메일 주소(ID) 및 휴대폰 번호에 한해 보관하며 기타 개인정보는 하기 ‘마’항 등에 따라 탈퇴 후 30일 이내 전부 파기됩니다.)</li>
                                <li>나. 대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                                <li>다. 소비자의 불만 또는 분쟁처리에 관한 기록: 5년 (본 ‘다’항에 해당하는 기록의 경우 이용자 파악을 위한 식별자료는 최소한의 정보인 이메일 주소 (ID)및 휴대폰 번호에 한해 보관하며 기타 개인정보는 하기 ‘마’항 등에 따라 탈퇴 후 7일 이내 정부 파기됩니다.)</li>
                                <li>라. 사이트 방문에 관한 기록 : 3개월</li>
                                <li>마. 위 ‘가’-‘라’항에 해당하지 않는 가입 시 입력한 모든 개인 정보:탈퇴 신청 후 7일</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>6. 개인정보 파기절차 및 방법</p>
                    <ul>
                        <li>회사는 개인정보 보유기간의 경과 혹은 개인정보의 수집 및 이용목적의 달성 등 개인정보가 불필요하게 되었을 때에는 해당 개인정보를 지체없이 파기합니다.회사의 개인정보 파기절차 및 방법은 다음과 같습니다.</li>
                        <li>
                            가. 파기절차
                            <ul class="sub-list dot-ver">
                                <li>이용자가 서비스 신청 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB를 옮겨져(종이의 경우 별도의 잠금 장치가 있는 서류 보관함)내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보호 및 이용기간 참조)일정 기간 저장된 후 파기됩니다</li>
                                <li>동 개인정보는 법률에 의한 경우가 아니고 서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.</li>
                            </ul>
                        </li>
                        <li>
                            나. 파기방법
                            <ul class="sub-list dot-ver">
                                <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
                                <li>전자적으로 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>7. 이용자 개인정보 정확성을 위한 내용</p>
                    <ul>
                        <li>이용자의 부정확한 개인정보로 인하여 사용자의 불편을 줄수 있으므로 개인정보 관리자가 판단하기에 확연히 부정확한 개인정보를 기입한 경우에는 정확하지 않은 개인정보를 파기할 수 있습니다.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>8. 이용자의 개인정보안전을 위해 취해질 수 있는 서비스 일시중단조치</p>
                    <ul>
                        <li>회사는 이용자의 안전한 서비스 이용을 위해서 최선을 다하고 있습니다. 그러나 원하지 않는 방법에 의하여 회사의 서비스가 훼손을 당하는 경우에는 이용자들의 개인정보 보호를 위하여 문제가 완전하게 해결될 때까지 이용자의 개인정보를 이용한 서비스를 일시 중단 할 수도 있습니다.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>9. 제 3자와의 정보공유 및 제공 관련 내용</p>
                    <ul>
                        <li>회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제 24조의 2(개인정보의 제공동의 등)에 따라 이용자의 동의가 있거나 법률에 특별한 규정이 있는 경우를 제외하고 개인정보를 고지 또는 명시한 범위를 초과하여 이용하거나 제 3자에게 제공하지 않습니다.
                            또한 개인정보보호법 제 59조(금지행위)에 따라 회사의 서비스 제공을 위하여 개인정보를 취급하거나 취급하였던 자는 다음 각호의 행위를 하지 않습니다.</li>
                        <li>가. 거짓이나 그 밖의 부정한 수단이나 방법으로 개인정보를 취득하거나 처리에 관한 동의를 받은 행위</li>
                        <li>나. 업무상 알게 된 개인정보를 누설하거나 권한 없이 다른 사람이 이용하도록 제공하는 행위</li>
                        <li>다. 정당한 권한 없이 또는 허용된 권한을 초과하여 다른 사람의 개인정보를 훼손, 멸시, 변경, 위조 또는 유출하는 행위</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>10. 이용자의 개인정보 비밀유지를 위한 내용</p>
                    <ul>
                        <li>
                            회사는 이용자의 개인정보의 비밀을 유지하기 위하여 제 3자에게는 이용자의 동의 없이 개인정보를 유출하지 않습니다. 또한 이용자가 동의를 하였다 하더라도, 제 3자를 통하여 재 유출이 될 확률이 있는 자에게는 이용자의 개인정보를 유출하지 않습니다. 회사는 각종 정부기관의 이용자 개인정보의 일방적 제공 요구에 대하여는 이용자의 개인정보를 제공하지 않습니다. 법령에 따른 정부기관이 법령에 따른 공식 절차를 완벽하게 거쳐 자료를 요구하는 경우에 한하여 이용자의 개인정보를 제공합니다. 회사는 이용자의 개인정보를 회사가 정한 기본 서비스 및 기타의 서비스 활동 이외에는 이용하지 않습니다. 위의 활동에 따라 이용자의 정보가 필요할 시에는 별도의 양식을 통한 수집 및 동의의 절차를 거쳐서 이용자의 개인정보를 이용합니다.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>11. 이용자가 자신의 개인정보를 보호하기 위해 알아야할 사항</p>
                    <ul>
                        <li>
                            PC방 등 외부 장소에서 공용WI-FI 등으로 ‘프로키즈북’을 이용하실 경우 해킹 프로그램 기타 유해 프로그램이 없는지 유의하여 이용하시기 바랍니다. 회사는 개인정보보호에 최선을 다하지만 사용자 개인의 실수나 인터넷 상의 문제로 인한 일들에 대해서는 책임을 지지 않습니다.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>12. 인지 못한 이용자의 개인정보 및 기타 불만사항에 관한 처리</p>
                    <ul>
                        <li>
                            회사가 인지하지 못하고 있는 이용자의 개인정보 이용 및 기타의 불만사항에 관하여 이용자 불만처리를 전담하는 관리자를 배정하여 지속적이고, 신속하게 이용자의 불만사항을 처리하고 처리한 결과에 대하여 즉시 응대합니다.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>13. 개인정보 취급자의 제한에 관한 내용</p>
                    <ul>
                        <li>
                            회사의 개인정보 관련 취급 직원은 담당자에 한정시키고 있고 이를 위한 별도의 비밀번호를 부여하여 정기적으로 갱신하고 있으며, 개인정보를 취급 할 수 있는 관리자 페이지에 접근하기 위해서는 2단계 인증 의무, 방화벽 설치 등의 절차를 완료해 놓았습니다. 또한 수시 교육을 통하여 개인정보처리방침의 준수를 강조하였습니다.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>14. 이용자 및 법정대리인의 권리와 그 행사방법</p>
                    <ul>
                        <li>가. 이용자 및 법정 대리인은 언제든지 신청되어 있는 자신의 개인정보를 조회하거나 이용해지를 요청할 수 있습니다.</li>
                        <li>나. 이용자의 개인정보 조회, 수정을 위해서는 직접 모바일 앱 또는 웹을 통해 수정하시거나, 고객센터 또는 담당자에게 이메일 등을 통해 신청해야 합니다. 이용해지(동의철회) 를 위해서는 회사가 정하는 탈퇴 신청 양식에 따른 고객센터에 이메일 문의 또는 모바일 앱 상 온라인 신청을 통하여 계약 해지 및 탈퇴가 가능합니다.</li>
                        <li>다. 이 외에도 고객센터나 개인정보책임자에게 서면 또는 이메일로 연락하시면 지체없이 조치하겠습니다</li>
                        <li>라. 이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제 3자에게 이미 제공한 경우에는 정정 처리결과를 제 3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.</li>
                        <li>마. 회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보를 개인정보처리방침 “5.개인정보의 보유 및 이용기간”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용 할 수 없도록 처리하고 있습니다.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>15. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</p>
                    <ul>
                        <li>회사는 이용자들에게 특화된 맞춤서비스르 제공하기 위해서 이용자들의 정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버(HTTP)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내에 하드디스크에 저장되기도 합니다.</li>
                        <li>
                            가. 쿠키의 사용목적<br>
                            이용자들의 편리한 기능을 제공하기 위하여 활용되며 유해한 목적으로는 활용되지 않습니다.
                        </li>
                        <li>
                            나. 쿠키의 설치/운영 및 거부
                            <ul class="style-list insert-ver">
                                <li>이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 하거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.</li>
                                <li>쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 하거나, 모든 쿠키의 저장을 거부할 수 있습니다.</li>
                                <li>설정방법 예(인터넷 익스플로어의 경우):웹 브라우저 상단의 도구>인터넷옵션>개인정보</li>
                                <li>다만, 쿠키의 저장을 거부할 경우에는 이용에 어려움이 있을 수 있습니다.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>16. 개인정보관리책임자 및 담당자의 연락처</p>
                    <ul>
                        <li>귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보 관리담당자 혹은 담당부서로 신고하실 수 있습니다. 회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.</li>
                        <li>
                            개인정보관리책임자<br/>
                            이름: 최중배<br/>
                            전화: 02-6269-0630<br/>
                            메일: prokidsbook@iea.co.kr
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>17. 고지의 의무</p>
                    <ul>
                        <li>현 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 모바일 앱 또는 웹 사이트 등의’공지사항’등 메뉴를 통해 고지할 것입니다.</li>
                    </ul>
                </div>
            </div>
`
const PPH_CN = `
            <div class="inner-wrap scroll-ver">
                <div class="info-box">
                    <p>IEA CO., LTD. 遵守《个人信息保护法》、《促进信息通信网络利用及信息保护法》等信息通信服务提供者应遵守的相关法律规定，并依据相关法律制定个人信息处理方针，以最大限度地保护用户权益。公司的个人信息处理方针包括以下内容</p>
                    <ul class="style-list">
                      <li>收集的用户个人信息</li>
                      <li>个人信息的收集及使用目的</li>
                      <li>个人信息的收集方法</li>
                      <li>个人信息的委托处理</li>
                      <li>个人信息的保存及使用期限</li>
                      <li>个人信息的销毁程序及方法</li>
                      <li>维护用户个人信息准确性的内容</li>
                      <li>可能采取的临时暂停服务措施以确保用户个人信息安全</li>
                      <li>关于与第三方的信息共享及提供</li>
                      <li>维护用户个人信息机密性的内容</li>
                      <li>用户保护自身个人信息的注意事项</li>
                      <li>未被识别的用户个人信息及其他投诉的处理</li>
                      <li>个人信息处理人员的限制</li>
                      <li>用户及法定代理人的权利及行使方式</li>
                      <li>个人信息自动收集装置的安装、运行及拒绝</li>
                      <li>个人信息管理负责人及联系信息</li>
                      <li>通知义务</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>1. 收集的用户个人信息</p>
                    <ul class="text-list">
                        <li>
                            (1) 收集的个人信息项目
                            <ul class="sub-list text-ver">
                                <li>
                                    <p>[ 会员注册时 ]</p>
                                    <span>姓名、出生日期、手机号码、电子邮件地址、密码、设备信息（使用的通信公司名称、访问设备信息（包括ADID和IDFA）、访问设备的IP地址、Cookies）</span>
                                </li>
                                <li>
                                    <p>[ 使用服务时 ]</p>
                                    <span>用户ID、照片、语音数据、用户的游戏数据、密码、手机号码、电子邮件地址、Kakao账号信息、Google账号信息、加密的用户识别值（CI）、Google账号信息、营业执照号码、商号名称、法人代表姓名、服务使用记录、访问日志、Cookies、访问IP信息、支付记录等用户为使用服务而直接输入的个人信息。</span>
                                </li>
                                <li>
                                    <p>[ 付费服务支付时 ]</p>
                                    <span>信用卡/借记卡公司名称、信用卡/借记卡卡号、支付授权号、银行名称、账户号</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            (2) 个人信息的收集方法
                            <p>公司通过以下方式收集个人信息</p>
                            <ul class="style-list">
                                <li>移动应用程序、网站、书面表格、传真、电话、咨询留言板、电子邮件、活动报名</li>
                                <li>通过与合作公司进行联合合作和联盟收集信息</li>
                                <li>通过生成信息收集工具收集信息</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>2. 个人信息的收集及使用目的</p>
                    <ul class="text-list">
                        <li>
                            a. 履行提供服务的合同及结算服务费用
                            <ul class="sub-list dot-ver">
                                <li>提供内容、提供特定定制服务、身份验证、内容购买及费用结算、费用催缴</li>
                            </ul>
                        </li>
                        <li>
                            b. 用于用户管理
                            <ul class="sub-list dot-ver">
                                <li>申请使用服务时的身份确认、个人识别、恶意用户（违反使用条款或未诚信履行义务的用户）与未经授权使用的防止、限制服务申请次数、保存争议调解的记录、投诉处理及通知事项的传达</li>
                            </ul>
                        </li>
                        <li>
                            c. 用于新服务开发、营销及广告
                            <ul class="sub-list dot-ver">
                                <li>新服务开发及认证服务、提供定制服务、根据统计特性提供服务及投放广告、提供活动及广告信息及参与机会、分析访问频率、统计用户的服务使用情况、确认服务的有效性</li>
                            </ul>
                        </li>
                        <li>
                             d. 用户人脸照片收集目的
                            <ul class="sub-list dot-ver">
                                <li>人脸图像用于提供AI图像生成功能，且在用户同意的情况下收集。人脸图像在图像生成任务完成后即刻删除，且不进行单独保存。收集的人脸图像不会用于AI模型训练或其他用途，仅用于执行用户请求的图像生成任务。</li>
                            </ul>
                        </li>                        
                    </ul>
                </div>
                <div class="info-box">
                    <p>3. 个人信息的收集方法</p>
                    <ul class="text-list">
                        <li>a. 通过用户主动提供的方式在注册或使用服务过程中收集</li>
                        <li>b. 通过公司提供的服务的执行或使用自动收集<br>
                            所有用户为了从公司获得服务，必须提供个人信息，并且个人信息是在服务申请时根据申请表和用户的同意进行收集的。</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>4. 个人信息的委托处理</p>
                    <ul class="text-list">
                        <li>公司可以为了提高服务质量，将您的个人信息委托给外部机构处理。</li>
                        <li>a. 如公司委托处理个人信息，将会事先通知用户该事实。</li>
                        <li>b. 在委托个人信息处理的情况下，公司将通过委托合同等方式明确规定服务提供方的个人信息保护相关指示、个人信息的保密义务、禁止向第三方提供及事故责任负担等，并以书面或电子方式保存相关合同内容。</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>5. 个人信息的保存及使用期限</p>
                    <ul class="text-list">
                        <li>当会员注销，或个人信息的收集及使用目的达成时，公司将立即销毁会员的个人信息。但在以下情况及期限内，公司可能会例外性地保存会员的个人信息。</li>
                        <li>
                            1) 人脸图像的保存及使用期限
                            <ul class="sub-list dot-ver">
                                <li> 人脸图像仅为图像生成用途保存，保存时间不超过30秒，图像生成完成后即自动删除，不进行额外保存。</li>
                            </ul>
                        </li>                        
                        <li>
                            2) 根据公司内部政策 防止恶意用户重新注册、防止滥用、应对其他投诉及咨询
                            <ul class="sub-list dot-ver">
                                <li>
                                    <em>保存期限：</em>
                                    （一般会员注销后，为防止重新注册）注销后30日
                                    （为应对滥用及违反使用规定的情况，包括防止恶意用户重新注册）直到相关滥用行为及违反使用规定的争议得到解决；如果争议未能顺利解决，则遵循相关法律的争议调解程序。
                                    （对于投诉或服务咨询）直到相关投诉或咨询得到解决
                                </li>
                                <li>
                                    <em>保存信息:</em>
                                    电子邮件地址（ID）、手机号码、昵称、姓名、用于防止重复注册或滥用注册的识别信息（用户照片、账户信息、用户设备信息等）、重复注册确认信息、注册日期、注销日期、批准日期、相关投诉/咨询内容或滥用/违规行为记录
                                </li>
                            </ul>
                        </li>
                        <li>
                            3) 会员主动请求保留个人信息，或公司单独获得会员同意的情况
                            <ul class="sub-list dot-ver">
                                <li>
                                    <em>保存期限及保存信息：</em> 仅在会员的请求或同意范围及期间内保存
                                </li>
                            </ul>
                        </li>
                        <li>
                            4) 根据法律规定，必须在未取得用户同意的情况下进行保存的情况
                                根据《电子商务等消费者保护相关法律》，以下信息将在规定期间内保存和管理：
                            <ul class="sub-list insert-ver">
                                <li>a. 与合同、撤销申请、用户服务使用记录等交易相关的记录
                                : 年 （属于本条款的记录，仅保存用于识别用户的最少信息，如电子邮件地址（ID）及手机号码；其余个人信息将在“e”条款的规定下，于注销后30日内全部销毁。）</li>
                                <li>b. 与支付及商品供应相关的记录: 5年</li>
                                <li>c. 与消费者投诉或争议处理相关的记录
                                : 5年 （属于本条款的记录，仅保存用于识别用户的最少信息，如电子邮件地址（ID）及手机号码；其余个人信息将在“e”条款的规定下，于注销后7日内全部销毁。）</li>
                                <li>d. 网站访问记录：3个月</li>
                                <li>e. 除“a”至“d”条款外，用户在注册时输入的所有个人信息：注销申请后7日内销毁</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>6. 个人信息的销毁程序及方法</p>
                    <ul>
                        <li>公司在个人信息的保存期限到期或个人信息的收集及使用目的达成等情况下，若个人信息已无必要，则立即销毁该个人信息。公司的个人信息销毁程序及方法如下。</li>
                        <li>
                            a. 销毁程序
                            <ul class="sub-list dot-ver">
                                <li>用户为申请服务等而输入的信息，在目的达成后，将被转移至单独的数据库（纸质文件则存放于带有锁定装置的文件柜），并根据公司内部方针及其他相关法律规定的信息保护原因（参照保护及使用期限）保存一段时间后销毁。</li>
                                <li>除非法律规定，否则该个人信息不会被用于保存以外的其他目的。</li>
                            </ul>
                        </li>
                        <li>
                            b. 销毁方法
                            <ul class="sub-list dot-ver">
                                <li>纸质形式的个人信息将通过碎纸机粉碎或焚烧进行销毁。</li>
                                <li>电子文件形式保存的个人信息将通过不可恢复的技术手段进行删除。</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>7. 维护用户个人信息准确性的内容</p>
                    <ul>
                        <li>由于用户的个人信息不准确可能会给用户带来不便，因此如果个人信息管理员判断用户填写的个人信息明显不准确，则有权销毁不正确的个人信息。</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>8. 可能采取的临时暂停服务措施以确保用户个人信息安全</p>
                    <ul>
                        <li>公司致力于保障用户的安全使用。然而，若公司服务遭受未经授权的攻击或损害，为了保护用户的个人信息，公司可能会暂时中止使用用户个人信息的相关服务，直到问题完全解决。</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>9. 关于与第三方的信息共享及提供</p>
                    <ul>
                        <li>公司除非获得用户同意或法律有特别规定，否则不会超出告知或明确说明的范围使用用户的个人信息，也不会向第三方提供用户的个人信息。此外，处理或曾处理过用户个人信息的人员不得从事以下行为：</li>
                        <li>a. 通过虚假或其他不正当手段获取个人信息或获得个人信息处理同意的行为。</li>
                        <li>b. 泄露因业务获取的个人信息，或未经授权提供给他人使用的行为。</li>
                        <li>c. 未经正当权限或超出授权范围，破坏、毁损、篡改、伪造或泄露他人个人信息的行为。</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>10. 维护用户个人信息机密性的内容</p>
                    <ul>
                        <li>
                            公司不会在未经用户同意的情况下向第三方泄露用户的个人信息。此外，即使用户已同意，公司也不会向可能再次泄露用户个人信息的第三方提供信息。公司不会单方面向政府机构提供用户个人信息。仅当政府机构依法提出正式请求并完成法定程序后，公司才会提供用户个人信息。公司不会将用户的个人信息用于公司规定的基本服务及其他服务活动以外的用途。如因上述活动需要用户信息，公司将通过单独的表单收集，并获得用户的同意后使用其个人信息。 
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>11. 用户保护自身个人信息的注意事项</p>
                    <ul>
                        <li>
                        若用户在网吧等外部场所通过公共Wi-Fi使用PROKIDSBOOK，请务必确保没有黑客程序或其他恶意程序，以保障安全使用。公司尽力保护用户的个人信息，但对于因用户个人失误或互联网问题造成的损失，公司不承担责任。
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>12. 未被识别的用户个人信息及其他投诉的处理</p>
                    <ul>
                        <li>
                        对于公司未能识别的用户个人信息使用或其他投诉事项，公司将指定专门的管理人员持续并迅速处理用户的投诉，并立即回应处理结果。
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>13. 个人信息处理人员的限制</p>
                    <ul>
                        <li>
                        公司限制个人信息相关处理人员仅限于指定的负责人，并为此设立单独的密码，定期进行更新。此外，为访问可处理个人信息的管理页面，必须完成双重认证、安装防火墙等安全程序。公司还通过定期培训强调遵守个人信息处理政策。
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>14. 用户及法定代理人的权利及行使方式</p>
                    <ul>
                        <li>a. 用户及法定代理人可随时查询或请求注销其已登记的个人信息。</li>
                        <li>b. 用户可通过移动应用或网页直接修改个人信息，或通过客户服务中心或电子邮件向公司申请修改。如需注销账户（撤回同意），可通过公司规定的注销申请表提交邮件至客户服务中心，或通过移动应用进行在线申请。</li>
                        <li>c. 除此之外，用户可通过书面或电子邮件方式联系客户服务中心或个人信息负责人，公司将立即采取措施。</li>
                        <li>d. 若用户请求更正个人信息中的错误，公司在完成更正之前不会使用或提供该信息。此外，如该错误信息已提供给第三方，公司将立即通知第三方进行更正。</li>
                        <li>e. 公司根据“5.个人信息的保存及使用期限”规定处理因用户或法定代理人请求注销或删除的个人信息，并确保其不会被用于其他用途或访问。</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>15. 个人信息自动收集装置的安装、运行及拒绝</p>
                    <ul>
                        <li>公司为了向用户提供定制服务，使用“Cookie（小型文本文件）”。Cookie是运行网站的服务器（HTTP）向用户的计算机浏览器发送的少量信息，并可能存储于用户计算机硬盘中。</li>
                        <li>
                            a. Cookie的使用目的<br>
                            用于向用户提供便利功能，并不会用于恶意用途。
                        </li>
                        <li>
                            b. Cookie的安装/运行及拒绝
                            <ul class="style-list insert-ver">
                                <li>用户可选择是否允许安装Cookie。因此，用户可在网页浏览器的选项中设置为允许所有Cookie、在保存Cookie时进行确认，或拒绝所有Cookie的存储。</li>
                                <li>拒绝存储Cookie的方法如下：用户可在所使用的网页浏览器选项中选择允许所有Cookie、在保存Cookie时进行确认，或拒绝所有Cookie存储。</li>
                                <li>设置方法示例（以Internet Explorer为例）：浏览器顶部菜单 -> 工具 -> Internet选项 -> 隐私</li>
                                <li>但如果拒绝存储Cookie，可能会影响使用服务的便利性。</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>16. 个人信息管理负责人及联系信息</p>
                    <ul>
                        <li>用户可就使用公司服务过程中发生的所有个人信息保护相关问题，向个人信息管理负责人或相关部门投诉。公司将迅速提供充分的答复。</li>
                        <li>
                            个人信息管理负责人<br/>
                            姓名：Choi Joong-Bae<br/>
                            电话：02-6269-0630<br/>
                            电子邮件：prokidsbook@iea.co.kr
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>17. 通知义务</p>
                    <ul>
                        <li>本个人信息处理方针若有新增、删除或修改内容，公司将在正式生效前至少7天通过移动应用或网站的“公告事项”栏目进行通知。</li>
                    </ul>
                </div>
            </div>
`
const PPH_EN = `
            <div class="inner-wrap scroll-ver">
                <div class="info-box">
                    <p>IEA CO., LTD. complies with applicable privacy protection regulations, including the Personal Information Protection Act and the Act on Promotion of Information and Communications Network Utilization and Information Protection. As a provider of information and communication services, the company adheres to relevant laws and has established this Privacy Policy to safeguard user rights. The company’s Privacy Policy includes the following provisions:</p>
                    <ul class="style-list">
                      <li>Collected User Information</li>
                      <li>Purpose of Collecting and Using Personal Information</li>
                      <li>Methods of Collecting Personal Information</li>
                      <li>Outsourcing of Personal Information Processing</li>
                      <li>Retention and Use Period of Personal Information</li>
                      <li>Procedure and Method of Personal Information Destruction</li>
                      <li>Accuracy of User Personal Information</li>
                      <li>Temporary Suspension of Services for Personal Information Security</li>
                      <li>Sharing and Provision of Personal Information to Third Parties</li>
                      <li>Confidentiality of User Personal Information</li>
                      <li>User Guidelines for Protecting Personal Information</li>
                      <li>Handling of Unnoticed Personal Information Use and User Complaints</li>
                      <li>Restrictions on Personal Information Handlers</li>
                      <li>Rights of Users and Legal Representatives & How to Exercise Them</li>
                      <li>Use and Rejection of Cookies (Automatic Data Collection Devices)</li>
                      <li>Personal Information Manager & Contact Information</li>
                      <li>Notification Obligation</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>1. Collected User Information</p>
                    <ul class="text-list">
                        <li>
                            A. Types of Collected Personal Information
                            <ul class="sub-list text-ver">
                                <li>
                                    <p>[ During Membership Registration ]</p>
                                    <span>Name, Date of Birth, Mobile Phone Number, Email Address, Password, Device Information (including Telecom Provider Name, Device Information such as ADID and IDFA, IP Address of the Access Device, and Cookies).</span>
                                </li>
                                <li>
                                    <p>[ During Service Use ]</p>
                                    <span>User ID, Photos, Voice Data, User’s Play Data, Password, Mobile Phone Number, Email Address, Kakao Account Information, Google Account Information, Encrypted User Identification Value (CI), Business Registration Number, Company Name, Representative’s Name, Service Usage Records, Access Logs, Cookies, IP Address, Payment Records, and any other personal information entered directly by users for service use.</span>
                                </li>
                                <li>
                                    <p>[ For Paid Service Payments ]</p>
                                    <span>Credit/Debit Card Company Name, Credit/Debit Card Number, Payment Authorization Number, Bank Name, and Account Number.</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            B. Methods of Collecting Personal Information
                            <p>The company collects personal information through the following methods:</p>
                            <ul class="style-list">
                                <li>Mobile applications, websites, written forms, faxes, phone calls, customer service boards, emails, and event participation.</li>
                                <li>Information collected through joint partnerships and collaborations with affiliated companies.</li>
                                <li>Information collected via automated tools for generating user data.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>2. Purpose of Collecting and Using Personal Information</p>
                    <ul class="text-list">
                        <li>
                            A. Fulfillment of Service Contracts and Payment Processing
                            <ul class="sub-list dot-ver">
                                <li>Providing content, offering personalized services, verifying user identity, processing content purchases and payments, and collecting fees.</li>
                            </ul>
                        </li>
                        <li>
                          B. User Management
                            <ul class="sub-list dot-ver">
                                <li>User authentication for service applications, personal identification, prevention of fraudulent use (e.g., users who violate the Terms of Service or fail to fulfill obligations), limiting repeated service applications, record-keeping for dispute resolution, handling complaints, and delivering notifications.</li>
                            </ul>
                        </li>
                        <li>
                            C. Development of New Services, Marketing, and Advertising
                            <ul class="sub-list dot-ver">
                                <li>Developing new services and authentication features, providing personalized services, delivering advertisements based on statistical characteristics, offering promotional opportunities, analyzing access frequency, and verifying service effectiveness.</li>
                            </ul>
                        </li>
                        <li>
                            D. Purpose of collecting user facial photos
                            <ul class="sub-list dot-ver">
                                <li> Facial images are used to provide AI image generation functions and are collected with user consent. Facial images are deleted immediately after the image generation task is completed and are not stored separately. Collected facial images are not used for AI model training or other purposes and are only utilized to perform the image generation requested by the user.</li>
                            </ul>
                        </li>                        
                    </ul>
                </div>
                <div class="info-box">
                    <p>3. Methods of Collecting Personal Information</p>
                    <ul class="text-list">
                        <li>A. Collection Through Voluntary Submission by Users Personal information is collected when users voluntarily provide it during service registration or use.</li>
                        <li>B. Automatic Collection During Service Use
                        Personal information may be automatically collected when users execute or use the services provided by the company.</li>
                        <li>All users must provide their personal information to receive services from the company. Such information is collected with the user's consent through the application form at the time of service registration.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>4. Outsourcing of Personal Information Processing</p>
                    <ul class="text-list">
                        <li>The company may outsource the processing of users' personal information to external parties to enhance service quality.</li>
                        <li>A. Notification of Outsourcing : If personal information processing is outsourced, users will be notified in advance.</li>
                        <li>B. Safeguards in Outsourcing Contracts : When outsourcing personal information processing, the company will establish clear contractual terms regarding the service provider’s obligations to protect personal information, maintain confidentiality, prohibit third-party disclosure, and assume liability in case of accidents. These contract details will be documented in written or electronic form and retained.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>5. Retention and Use Period of Personal Information</p>
                    <ul class="text-list">
                        <li>The company will promptly destroy users' personal information once membership is withdrawn or when the purpose of collecting and using the information has been achieved. However, personal information may be retained in the following cases:</li>
                        <li>
                            1) Retention and Use Period of Facial Images
                            <ul class="sub-list dot-ver">
                                <li>Facial images are retained for no longer than 30 seconds solely to generate images. After the image generation is completed, the facial images are automatically deleted and are not stored separately.</li>
                            </ul>
                        </li>
                        <li>
                            2) Retention Based on Internal Policy : To prevent re-registration by banned users, prevent fraudulent use, and respond to customer inquiries and complaints:
                            <ul class="sub-list dot-ver">
                                <li>
                                    <em>Retention Period:</em>
                                    (To prevent re-registration of withdrawn users) 7 days after withdrawal.
                                    (For responding to fraudulent use and violations of terms) Until disputes regarding such violations are resolved. If disputes remain unresolved, they will be handled according to applicable legal procedures.
                                    (For responding to inquiries and complaints) Until the inquiry or complaint is resolved.
                                </li>
                                <li>
                                    <em>Retained Information:</em>
                                    Email address (ID), mobile phone number, nickname, name, identification information for preventing duplicate or fraudulent registrations (e.g., user photo, account information, device information), registration date, withdrawal date, approval date, records of inquiries, complaints, or violations.
                                </li>
                            </ul>
                        </li>
                        <li>
                            3) Retention Based on User Request or Additional Consent
                            <ul class="sub-list dot-ver">
                                <li>
                                    <em>Retention Period and Information:</em> Personal information will be retained for the requested period if explicitly requested by the user or agreed upon separately.
                                </li>
                            </ul>
                        </li>
                        <li>
                            4) Retention Required by Law : Personal information will be retained without user consent in accordance with applicable laws, including the Act on Consumer Protection in Electronic Commerce, etc., as follows.
                            <ul class="sub-list insert-ver">
                                <li>a. Records related to contracts, withdrawal of offers, and service usage history: 5 years 
(For these records, only the minimum required identification data, such as email address (ID) and mobile phone number, will be retained, while other personal information will be deleted within 30 days after withdrawal.)</li>
                                <li>b. Records related to payment and supply of goods/services: 5 years</li>
                                <li>c. Records related to consumer complaints or dispute resolution: 5 years 
(For these records, only the minimum required identification data, such as email address (ID) and mobile phone number, will be retained, while other personal information will be deleted within 7 days after withdrawal.)</li>
                                <li>d. Records related to website visits: 3 months</li>
                                <li>e. Any other personal information not covered above: Deleted within 30 days after withdrawal.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>6. Procedure and Method of Personal Information Destruction</p>
                    <ul>
                        <li>IEA CO., LTD. promptly destroys personal information when the retention period expires or when the purpose of collection and use has been fulfilled. The procedures and methods for the destruction of personal information are as follows:</li>
                        <li>
                            A. Destruction Procedure
                            <ul class="sub-list dot-ver">
                                <li>Information entered by users during service registration or use is transferred to a separate database (or a locked storage cabinet in the case of paper records) after its purpose has been achieved. It is then stored for a certain period as required by internal policies and relevant legal provisions (refer to the retention period) before being destroyed.</li>
                                <li>Such information is not used for any other purpose except as required by law.</li>
                            </ul>
                        </li>
                        <li>
                            B. Destruction Method
                            <ul class="sub-list dot-ver">
                                <li>Personal information printed on paper is shredded or incinerated.</li>
                                <li>Personal information stored in electronic files is deleted using technical methods that render the data unrecoverable.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>7. Accuracy of User Personal Information</p>
                    <ul>
                        <li>To minimize user inconvenience caused by inaccurate personal information, if the company determines that the provided information is clearly incorrect, the inaccurate personal information may be deleted.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>8. Temporary Suspension of Services for Personal Information Security</p>
                    <ul>
                        <li>The company makes every effort to ensure the safe use of its services. However, if the service is compromised by unauthorized means, the company may temporarily suspend services that use personal information until the issue is completely resolved.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>9. Sharing and Provision of Personal Information to Third Parties</p>
                    <ul>
                        <li>
                            The company does not use or provide personal information beyond the scope explicitly stated in this policy, except in the following cases:
                            <br>
                            When the user has given explicit consent.<br>
                            When required by law or when special provisions in the law apply.
                        </li>
                        <li>
                             In accordance with Article 24-2 of the Act on Promotion of Information and Communications Network Utilization and Information Protection (Consent for Providing Personal Information) and Article 59 of the Personal Information Protection Act (Prohibited Acts), any individual handling personal information for or on behalf of the company is prohibited from:
                        </li>
                        <li>A. Acquiring or obtaining consent for processing personal information through false or fraudulent means.</li>
                        <li>B. Disclosing personal information obtained in the course of duty or providing it to unauthorized individuals.</li>
                        <li>C. Destroying, altering, falsifying, or leaking another person’s personal information without proper authorization or beyond the permitted scope.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>10. Confidentiality of User Personal Information</p>
                    <ul>
                        <li>
                        The company strictly maintains the confidentiality of users' personal information and does not disclose it to third parties without user consent. Even when users provide consent, the company does not share their information with third parties who pose a risk of further unauthorized disclosure.
                        The company does not provide user information to government agencies unilaterally. User information will only be provided if a government agency formally requests it through legally established procedures.
                        The company uses personal information solely for its basic services and related activities. If user information is required for other activities, the company will obtain separate consent through a specific form before using the information.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>11. User Guidelines for Protecting Personal Information</p>
                    <ul>
                        <li>
                        When using PROKIDSBOOK in public places such as internet cafés or via public Wi-Fi, users should ensure that there are no hacking or malicious programs. While the company makes every effort to protect personal information, it is not responsible for incidents resulting from user negligence or internet-related issues.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>12. Handling of Unnoticed Personal Information Use and User Complaints</p>
                    <ul>
                        <li>
                        The company assigns a dedicated manager to handle user complaints and any unauthorized use of personal information. The company ensures prompt and continuous resolution of user complaints and provides immediate responses to processed results.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>13. Restrictions on Personal Information Handlers</p>
                    <ul>
                        <li>
                        The company limits the number of employees who handle personal information to designated personnel only.
                        </li>
                        <li>These personnel are assigned unique passwords that are regularly updated.</li>
                        <li>Access to administrator pages for handling personal information requires two-factor authentication and firewall installation.</li>
                        <li>Regular training sessions are conducted to reinforce compliance with the privacy policy.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>14. Rights of Users and Legal Representatives & How to Exercise Them</p>
                    <ul>
                        <li>A. Rights of Users and Legal Representatives Users and their legal representatives may, at any time, request to view or delete their personal information.</li>
                        <li>B. Requesting to View or Modify Personal Information <br>
                            Users can directly modify their information via the mobile app or website.<br>
                            Alternatively, users may request modifications by contacting the customer service center or the designated administrator via email.
                        </li>
                        <li>C. Account Termination (Withdrawal of Consent)<br>
                            Users may terminate their service agreement and withdraw their membership by submitting a request via the designated withdrawal application form, available through email or the online withdrawal option in the mobile app.
                        </li>
                        <li>D. Additional Request Methods<br>
                        Users may also submit a written or email request to the customer service center or the privacy officer.<br>
                        If a user requests a correction of inaccurate personal information, the company will not use or provide the information until the correction is completed.<br>
                        If incorrect information has already been shared with third parties, the company will promptly notify them to ensure corrections are made.
                        </li>
                        <li>E. Data Deletion<br>
                        Personal information deleted at the request of users or legal representatives will be processed in accordance with Section 5: Retention and Use Period of Personal Information and will no longer be accessible for any purpose.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>15. Use and Rejection of Cookies (Automatic Data Collection Devices)</p>
                    <ul>
                        <li>The company uses cookies to provide personalized services by storing and retrieving user data. Cookies are small pieces of data sent by the web server to the user's browser and stored on the user’s device.</li>
                        <li>
                            A. Purpose of Using Cookies<br>
                            Cookies are used solely to provide convenient user experiences and are not used for any harmful purposes.
                        </li>
                        <li>
                            B. Cookie Settings and Rejection
                            <ul class="style-list insert-ver">
                                <li>Users have the option to accept, confirm before storing, or reject all cookies through their web browser settings.</li>
                                <li>Users can modify their cookie preferences in their browser settings: Example (for Internet Explorer): Go to Tools → Internet Options → Privacy</li>
                                <li>Disabling cookies may limit some functionalities of the service.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>16. Personal Information Manager & Contact Information</p>
                    <ul>
                        <li>Users may report all personal information-related complaints to the designated privacy officer or department. The company ensures prompt and sufficient responses to user inquiries.</li>
                        <li>
                            Position: Head of Business Operations<br/>
                            Name: Joong-bae Choi<br/>
                            Phone: +82-2-6269-0630<br/>
                            Email: prokidsbook@iea.co.kr
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>17. Notification Obligation</p>
                    <ul>
                        <li>Any additions, deletions, or modifications to this privacy policy will be announced at least seven (7) days in advance via the mobile app or website under the ‘Notices’ section.</li>
                    </ul>
                </div>
            </div>
`
const PPH_JP = `
       <div class="inner-wrap scroll-ver">
                <div class="info-box">
                    <p>IEA CO., LTD.（以下、「当社」といいます。）は、「個人情報の保護に関する法律」（以下、「個人情報保護法」）、「電気通信事業法」、「消費者契約法」などの関連法令を遵守し、個人情報保護に関する適切な措置を講じることにより、利用者の権益保護に努めております。本プライバシーポリシーは、当社の個人情報の取り扱いに関する以下の内容を含んでいます。</p>
                    <ul class="style-list">
                      <li>収集する個人情報</li>
                      <li>個人情報の収集および利用目的</li>
                      <li>個人情報の収集方法</li>
                      <li>個人情報の取扱いの委託</li>
                      <li>個人情報の保管および利用期間</li>
                      <li>個人情報の廃棄手続きおよび方法</li>
                      <li>利用者の個人情報の正確性確保に関する内容</li>
                      <li>利用者の個人情報の安全のために取られる可能性のあるサービス一時停止措置</li>
                      <li>第三者との情報共有および提供に関する内容</li>
                      <li>利用者の個人情報の機密保持に関する内容</li>
                      <li>利用者が自身の個人情報を保護するために知っておくべき事項</li>
                      <li>当社が認識していない個人情報の利用および苦情対応に関する処理</li>
                      <li>個人情報取扱者の制限に関する内容</li>
                      <li>利用者および法定代理人の権利とその行使方法</li>
                      <li>個人情報の自動収集装置の設置・運用および拒否に関する事項</li>
                      <li>国外への個人情報移転（外国第三者提供）について</li>
                      <li>個人情報管理責任者および担当者の連絡先</li>
                      <li>通知義務</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>1. 収集する個人情報</p>
                    <ul class="text-list">
                        <li>
                            1) 収集する個人情報の項目
                            <ul class="sub-list text-ver">
                                <li>
                                    <p>[ 会員登録時 ]</p>
                                    <span>氏名、生年月日、携帯電話番号、メールアドレス、パスワード、端末情報（通信事業者名、接続端末情報（ADIDおよびIDFAを含む）、接続端末のIPアドレス、クッキー）</span>
                                </li>
                                <li>
                                    <p>[ サービス利用時 ]</p>
                                    <span>ユーザーID、写真、音声データ、プレイデータ、パスワード、携帯電話番号、メールアドレス、 Kakaoアカウント情報、Googleアカウント情報、暗号化された利用者識別情報（CI）、Googleアカウント情報、事業者登録番号、商号、代表者名、サービス利用履歴、アクセスログ、クッキー、アクセスIP情報、決済履歴など、利用者がサービス利用のために直接入力する個人情報</span>
                                </li>
                                <li>
                                    <p>[ 有料サービス決済時 ]</p>
                                    <span>クレジット/デビットカード会社名、クレジット/デビットカード番号、決済承認番号、銀行名、口座番号</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            (2) 個人情報の収集方法
                            <p>当社は、以下の方法で個人情報を収集しております。</p>
                            <ul class="style-list">
                                <li>モバイルアプリ、ウェブサイト、書面フォーム、FAX、電話、相談掲示板、Eメール、イベント応募</li>
                                <li>提携企業からの共同提携および協力による情報収集</li>
                                <li>生成情報収集ツールを活用した情報収集</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>2. 個人情報の収集および利用目的</p>
                    <ul class="text-list">
                        <li>
                            (1) サービス提供に関する契約履行および料金精算に利用
                            <ul class="sub-list dot-ver">
                                <li>コンテンツ提供、特定のカスタマイズサービス提供、本人認証、コンテンツ購入および料金決済、料金請求</li>
                            </ul>
                        </li>
                        <li>
                            (2) 利用者管理のための一部情報活用
                            <ul class="sub-list dot-ver">
                                <li>サービス利用申請時の本人確認、個人識別</li>
                                <li>利用規約違反者（誠実に履行しない利用者を含む）の不正利用防止および未承認使用の防止</li>
                                <li>サービス利用申請回数の制限、紛争調整のための記録保存</li>
                                <li>苦情処理およびカスタマーサポート、通知事項の伝達</li>
                            </ul>
                        </li>
                        <li>
                            (3) 新規サービス開発およびマーケティング、広告への活用
                            <ul class="sub-list dot-ver">
                              <li>新規サービス開発および認証サービス</li>
                              <li>カスタマイズサービスの提供</li>
                              <li>統計学的特性に基づくサービス提供および広告掲載</li>
                              <li>イベントおよび広告情報提供および参加機会の提供</li>
                              <li>アクセス頻度の分析、利用者のサービス利用に関する統計、サービスの有効性確認</li>
                            </ul>
                        </li>
                        <li>
                            (4) ユーザーの顔写真収集目的
                            <ul class="sub-list dot-ver">
                              <li>顔画像はAI画像生成機能を提供するために使用され、ユーザーの同意のもと収集されます。顔画像は画像生成作業完了後に直ちに削除され、別途保存されることはありません。収集された顔画像はAIモデルの学習やその他の目的には使用されず、ユーザーが依頼した画像生成作業のみに利用されます。</li>
                            </ul>
                        </li>                        
                    </ul>
                </div>
                <div class="info-box">
                    <p>3. 個人情報の収集方法</p>
                    <ul class="text-list">
                        <li>(1) サービス登録または利用中に利用者が自発的に提供する情報の収集 : 利用者が当社のサービスを利用する際に、自ら入力または提供した情報を収集</li>
                        <li>(2) 会社が提供するサービスを実行または使用することによる自動収集 : 当社のウェブサイトやアプリの使用を通じて、アクセスログ、デバイス情報、利用履歴などの情報を自動的に収集</li>
                        <li>当社のサービスを利用するためには、利用者の個人情報の提供が必要となり、サービス利用申請時に申請フォームを通じて利用者の同意を得た上で個人情報を収集します。</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>4. 個人情報の取扱いの委託</p>
                    <ul class="text-list">
                        <li>当社は、サービスの向上を目的として、利用者の個人情報の取り扱いを外部に委託する場合があります。</li>
                        <li>(1) 個人情報の取り扱いを委託する場合、事前にその事実を利用者に通知いたします。</li>
                        <li>(2) 個人情報の取り扱いを委託する場合、委託契約を締結し、以下の内容を明確に規定した上で、契約内容を文書または電子的に保管します。<br>
                        個人情報の取り扱いに関する指示業務<br>
                        個人情報の機密保持義務<br>
                        第三者への提供禁止<br>
                        事故発生時の責任分担
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>5. 個人情報の保管および利用期間ㅊ</p>
                    <ul class="text-list">
                        <li>当社は、会員の退会、または個人情報の収集および利用目的が達成された場合、会員の個人情報を遅滞なく破棄します。ただし、以下の事由および期間に限り、例外的に個人情報を保有します。</li>
                        <li>
                            (1) 顔画像の保有および利用期間
                            <ul class="sub-list dot-ver">
                                <li>顔画像は画像生成のために30秒以内に保管され、画像生</li>
                            </ul>
                        </li>                       
                        <li>
                            (2) 会社の内部方針による場合 : 不正利用者の再登録防止、不正利用防止、その他の苦情対応および問い合わせへの対応
                            <ul class="sub-list dot-ver">
                                <li>
                                    <em>保有期間:</em>
                                    (一般会員の退会後、再登録を防ぐため) 退会後30日間<br>
                                    (不正利用および利用規約違反への対応を目的とする場合) 不正利用および違反事項に関する紛争解決が完了するまで 
                                    紛争解決が円滑に進まない場合、関連法令に基づく紛争調整手続きに従います。<br>
                                    (苦情またはサービスに関する問い合わせ対応の場合) 該当する問い合わせや苦情が解決されるまで
                                </li>
                                <li>
                                    <em>保有情報:</em>
                                    メールアドレス（ID）、携帯電話番号、ニックネーム、氏名、重複登録または不正登録防止のための識別情報（ユーザー写真、アカウント情報、端末情報など）、重複登録確認情報、登録日、退会日、承認日、該当苦情/問い合わせの内容、不正利用・規約違反行為の記録
                                </li>
                            </ul>
                        </li>
                        <li>
                            (3) 会員が個人情報の保管を希望した場合、または会社が個別に同意を得た場合
                            <ul class="sub-list dot-ver">
                                <li>
                                    <em>保有期間および保有情報:</em> 会員の要請または同意を得た範囲・期間に限り保有
                                </li>
                            </ul>
                        </li>
                        <li>
                        (4) 法令に基づき、利用者の同意なしに保存が求められる場合以下の法令に基づき、一定期間保管・管理します（「電子商取引等における消費者保護に関する法律」など）。
                            <ul class="sub-list insert-ver">
                                <li>① 契約、申込撤回、サービス利用履歴などの取引関連記録：5年間(この記録に該当する情報のうち、利用者識別のためのデータは、最低限の情報であるメールアドレス（ID）および携帯電話番号のみを保管し、その他の個人情報は以下「⑤」の規定に基づき退会後30日以内に全て破棄)</li>
                                <li>② 料金決済および商品の提供に関する記録：5年間</li>
                                <li>③ 消費者の苦情および紛争処理に関する記録：5年間(この記録に該当する情報のうち、利用者識別のためのデータは、最低限の情報であるメールアドレス（ID）および携帯電話番号のみを保管し、その他の個人情報は以下「⑤」の規定に基づき退会後7日以内に全て破棄)</li>
                                <li>④ サイト訪問履歴に関する記録：3ヶ月</li>
                                <li>⑤ 上記「①」～「④」に該当しない、会員登録時に入力された全ての個人情報 : 退会申請後30日以内に削除</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>6. 個人情報の廃棄手続きおよび方法</p>
                    <ul>
                        <li>
                        当社は、個人情報の保有期間が満了した場合、または個人情報の収集および利用目的が達成されるなど、個人情報が不要になった際には、遅滞なく破棄 いたします。当社の個人情報の破棄手続きおよび方法は以下のとおりです。
                        </li>
                        <li>
                            (1) 破棄手続き
                            <ul class="sub-list dot-ver">
                                <li>利用者がサービス申請などのために入力した情報は、目的が達成された後、別途データベース(DB)に移動され（書類の場合、施錠された保管庫に保存）、社内ポリシーおよび関連法令に基づく情報保護のために一定期間保存された後、破棄 されます。</li>
                                <li>当該個人情報は、法令で定められた場合を除き、保管目的以外の用途には利用されません。</li>
                            </ul>
                        </li>
                        <li>
                            (2) 破棄方法
                            <ul class="sub-list dot-ver">
                                <li>紙に印刷された個人情報：シュレッダーで裁断、または焼却により破棄</li>
                                <li>電子ファイル形式で保存された個人情報：復元不可能な技術的手法を用いて完全に削除</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>7. 利用者の個人情報の正確性確保に関する内容</p>
                    <ul>
                        <li>
                        利用者が不正確な個人情報を提供した場合、サービスの利用に不便が生じる可能性があります。そのため、個人情報管理者が明らかに不正確な情報であると判断した場合、当該個人情報を削除することがあります。
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>8. 利用者の個人情報の安全のために取られる可能性のあるサービス一時停止措置</p>
                    <ul>
                        <li>当社は、利用者が安全にサービスを利用できるよう、最善を尽くしています。しかし、予期しない方法で当社のサービスが侵害された場合、利用者の個人情報を保護するため、問題が完全に解決するまで個人情報を利用したサービスを一時的に停止することがあります。</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>9. 第三者との情報共有および提供に関する内容</p>
                    <ul>
                        <li>当社は、利用者の同意がある場合、または法令に特別な規定がある場合を除き、事前に通知または明示した範囲を超えて個人情報を利用、または第三者に提供することはありません。また、当社のサービス提供のために個人情報を取り扱う者、または過去に取り扱った者は、以下の行為を禁止します。</li>
                        <li>a. 虚偽またはその他の不正な手段・方法により個人情報を取得したり、処理の同意を得る行為</li>
                        <li>b. 業務上知り得た個人情報を漏洩したり、権限なく他者が利用できるように提供する行為</li>
                        <li>c. 正当な権限なしに、または許可された権限を超えて、他者の個人情報を破損、毀損、改ざん、偽造、または流出させる行為</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>10. 利用者の個人情報の機密保持に関する内容</p>
                    <ul>
                        <li>
                       当社は、利用者の同意なしに第三者へ個人情報を開示または漏洩することはありません。また、利用者が同意した場合であっても、第三者を通じて再流出の可能性がある相手には個人情報を提供しません。
当社は、各種政府機関からの利用者個人情報の一方的な提供要求には応じません。ただし、法令に基づく政府機関が、法令に定められた正式な手続きを完全に経た場合に限り、利用者の個人情報を提供します。
当社は、利用者の個人情報を、当社が定めた基本サービスおよびその他のサービス活動以外の目的で利用しません。上記の活動において利用者の情報が必要な場合は、別途専用のフォームを通じて情報を収集し、利用者の同意を得た上で使用 します。
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>11. 利用者が自身の個人情報を保護するために知っておくべき事項</p>
                    <ul>
                        <li>
PCカフェや公衆Wi-Fiなど、外部環境で「プロキッズブック」を利用する際には、不正プログラムやウイルスに注意 してご利用ください。当社は個人情報の保護に最善を尽くしますが、利用者自身の過失やインターネット環境の問題による個人情報漏洩については責任を負いかねます。
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>12. 当社が認識していない個人情報の利用および苦情対応に関する処理</p>
                    <ul>
                        <li>
当社は、当社が認識していない利用者の個人情報の利用やその他の苦情事項について、苦情処理を担当する管理者を配置し、継続的かつ迅速に対応 します。また、処理結果については、速やかに利用者へ通知いたします。
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>13. 個人情報取扱者の制限に関する内容</p>
                    <ul>
                        <li>
当社の個人情報を取り扱う従業員は、担当者に限定 されており、専用のパスワードを付与し、定期的に更新しています。
また、個人情報管理ページへのアクセスには、二段階認証の義務付けやファイアウォールの設置 などのセキュリティ対策を施しております。さらに、定期的な教育を実施し、個人情報保護方針の遵守を徹底しています。
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>14. 利用者および法定代理人の権利とその行使方法</p>
                    <ul>
                        <li>(1) 利用者および法定代理人の権利 : 利用者および法定代理人は、いつでも自身の個人情報を閲覧、または利用停止を要求することができます。</li>
                        <li>(2) 個人情報の閲覧・修正・削除申請方法 : <br>
                        利用者は、モバイルアプリまたはウェブサイトを通じて 自身の個人情報を直接修正できます。br>
                        または、カスタマーセンターまたは担当者にEメール等で申請 することも可能です。br>
                        利用停止（同意撤回）を希望する場合、当社が定めた退会申請フォームに従い、カスタマーセンターへEメール問い合わせを行うか、モバイルアプリ上でオンライン申請を行うことで、契約解約および退会が可能です。
                        </li>
                        <li>(3) その他の問い合わせ方法<br>
                        上記以外にも、カスタマーセンターまたは個人情報管理責任者に書面またはEメールで連絡いただければ、速やかに対応 いたします。
                        </li>
                        <li>(4) 個人情報の訂正要求<br>
                        利用者が個人情報の誤りを修正するよう要求した場合、修正が完了するまで該当個人情報の利用または提供を行いません。<br>
                        また、既に第三者に提供した個人情報に誤りがあった場合、訂正結果を速やかに第三者へ通知し、修正が完了するよう対応いたします。
                        </li>
                        <li>(5) 退会または削除された個人情報の取り扱い<br>
                        当社は、利用者または法定代理人の要求により解約または削除された個人情報を、「5. 個人情報の保有および利用期間」に基づき適切に処理し、それ以外の目的で閲覧または利用できないよう措置いたします。
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>15. 個人情報の自動収集装置の設置・運用および拒否に関する事項</p>
                    <ul>
                        <li>当社は、利用者に特化したカスタマイズサービスを提供するために、利用者の情報を保存し、随時取得する「クッキー（cookie）」を使用します。クッキーとは、ウェブサイトを運営するためにサーバー（HTTP）が利用者のコンピュータのブラウザに送信する少量の情報であり、利用者のPCのハードディスクに保存される場合もあります。</li>
                        <li>
                            (1) クッキーの利用目的<br>
                            クッキーは、利用者に便利な機能を提供するために活用され、悪意のある目的では使用されません。
                        </li>
                        <li>
                           2) クッキーの設定・運用および拒否方法
                            <ul class="style-list insert-ver">
                                <li>利用者はクッキーの設定に関して選択権を有します。したがって、利用者はウェブブラウザのオプションを設定することにより、すべてのクッキーを許可するか、クッキーが保存されるたびに確認するか、またはすべてのクッキーの保存を拒否することができます。</li>
                                <li>クッキー設定を拒否する方法として、利用者が使用するウェブブラウザのオプションを選択し、すべてのクッキーを許可するか、クッキーが保存されるたびに確認するか、すべてのクッキーの保存を拒否することが可能です。</li>
                                <li>設定方法の例（Internet Explorerの場合）：ウェブブラウザの上部メニュー「ツール」>「インターネットオプション」>「プライバシー」</li>
                                <li>ただし、クッキーの保存を拒否した場合、一部のサービスが利用できなくなる場合があります。</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>16. 個人情報管理責任者および担当者の連絡先</p>
                    <ul>
                        <li>利用者は、当社のサービス利用に関して発生したすべての個人情報保護に関する苦情やお問い合わせを、個人情報管理責任者または担当部署へ報告することができます。当社は、利用者からの報告事項について迅速かつ適切な回答を提供いたします。</li>
                        <li>
                            個人情報管理責任者<br/>
                            氏名 : Choi Joong-bae<br/>
                            電話番号：+82-2-6269-0630<br/>
                            メール：prokidsbook@iea.co.kr
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>17. 通知義務</p>
                    <ul>
                        <li>本プライバシーポリシーの内容追加、削除、および修正が行われる場合、改定日の少なくとも7日前までに、モバイルアプリまたはウェブサイトの「お知らせ」メニュー等を通じて通知いたします。</li>
                    </ul>
                </div>
            </div>
`
const PPH_VN = `
<div class="inner-wrap scroll-ver">
                <div class="info-box">
                    <p>IEA CO., LTD. tuân thủ các quy định về bảo vệ thông tin cá nhân theo Luật Bảo vệ Thông tin Cá nhân, Luật Thúc đẩy Sử dụng Mạng Thông tin và Bảo vệ Thông tin, cùng các quy định pháp luật liên quan dành cho nhà cung cấp dịch vụ thông tin truyền thông. Công ty đặt ra Chính sách xử lý thông tin cá nhân dựa theo các quy định pháp luật nhằm bảo vệ tối đa quyền lợi của người dùng. Chính sách xử lý thông tin cá nhân của công ty bao gồm các nội dung sau.</p>
                    <ul class="style-list">
                      <li>Thông tin cá nhân được thu thập từ người dùng</li>
                      <li>Mục đích thu thập và sử dụng thông tin cá nhân</li>
                      <li>Phương thức thu thập thông tin cá nhân</li>
                      <li>Ủy thác xử lý thông tin cá nhân</li>
                      <li>Thời gian lưu trữ và sử dụng thông tin cá nhân</li>
                      <li>Quy trình và phương pháp hủy bỏ thông tin cá nhân</li>
                      <li>Nội dung đảm bảo tính chính xác của thông tin cá nhân người dùng</li>
                      <li>Các biện pháp có thể được thực hiện để tạm ngừng dịch vụ nhằm bảo vệ an toàn thông tin cá nhân của người dùng</li>
                      <li>Chia sẻ và cung cấp thông tin cá nhân với bên thứ ba</li>
                      <li>Nội dung liên quan đến việc giữ bí mật thông tin cá nhân của người dùng</li>
                      <li>Những điều người dùng cần biết để bảo vệ thông tin cá nhân của mình</li>
                      <li>Xử lý thông tin cá nhân chưa được xác định và các khiếu nại khác</li>
                      <li>Hạn chế đối với nhân viên xử lý thông tin cá nhân</li>
                      <li>Quyền của người dùng và người đại diện pháp lý, cũng như phương thức thực hiện</li>
                      <li>Cài đặt, vận hành và từ chối thiết bị thu thập thông tin cá nhân tự động</li>
                      <li>Người chịu trách nhiệm quản lý thông tin cá nhân và thông tin liên hệ</li>
                      <li>Nghĩa vụ thông báo</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>1. Thông tin cá nhân được thu thập từ người dùng</p>
                    <ul class="text-list">
                        <li>
                            a. Các hạng mục thông tin cá nhân được thu thập
                            <ul class="sub-list text-ver">
                                <li>
                                    <p>[ Khi đăng ký thành viên ]</p>
                                    <span>Họ tên, ngày sinh, số điện thoại di động, địa chỉ email, mật khẩu, thông tin thiết bị (tên nhà mạng sử dụng, thông tin thiết bị truy cập (bao gồm ADID và IDFA), địa chỉ IP của thiết bị truy cập, Cookies)</span>
                                </li>
                                <li>
                                    <p>[ Khi sử dụng dịch vụ ]</p>
                                    <span>ID người dùng, ảnh, dữ liệu giọng nói, dữ liệu trò chơi của người dùng, mật khẩu, số điện thoại di động, địa chỉ email, thông tin tài khoản Kakao, thông tin tài khoản Google, giá trị xác thực người dùng được mã hóa (CI), thông tin tài khoản Google, số đăng ký doanh nghiệp, tên thương hiệu, tên đại diện pháp lý, lịch sử sử dụng dịch vụ, nhật ký truy cập, Cookies, thông tin IP truy cập, lịch sử thanh toán và các thông tin cá nhân khác mà người dùng trực tiếp nhập vào để sử dụng dịch vụ.</span>
                                </li>
                                <li>
                                    <p>[ Khi thanh toán dịch vụ trả phí ]</p>
                                    <span>Tên công ty phát hành thẻ tín dụng/thẻ ghi nợ, số thẻ tín dụng/thẻ ghi nợ, mã phê duyệt thanh toán, tên ngân hàng, số tài khoản</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            b. Phương thức thu thập thông tin cá nhân
                            <p>Công ty thu thập thông tin cá nhân thông qua các phương thức sau.</p>
                            <ul class="style-list">
                                <li>Ứng dụng di động, trang web, biểu mẫu giấy, fax, điện thoại, bảng tư vấn, email, đăng ký sự kiện</li>
                                <li>Thu thập thông tin từ các đối tác hợp tác liên doanh</li>
                                <li>Thu thập thông tin thông qua công cụ thu thập dữ liệu được tạo ra</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>2. Mục đích thu thập và sử dụng thông tin cá nhân</p>
                    <ul class="text-list">
                        <li>
                           a. Thực hiện hợp đồng cung cấp dịch vụ và tính toán phí sử dụng dịch vụ.
                            <ul class="sub-list dot-ver">
                                <li>Cung cấp nội dung, cung cấp dịch vụ tùy chỉnh theo nhu cầu cụ thể, xác minh danh tính, mua nội dung và thanh toán phí, thu hồi phí.</li>
                            </ul>
                        </li>
                        <li>
                            b. Sử dụng một phần thông tin cá nhân để quản lý người dùng.
                            <ul class="sub-list dot-ver">
                                <li>Xác minh danh tính khi đăng ký sử dụng dịch vụ, xác định cá nhân, ngăn chặn hành vi sử dụng trái phép của người dùng vi phạm Điều khoản sử dụng hoặc không tuân thủ đúng quy định, hạn chế số lần đăng ký sử dụng dịch vụ, lưu trữ hồ sơ để giải quyết tranh chấp, xử lý khiếu nại, thông báo quan trọng.</li>
                            </ul>
                        </li>
                        <li>
                            c. Phát triển dịch vụ mới, tiếp thị và quảng cáo.
                            <ul class="sub-list dot-ver">
                                <li>Phát triển và xác thực dịch vụ mới, cung cấp dịch vụ tùy chỉnh, đăng quảng cáo và cung cấp dịch vụ theo đặc điểm thống kê, cung cấp thông tin về sự kiện và quảng cáo, đo lường tần suất truy cập, thống kê việc sử dụng dịch vụ, xác minh hiệu quả của dịch vụ.</li>
                            </ul>
                        </li>
                        <li>
                            d. Mục đích thu thập ảnh khuôn mặt của người dùng
                            <ul class="sub-list dot-ver">
                                <li>Ảnh khuôn mặt được sử dụng để cung cấp chức năng tạo ảnh AI và được thu thập với sự đồng ý của người dùng. Ảnh khuôn mặt sẽ được xóa ngay sau khi hoàn thành việc tạo ảnh và không được lưu trữ riêng biệt. Ảnh khuôn mặt thu thập không được sử dụng cho việc đào tạo mô hình AI hoặc các mục đích khác, chỉ được sử dụng để thực hiện công việc tạo ảnh theo yêu cầu của người dùng.</li>
                            </ul>
                        </li>                        
                    </ul>
                </div>
                <div class="info-box">
                    <p>3. Phương thức thu thập thông tin cá nhân</p>
                    <ul class="text-list">
                        <li>a. Thu thập từ sự cung cấp tự nguyện của người dùng khi đăng ký hoặc sử dụng dịch vụ.</li>
                        <li>b. Thu thập tự động khi người dùng chạy hoặc sử dụng dịch vụ do công ty cung cấp.
Tất cả người dùng cần cung cấp thông tin cá nhân để nhận dịch vụ từ công ty. Thông tin cá nhân được thu thập thông qua mẫu đăng ký dịch vụ với sự đồng ý của người dùng.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>4. Ủy thác xử lý thông tin cá nhân</p>
                    <ul class="text-list">
                        <li>Công ty có thể ủy thác việc xử lý thông tin cá nhân của người dùng cho bên thứ ba để nâng cao chất lượng dịch vụ.</li>
                        <li>a. Trong trường hợp ủy thác xử lý thông tin cá nhân, công ty sẽ thông báo trước cho người dùng về việc này.</li>
                        <li>b. Khi ủy thác xử lý thông tin cá nhân, công ty sẽ quy định rõ trong hợp đồng ủy thác về hướng dẫn bảo vệ thông tin cá nhân, nghĩa vụ bảo mật thông tin, cấm cung cấp thông tin cho bên thứ ba và trách nhiệm trong trường hợp xảy ra sự cố. Các nội dung hợp đồng sẽ được lưu trữ dưới dạng văn bản hoặc điện tử.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>5. Thời gian lưu trữ và sử dụng thông tin cá nhân</p>
                    <ul class="text-list">
                        <li>Công ty sẽ hủy ngay thông tin cá nhân của người dùng khi họ hủy đăng ký hoặc khi mục đích thu thập và sử dụng thông tin cá nhân đã đạt được. Tuy nhiên, trong các trường hợp dưới đây, thông tin cá nhân có thể được lưu trữ trong thời gian nhất định.</li>
                        <li>
                            1)  Thời gian lưu giữ và sử dụng ảnh khuôn mặt
                            <ul class="sub-list dot-ver">
                                <li>Ảnh khuôn mặt được lưu trữ trong vòng 30 giây để phục vụ việc tạo ảnh, và sẽ tự động xóa sau khi hoàn thành việc tạo ảnh, không lưu trữ riêng biệt</li>>
                            </ul>
                        </li>                       
                    </ul>
                </div>
                <div class="info-box">
                    <p>6. Quy trình và phương pháp hủy bỏ thông tin cá nhân</p>
                    <ul>
                        <li>Công ty sẽ ngay lập tức hủy bỏ thông tin cá nhân khi thời hạn lưu trữ thông tin cá nhân đã hết hoặc khi thông tin cá nhân không còn cần thiết do đã hoàn thành mục đích thu thập và sử dụng. Quy trình và phương pháp hủy bỏ thông tin cá nhân của công ty như sau.</li>
                        <li>
                            a. Quy trình hủy bỏ
                            <ul class="sub-list dot-ver">
                                <li>Thông tin do người dùng nhập vào để đăng ký dịch vụ sẽ được chuyển vào cơ sở dữ liệu riêng biệt (đối với tài liệu giấy, sẽ được lưu trữ trong tủ tài liệu có khóa), sau đó được lưu giữ trong một khoảng thời gian nhất định theo chính sách nội bộ và các quy định pháp luật liên quan (tham khảo thời hạn bảo vệ và sử dụng) trước khi bị hủy bỏ.</li>
                                <li>Trừ khi có quy định pháp luật, thông tin cá nhân sẽ không được sử dụng cho mục đích khác ngoài việc lưu trữ.</li>
                            </ul>
                        </li>
                        <li>
                            b. Phương pháp hủy bỏ
                            <ul class="sub-list dot-ver">
                                <li>Thông tin cá nhân được in trên giấy sẽ bị tiêu hủy bằng máy hủy tài liệu hoặc đốt cháy.</li>
                                <li>Thông tin cá nhân được lưu dưới dạng tệp điện tử sẽ bị xóa bằng phương pháp kỹ thuật đảm bảo không thể khôi phục.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>7. Nội dung đảm bảo tính chính xác của thông tin cá nhân người dùng</p>
                    <ul>
                        <li>Do thông tin cá nhân không chính xác có thể gây bất tiện cho người dùng, nếu quản trị viên xác định rằng thông tin cá nhân đã nhập vào rõ ràng là không chính xác, công ty có quyền hủy bỏ thông tin không chính xác đó.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>8. Các biện pháp có thể được thực hiện để tạm ngừng dịch vụ nhằm bảo vệ an toàn thông tin cá nhân của người dùng</p>
                    <ul>
                        <li>Công ty nỗ lực tối đa để đảm bảo người dùng có thể sử dụng dịch vụ an toàn. Tuy nhiên, nếu dịch vụ của công ty bị tấn công hoặc hư hỏng do phương thức không mong muốn, công ty có thể tạm thời đình chỉ dịch vụ liên quan đến thông tin cá nhân của người dùng cho đến khi vấn đề được giải quyết hoàn toàn.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>9. Chia sẻ và cung cấp thông tin cá nhân với bên thứ ba</p>
                    <ul>
                        <li>Công ty không sử dụng hoặc cung cấp thông tin cá nhân cho bên thứ ba ngoài phạm vi đã thông báo hoặc quy định, trừ khi có sự đồng ý của người dùng hoặc có quy định đặc biệt của pháp luật.Ngoài ra, những người xử lý hoặc từng xử lý thông tin cá nhân của người dùng không được thực hiện các hành vi sau.</li>
                        <li>a. Thu thập hoặc nhận sự đồng ý xử lý thông tin cá nhân bằng cách gian lận hoặc các phương pháp bất hợp pháp khác.</li>
                        <li>b. Tiết lộ thông tin cá nhân thu được trong quá trình làm việc hoặc cung cấp trái phép cho người khác.</li>
                        <li>c. Phá hoại, làm hư hỏng, thay đổi, giả mạo hoặc rò rỉ thông tin cá nhân của người khác mà không có quyền hạn hợp pháp hoặc vượt quá quyền hạn cho phép.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>10. Nội dung liên quan đến việc giữ bí mật thông tin cá nhân của người dùng</p>
                    <ul>
                        <li>
                        Công ty không tiết lộ thông tin cá nhân của người dùng cho bên thứ ba mà không có sự đồng ý của họ. Ngay cả khi người dùng đã đồng ý, công ty cũng sẽ không cung cấp thông tin cá nhân của họ cho bên thứ ba có khả năng tiết lộ lại thông tin đó.Công ty không cung cấp thông tin cá nhân của người dùng cho các cơ quan chính phủ theo yêu cầu đơn phương. Chỉ khi có yêu cầu chính thức theo đúng quy trình pháp luật, công ty mới cung cấp thông tin cá nhân của người dùng.Công ty không sử dụng thông tin cá nhân của người dùng ngoài các dịch vụ cơ bản do công ty quy định hoặc các hoạt động dịch vụ khác. Nếu cần sử dụng thông tin của người dùng vì các hoạt động trên, công ty sẽ thu thập theo biểu mẫu riêng và tiến hành quy trình đồng ý của người dùng.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>11. Những điều người dùng cần biết để bảo vệ thông tin cá nhân của mình</p>
                    <ul>
                        <li>
                        Khi sử dụng PROKIDSBOOK tại các địa điểm công cộng như quán internet hoặc thông qua Wi-Fi công cộng, vui lòng kiểm tra và đảm bảo không có chương trình hack hoặc phần mềm độc hại nào có thể gây ảnh hưởng đến dữ liệu cá nhân. Công ty nỗ lực tối đa để bảo vệ thông tin cá nhân của người dùng, nhưng sẽ không chịu trách nhiệm đối với các sự cố do sai sót cá nhân của người dùng hoặc các vấn đề trên internet.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>12. Xử lý thông tin cá nhân chưa được xác định và các khiếu nại khác</p>
                    <ul>
                        <li>
                        Công ty chỉ định một quản lý chuyên trách tiếp nhận và xử lý nhanh chóng các khiếu nại liên quan đến việc sử dụng thông tin cá nhân chưa được xác định hoặc các khiếu nại khác của người dùng, đồng thời phản hồi ngay sau khi giải quyết.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>13. Hạn chế đối với nhân viên xử lý thông tin cá nhân</p>
                    <ul>
                        <li>
                        Công ty giới hạn nhân viên xử lý thông tin cá nhân chỉ dành cho những người có thẩm quyền và cấp mật khẩu riêng, đồng thời thường xuyên cập nhật mật khẩu đó. Ngoài ra, để truy cập trang quản lý có quyền xử lý thông tin cá nhân, cần phải thực hiện xác thực hai yếu tố và cài đặt tường lửa. Công ty cũng tổ chức các khóa đào tạo định kỳ để nhấn mạnh việc tuân thủ chính sách xử lý thông tin cá nhân.
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>14. Quyền của người dùng và người đại diện pháp lý, cũng như phương thức thực hiện</p>
                    <ul>
                        <li>a. Người dùng và người đại diện hợp pháp có thể kiểm tra hoặc yêu cầu xóa thông tin cá nhân của mình bất cứ lúc nào.</li>
                        <li>b. Người dùng có thể chỉnh sửa thông tin cá nhân thông qua ứng dụng hoặc trang web, hoặc gửi yêu cầu đến trung tâm khách hàng hoặc qua email. Để hủy đăng ký (rút lại sự đồng ý), người dùng có thể gửi email đến trung tâm khách hàng hoặc thực hiện trực tuyến qua ứng dụng theo mẫu đăng ký hủy do công ty quy định.</li>
                        <li>c. Ngoài ra, người dùng có thể liên hệ qua email hoặc bằng văn bản với trung tâm khách hàng hoặc người chịu trách nhiệm về thông tin cá nhân, và công ty sẽ xử lý ngay lập tức.</li>
                        <li>d. Nếu người dùng yêu cầu chỉnh sửa thông tin cá nhân, công ty sẽ không sử dụng hoặc cung cấp thông tin đó cho đến khi hoàn tất chỉnh sửa. Nếu thông tin đã được cung cấp cho bên thứ ba, công ty sẽ thông báo ngay lập tức để chỉnh sửa.</li>
                        <li>e. Công ty xử lý thông tin cá nhân bị xóa hoặc chấm dứt theo mục "5. Thời gian lưu giữ và sử dụng thông tin cá nhân" và đảm bảo thông tin không thể được sử dụng hoặc truy cập với mục đích khác.</li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>15. Cài đặt, vận hành và từ chối thiết bị thu thập thông tin cá nhân tự động</p>
                    <ul>
                        <li>Công ty sử dụng "cookie" để lưu trữ và truy xuất thông tin của người dùng nhằm cung cấp các dịch vụ tùy chỉnh. Cookie là một lượng nhỏ dữ liệu được máy chủ trang web gửi đến trình duyệt của người dùng và có thể được lưu trên ổ cứng máy tính của họ.</li>
                        <li>
                            a. Mục đích sử dụng cookie<br>
                           Được sử dụng để cung cấp các chức năng thuận tiện cho người dùng và không được sử dụng cho mục đích độc hại.
                        </li>
                        <li>
                            b. Cách cài đặt/từ chối cookie
                            <ul class="style-list insert-ver">
                                <li>Người dùng có thể lựa chọn cài đặt cookie hoặc không. Người dùng có thể thiết lập trình duyệt web để cho phép tất cả cookie, xác nhận mỗi lần lưu cookie hoặc từ chối tất cả cookie.</li>
                                <li>Cách cài đặt từ chối cookie: Người dùng có thể vào cài đặt trình duyệt và thiết lập theo ý muốn.</li>
                                <li>Ví dụ về cài đặt (đối với Internet Explorer): Công cụ -> Tùy chọn Internet -> Bảo mật</li>
                                <li>Tuy nhiên, nếu từ chối cookie, việc sử dụng dịch vụ có thể gặp khó khăn.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>16. Người chịu trách nhiệm quản lý thông tin cá nhân và thông tin liên hệ</p>
                    <ul>
                        <li>Người dùng có thể gửi khiếu nại liên quan đến bảo vệ thông tin cá nhân đến người chịu trách nhiệm quản lý thông tin cá nhân hoặc bộ phận liên quan. Công ty sẽ phản hồi nhanh chóng.</li>
                        <li>
                            Người chịu trách nhiệm quản lý thông tin cá nhân<br/>
                            Họ tên: Choi Joong-Bae<br/>
                            Số điện thoại: 02-6269-0630<br/>
                            Email: prokidsbook@iea.co.kr
                        </li>
                    </ul>
                </div>
                <div class="info-box">
                    <p>17. Nghĩa vụ thông báo</p>
                    <ul>
                        <li>Nếu có bất kỳ thay đổi, bổ sung hoặc xóa bỏ nào đối với chính sách xử lý thông tin cá nhân, công ty sẽ thông báo trước ít nhất 7 ngày qua mục "Thông báo" trên ứng dụng hoặc trang web.</li>
                    </ul>
                </div>
            </div>
`