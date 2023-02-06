const productsDOM = document.querySelector(".products");
let products = [],
  cart = [];

/*======== Fetch Products From Products.json ===========*/
const FetchPRODUCTS = async () => {
  const res = await fetch("./js/products.json");
  const data = await res.json();
  products = data.products;
};

/*======== Load Products In Html AFter Fetching ===========*/
const LoadProducts = () => {
  let productsHtml = "";
  products.forEach((product, i) => {
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
      <button data-indx=${i}>Add To Cart</button>
    </div>
  </div>`;
  });
  productsDOM.innerHTML = productsHtml;
};

/*======== Async Operation Waits until data is arrived from .json file and load it ===========*/
FetchPRODUCTS().then(() => LoadProducts());
