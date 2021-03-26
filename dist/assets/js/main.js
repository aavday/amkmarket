"use strict";

var body = document.querySelector('body');
var header = document.querySelector('.header');
var footer = document.querySelector('.footer'); // No scroll for body

var bodyScrollOff = function bodyScrollOff() {
  body.classList.add('lock');
  body.style.position = 'fixed';
  body.style.width = '100%';
  body.style.top = "-".concat(offset, "px");
};

var bodyScrollOn = function bodyScrollOn() {
  body.classList.remove('lock');
  body.style.position = '';
  body.style.width = '';
  body.style.top = '';
  window.scrollTo({
    top: offset
  });
}; // Mobile Menu


var burger = document.querySelector('.burger');
var nav = document.querySelector('.header__inner');
var main = document.querySelector('.main');
var offset = null;
burger.addEventListener('click', function () {
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

}); // Scroll to sections

var anchors = document.querySelectorAll('a[data-scroll]');
var intro = document.querySelector('.intro');

if (!intro) {
  anchors.forEach(function (anchor) {
    var href = anchor.getAttribute('href');
    var scroll = anchor.getAttribute('data-scroll').replace('.', '');
    anchor.setAttribute('href', "".concat(href, "#").concat(scroll));
  });
} else {
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      var margin = parseInt(getComputedStyle(main).marginTop);
      var section = document.querySelector(anchor.getAttribute('data-scroll'));
      var bodyRect = document.body.getBoundingClientRect().top;
      var sectionRect = section.getBoundingClientRect().top;
      var sectionPosition = sectionRect - bodyRect;
      var marginPosition = sectionPosition - margin;

      if (burger.classList.contains('active')) {
        offset = '';
        bodyScrollOn();
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        main.classList.toggle('active');
        footer.classList.toggle('active');
      }

      if (marginPosition === 0) {
        anchors.forEach(function (anchor) {
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
} // Active anchors


if (intro && pageYOffset < intro.scrollHeight / 2) {
  anchors.forEach(function (anchor) {
    anchor.classList.remove('active');
  });
  document.querySelector('a[data-scroll=".intro"]').classList.add('active');
}

var catalogue = document.querySelector('.catalogue');
var categories = document.querySelector('.categories');
var cart = document.querySelector('.cart');

if (catalogue || categories) {
  document.querySelector('.header__nav-list-item a[href$="/kategorii"]').classList.add('active');
} else if (cart) {
  document.querySelector('.header__nav-list-item a[href$="/korzina"]').classList.add('active');
} else {
  window.addEventListener('scroll', function () {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top + pageYOffset - 300;
      var bottom = top + section.scrollHeight;
      var scroll = window.pageYOffset;
      var id = section.getAttribute('id');

      if (scroll > top && scroll < bottom) {
        anchors.forEach(function (anchor) {
          anchor.classList.remove('active');
        });
        document.querySelector("a[data-scroll=\".".concat(id, "\"]")).classList.add('active');
      }
    });
  });
} // Slider


if (document.querySelector('.intro__slider')) {
  var introSlider = tns({
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
  var feedbackSlider = tns({
    container: '.feedback__slider',
    items: 1,
    autoplay: true,
    autoplayButtonOutput: false,
    controls: false,
    navPosition: 'bottom',
    mouseDrag: true
  });
}

var catalogueImgsSliderInit = function catalogueImgsSliderInit() {
  var catalogueImgsSlider = tns({
    container: '.catalogue__card-imgs-slider',
    items: 1,
    autoplay: false,
    autoplayButtonOutput: false,
    controls: false,
    navPosition: 'bottom',
    mouseDrag: true
  });
}; // Modal


var modal = document.querySelector('.modal');
var modalClose = document.querySelector('.modal-close');

var modalOn = function modalOn() {
  offset = pageYOffset;
  bodyScrollOff();
  modal.classList.toggle('active');

  if (window.innerWidth > 1400) {
    body.style.paddingRight = '17px';
    footer.style.paddingRight = '17px';
    footer.style.width = 'calc(100% + 17px)';
  }
};

var modalOff = function modalOff() {
  bodyScrollOn();
  modal.classList.toggle('active');

  if (window.innerWidth > 1400) {
    body.style.paddingRight = '0';
    footer.style.paddingRight = '0';
    footer.style.width = 'auto';
  }
};

if (modal) {
  modalClose.addEventListener('click', function () {
    modalOff();
    deliveryCompaniesDisplayNone();
  });
}

var modalLinks = document.querySelectorAll('.modal-link');
modalLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    modalOn();
  });
}); // Delivery calculators

