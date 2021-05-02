// No scroll for body

const body = document.querySelector('body');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const bodyScrollOff = () => {
  body.classList.add('lock');
  body.style.position = 'fixed';
  body.style.width = '100%';
  body.style.top = `-${offset}px`;
}

const bodyScrollOn = () => {
  body.classList.remove('lock');
  body.style.position = '';
  body.style.width = '';
  body.style.top = '';
  window.scrollTo({
    top: offset
  });
}

// Mobile Menu

const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__inner');
const main = document.querySelector('.main');
let offset = null;

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
  main.classList.toggle('active');
  footer.classList.toggle('active');

  if (burger.classList.contains('active')) {
    offset = pageYOffset;
    bodyScrollOff();
  } else {
    bodyScrollOn();
  }

  /* if (window.getComputedStyle(nav, null).getPropertyValue('height') === `${nav.scrollHeight}px`) {
    nav.style.height = '0';
  } */
});

// Scroll to sections

const anchors = document.querySelectorAll('a[data-scroll]');
const intro = document.querySelector('.intro');

if (!intro) {
  anchors.forEach(anchor => {
    const href = anchor.getAttribute('href');
    const scroll = anchor.getAttribute('data-scroll').replace('.', '');
    anchor.setAttribute('href', `${href}#${scroll}`);
  });
} else {
  anchors.forEach(anchor => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();

      const margin = parseInt(getComputedStyle(main).marginTop);
      const section = document.querySelector(anchor.getAttribute('data-scroll'));
      const bodyRect = document.body.getBoundingClientRect().top; 
      const sectionRect = section.getBoundingClientRect().top; 
      const sectionPosition = sectionRect - bodyRect; 
      const marginPosition = sectionPosition - margin; 

      if (burger.classList.contains('active')) {
        offset = '';
        bodyScrollOn();
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        main.classList.toggle('active');
        footer.classList.toggle('active');
      }

      if (marginPosition === 0) {
        anchors.forEach(anchor => {
          anchor.classList.remove('active');
        });
        document.querySelector('a[data-scroll=".intro"]').classList.add('active');
      }

      scrollTo({
        top: marginPosition,
        behavior: 'smooth'
      });
    });
  });
}

// Active anchors

const catalogue = document.querySelector('.catalogue');
const categories = document.querySelector('.categories');
const cart = document.querySelector('.cart');

if (intro && pageYOffset < (intro.scrollHeight / 2)) {
  anchors.forEach(anchor => {
    anchor.classList.remove('active');
  });
  document.querySelector('a[data-scroll=".intro"]').classList.add('active');
}

if (catalogue || categories) {
  document.querySelector('.header__nav-list-item a[href$="/kategorii"]').classList.add('active');
} else if (cart) {
  document.querySelector('.header__nav-list-item a[href$="/korzina"]').classList.add('active');
} else {
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
  
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top + pageYOffset - 300;
      const bottom = top + section.scrollHeight;
      const scroll = window.pageYOffset;
      const id = section.getAttribute('id');
  
      if ( scroll > top && scroll < bottom) {
        anchors.forEach(anchor => {
          anchor.classList.remove('active');
        });
        document.querySelector(`a[data-scroll=".${id}"]`).classList.add('active');
      }
    });
  });
}

// Slider

if (document.querySelector('.intro__slider')) {
  const introSlider = tns({
    container: '.intro__slider',
    items: 1,
    autoplay: true,
    autoplayButtonOutput: false,
    controls: false,
    navPosition: 'bottom',
    mouseDrag: true
  });
}

if (document.querySelector('.feedback__slider')) {
  const feedbackSlider = tns({
    container: '.feedback__slider',
    items: 1,
    autoplay: true,
    autoplayButtonOutput: false,
    controls: false,
    navPosition: 'bottom',
    mouseDrag: true
  });
}

const catalogueImgsSliderInit = () => {
  const catalogueImgsSlider = tns({
    container: '.catalogue__card-imgs-slider',
    items: 1,
    loop: false,
    autoplay: false,
    autoplayButtonOutput: false,
    controls: false,
    navPosition: 'bottom',
    mouseDrag: true
  });
};

// Modal

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

const modalOn = () => {
  offset = pageYOffset;
  bodyScrollOff();
  modal.classList.toggle('active');

  if(window.innerWidth > 1400) {
    body.style.paddingRight = '17px';
    footer.style.paddingRight = '17px';
    footer.style.width = 'calc(100% + 17px)';
  }
};

const modalOff = () => {
  bodyScrollOn();
  modal.classList.toggle('active');

  if(window.innerWidth > 1400) {
    body.style.paddingRight = '0';
    footer.style.paddingRight = '0';
    footer.style.width = 'auto';
  }
};

