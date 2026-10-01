interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

let products: Product[] = [
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

function calculateInventoryValue(): number {
    let total = 0;

    for (const product of products) {
        total += product.price * product.quantity;
    }

    return total;
}

function getStockStatus(quantity: number): string {
    if (quantity <= 5) {
        return "Low Stock";
    } else if (quantity <= 10) {
        return "Medium Stock";
    } else {
        return "In Stock";
    }
}

function displayProducts(): void {
    const productList = document.getElementById("productList");

    if (!productList) return;

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

function updateSummary(): void {
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

function addProduct(): void {
    const nameInput = document.getElementById("productName") as HTMLInputElement;
    const categoryInput = document.getElementById("category") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const quantityInput = document.getElementById("quantity") as HTMLInputElement;

    const name = nameInput.value.trim();
    const category = categoryInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);

    if (!name || !category || price <= 0 || quantity <= 0) {
        alert("Please enter valid product details.");
        return;
    }

    const newProduct: Product = {
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