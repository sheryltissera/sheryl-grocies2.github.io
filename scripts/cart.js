
let cart1 = [];

//add product to cart and save to localStorage
function appendToCart(productName, price, imageSrc, quantity) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push({ productName, price, imageSrc, quantity });
    localStorage.setItem("cart", JSON.stringify(cartItems));
}

//update the total price of a row
function updateTotalPrice(row, price) {
    const quantity = row.querySelector(".quantity-input").value;
    const totalPriceCell = row.querySelector(".total-price");
    const priceNumber = parseFloat(price.replace("Rs ", "").replace(" / KG", ""));
    const totalPrice = priceNumber * quantity;
    totalPriceCell.innerText = `Rs ${totalPrice.toFixed(2)}`;
    updateGrandTotal();
}

//grand total price
function updateGrandTotal() {
    let grandTotal = 0;
    document.querySelectorAll(".total-price").forEach((cell) => {
        grandTotal += parseFloat(cell.innerText.replace("Rs ", ""));
    });
    document.getElementById("grand-total").innerText = `Rs ${grandTotal.toFixed(2)}`;
}

//remove row from cart table and update localStorage
function removeFromCart(row) {
    const productName = row.querySelector("td").innerText;
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems = cartItems.filter(item => item.productName !== productName);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    row.remove();
    updateGrandTotal();
}