if (modal) {
  modalClose.addEventListener('click', () => {
    modalOff();
    deliveryCompaniesDisplayNone();
  });
}

const modalLinks = document.querySelectorAll('.modal-link');

modalLinks.forEach(link => {
  link.addEventListener('click', () => {
    modalOn();
  });
});

// Delivery calculators

const deliveryCompanies = document.querySelectorAll('.delivery-company')

if (deliveryCompanies) {
  deliveryCompanies.forEach(tag => {
    tag.addEventListener('click', () => {
      modalOn();
      const company = tag.classList[0].replace('-logo', '');
      document.querySelector(`.${company}-iframe`).classList.remove('d-none');
    });
  });
}

const deliveryCompaniesDisplayNone = () => {
  const deliveryCompaniesIframes = document.querySelectorAll('.modal iframe');

  deliveryCompaniesIframes.forEach(tag => {
    tag.classList.add('d-none');
  });
};

// Creating array of all items

let newItemsArray = [];

const updateArray = () => {
  const items = document.querySelectorAll('.catalogue__table-item');
  newItemsArray = [];

  items.forEach(item => {
    const itemsObj = {};
  
    itemsObj.name = item.querySelector('.catalogue__table-item-name').textContent.trim();
    itemsObj.price = item.querySelector('.catalogue__table-item-price').textContent.trim();
    itemsObj.article = item.querySelector('.catalogue__table-item-article').textContent.trim();
    itemsObj.thumb = item.querySelector('.catalogue__table-item-thumb div').style.backgroundImage;

    newItemsArray.push(itemsObj);
  });
}

updateArray();

// Catalogue sort

const sortText = ((prev, next) => {
  if ( prev.name < next.name ) return -1;
  if ( prev.name < next.name ) return 1;
});

const sortNum = (a, b) => b.price - a.price;

const sortByName = sortMethod => {
  if (sortMethod === 'name-down') {
    newItemsArray.sort(sortText);
  } else {
    newItemsArray.sort(sortText).reverse();
  }

  updateList(newItemsArray);
};

const sortByPrice = sortMethod => {
  if (sortMethod === 'price-down') {
    newItemsArray.sort(sortNum);
  } else {
    newItemsArray.sort(sortNum).reverse();
  }

  updateList(newItemsArray);
};

const catalogueTable = document.querySelector('.catalogue__table tbody');

const updateList = newItemsArray => {
  i = 0;
  const currentItems = document.querySelectorAll('.catalogue__table-item');

  currentItems.forEach(item => {
    item.querySelector('.catalogue__table-item-thumb div').style.backgroundImage = newItemsArray[i].thumb;
    item.querySelector('.catalogue__table-item-name').innerText = newItemsArray[i].name;
    item.querySelector('.catalogue__table-item-article').innerText = newItemsArray[i].article;
    item.querySelector('.catalogue__table-item-price span').innerText = newItemsArray[i].price;

    i++;
  })
};

const sortPriceBtn = document.querySelector('.catalogue__sort-by-price');
const sortNameBtn = document.querySelector('.catalogue__sort-by-name');

if (sortNameBtn) {
  sortNameBtn.addEventListener('click', event => {
    event.preventDefault();
    sortPriceBtn.classList.remove('down', 'up');
  
    if (!sortNameBtn.classList.contains('down')) {
      sortByName('name-down');
      sortNameBtn.classList.add('down');
  
    } else {
      sortByName('name-up');
      sortNameBtn.classList.remove('down');
      sortNameBtn.classList.add('up');
    }
  });
}

if (sortPriceBtn) {
  sortPriceBtn.addEventListener('click', event => {
    event.preventDefault();
    sortNameBtn.classList.remove('down', 'up');
  
    if (!sortPriceBtn.classList.contains('down')) {
      sortByPrice('price-down');
      sortPriceBtn.classList.add('down');
  
    } else {
      sortByPrice('price-up');
      sortPriceBtn.classList.remove('down');
      sortPriceBtn.classList.add('up');
    }
  });
}

// Catalogue search

const filterItems = inputText => {
  Array.from(catalogueTable.children)
    .filter(item => !item.textContent.toLowerCase().includes(inputText))
    .forEach(item => item.classList.add('filtered'));

  Array.from(catalogueTable.children)
    .filter(item => item.textContent.toLowerCase().includes(inputText))
    .forEach(item => item.classList.remove('filtered'));
};

const search = document.querySelector('.catalogue__search');

if (search) {
  search.addEventListener('keyup', () => {
    const inputText = search.value.trim().toLowerCase();
    filterItems(inputText);
    updateArray();
  });
}

// Catalogue card

const catalogueCardEmpty = document.querySelector('.catalogue__card-empty');
const catalogueCardContent = document.querySelector('.catalogue__card-content');

