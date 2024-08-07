function updateTheCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const tableBody = document.getElementById("order-table-body");

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    const priceNumber = parseFloat(item.price.replace("Rs ", "").replace(" / KG", ""));
    const totalPrice = priceNumber * item.quantity;

    row.innerHTML = `
      <td>${item.productName}</td>
      <td>${item.price}</td>
      <td>${item.quantity}</td>
      <td>Rs ${totalPrice.toFixed(2)}</td>
    `;

    tableBody.appendChild(row);
  });

  updateGrandTotal();
}

function updateGrandTotal() {
  let grandTotal = 0;
  document.querySelectorAll("#order-table-body tr").forEach((row) => {
    const totalPrice = parseFloat(row.cells[3].innerText.replace("Rs ", ""));
    grandTotal += totalPrice;
  });
  document.getElementById("grand-total").innerText = `Rs ${grandTotal.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", updateTheCart);
