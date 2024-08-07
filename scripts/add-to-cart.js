// Function to add item to favorites
function addToFav(name, price, image) {
    // Create a product object
    const product = {
        name: name,
        price: price,
        image: image,
        totalPrice: price
    };

    // Get existing favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the product is already in favorites
    const existingProduct = favorites.find(item => item.name === name);
    if (existingProduct) {
        // If already in favorites, update total price
        existingProduct.totalPrice += price;
    } else {
        // If not in favorites, add the new product
        favorites.push(product);
    }

    // Save updated favorites back to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`${name} has been added to your favorites!`);
}

// Function to remove item from favorites
function removeFromFav(name) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(product => product.name !== name);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

// Function to load favorites into the table on the favorites page
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const tableBody = document.getElementById('fav-table-body');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Populate table with favorites
    favorites.forEach(product => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;

        const priceCell = document.createElement('td');
        priceCell.textContent = `Rs ${product.price.toFixed(2)}`;

        const imageCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.style.width = '50px';  // Adjust size as needed
        imageCell.appendChild(img);

        const totalPriceCell = document.createElement('td');
        totalPriceCell.textContent = `Rs ${product.totalPrice.toFixed(2)}`;

        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromFav(product.name);
        removeCell.appendChild(removeButton);

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(imageCell);
        row.appendChild(totalPriceCell);
        row.appendChild(removeCell);

        tableBody.appendChild(row);
    });
}

// Call loadFavorites on page load
document.addEventListener('DOMContentLoaded', loadFavorites);