const catalogueCardArticle = document.querySelector('.catalogue__card-article');
const catalogueCardName = document.querySelector('.catalogue__card-name');
const catalogueCardImgs = document.querySelector('.catalogue__card-imgs');
const catalogueCardPrice = document.querySelector('.catalogue__card-price');
const catalogueCardDescription = document.querySelector('.catalogue__card-description');
const catalogueCardAmount = document.querySelector('.catalogue__card-add-to-cart-amount');

const updateCard = (itemArticle, itemName, itemImgsArray, itemFullImgsArray, itemPrice, itemDescription) => {
  catalogueCardAmount.value = 1;
  catalogueCardEmpty.classList.add('d-none');
  catalogueCardContent.classList.remove('d-none');

  catalogueCardArticle.textContent = itemArticle;
  catalogueCardName.textContent = itemName;
  catalogueCardPrice.innerHTML = `${itemPrice}<i class="ml-1 fas fa-ruble-sign"></i>`;
  catalogueCardDescription.textContent = itemDescription;

  catalogueCardImgs.innerHTML = `
    <div class="catalogue__card-imgs-slider slider">

    </div>
  `;

  const catalogueCardImgsSlider = document.querySelector('.catalogue__card-imgs-slider');

  let i = 0;

  itemImgsArray.forEach(img => {
    catalogueCardImgsSlider.innerHTML += `
      <div class="item">
        <a href="${itemFullImgsArray[i]}" data-lightbox="gallery">
          <img src="${img}" alt="" class="catalogue__card-img">
        </a>
      </div>
    `;

    i++;
  });

  catalogueImgsSliderInit();
  itemAdded();
};

const itemsAddListener = () => {
  const items = document.querySelectorAll('.catalogue__table-item');

  let itemArticle = '';
  let itemName = '';
  let itemImgsArray = [];
  let itemFullImgsArray = [];
  let itemPrice = '';
  let itemDescription = '';

  const itemsInfo = document.querySelectorAll('.catalogue__info-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      itemArticle = item.querySelector('.catalogue__table-item-article').textContent.trim();
      itemName = item.querySelector('.catalogue__table-item-name').textContent.trim();
      itemPrice = item.querySelector('.catalogue__table-item-price').textContent.trim();

      itemsInfo.forEach(item => {
        if (item.querySelector('.catalogue__info-article').textContent.trim() === itemArticle 
          && item.querySelector('.catalogue__info-name').textContent.trim() === itemName
          && item.querySelector('.catalogue__info-price').textContent.trim() === itemPrice) {
          itemDescription = item.querySelector('.catalogue__info-description').textContent;
          
          let itemImgs = item.querySelectorAll('.catalogue__info-img');
          itemImgsArray = [];
          itemImgs.forEach(img => {
            itemImgsArray.push(img.textContent);
          });

          let itemFullImgs = item.querySelectorAll('.catalogue__info-img-full');
          itemFullImgsArray = [];
          itemFullImgs.forEach(img => {
            itemFullImgsArray.push(img.textContent);
          });
        };
      });

      updateCard(itemArticle, itemName, itemImgsArray, itemFullImgsArray, itemPrice, itemDescription);
    });
  });
};

itemsAddListener();

// Add to cart

const addToCartLink = document.querySelector('.catalogue__card-add-to-cart');
const addToCartAmount = document.querySelector('.catalogue__card-add-to-cart-amount');
let addToCartArray = [];
if (JSON.parse(localStorage.getItem('cart-items'))) {
  addToCartArray = JSON.parse(localStorage.getItem('cart-items'));
}
let addToCartObj = {};

if (addToCartLink) {
  addToCartLink.addEventListener('click', () => {
    addToCartObj = {};
    addToCartObj.name = catalogueCardName.textContent.trim();
    addToCartObj.price = catalogueCardPrice.textContent.trim();
    addToCartObj.amount = addToCartAmount.value;
    addToCartObj.article = catalogueCardArticle.textContent;
  
    if (JSON.stringify(addToCartArray).includes(addToCartObj.article)) {
      let index = null;

      for (let i = 0; i < addToCartArray.length; i++) {
        if (addToCartArray[i].article.includes(addToCartObj.article)) {
          break;
        };
        index++;
      }

      addToCartArray.splice(index, 1);
    }
  
    addToCartArray.push(addToCartObj);
  
    localStorage.setItem('cart-items', JSON.stringify(addToCartArray));
  
    itemAdded();
  });
}

