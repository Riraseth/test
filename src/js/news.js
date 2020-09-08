const newsGrid = document.querySelector('.news__grid');
const moreNewsBtn = document.querySelector('.news__btn');
const loading = document.querySelector('.small-loading');
const bigSpinner = document.querySelector('.big-spinner');
let limit = 5;
let page = 1;
const dateFormat = 'd-m-Y H:i';

const quoteSVG = `<svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="news__svg">
<path d="M2.71227 21.1467C0.978989 19.3689 0.0484009 17.375 0.0484009 14.1429C0.0484009 8.4554 4.18304 3.35778 10.1957 0.837402L11.6984 3.07665C6.08629 6.00815 4.9891 9.81228 4.55157 12.2108C5.45524 11.759 6.63824 11.6014 7.79769 11.7054C10.8335 11.9768 13.2264 14.3834 13.2264 17.375C13.2264 18.8834 12.6059 20.3301 11.5013 21.3967C10.3968 22.4633 8.89868 23.0625 7.3366 23.0625C6.47275 23.0552 5.61903 22.8821 4.82513 22.5532C4.03123 22.2243 3.31301 21.7461 2.71227 21.1467ZM19.5403 21.1467C17.807 19.3689 16.8764 17.375 16.8764 14.1429C16.8764 8.4554 21.011 3.35778 27.0237 0.837402L28.5264 3.07665C22.9143 6.00815 21.8171 9.81228 21.3796 12.2108C22.2832 11.759 23.4662 11.6014 24.6257 11.7054C27.6615 11.9768 30.0544 14.3834 30.0544 17.375C30.0544 18.8834 29.4339 20.3301 28.3293 21.3967C27.2248 22.4633 25.7267 23.0625 24.1646 23.0625C23.3007 23.0552 22.447 22.8821 21.6531 22.5532C20.8592 22.2243 20.141 21.7461 19.5403 21.1467Z" fill="#272727"/>
</svg>
`;

const getNews = async () => {
  const response = await fetch(
    `https://my-json-server.typicode.com/TomaszJaworski/test-api/news?_limit=${limit}&_page=${page}`
  ).catch((error) => console.log(error));
  const data = await response.json();
  return data;
};

const showNews = async () => {
  const news = await getNews();
  news.forEach((news) => {
    const date = format(news.date, dateFormat);
    const newsEl = document.createElement('article');
    newsEl.classList.add('news__item');
    newsEl.innerHTML = `
    <div class="news__header">
    <h2 class="news__quote">
    ${quoteSVG}
    ${news.title}
    </h2>
    <h3 class="news__date">
    Data dodania: ${date}
    </h3>
    <img src="${news.image}" class="news__image" alt="news image">
    </div>   
    <p class="news__text">${news.text}</p>
    `;
    newsGrid.appendChild(newsEl);
  });
  if (!news.length) {
    loading.classList.add('is-hidden');
    moreNewsBtn.querySelector('span').innerText =
      'Pobrano wszystkie aktualności';
    moreNewsBtn.style.pointerEvents = 'none';
  } else {
    loading.classList.remove('loading');
  }
};

const toDate = (date) => {
  if (date === void 0) {
    return new Date(0);
  }
  if (isDate(date)) {
    return date;
  } else {
    return new Date(parseFloat(date.toString()));
  }
};

const isDate = (date) => {
  return date instanceof Date;
};

const format = (date, format) => {
  var d = toDate(date);
  return format
    .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
    .replace(/d/gm, ('0' + (d.getDate() + 0)).substr(-2))
    .replace(/Y/gm, d.getFullYear().toString())
    .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
    .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2));
};

const showLoading = () => {
  loading.classList.add('loading');
};

const getInitialNews = () => {
  showLoading();
  showNews();
  limit = 1;
  page = 6;
  bigSpinner.classList.remove('-active');
};

document.addEventListener('DOMContentLoaded', getInitialNews);

const getMoreNews = () => {
  showLoading();
  showNews();
  page++;
  showNews();
  page++;
};

moreNewsBtn.addEventListener('click', getMoreNews);
