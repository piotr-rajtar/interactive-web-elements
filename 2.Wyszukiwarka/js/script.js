const legend = document.getElementById('legend');
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('focusin', () => {
  legend.classList.add('search__legend--visible');
});

searchInput.addEventListener('focusout', () => {
  legend.classList.remove('search__legend--visible'); 
});

const spinner = document.getElementById('spinner');
const queryCache = {};
let products = [];
let debounceTimeout;

searchInput.addEventListener('keyup', async (event) => {
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(async () => {
    spinner.classList.add('lds-spinner--visible');

    const keyword = event.target.value;

    if(!keyword) {
      products = [];
      spinner.classList.remove('lds-spinner--visible');
      updateSearchList();
      return;
    }

    if (queryCache[keyword]) {
      products = queryCache[keyword].products;
      spinner.classList.remove('lds-spinner--visible');
      updateSearchList();
      return;
    } 

    const searchResult = await fetchData(keyword);

    if(searchResult) {
      queryCache[keyword] = searchResult;
      products = searchResult.products;
    }
  
    spinner.classList.remove('lds-spinner--visible');
    updateSearchList();
  }, 500)
});

async function fetchData(keyword) {
  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${keyword}&limit=5&delay=1000`);
    const searchResult = await response.json();
    return searchResult
  } catch (error) {
    console.error(error);
  }
}

function updateSearchList() {
  const searchList = document.getElementById('search-list');
  searchList.innerHTML = '';

  if(products.length) {
    products.forEach(product => {
      const productSpan = document.createElement('span');
      productSpan.classList.add('search__product');
      productSpan.textContent = product.title;
  
      const priceSpan = document.createElement('span');
      priceSpan.classList.add('search__price');
      priceSpan.textContent = `$${product.price}`;
  
      const listItem = document.createElement('li');
      listItem.classList.add('search__list-item');
      listItem.appendChild(productSpan);
      listItem.appendChild(priceSpan);

      searchList.classList.add('search__list--visible');
      searchList.appendChild(listItem);
    })
  } else {
    searchList.classList.remove('search__list--visible');
  }
}