const itemAdded = () => {
  if (JSON.stringify(addToCartArray).includes(catalogueCardArticle.textContent)) {
    catalogueCardContent.querySelector('.fa-shopping-cart').classList.add('d-none');
    catalogueCardContent.querySelector('.fa-check').classList.remove('d-none');
  } else {
    catalogueCardContent.querySelector('.fa-shopping-cart').classList.remove('d-none');
    catalogueCardContent.querySelector('.fa-check').classList.add('d-none');
  }
}

// Cart

const cartTable = document.querySelector('.cart__table');

if (cart) {
  const checkIfCartEmpty = () => {
    if (addToCartArray.length === 0) {
      cart.querySelector('.cart-empty').classList.remove('d-none');
      cart.querySelector('.cart-active').classList.add('d-none');
    };
  };

  checkIfCartEmpty();

  const items = JSON.parse(localStorage.getItem('cart-items'));

  items.forEach(item => {
    cartTable.innerHTML += `
      <tr class="cart__table-item">
        <td class="cart__table-item-name">
            ${item.name}
        </td>
        <td class="cart__table-item-article">
            ${item.article}
        </td>
        <td class="cart__table-item-price">
            ${item.price}<i class="ml-1 fas fa-ruble-sign"></i>
        </td>
        <td class="cart__table-item-quantity">
          <input type="number" class="cart__table-item-quantity-input" name="amount" value="${item.amount}" min="1">
        </td>
        <td class="cart__table-item-delete">
          <i class="fas fa-times"></i>
        </td>
      </tr>
    `;   
  });

  const cartTableItems = document.querySelectorAll('.cart__table-item');

  cartTableItems.forEach(item => {
    const itemAmount = item.querySelector('.cart__table-item-quantity');

    itemAmount.addEventListener('change', () => {
      updateAmount(itemAmount.parentElement, itemAmount.querySelector('input').value);
      updateTotalCost();
    });

    const itemDeleteBtn = item.querySelector('.cart__table-item-delete');

    itemDeleteBtn.addEventListener('click', event => {
      event.preventDefault();

      deleteCartItem(itemDeleteBtn.parentElement);
      updateTotalCost();
    })
  });

  const updateForm = () => {
    const cartTableItems = document.querySelectorAll('.cart__table-item');
    const cartOrderInfoTextarea = document.querySelector('.cart__order-form-info');
    const totalCost = document.querySelector('.cart__order-total-cost').textContent;
    cartOrderInfoTextarea.value = '';

    cartTableItems.forEach(item => {
      const itemName = item.querySelector('.cart__table-item-name').textContent.trim();
      const itemArticle = item.querySelector('.cart__table-item-article').textContent.trim();
      const itemPrice = item.querySelector('.cart__table-item-price').textContent.trim();
      const itemAmount = item.querySelector('.cart__table-item-quantity-input').value;

      cartOrderInfoTextarea.value += `Назв.: ${itemName}, Арт.: ${itemArticle}, Цена за шт.: ${itemPrice}, Кол-во: ${itemAmount}
`;
    });

    cartOrderInfoTextarea.value += `Итого: ${totalCost}`;
  }

  const totalCostTag = document.querySelector('.cart__order-total-cost');

  const updateTotalCost = () => {
    const cartTableItems = document.querySelectorAll('.cart__table-item');
    let totalCost = 0;

    cartTableItems.forEach(item => {
      const itemPrice = item.querySelector('.cart__table-item-price').textContent.trim();
      const itemAmount = item.querySelector('.cart__table-item-quantity-input').value;

      totalCost += itemPrice * itemAmount;
    });

    totalCostTag.innerHTML = `${totalCost}<i class="ml-1 fas fa-ruble-sign"></i>`;

    updateForm();
  }

  updateTotalCost();

  const updateAmount = (item, amount) => {
    let index = 0;

    for (let i = 0; i < addToCartArray.length; i++) {
      const itemArticle = item.querySelector('.cart__table-item-article').textContent.trim();

      if (addToCartArray[i].article.includes(itemArticle)) {
        break;
      };
      index++;
    }
  
    addToCartArray[index].amount = amount;

    localStorage.setItem('cart-items', JSON.stringify(addToCartArray));

    updateForm();
  }

  const deleteCartItem = item => {
    item.remove();

    let index = 0;

    for (let i = 0; i < addToCartArray.length; i++) {
      const itemArticle = item.querySelector('.cart__table-item-article').textContent.trim();

      if (addToCartArray[i].article.includes(itemArticle)) {
        break;
      };
      index++;
    }
  
    addToCartArray.splice(index, 1);

    localStorage.setItem('cart-items', JSON.stringify(addToCartArray));

    updateForm();

    checkIfCartEmpty();
  };
}

// Preloader

const preloaderTag = document.querySelector('.preloader');

window.onload = function () {
  preloaderTag.style.opacity = 0;
  preloaderTag.ontransitionend = () => preloaderTag.classList.add('d-none');
}
