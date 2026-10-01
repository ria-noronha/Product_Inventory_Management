"use strict";
// Basic Types
let nextId = 7;
let storeName = "Beauty Product Inventory";
let isInventoryActive = true;
// Array of beauty products
let products = [
    {
        id: 1,
        name: "Lipstick",
        category: "Makeup",
        price: 599,
        quantity: 12
    },
    {
        id: 2,
        name: "Face Serum",
        category: "Skincare",
        price: 799,
        quantity: 8
    },
    {
        id: 3,
        name: "Moisturizer",
        category: "Skincare",
        price: 499,
        quantity: 15
    },
    {
        id: 4,
        name: "Perfume",
        category: "Fragrance",
        price: 1299,
        quantity: 6
    },
    {
        id: 5,
        name: "Shampoo",
        category: "Hair Care",
        price: 349,
        quantity: 10
    },
    {
        id: 6,
        name: "Sunscreen",
        category: "Skincare",
        price: 549,
        quantity: 9
    }
];
// Getting HTML elements
const productForm = document.getElementById("productForm");
const productTableBody = document.getElementById("productTableBody");
const totalProductsElement = document.getElementById("totalProducts");
const totalStockElement = document.getElementById("totalStock");
const inventoryValueElement = document.getElementById("inventoryValue");
// Function to display all products
function displayProducts() {
    productTableBody.innerHTML = "";
    products.forEach((product) => {
        const row = document.createElement("tr");
        // Tailwind classes for table row
        row.className =
            "border-b border-pink-100 hover:bg-pink-50 transition";
        row.innerHTML = `
            <td class="p-4 font-semibold text-gray-800">
                ${product.name}
            </td>

            <td class="p-4 text-gray-600">
                ${product.category}
            </td>

            <td class="p-4 font-medium text-gray-700">
                ₹${product.price.toFixed(2)}
            </td>

            <td class="p-4">
                <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                    ${product.quantity}
                </span>
            </td>

            <td class="p-4">
                <button
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    onclick="deleteProduct(${product.id})">
                    Delete
                </button>
            </td>
        `;
        productTableBody.appendChild(row);
    });
    updateSummary();
}
// Function to add a new product
function addProduct(name, category, price, quantity) {
    const newProduct = {
        id: nextId,
        name: name,
        category: category,
        price: price,
        quantity: quantity
    };
    products.push(newProduct);
    nextId++;
    displayProducts();
}
// Function to delete a product
function deleteProduct(id) {
    products = products.filter((product) => product.id !== id);
    displayProducts();
}
// Function to calculate total inventory value
function calculateInventoryValue() {
    let totalValue = 0;
    products.forEach((product) => {
        // Local scope variable
        const productValue = product.price * product.quantity;
        totalValue += productValue;
    });
    return totalValue;
}
// Function to calculate total stock
function calculateTotalStock() {
    let totalStock = 0;
    products.forEach((product) => {
        totalStock += product.quantity;
    });
    return totalStock;
}
// Function to update inventory summary
function updateSummary() {
    // Local scope variable
    const totalProducts = products.length;
    const totalStock = calculateTotalStock();
    const inventoryValue = calculateInventoryValue();
    totalProductsElement.textContent =
        totalProducts.toString();
    totalStockElement.textContent =
        totalStock.toString();
    inventoryValueElement.textContent =
        `₹${inventoryValue.toFixed(2)}`;
}
// Form submit event
productForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Local variables
    const nameInput = document.getElementById("productName");
    const categoryInput = document.getElementById("category");
    const priceInput = document.getElementById("price");
    const quantityInput = document.getElementById("quantity");
    const name = nameInput.value.trim();
    const category = categoryInput.value;
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    // Validation
    if (name === "" ||
        category === "" ||
        price <= 0 ||
        quantity < 0) {
        alert("Please enter valid product details.");
        return;
    }
    addProduct(name, category, price, quantity);
    productForm.reset();
});
// Initial display
if (isInventoryActive) {
    console.log(`${storeName} is active.`);
    displayProducts();
}