var deliveryCompanies = document.querySelectorAll('.delivery-company');

if (deliveryCompanies) {
  deliveryCompanies.forEach(function (tag) {
    tag.addEventListener('click', function () {
      modalOn();
      var company = tag.classList[0].replace('-logo', '');
      document.querySelector(".".concat(company, "-iframe")).classList.remove('d-none');
    });
  });
}

var deliveryCompaniesDisplayNone = function deliveryCompaniesDisplayNone() {
  var deliveryCompaniesIframes = document.querySelectorAll('.modal iframe');
  deliveryCompaniesIframes.forEach(function (tag) {
    tag.classList.add('d-none');
  });
}; // Creating array of all items


var itemsArray = [];

var updateArray = function updateArray() {
  var items = document.querySelectorAll('.catalogue__table-item');
  itemsArray = [];
  items.forEach(function (item) {
    var itemsObj = {};
    itemsObj.name = item.querySelector('.catalogue__table-item-name').textContent.trim();
    itemsObj.price = item.querySelector('.catalogue__table-item-price').textContent.trim();
    itemsObj.article = item.querySelector('.catalogue__table-item-article').textContent.trim();
    itemsObj.thumb = item.querySelector('.catalogue__table-item-thumb div').style.backgroundImage;

    if (item.classList.contains('filtered')) {
      itemsObj.filtered = 'filtered';
    } else {
      itemsObj.filtered = '';
    }

    itemsArray.push(itemsObj);
  });
};

updateArray(); // Catalogue sort

var sortText = function sortText(prev, next) {
  if (prev.name < next.name) return -1;
  if (prev.name < next.name) return 1;
};

var sortNum = function sortNum(a, b) {
  return b.price - a.price;
};

var sortByName = function sortByName(sortMethod) {
  if (sortMethod === 'name-down') {
    itemsArray.sort(sortText);
  } else {
    itemsArray.sort(sortText).reverse();
  }

  updateList(itemsArray);
};

var sortByPrice = function sortByPrice(sortMethod) {
  if (sortMethod === 'price-down') {
    itemsArray.sort(sortNum);
  } else {
    itemsArray.sort(sortNum).reverse();
  }

  updateList(itemsArray);
};

var catalogueTable = document.querySelector('.catalogue__table tbody');

var updateList = function updateList(itemsArray) {
  catalogueTable.innerHTML = '';
  itemsArray.forEach(function (item) {
    catalogueTable.innerHTML += "\n      <tr class=\"catalogue__table-item ".concat(item.filtered, "\">\n        <td class=\"catalogue__table-item-thumb\">\n            <div style='background-image: ").concat(item.thumb, ";' alt=\"\"></div>\n        </td>\n        <td class=\"catalogue__table-item-name\">\n            ").concat(item.name, "\n        </td>\n        <td class=\"catalogue__table-item-article\">\n          ").concat(item.article, "\n        </td>\n        <td class=\"catalogue__table-item-price\">\n            ").concat(item.price, "<i class=\"ml-1 fas fa-ruble-sign\"></i>\n        </td>\n      </tr>\n    ");
  });
  itemsAddListener();
};

var sortPriceBtn = document.querySelector('.catalogue__sort-by-price');
var sortNameBtn = document.querySelector('.catalogue__sort-by-name');

