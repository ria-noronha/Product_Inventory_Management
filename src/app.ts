
// Interface to define the structure of a Product
interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

// Basic Types
let nextId: number = 7;
let storeName: string = "Beauty Product Inventory";
let isInventoryActive: boolean = true;

// Array of beauty products
let products: Product[] = [
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
const productForm =
    document.getElementById("productForm") as HTMLFormElement;

const productTableBody =
    document.getElementById("productTableBody") as HTMLTableSectionElement;

const totalProductsElement =
    document.getElementById("totalProducts") as HTMLElement;

const totalStockElement =
    document.getElementById("totalStock") as HTMLElement;

const inventoryValueElement =
    document.getElementById("inventoryValue") as HTMLElement;


// Function to display all products
function displayProducts(): void {

    productTableBody.innerHTML = "";

    products.forEach((product: Product) => {

        const row: HTMLTableRowElement =
            document.createElement("tr");

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
function addProduct(
    name: string,
    category: string,
    price: number,
    quantity: number
): void {

    const newProduct: Product = {
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
function deleteProduct(id: number): void {

    products = products.filter(
        (product: Product) => product.id !== id
    );

    displayProducts();
}


// Function to calculate total inventory value
function calculateInventoryValue(): number {

    let totalValue: number = 0;

    products.forEach((product: Product) => {

        // Local scope variable
        const productValue: number =
            product.price * product.quantity;

        totalValue += productValue;
    });

    return totalValue;
}


// Function to calculate total stock
function calculateTotalStock(): number {

    let totalStock: number = 0;

    products.forEach((product: Product) => {
        totalStock += product.quantity;
    });

    return totalStock;
}


// Function to update inventory summary
function updateSummary(): void {

    // Local scope variable
    const totalProducts: number = products.length;

    const totalStock: number =
        calculateTotalStock();

    const inventoryValue: number =
        calculateInventoryValue();

    totalProductsElement.textContent =
        totalProducts.toString();

    totalStockElement.textContent =
        totalStock.toString();

    inventoryValueElement.textContent =
        `₹${inventoryValue.toFixed(2)}`;
}


// Form submit event
productForm.addEventListener(
    "submit",
    function (event: SubmitEvent): void {

        event.preventDefault();

        // Local variables
        const nameInput =
            document.getElementById("productName") as HTMLInputElement;

        const categoryInput =
            document.getElementById("category") as HTMLSelectElement;

        const priceInput =
            document.getElementById("price") as HTMLInputElement;

        const quantityInput =
            document.getElementById("quantity") as HTMLInputElement;

        const name: string =
            nameInput.value.trim();

        const category: string =
            categoryInput.value;

        const price: number =
            Number(priceInput.value);

        const quantity: number =
            Number(quantityInput.value);

        // Validation
        if (
            name === "" ||
            category === "" ||
            price <= 0 ||
            quantity < 0
        ) {
            alert("Please enter valid product details.");
            return;
        }

        addProduct(
            name,
            category,
            price,
            quantity
        );

        productForm.reset();
    }
);


// Initial display
if (isInventoryActive) {

    console.log(
        `${storeName} is active.`
    );

    displayProducts();
}
