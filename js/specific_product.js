let CatContainerHome = document.querySelector(".products_row");

let queryString = document.location.search;
const params = new URLSearchParams(queryString);
const paramID = params.get("id");

if (paramID >= 20) {
  location.replace("index.html");
}
let productsContainer = document.querySelector(".products_row");


let url = `https://flowerpower.seedtotree.info/flowerpower/wp-json/wp/v2/product?id=${paramID}`;




async function fetchData() {
  productsContainer.innerHTML = "<h2>fetching products...</h2>";
  try {
    if (!("fetch" in window)) {
      console.log("Fetch API not found, try including the polyfill");
      return;
    }
    let response = await fetch(url);
    let result = await response.json();
    console.log(result);
    productsContainer.innerHTML = "";
    if (result[0].title === undefined) {
      productsContainer.innerHTML = "<h2>No Product Found!!!</h2>";
      return;
    }
    showProducts(result);
  } catch (error) {
    showMessage(productsContainer, error, "red");
  }
}
fetchData();

const showProducts = (data) => {
  data.map((value, index) => {
    if(paramID == index)
    {
    productsContainer.innerHTML += `<div class="card card_main">
                    <div class="card-image">
                        <a href="shop.html">

                         <img src="./../img/products/${index}.jpg" alt="Card Image">
                          </a>
                    </div>
                    <div class="card-description">
                        <a href="product_details.html?id=${index}">
                                                 <h2>${value.title.rendered}</h2>
                        </a>
                        <p>${value.content.rendered} <h3>50$</h3></p>
         <a class="btn-card" href="cart.html?id=${index}">Add to Cart</a>
                    </div>
                </div>`;
    return productsContainer;
    }
  });
};

function showMessage(field, errorMessage, messageColor) {
  field.style.display = "block";
  field.style.color = messageColor;
  field.style.textAlign = "center";
  field.style.fontSize = "2rem";
  field.style.background = "#88888855";
  field.style.border = `1px solid ${messageColor}`;
  field.innerHTML = errorMessage;
}