if (sortNameBtn) {
  sortNameBtn.addEventListener('click', function (event) {
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
  sortPriceBtn.addEventListener('click', function (event) {
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
} // Catalogue search


var filterItems = function filterItems(inputText) {
  Array.from(catalogueTable.children).filter(function (item) {
    return !item.textContent.toLowerCase().includes(inputText);
  }).forEach(function (item) {
    return item.classList.add('filtered');
  });
  Array.from(catalogueTable.children).filter(function (item) {
    return item.textContent.toLowerCase().includes(inputText);
  }).forEach(function (item) {
    return item.classList.remove('filtered');
  });
};

var search = document.querySelector('.catalogue__search');

if (search) {
  search.addEventListener('keyup', function () {
    var inputText = search.value.trim().toLowerCase();
    filterItems(inputText);
    updateArray();
  });
} // Catalogue card


var catalogueCardEmpty = document.querySelector('.catalogue__card-empty');
var catalogueCardContent = document.querySelector('.catalogue__card-content');
var catalogueCardArticle = document.querySelector('.catalogue__card-article');
var catalogueCardName = document.querySelector('.catalogue__card-name');
var catalogueCardImgs = document.querySelector('.catalogue__card-imgs');
var catalogueCardPrice = document.querySelector('.catalogue__card-price');
var catalogueCardDescription = document.querySelector('.catalogue__card-description');
var catalogueCardAmount = document.querySelector('.catalogue__card-add-to-cart-amount');

var updateCard = function updateCard(itemArticle, itemName, itemImgsArray, itemPrice, itemDescription) {
  catalogueCardAmount.value = 1;
  catalogueCardEmpty.classList.add('d-none');
  catalogueCardContent.classList.remove('d-none');
  catalogueCardArticle.textContent = itemArticle;
  catalogueCardName.textContent = itemName;
  catalogueCardPrice.innerHTML = "".concat(itemPrice, "<i class=\"ml-1 fas fa-ruble-sign\"></i>");
  catalogueCardDescription.textContent = itemDescription;
  catalogueCardImgs.innerHTML = "\n    <div class=\"catalogue__card-imgs-slider slider\">\n\n    </div>\n  ";
  var catalogueCardImgsSlider = document.querySelector('.catalogue__card-imgs-slider');
  itemImgsArray.forEach(function (img) {
    catalogueCardImgsSlider.innerHTML += "\n      <div class=\"item\">\n        <img src=\"".concat(img, "\" alt=\"\" class=\"catalogue__card-img\">\n      </div>\n    ");
  });
  catalogueImgsSliderInit();
  itemAdded();
};

var itemsAddListener = function itemsAddListener() {
  var items = document.querySelectorAll('.catalogue__table-item');
  var itemArticle = '';
  var itemName = '';
  var itemImgsArray = [];
  var itemPrice = '';
  var itemDescription = '';
  var itemsInfo = document.querySelectorAll('.catalogue__info-item');
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      itemArticle = item.querySelector('.catalogue__table-item-article').textContent.trim();
      itemName = item.querySelector('.catalogue__table-item-name').textContent.trim();
      itemPrice = item.querySelector('.catalogue__table-item-price').textContent.trim();
      console.log(itemPrice);
      itemsInfo.forEach(function (item) {
        if (item.querySelector('.catalogue__info-article').textContent.trim() === itemArticle && item.querySelector('.catalogue__info-name').textContent.trim() === itemName && item.querySelector('.catalogue__info-price').textContent.trim() === itemPrice) {
          itemDescription = item.querySelector('.catalogue__info-description').textContent;
          var itemImgs = item.querySelectorAll('.catalogue__info-img');
          itemImgsArray = [];
          itemImgs.forEach(function (img) {
            itemImgsArray.push(img.textContent);
          });
        }

        ;
      });
      updateCard(itemArticle, itemName, itemImgsArray, itemPrice, itemDescription);
    });
  });
};

itemsAddListener(); // Add to cart

var addToCartLink = document.querySelector('.catalogue__card-add-to-cart');
var addToCartAmount = document.querySelector('.catalogue__card-add-to-cart-amount');
var addToCartArray = [];

if (JSON.parse(localStorage.getItem('cart-items'))) {
  addToCartArray = JSON.parse(localStorage.getItem('cart-items'));
}

var addToCartObj = {};

if (addToCartLink) {
  addToCartLink.addEventListener('click', function () {
    addToCartObj = {};
    addToCartObj.name = catalogueCardName.textContent.trim();
    addToCartObj.price = catalogueCardPrice.textContent.trim();
    addToCartObj.amount = addToCartAmount.value;
    addToCartObj.article = catalogueCardArticle.textContent;

    if (JSON.stringify(addToCartArray).includes(addToCartObj.article)) {
      var index = null;

      for (var i = 0; i < addToCartArray.length; i++) {
        if (addToCartArray[i].article.includes(addToCartObj.article)) {
          break;
        }

        ;
        index++;
      }

      addToCartArray.splice(index, 1);
    }

    addToCartArray.push(addToCartObj);
    localStorage.setItem('cart-items', JSON.stringify(addToCartArray));
    itemAdded();
  });
}

var itemAdded = function itemAdded() {
  if (JSON.stringify(addToCartArray).includes(catalogueCardArticle.textContent)) {
    catalogueCardContent.querySelector('.fa-shopping-cart').classList.add('d-none');
    catalogueCardContent.querySelector('.fa-check').classList.remove('d-none');
  } else {
    catalogueCardContent.querySelector('.fa-shopping-cart').classList.remove('d-none');
    catalogueCardContent.querySelector('.fa-check').classList.add('d-none');
  }
}; // Cart


var cartTable = document.querySelector('.cart__table');

