const searchIcon = document.querySelector(".search-icon");
const inputSearch = document.querySelector(".search-input");
searchIcon.addEventListener("click", () => {
  inputSearch.value = "";
  inputSearch.classList.toggle("widthfull");
  inputSearch.classList.toggle("widthz");
});
/* =============== START SLIDER ===============*/

const nextBTN = document.querySelector(".next");
const backBTN = document.querySelector(".back");
const sliderDOM = document.querySelector(".slider-imgs");
const sliders = Array.from(sliderDOM.children);

const sliderAbsolute = 100;
let CurrentSlider = 1;

const SLiderFlow = () => {
  sliders.forEach((slider, i) => {
    slider.style.left = (i - CurrentSlider) * sliderAbsolute + "%";
  });
};
SLiderFlow();

nextBTN.addEventListener("click", () => {
  CurrentSlider = (CurrentSlider + 1) % sliders.length;
  SLiderFlow();
});
backBTN.addEventListener("click", () => {
  CurrentSlider = (CurrentSlider - 1 + sliders.length) % sliders.length;
  SLiderFlow();
});

/* =============== END SLIDER ===============*/

/* =============== START PAGINATION ===============*/
const paginationPrevBTN = document.querySelector(".btn-pervios");
const paginationNextBTN = document.querySelector(".btn-next");
const pagesNumDOM = document.querySelector(".pages");
let ProductsCurrentPage = 1;
let MaxPages = 5;
let ProductsPerPage = 3;
const handelNextBTN = (lengthOfPages) => {
  if (ProductsCurrentPage === parseInt(lengthOfPages)) return;
  ProductsCurrentPage++;
  LoadPaginationCurrent();
  ActiveBtnHandel(ProductsCurrentPage);
};
const handelPrevBTN = () => {
  if (ProductsCurrentPage === 1) return;
  ProductsCurrentPage--;
  LoadPaginationCurrent();
  ActiveBtnHandel(ProductsCurrentPage);
};
const ActiveBtnHandel = (index) => {
  const numbers = document.querySelectorAll(".paginat-btn");
  numbers.forEach((ele, i) => {
    if (+ele.innerText !== index) ele.classList.remove("active");
    else ele.classList.add("active");
  });
};
const PaginationNumbersClick = () => {
  const numbers = document.querySelectorAll(".paginat-btn");
  numbers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      ActiveBtnHandel(+e.target.innerText);
      ProductsCurrentPage = +e.target.innerText;
      LoadPaginationCurrent();
    });
  });
};

const CreatePageNumbers = (lengthOfProducts) => {
  const Num = parseInt(
    (lengthOfProducts + ProductsPerPage - 1) / ProductsPerPage
  );
  paginationPrevBTN.addEventListener("click", handelPrevBTN);
  paginationNextBTN.addEventListener("click", () => handelNextBTN(Num));
};
const UPDATE = (lengthOfProducts) => {
  const Num = parseInt(
    (lengthOfProducts + ProductsPerPage - 1) / ProductsPerPage
  );
  let NumDOM = "<ul>",
    numtosubtract = MaxPages > 5 ? MaxPages - 4 : 1,
    first = ProductsCurrentPage - numtosubtract,
    last = ProductsCurrentPage + numtosubtract;
  if (first <= 0) (first = 1), last++;
  if (last > Num) last = Num;
  if (first > 1) {
    NumDOM += `<li ><button class="paginat-btn "  >1</button></li>`;
    if (first > 2) {
      NumDOM += `<li >...</li>`;
    }
  }
  for (let index = first; index <= last; index++) {
    NumDOM += `<li ><button class="paginat-btn"  >${index}</button></li>`;
  }
  if (last < Num) {
    if (last < Num - 1) {
      NumDOM += `<li >...</li>`;
    }
    NumDOM += `<li ><button class="paginat-btn "  >${Num}</button></li>`;
  }
  NumDOM += "<ul/>";
  pagesNumDOM.innerHTML = NumDOM;
  PaginationNumbersClick();
};
const LoadPaginationCurrent = () => {
  const lastIndex = ProductsCurrentPage * ProductsPerPage;
  const firstIndex = lastIndex - ProductsPerPage;
  const newProducts = FilteredProducts.slice(firstIndex, lastIndex);
  let productsHtml = "";

  newProducts.forEach((product, i) => {
    productsHtml += `  
    <div class="product">
    <div class="image"><img src=${product.img} alt="" /></div>
    <div class="info">
      <div class="ratings">
        <span class="material-symbols-outlined"> star </span
        ><span class="material-symbols-outlined"> star </span
        ><span class="material-symbols-outlined"> star </span
        ><span class="material-symbols-outlined"> star </span>
        <span class="material-symbols-outlined"> star </span>
      </div>
      <h3>${product.name}</h3>
      <span>$${product.price}</span>
      <button onclick="ADDTOCART(${lastIndex - (3 - i)})">Add To Cart</button>
    </div>
  </div>`;
  });
  productsDOM.innerHTML = productsHtml;
  UPDATE(FilteredProducts.length);
  ActiveBtnHandel(ProductsCurrentPage);
};
/* =============== END PAGINATION ===============*/

/* =============== START PRODUCTS ===============*/

const productsDOM = document.querySelector(".products");
const filterList = Array.from(document.querySelector(".filter").children);
const SaveCart = (cartL) => localStorage.setItem("cart", JSON.stringify(cartL));
const GetCart = () =>
  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

let products = [],
  FilteredProducts = [],
  cart = GetCart();
