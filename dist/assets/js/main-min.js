const body=document.querySelector("body"),header=document.querySelector(".header"),footer=document.querySelector(".footer"),bodyScrollOff=()=>{body.classList.add("lock"),body.style.position="fixed",body.style.width="100%",body.style.top=`-${offset}px`},bodyScrollOn=()=>{body.classList.remove("lock"),body.style.position="",body.style.width="",body.style.top="",window.scrollTo({top:offset})},burger=document.querySelector(".burger"),nav=document.querySelector(".header__inner"),main=document.querySelector(".main");let offset=null;burger.addEventListener("click",()=>{burger.classList.toggle("active"),nav.classList.toggle("active"),main.classList.toggle("active"),footer.classList.toggle("active"),burger.classList.contains("active")?(offset=pageYOffset,bodyScrollOff()):bodyScrollOn()});const anchors=document.querySelectorAll("a[data-scroll]"),intro=document.querySelector(".intro");intro?anchors.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=parseInt(getComputedStyle(main).marginTop),r=document.querySelector(e.getAttribute("data-scroll")),o=document.body.getBoundingClientRect().top,c=r.getBoundingClientRect().top-o-a;burger.classList.contains("active")&&(offset="",bodyScrollOn(),burger.classList.toggle("active"),nav.classList.toggle("active"),main.classList.toggle("active"),footer.classList.toggle("active")),0===c&&(anchors.forEach(e=>{e.classList.remove("active")}),document.querySelector('a[data-scroll=".intro"]').classList.add("active")),scrollTo({top:c,behavior:"smooth"})})}):anchors.forEach(e=>{const t=e.getAttribute("href"),a=e.getAttribute("data-scroll").replace(".","");e.setAttribute("href",`${t}#${a}`)}),intro&&pageYOffset<intro.scrollHeight/2&&(anchors.forEach(e=>{e.classList.remove("active")}),document.querySelector('a[data-scroll=".intro"]').classList.add("active"));const catalogue=document.querySelector(".catalogue"),categories=document.querySelector(".categories"),cart=document.querySelector(".cart");if(catalogue||categories?document.querySelector('.header__nav-list-item a[href$="/kategorii"]').classList.add("active"):cart?document.querySelector('.header__nav-list-item a[href$="/korzina"]').classList.add("active"):window.addEventListener("scroll",()=>{document.querySelectorAll(".section").forEach(e=>{const t=e.getBoundingClientRect().top+pageYOffset-300,a=t+e.scrollHeight,r=window.pageYOffset,o=e.getAttribute("id");r>t&&r<a&&(anchors.forEach(e=>{e.classList.remove("active")}),document.querySelector(`a[data-scroll=".${o}"]`).classList.add("active"))})}),document.querySelector(".intro__slider")){tns({container:".intro__slider",items:1,autoplay:!0,autoplayButtonOutput:!1,controls:!1,navPosition:"bottom",mouseDrag:!0})}if(document.querySelector(".feedback__slider")){tns({container:".feedback__slider",items:1,autoplay:!0,autoplayButtonOutput:!1,controls:!1,navPosition:"bottom",mouseDrag:!0})}const catalogueImgsSliderInit=()=>{tns({container:".catalogue__card-imgs-slider",items:1,autoplay:!1,autoplayButtonOutput:!1,controls:!1,navPosition:"bottom",mouseDrag:!0})},modal=document.querySelector(".modal"),modalClose=document.querySelector(".modal-close"),modalOn=()=>{offset=pageYOffset,bodyScrollOff(),modal.classList.toggle("active"),window.innerWidth>1400&&(body.style.paddingRight="17px",footer.style.paddingRight="17px",footer.style.width="calc(100% + 17px)")},modalOff=()=>{bodyScrollOn(),modal.classList.toggle("active"),window.innerWidth>1400&&(body.style.paddingRight="0",footer.style.paddingRight="0",footer.style.width="auto")};modal&&modalClose.addEventListener("click",()=>{bodyScrollOn(),modal.classList.toggle("active"),window.innerWidth>1400&&(body.style.paddingRight="0",footer.style.paddingRight="0",footer.style.width="auto"),deliveryCompaniesDisplayNone()});const modalLinks=document.querySelectorAll(".modal-link");modalLinks.forEach(e=>{e.addEventListener("click",()=>{modalOn()})});const deliveryCompanies=document.querySelectorAll(".delivery-company");deliveryCompanies&&deliveryCompanies.forEach(e=>{e.addEventListener("click",()=>{modalOn();const t=e.classList[0].replace("-logo","");document.querySelector(`.${t}-iframe`).classList.remove("d-none")})});const deliveryCompaniesDisplayNone=()=>{document.querySelectorAll(".modal iframe").forEach(e=>{e.classList.add("d-none")})};let newItemsArray=[];const updateArray=()=>{const e=document.querySelectorAll(".catalogue__table-item");newItemsArray=[],e.forEach(e=>{const t={};t.name=e.querySelector(".catalogue__table-item-name").textContent.trim(),t.price=e.querySelector(".catalogue__table-item-price").textContent.trim(),t.article=e.querySelector(".catalogue__table-item-article").textContent.trim(),t.thumb=e.querySelector(".catalogue__table-item-thumb div").style.backgroundImage,newItemsArray.push(t)})};updateArray();const sortText=(e,t)=>e.name<t.name?-1:e.name<t.name?1:void 0,sortNum=(e,t)=>t.price-e.price,sortByName=e=>{"name-down"===e?newItemsArray.sort(sortText):newItemsArray.sort(sortText).reverse(),updateList(newItemsArray)},sortByPrice=e=>{"price-down"===e?newItemsArray.sort(sortNum):newItemsArray.sort(sortNum).reverse(),updateList(newItemsArray)},catalogueTable=document.querySelector(".catalogue__table tbody"),updateList=e=>{i=0,document.querySelectorAll(".catalogue__table-item").forEach(t=>{t.querySelector(".catalogue__table-item-thumb div").style.backgroundImage=e[i].thumb,t.querySelector(".catalogue__table-item-name").innerText=e[i].name,t.querySelector(".catalogue__table-item-article").innerText=e[i].article,t.querySelector(".catalogue__table-item-price span").innerText=e[i].price,i++})},sortPriceBtn=document.querySelector(".catalogue__sort-by-price"),sortNameBtn=document.querySelector(".catalogue__sort-by-name");sortNameBtn&&sortNameBtn.addEventListener("click",e=>{e.preventDefault(),sortPriceBtn.classList.remove("down","up"),sortNameBtn.classList.contains("down")?(sortByName("name-up"),sortNameBtn.classList.remove("down"),sortNameBtn.classList.add("up")):(sortByName("name-down"),sortNameBtn.classList.add("down"))}),sortPriceBtn&&sortPriceBtn.addEventListener("click",e=>{e.preventDefault(),sortNameBtn.classList.remove("down","up"),sortPriceBtn.classList.contains("down")?(sortByPrice("price-up"),sortPriceBtn.classList.remove("down"),sortPriceBtn.classList.add("up")):(sortByPrice("price-down"),sortPriceBtn.classList.add("down"))});const filterItems=e=>{Array.from(catalogueTable.children).filter(t=>!t.textContent.toLowerCase().includes(e)).forEach(e=>e.classList.add("filtered")),Array.from(catalogueTable.children).filter(t=>t.textContent.toLowerCase().includes(e)).forEach(e=>e.classList.remove("filtered"))},search=document.querySelector(".catalogue__search");search&&search.addEventListener("keyup",()=>{const e=search.value.trim().toLowerCase();filterItems(e),updateArray()});const catalogueCardEmpty=document.querySelector(".catalogue__card-empty"),catalogueCardContent=document.querySelector(".catalogue__card-content"),catalogueCardArticle=document.querySelector(".catalogue__card-article"),catalogueCardName=document.querySelector(".catalogue__card-name"),catalogueCardImgs=document.querySelector(".catalogue__card-imgs"),catalogueCardPrice=document.querySelector(".catalogue__card-price"),catalogueCardDescription=document.querySelector(".catalogue__card-description"),catalogueCardAmount=document.querySelector(".catalogue__card-add-to-cart-amount"),updateCard=(e,t,a,r,o,c)=>{catalogueCardAmount.value=1,catalogueCardEmpty.classList.add("d-none"),catalogueCardContent.classList.remove("d-none"),catalogueCardArticle.textContent=e,catalogueCardName.textContent=t,catalogueCardPrice.innerHTML=`${o}<i class="ml-1 fas fa-ruble-sign"></i>`,catalogueCardDescription.textContent=c,catalogueCardImgs.innerHTML='\n    <div class="catalogue__card-imgs-slider slider">\n\n    </div>\n  ';const l=document.querySelector(".catalogue__card-imgs-slider");let n=0;a.forEach(e=>{l.innerHTML+=`\n      <div class="item">\n        <a href="${r[n]}" data-lightbox="gallery">\n          <img src="${e}" alt="" class="catalogue__card-img">\n        </a>\n      </div>\n    `,n++}),tns({container:".catalogue__card-imgs-slider",items:1,autoplay:!1,autoplayButtonOutput:!1,controls:!1,navPosition:"bottom",mouseDrag:!0}),itemAdded()},itemsAddListener=()=>{const e=document.querySelectorAll(".catalogue__table-item");let t="",a="",r=[],o=[],c="",l="";const n=document.querySelectorAll(".catalogue__info-item");e.forEach(e=>{e.addEventListener("click",()=>{t=e.querySelector(".catalogue__table-item-article").textContent.trim(),a=e.querySelector(".catalogue__table-item-name").textContent.trim(),c=e.querySelector(".catalogue__table-item-price").textContent.trim(),n.forEach(e=>{if(e.querySelector(".catalogue__info-article").textContent.trim()===t&&e.querySelector(".catalogue__info-name").textContent.trim()===a&&e.querySelector(".catalogue__info-price").textContent.trim()===c){l=e.querySelector(".catalogue__info-description").textContent;let t=e.querySelectorAll(".catalogue__info-img");r=[],t.forEach(e=>{r.push(e.textContent)});let a=e.querySelectorAll(".catalogue__info-img-full");o=[],a.forEach(e=>{o.push(e.textContent)})}}),updateCard(t,a,r,o,c,l)})})};itemsAddListener();const addToCartLink=document.querySelector(".catalogue__card-add-to-cart"),addToCartAmount=document.querySelector(".catalogue__card-add-to-cart-amount");let addToCartArray=[];JSON.parse(localStorage.getItem("cart-items"))&&(addToCartArray=JSON.parse(localStorage.getItem("cart-items")));let addToCartObj={};addToCartLink&&addToCartLink.addEventListener("click",()=>{if((addToCartObj={}).name=catalogueCardName.textContent.trim(),addToCartObj.price=catalogueCardPrice.textContent.trim(),addToCartObj.amount=addToCartAmount.value,addToCartObj.article=catalogueCardArticle.textContent,JSON.stringify(addToCartArray).includes(addToCartObj.article)){let e=null;for(let t=0;t<addToCartArray.length&&!addToCartArray[t].article.includes(addToCartObj.article);t++)e++;addToCartArray.splice(e,1)}addToCartArray.push(addToCartObj),localStorage.setItem("cart-items",JSON.stringify(addToCartArray)),itemAdded()});const itemAdded=()=>{JSON.stringify(addToCartArray).includes(catalogueCardArticle.textContent)?(catalogueCardContent.querySelector(".fa-shopping-cart").classList.add("d-none"),catalogueCardContent.querySelector(".fa-check").classList.remove("d-none")):(catalogueCardContent.querySelector(".fa-shopping-cart").classList.remove("d-none"),catalogueCardContent.querySelector(".fa-check").classList.add("d-none"))},cartTable=document.querySelector(".cart__table");if(cart){const e=()=>{0===addToCartArray.length&&(cart.querySelector(".cart-empty").classList.remove("d-none"),cart.querySelector(".cart-active").classList.add("d-none"))};e(),JSON.parse(localStorage.getItem("cart-items")).forEach(e=>{cartTable.innerHTML+=`\n      <tr class="cart__table-item">\n        <td class="cart__table-item-name">\n            ${e.name}\n        </td>\n        <td class="cart__table-item-article">\n            ${e.article}\n        </td>\n        <td class="cart__table-item-price">\n            ${e.price}<i class="ml-1 fas fa-ruble-sign"></i>\n        </td>\n        <td class="cart__table-item-quantity">\n          <input type="number" class="cart__table-item-quantity-input" name="amount" value="${e.amount}" min="1">\n        </td>\n        <td class="cart__table-item-delete">\n          <i class="fas fa-times"></i>\n        </td>\n      </tr>\n    `}),document.querySelectorAll(".cart__table-item").forEach(e=>{const t=e.querySelector(".cart__table-item-quantity");t.addEventListener("change",()=>{o(t.parentElement,t.querySelector("input").value),r()});const a=e.querySelector(".cart__table-item-delete");a.addEventListener("click",e=>{e.preventDefault(),c(a.parentElement),r()})});const t=()=>{const e=document.querySelectorAll(".cart__table-item"),t=document.querySelector(".cart__order-form-info"),a=document.querySelector(".cart__order-total-cost").textContent;t.value="",e.forEach(e=>{const a=e.querySelector(".cart__table-item-name").textContent.trim(),r=e.querySelector(".cart__table-item-article").textContent.trim(),o=e.querySelector(".cart__table-item-price").textContent.trim(),c=e.querySelector(".cart__table-item-quantity-input").value;t.value+=`Назв.: ${a}, Арт.: ${r}, Цена за шт.: ${o}, Кол-во: ${c}\n`}),t.value+=`Итого: ${a}`},a=document.querySelector(".cart__order-total-cost"),r=()=>{const e=document.querySelectorAll(".cart__table-item");let r=0;e.forEach(e=>{const t=e.querySelector(".cart__table-item-price").textContent.trim(),a=e.querySelector(".cart__table-item-quantity-input").value;r+=t*a}),a.innerHTML=`${r}<i class="ml-1 fas fa-ruble-sign"></i>`,t()};r();const o=(e,a)=>{let r=0;for(let t=0;t<addToCartArray.length;t++){const a=e.querySelector(".cart__table-item-article").textContent.trim();if(addToCartArray[t].article.includes(a))break;r++}addToCartArray[r].amount=a,localStorage.setItem("cart-items",JSON.stringify(addToCartArray)),t()},c=a=>{a.remove();let r=0;for(let e=0;e<addToCartArray.length;e++){const t=a.querySelector(".cart__table-item-article").textContent.trim();if(addToCartArray[e].article.includes(t))break;r++}addToCartArray.splice(r,1),localStorage.setItem("cart-items",JSON.stringify(addToCartArray)),t(),e()}}