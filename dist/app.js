"use strict";
let products = [
    {
        id: 1,
        name: "Face Serum",
        category: "Skincare",
        price: 599,
        quantity: 15
    },
    {
        id: 2,
        name: "Lipstick",
        category: "Makeup",
        price: 399,
        quantity: 20
    },
    {
        id: 3,
        name: "Sunscreen",
        category: "Skincare",
        price: 699,
        quantity: 12
    }
];
function calculateInventoryValue() {
    let total = 0;
    for (const product of products) {
        total += product.price * product.quantity;
    }
    return total;
}
function getStockStatus(quantity) {
    if (quantity <= 5) {
        return "Low Stock";
    }
    else if (quantity <= 10) {
        return "Medium Stock";
    }
    else {
        return "In Stock";
    }
}
function displayProducts() {
    const productList = document.getElementById("productList");
    if (!productList)
        return;
    productList.innerHTML = "";
    for (const product of products) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td><strong>${product.name}</strong></td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
            <td>${product.quantity}</td>
            <td>₹${product.price * product.quantity}</td>
            <td>
                <span class="status ${getStockStatus(product.quantity)
            .toLowerCase()
            .replace(" ", "-")}">
                    ${getStockStatus(product.quantity)}
                </span>
            </td>
        `;
        productList.appendChild(row);
    }
    updateSummary();
}
function updateSummary() {
    const totalProducts = document.getElementById("totalProducts");
    const totalItems = document.getElementById("totalItems");
    const totalValue = document.getElementById("totalValue");
    let itemCount = 0;
    for (const product of products) {
        itemCount += product.quantity;
    }
    if (totalProducts) {
        totalProducts.textContent = products.length.toString();
    }
    if (totalItems) {
        totalItems.textContent = itemCount.toString();
    }
    if (totalValue) {
        totalValue.textContent = `₹${calculateInventoryValue()}`;
    }
}
function addProduct() {
    const nameInput = document.getElementById("productName");
    const categoryInput = document.getElementById("category");
    const priceInput = document.getElementById("price");
    const quantityInput = document.getElementById("quantity");
    const name = nameInput.value.trim();
    const category = categoryInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    if (!name || !category || price <= 0 || quantity <= 0) {
        alert("Please enter valid product details.");
        return;
    }
    const newProduct = {
        id: products.length + 1,
        name,
        category,
        price,
        quantity
    };
    products.push(newProduct);
    nameInput.value = "";
    categoryInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
    displayProducts();
}
const addButton = document.getElementById("addProduct");
if (addButton) {
    addButton.addEventListener("click", addProduct);
}
displayProducts();
