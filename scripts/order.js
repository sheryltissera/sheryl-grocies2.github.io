function updateTheCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const tableBody = document.getElementById("order-table-body");

  tableBody.innerHTML = ""; // Clear existing rows

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    const priceNumber = parseFloat(item.price.replace("Rs ", "").replace(",", ""));
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
    const totalPrice = parseFloat(row.cells[3].innerText.replace("Rs ", "").replace(",", ""));
    grandTotal += totalPrice;
  });
  document.getElementById("grand-total").innerText = `Rs ${grandTotal.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", updateTheCart);

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Example validation: check if all required fields are filled
  const requiredFields = document.querySelectorAll('input[required], textarea[required]');
  for (const field of requiredFields) {
    if (field.value.trim() === "") {
      alert("Please fill out all fields.");
      return;
    }
  }

  // Calculate delivery date (7 days from today)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString();

  // Display thank you message with delivery date
  alert(`Thank you for your purchase! Your items will be delivered by ${formattedDeliveryDate}.`);
});