if (cart) {
  var checkIfCartEmpty = function checkIfCartEmpty() {
    if (addToCartArray.length === 0) {
      cart.querySelector('.cart-empty').classList.remove('d-none');
      cart.querySelector('.cart-active').classList.add('d-none');
    }

    ;
  };

  checkIfCartEmpty();
  var items = JSON.parse(localStorage.getItem('cart-items'));
  items.forEach(function (item) {
    cartTable.innerHTML += "\n      <tr class=\"cart__table-item\">\n        <td class=\"cart__table-item-name\">\n            ".concat(item.name, "\n        </td>\n        <td class=\"cart__table-item-article\">\n            ").concat(item.article, "\n        </td>\n        <td class=\"cart__table-item-price\">\n            ").concat(item.price, "<i class=\"ml-1 fas fa-ruble-sign\"></i>\n        </td>\n        <td class=\"cart__table-item-quantity\">\n          <input type=\"number\" class=\"cart__table-item-quantity-input\" name=\"amount\" value=\"").concat(item.amount, "\" min=\"1\">\n        </td>\n        <td class=\"cart__table-item-delete\">\n          <i class=\"fas fa-times\"></i>\n        </td>\n      </tr>\n    ");
  });
  var cartTableItems = document.querySelectorAll('.cart__table-item');
  cartTableItems.forEach(function (item) {
    var itemAmount = item.querySelector('.cart__table-item-quantity');
    itemAmount.addEventListener('change', function () {
      updateAmount(itemAmount.parentElement, itemAmount.querySelector('input').value);
      updateTotalCost();
    });
    var itemDeleteBtn = item.querySelector('.cart__table-item-delete');
    itemDeleteBtn.addEventListener('click', function (event) {
      event.preventDefault();
      deleteCartItem(itemDeleteBtn.parentElement);
      updateTotalCost();
    });
  });

  var updateForm = function updateForm() {
    var cartTableItems = document.querySelectorAll('.cart__table-item');
    var cartOrderInfoTextarea = document.querySelector('.cart__order-form-info');
    var totalCost = document.querySelector('.cart__order-total-cost').textContent;
    cartOrderInfoTextarea.value = '';
    cartTableItems.forEach(function (item) {
      var itemName = item.querySelector('.cart__table-item-name').textContent.trim();
      var itemArticle = item.querySelector('.cart__table-item-article').textContent.trim();
      var itemPrice = item.querySelector('.cart__table-item-price').textContent.trim();
      var itemAmount = item.querySelector('.cart__table-item-quantity-input').value;
      cartOrderInfoTextarea.value += "\u041D\u0430\u0437\u0432.: ".concat(itemName, ", \u0410\u0440\u0442.: ").concat(itemArticle, ", \u0426\u0435\u043D\u0430 \u0437\u0430 \u0448\u0442.: ").concat(itemPrice, ", \u041A\u043E\u043B-\u0432\u043E: ").concat(itemAmount, "\n");
    });
    cartOrderInfoTextarea.value += "\u0418\u0442\u043E\u0433\u043E: ".concat(totalCost);
  };

  var totalCostTag = document.querySelector('.cart__order-total-cost');

  var updateTotalCost = function updateTotalCost() {
    var cartTableItems = document.querySelectorAll('.cart__table-item');
    var totalCost = 0;
    cartTableItems.forEach(function (item) {
      var itemPrice = item.querySelector('.cart__table-item-price').textContent.trim();
      var itemAmount = item.querySelector('.cart__table-item-quantity-input').value;
      totalCost += itemPrice * itemAmount;
    });
    totalCostTag.innerHTML = "".concat(totalCost, "<i class=\"ml-1 fas fa-ruble-sign\"></i>");
    updateForm();
  };

  updateTotalCost();

  var updateAmount = function updateAmount(item, amount) {
    var index = 0;

    for (var i = 0; i < addToCartArray.length; i++) {
      var itemArticle = item.querySelector('.cart__table-item-article').textContent.trim();

      if (addToCartArray[i].article.includes(itemArticle)) {
        break;
      }

      ;
      index++;
    }

    addToCartArray[index].amount = amount;
    localStorage.setItem('cart-items', JSON.stringify(addToCartArray));
    updateForm();
  };

  var deleteCartItem = function deleteCartItem(item) {
    item.remove();
    var index = 0;

    for (var i = 0; i < addToCartArray.length; i++) {
      var itemArticle = item.querySelector('.cart__table-item-article').textContent.trim();

      if (addToCartArray[i].article.includes(itemArticle)) {
        break;
      }

      ;
      index++;
    }

    addToCartArray.splice(index, 1);
    localStorage.setItem('cart-items', JSON.stringify(addToCartArray));
    updateForm();
    checkIfCartEmpty();
  };
}