inputSearch.addEventListener("input", (e) => {
  // console.log(e.target.value);
  FilteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  filterList.forEach((filter) => {
    if (filter.classList.contains("active")) {
      if (filter.innerText === "Latest") {
        FilteredProducts = FilteredProducts;
      } else if (filter.innerText === "Lowest") {
        FilteredProducts = FilteredProducts.slice().sort(
          (a, b) => a.price - b.price
        );
      } else {
        FilteredProducts = FilteredProducts.slice().sort(
          (a, b) => b.price - a.price
        );
      }
    }
  });
  ProductsCurrentPage = 1;
  LoadPaginationCurrent();
});
filterList.forEach((filter) => {
  filter.addEventListener("click", () => {
    filterList.forEach((e) => e.classList.remove("active"));
    filter.classList.add("active");
    if (filter.innerText === "Latest") {
      FilteredProducts = products;
    } else if (filter.innerText === "Lowest") {
      FilteredProducts = products.slice().sort((a, b) => a.price - b.price);
    } else {
      FilteredProducts = products.slice().sort((a, b) => b.price - a.price);
    }
    FilteredProducts = products.filter((item) =>
      item.name.toLowerCase().includes(inputSearch.value.toLowerCase())
    );
    // console.log(inputSearch.value);
    ProductsCurrentPage = 1;
    LoadPaginationCurrent();
  });
});
/* Fetch Products From Products.json */
const FetchPRODUCTS = async () => {
  const res = await fetch("./js/products.json");
  const data = await res.json();
  products = data.products;
  FilteredProducts = data.products;
};

/* Load Products In Html AFter Fetching */
const LoadProducts = () => {
  LoadPaginationCurrent();
  CreatePageNumbers(FilteredProducts.length);
};

/*Async Operation Waits until data is arrived from .json file and load it*/
document.addEventListener("DOMContentLoaded", () => {
  FetchPRODUCTS().then(() => {
    LoadProducts();
    HandleCntCart();
  });
});

/* =============== END PRODUCTS ===============*/
/* =============== START Cart ===============*/
const cartDOM = document.querySelector(".cart-products");
const cartSHOW = document.querySelector(".cart-page");
const cartOPEN = document.querySelector(".cart-menu");
const cartCLOSE = document.querySelector(".closeCART");
const cartCNT = document.querySelector(".cart-cnt");
const TOTAL = document.querySelector(".total");
const WRAPPER = document.querySelector(".cart-wrapper");
cartOPEN.addEventListener("click", () => {
  cartSHOW.classList.add("displayBlock");
  LOADCART();
  handleTotal();
});
cartCLOSE.addEventListener("click", () => {
  cartSHOW.classList.remove("displayBlock");
  HandleCntCart();
});
WRAPPER.addEventListener("click", () => {
  cartSHOW.classList.remove("displayBlock");
  HandleCntCart();
});
const HandleCntCart = () => {
  cartCNT.innerText = cart.length;
};
const cartProductPlusHandle = (e) => {
  const plusCartProduct = document.querySelectorAll(".cart-plus");
  plusCartProduct.forEach((btn) => {
    btn.addEventListener("click", () => {
      cart.forEach((item) => {
        if (item.product.id === +btn.dataset.id) {
          item.amount++;
        }
      });
      btn.previousElementSibling.innerText++;
      SaveCart(cart);
      handleTotal();
    });
  });
};

const cartProductMinusHandle = (e) => {
  const MinusCartProduct = document.querySelectorAll(".cart-minus");
  MinusCartProduct.forEach((btn) => {
    btn.addEventListener("click", () => {
      cart.forEach((item) => {
        if (item.product.id === +btn.dataset.id) {
          if (item.amount === 1) {
            cart = cart.filter((item) => item.product.id !== +btn.dataset.id);
            DeleteChild(btn);
          } else {
            item.amount--;
            btn.nextElementSibling.innerText--;
          }
        }
      });
      SaveCart(cart);
      handleTotal();
    });
  });
};
const cartProductRemoveHandle = (e) => {
  const RemoveCartProduct = document.querySelectorAll(".cart-remove");
  RemoveCartProduct.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn.dataset.id);
      cart = cart.filter((item) => item.product.id !== +btn.dataset.id);
      DeleteChild(btn);
      SaveCart(cart);
      handleTotal();
    });
  });
};
const DeleteChild = (child) => {
  let parent = child.closest(".cart-products");
  parent.removeChild(child.closest(".cart-product"));
};
const handleTotal = () => {
  let tot = 0;
  cart.forEach((item) => {
    tot += item.amount * item.product.price;
  });
  TOTAL.innerText = tot;
};
const LOADCART = () => {
  let CartHtml = cart.map(
    (item, i) => ` <div class="cart-product">
  <img src=${item.product.img} alt="" />
  <div class="info">
    <h1>${item.product.name}</h1>
    <p>$${item.product.price}</p>
    <div class="amount">
      <span class="material-symbols-outlined cart-minus "  data-id=${item.product.id}>
        remove
      </span>
      <p>${item.amount}</p>
      <span class="material-symbols-outlined cart-plus" data-id=${item.product.id}>
        add
      </span>
    </div>
  </div>
  <span class="material-symbols-outlined cart-remove" data-id=${item.product.id}> close </span>
</div>`
  );
  cartDOM.innerHTML = CartHtml.join("");
  cartProductPlusHandle();
  cartProductMinusHandle();
  cartProductRemoveHandle();
};
const ADDTOCART = (i) => {
  const productToADD = { amount: 1, product: products[i] };
  let inCart = 0;
  cart.forEach((item) => {
    if (item.product === products[i]) {
      inCart = 1;
      item.amount++;
    }
  });
  if (!inCart) cart.push(productToADD);
  SaveCart(cart);
  HandleCntCart();
};

/* =============== END Cart ===============*/