//add product to the cart table
function addToCart(productName, price, imageSrc, quantity = 1) {
    const tableBody = document.getElementById("cart-table-body");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${productName}</td>
        <td>${price}</td>
        <td><img src="${imageSrc}" alt="${productName}" style="width: 50px; height: auto;"></td>
        <td>
            <input type="number" value="${quantity}" min="1" class="quantity-input">
            <button class="save-btn">Save</button>
        </td>
        <td class="total-price">${price}</td>
        <td><button class="remove-btn">Del</button></td>
    `;
    tableBody.appendChild(row);

    // quantity input
    row.querySelector(".quantity-input").addEventListener("input", function () {
        updateTotalPrice(row, price);
    });

    //save button
    row.querySelector(".save-btn").addEventListener("click", function () {
        saveQuantity(row, productName);
    });

    //remove button
    row.querySelector(".remove-btn").addEventListener("click", function () {
        removeFromCart(row);
    });

    updateTotalPrice(row, price);
}

//save the quantity to localStorage
function saveQuantity(row, productName) {
    const quantity = row.querySelector(".quantity-input").value;
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Find the item in the cart and update its quantity
    cartItems = cartItems.map(item => {
        if (item.productName === productName) {
            item.quantity = quantity;
        }
        return item;
    });

    localStorage.setItem("cart", JSON.stringify(cartItems));
    
}

//load cart items from localStorage
function loadCartFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.forEach(item => {
        addToCart(item.productName, item.price, item.imageSrc, item.quantity);
    });
}

//load favorites into the cart
function loadFavoritesToCart() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.forEach((product) => {
        addToCart(product.productName, product.price, product.imageSrc, product.quantity);
    });
}

//save the current cart as favorites
function saveOrderAsFavorite() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("favorites", JSON.stringify(cartItems));
    alert("Order saved as favorite!");
}

//"Apply Fav" button
document.getElementById("apply-fav").addEventListener("click", function () {
  // Clear current cart
  const tableBody = document.getElementById("cart-table-body");
  if (tableBody) {
      tableBody.innerHTML = ''; // Clear existing cart items
  }

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  // Clear current cart items from localStorage
  localStorage.setItem("cart", JSON.stringify([]));
  
  // Add favorites to the cart
  favorites.forEach(item => {
      appendToCart(item.productName, item.price, item.imageSrc, item.quantity);
      addToCart(item.productName, item.price, item.imageSrc, item.quantity);
  });
  

});



// "Save order" button
document.getElementById("save-order").addEventListener("click", function () {
    saveOrderAsFavorite();
    
});




// Dairy Product Information
const dairyProducts = {
  "Ambewela Chocolate Milk": { price: 580, image: "../image/Dairy/Ambewela Chocolate Milk.webp" },
  "Ambewela Non Fat Milk": { price: 550, image: "../image/Dairy/Ambewela Non Fat Milk.webp" },
  "Kotmale Faluda Flav Milk": { price: 620, image: "../image/Dairy/Kotmale Faluda Flav Milk.webp" },
  "H.Cow Slices 200g": { price: 1780, image: "../image/Dairy/Happy Cow Cheddar Slices 200g.webp" },
  "Happy cow cheese": { price: 1790, image: "../image/Dairy/Happy cow cheese.webp" },
  "K. Cheese Spread 175g": { price: 880, image: "../image/Dairy/Kotmale Cheese Spread 175g.webp" },
};

document.getElementById("dairy_dropdown").addEventListener("change", function () {
  const selectedProduct = this.value;
  const productDetails = dairyProducts[selectedProduct];
  if (productDetails) {
      document.getElementById("dairy-product-details").innerHTML = `
          <h3>${selectedProduct}</h3>
          <img src="${productDetails.image}" alt="${selectedProduct}">
          <p>Price: Rs ${productDetails.price}</p>
      `;
  }
});

document.querySelector(".cbox:nth-child(1) .cart-btn").addEventListener("click", function () {
  const selectedProduct = document.getElementById("dairy_dropdown").value;
  const productDetails = dairyProducts[selectedProduct];
  if (productDetails) {
      const productName = selectedProduct;
      const price = `Rs ${productDetails.price}`;
      const imageSrc = productDetails.image;
      const quantity = 1;
      appendToCart(productName, price, imageSrc, quantity);
      addToCart(productName, price, imageSrc, quantity);
  }
});

// Vegetable Product Information
const vegetableProducts = {
  "Celery 1KG": { price: 800, image: "../image/Vegetables/Celery.webp" },
  "Cabbage 1KG": { price: 144, image: "../image/Vegetables/Cabbage.webp" },
  "Pumpkin 1KG": { price: 60, image: "../image/Vegetables/Pumpkin.webp" },
  "Tomatoes 1KG": { price: 480, image: "../image/Vegetables/Tomatoes.webp" },
  "Green Beans 1KG": { price: 304, image: "../image/Vegetables/Green Beans (1).webp" },
  "Cauliflower 1KG": { price: 1100, image: "../image/Vegetables/Cauliflower.webp" },
};

document.getElementById("vege_dropdown").addEventListener("change", function () {
  const selectedProduct = this.value;
  const productDetails = vegetableProducts[selectedProduct];
  if (productDetails) {
      document.getElementById("vege-product-details").innerHTML = `
          <h3>${selectedProduct}</h3>
          <img src="${productDetails.image}" alt="${selectedProduct}">
          <p>Price: Rs ${productDetails.price}</p>
      `;
  }
});

document.querySelector(".cbox:nth-child(2) .cart-btn").addEventListener("click", function () {
  const selectedProduct = document.getElementById("vege_dropdown").value;
  const productDetails = vegetableProducts[selectedProduct];
  if (productDetails) {
      const productName = selectedProduct;
      const price = `Rs ${productDetails.price}`;
      const imageSrc = productDetails.image;
      const quantity = 1;
      appendToCart(productName, price, imageSrc, quantity);
      addToCart(productName, price, imageSrc, quantity);
  }
});

// Fruit Product Information
const fruitProducts = {
  "Apple 1KG": { price: 850, image: "../image/fruits/Apple 1KG.png" },
  "Banana 1KG": { price: 305, image: "../image/fruits/Banana 1KG.png" },
  "Grapes 1 KG": { price: 2300, image: "../image/fruits/Grapes 1KG.png" },
  "Mango 1KG": { price: 545, image: "../image/fruits/Mango 1KG.png" },
  "Papaya 1KG": { price: 304, image: "../image/fruits/Papaya 1KG.png" },
  "Avocado 1KG": { price: 450, image: "../image/fruits/Avacado 1KG.png" },
};

document.getElementById("fruit_dropdown").addEventListener("change", function () {
  const selectedProduct = this.value;
  const productDetails = fruitProducts[selectedProduct];
  if (productDetails) {
      document.getElementById("fruit-product-details").innerHTML = `
          <h3>${selectedProduct}</h3>
          <img src="${productDetails.image}" alt="${selectedProduct}">
          <p>Price: Rs ${productDetails.price}</p>
      `;
  }
});

document.querySelector(".cbox:nth-child(3) .cart-btn").addEventListener("click", function () {
  const selectedProduct = document.getElementById("fruit_dropdown").value;
  const productDetails = fruitProducts[selectedProduct];
  if (productDetails) {
      const productName = selectedProduct;
      const price = `Rs ${productDetails.price}`;
      const imageSrc = productDetails.image;
      const quantity = 1;
      appendToCart(productName, price, imageSrc, quantity);
      addToCart(productName, price, imageSrc, quantity);
  }
});


// Meat Product Information
const meatProducts = {
  "Whole Chicken 1KG": { price: 1380, image: "../image/Meats/skinless chicken 1KG.png" },
  "Sausages 1KG": { price: 1100, image: "../image/Meats/Sausages 1KG.png" },
  "Prawns 1 KG": { price: 1590, image: "../image/Meats/Prawns 1KG.png" },
  "Fish 1KG": { price: 875, image: "../image/Meats/Fish 1KG.png" },
};

document.getElementById("m_s_dropdown").addEventListener("change", function () {
  const selectedProduct = this.value;
  const productDetails = meatProducts[selectedProduct];
  if (productDetails) {
      document.getElementById("meat-seafood-product-details").innerHTML = `
          <h3>${selectedProduct}</h3>
          <img src="${productDetails.image}" alt="${selectedProduct}">
          <p>Price: Rs ${productDetails.price}</p>
      `;
  }
});

document.querySelector(".cbox:nth-child(4) .cart-btn").addEventListener("click", function () {
  const selectedProduct = document.getElementById("m_s_dropdown").value;
  const productDetails = meatProducts[selectedProduct];
  if (productDetails) {
      const productName = selectedProduct;
      const price = `Rs ${productDetails.price}`;
      const imageSrc = productDetails.image;
      const quantity = 1;
      appendToCart(productName, price, imageSrc, quantity);
      addToCart(productName, price, imageSrc, quantity);
  }
});

// Ingredients Product Information
const ingProducts = {
  "Baking Powder": {
    price: 350,
    image: "../image/Baking/Baking Powder.png",
  },
  "Chilli Powder": {
    price: 260,
    image: "../image/Baking/Chilli Powder.png",
  },
  "Corn Flour": {
    price: 135,
    image: "../image/Baking/Corn Flour.png",
  },
  "Crystal Salt": {
    price: 135,
    image: "../image/Baking/Crystal Salt.png",
  },
  "Essence Vanilla": {
    price: 165,
    image: "../image/Baking/Essence Vanilla.png",
  },
  "Icing Sugar": {
    price: 240,
    image: "../image/Baking/Icing Sugar.png",
  },
};

document.getElementById("ing_dropdown").addEventListener("change", function () {
  const selectedProduct = this.value;
  const productDetails = ingProducts[selectedProduct];
  if (productDetails) {
      document.getElementById("ingredient-product-details").innerHTML = `
          <h3>${selectedProduct}</h3>
          <img src="${productDetails.image}" alt="${selectedProduct}">
          <p>Price: Rs ${productDetails.price}</p>
      `;
  }
});

document.querySelector(".cbox:nth-child(5) .cart-btn").addEventListener("click", function () {
  const selectedProduct = document.getElementById("ing_dropdown").value;
  const productDetails = ingProducts[selectedProduct];
  if (productDetails) {
      const productName = selectedProduct;
      const price = `Rs ${productDetails.price}`;
      const imageSrc = productDetails.image;
      const quantity = 1;
      appendToCart(productName, price, imageSrc, quantity);
      addToCart(productName, price, imageSrc, quantity);
  }
});