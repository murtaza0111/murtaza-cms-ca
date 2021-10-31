let productsContainer = document.querySelector(".products_row");


let url = `https://flowerpower.seedtotree.info/flowerpower/wp-json/wp/v2/product`;




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
    if(index < 5)
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
                        <p>${value.content.rendered} </p>
                        <a href="product_details.html?id=${index}" class="btn-card">Details</a>
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


