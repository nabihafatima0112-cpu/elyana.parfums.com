const FORMSPREE_URL = "https://formspree.io/f/mnpqlzrn";

/* =========================
   PRODUCTS
========================= */

const products = [
    {
        id: 1,
        name: "FOR HER",
        category: "Women",
        notes: "Fruity",
        description: "Sweet · Elegant · Raspberry",
        image: "images/805.jpg",
        sizes: [
            { size: "30ml", price: 1500 },
            { size: "50ml", price: 2500 },
            { size: "100ml", price: 5000 }
        ]
    },

    {
        id: 2,
        name: "CEKYNA",
        category: "Women",
        notes: "Floral",
        description: "Citrus · Rose · Jasmine",
        image: "images/806.jpg",
        sizes: [
            { size: "30ml", price: 1500 },
            { size: "50ml", price: 2500 },
            { size: "100ml", price: 5000 }
        ]
    },

    {
        id: 3,
        name: "SOOBS",
        category: "Women",
        notes: "Fresh",
        description: "Blossom · Lavender · Musk",
        image: "images/807.jpg",
        sizes: [
            { size: "30ml", price: 1500 },
            { size: "50ml", price: 2500 },
            { size: "100ml", price: 5000 }
        ]
    },

    {
        id: 4,
        name: "DESERT DESIRE",
        category: "Men",
        notes: "Oud",
        description: "Bergamot · Leather · Musk",
        image: "images/811.png",
        sizes: [
            { size: "30ml", price: 1800 },
            { size: "50ml", price: 3000 },
            { size: "100ml", price: 5500 }
        ]
    },

    {
        id: 5,
        name: "MUSCI",
        category: "Men",
        notes: "Woody",
        description: "Masculine · Ambroxan · Musk",
        image: "images/809.jpg",
        sizes: [
            { size: "30ml", price: 1800 },
            { size: "50ml", price: 3000 },
            { size: "100ml", price: 5500 }
        ]
    },

    {
        id: 6,
        name: "VERGE",
        category: "Men",
        notes: "Earthy",
        description: "Sichuan pepper · Woody · Bold",
        image: "images/810.jpg",
        sizes: [
            { size: "30ml", price: 1800 },
            { size: "50ml", price: 3000 },
            { size: "100ml", price: 5500 }
        ]
    },

    {
        id: 7,
        name: "SAMPLES",
        category: "Samples",
        notes: "Mixed",
        description: "Try different scents · Perfect for testing",
        image: "images/sample.jpg",
        isSingleSample: true,
        sizes: [
            { size: "5ml", price: 300 }
        ]
    },

    {
        id: 8,
        name: "SAMPLE SET",
        category: "Samples",
        notes: "Mixed",
        description: "5 piece set - ready made",
        image: "images/657fb83c-05d3-478a-8848-52d0ea77c36b.jpg",
        sizes: [
            { size: "5ml", price: 1500 }
        ]
    }
];


/* =========================
   CART
========================= */

let cart = [];

/* =========================
   DISPLAY PRODUCTS
========================= */
function displayProducts(list = products) {
    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;">
                No fragrances found.
            </p>
        `;
        return;
    }

    list.forEach(product => {
        // Product 7 is the individual choosable sample (has dropdown)
        const isSingleSample = product.isSingleSample === true;
        // Product 8 is the pre-made sample set (no dropdown, just add to bag)
        const isSampleSet = product.id === 8;

        const sampleOptions = products
            .filter(p => !p.isSingleSample && p.category !== "Samples")
            .map(p => `
                <option value="${p.name}">
                    ${p.name}
                </option>
            `)
            .join("");

        const productHTML = `
            <article class="product">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="product-info">
                    <h3>${product.name}</h3>

                    <p>${product.description}</p>

                    ${
                        isSingleSample
                        ? `
                            <label for="sample-select-${product.id}">
                                Choose your sample
                            </label>

                            <select id="sample-select-${product.id}">
                                <option value="">
                                    Select a perfume
                                </option>
                                ${sampleOptions}
                            </select>
                        `
                        : `
                            <div class="size-options">
                                ${product.sizes.map((option, index) => `
    <button
        class="size-button ${index === (product.sizes.length > 1 ? 1 : 0) ? "selected" : ""}"
        onclick="selectSize(this, ${product.id}, '${option.size}', ${option.price})"
    >
        ${option.size}
    </button>
`).join("")}
                            </div>
                        `
                    }

                    <div class="product-bottom">
                        <span class="price" id="price-${product.id}">
                            ${
                                isSingleSample
                                ? "5ml — PKR 300"
                                : isSampleSet
                                ? "5ml — PKR 1500"
                                : `${product.sizes.length > 1 ? product.sizes[1].size : product.sizes[0].size} — PKR ${product.sizes.length > 1 ? product.sizes[1].price : product.sizes[0].price}`
                            }
                        </span>

                        <button
                            class="add-button"
                            onclick="${
                                isSingleSample
                                ? `addSampleToCart(${product.id})`
                                : `addToCart(${product.id}, '${product.sizes.length > 1 ? product.sizes[1].size : product.sizes[0].size}', ${product.sizes.length > 1 ? product.sizes[1].price : product.sizes[0].price})`
                            }"
                        >
                            Add to Bag
                        </button>
                    </div>
                </div>
            </article>
        `;

        grid.innerHTML += productHTML;
    });
}


/* =========================
   SELECT SIZE
========================= */

function selectSize(button, productId, size, price) {
    const productCard = button.closest(".product");

    productCard
        .querySelectorAll(".size-button")
        .forEach(sizeButton => {
            sizeButton.classList.remove("selected");
        });

    button.classList.add("selected");

    productCard.querySelector(".price").textContent =
        `${size} — PKR ${price}`;

    productCard.querySelector(".add-button").setAttribute(
        "onclick",
        `addToCart(${productId}, '${size}', ${price})`
    );
}


/* =========================
   ADD TO CART
========================= */

function addToCart(id, size, price) {
    const product = products.find(product => product.id === id);

    const existingItem = cart.find(item =>
        item.id === id && item.size === size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            size: size,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}

// FIX: takes the product id so it reads the correct select element
function addSampleToCart(productId) {
    const sampleSelect = document.getElementById(`sample-select-${productId}`);
    const sampleName = sampleSelect.value;

    if (!sampleName) {
        alert("Please choose a perfume sample first.");
        return;
    }

    const sampleProduct = products.find(
        product => product.name === sampleName
    );

    cart.push({
        ...sampleProduct,
        id: `sample-${sampleProduct.id}-${Date.now()}`,
        name: `${sampleProduct.name} SAMPLE`,
        size: "5ml",
        price: 300,
        quantity: 1
    });

    updateCart();
    openCart();
    sampleSelect.value = "";
}

/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const itemCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    document.getElementById("cart-count").textContent = itemCount;

    const cartItems = document.getElementById("cartItems");

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    /*
       Temporary delivery charge.
       We will connect this to the customer's
       actual address later.
    */
    const deliveryCharge = 200;

    const total = subtotal + deliveryCharge;

    document.getElementById("cartTotal").innerHTML = `
        <div>Subtotal: PKR ${subtotal}</div>
        <div>Delivery: PKR ${deliveryCharge}</div>
        <div><strong>Total: PKR ${total}</strong></div>
    `;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>Your bag is empty.</p>
        `;

        return;
    }

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        cartItems.innerHTML += `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>
                        ${item.size} — PKR ${item.price}
                    </p>

                    <div class="quantity-control">

                        <button
                            class="quantity-btn"
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span class="quantity-number">
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-btn"
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove"
                    onclick="removeFromCart(${index})"
                >
                    REMOVE
                </button>

            </div>
        `;
    });
}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


/* =========================
   OPEN CART
========================= */

function openCart() {
    document
        .getElementById("cartOverlay")
        .classList.add("active");
}


/* =========================
   CLOSE CART
========================= */

function closeCart() {
    document
        .getElementById("cartOverlay")
        .classList.remove("active");
}


/* =========================
   SEARCH
========================= */

function openSearch() {
    document
        .getElementById("searchOverlay")
        .classList.add("active");

    document
        .getElementById("searchInput")
        .focus();
}


function closeSearch() {
    document
        .getElementById("searchOverlay")
        .classList.remove("active");
}


/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts() {
    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const results = products.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.notes.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
    );

    const resultBox = document.getElementById("searchResults");

    resultBox.innerHTML = "";

    results.forEach(product => {
        // FIX: use the product's own flag, and safely pick price/size
        const isSingleSample = product.isSingleSample === true;
        const displaySize = isSingleSample ? "5ml" : (product.sizes.length > 1 ? product.sizes[1].size : product.sizes[0].size);
        const displayPrice = isSingleSample ? 300 : (product.sizes.length > 1 ? product.sizes[1].price : product.sizes[0].price);

        resultBox.innerHTML += `
            <div
                class="search-result"
                onclick="addToCart(${product.id}, '${displaySize}', ${displayPrice}); closeSearch();"
            >
                <strong>${product.name}</strong>

                <small>
                    — ${displaySize} — PKR ${displayPrice}
                </small>
            </div>
        `;
    });
}


/* =========================
   FILTER CATEGORY
========================= */

function filterProducts(category) {
    const filtered = products.filter(product =>
        product.category === category
    );

    displayProducts(filtered);

    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   FILTER NOTES
========================= */

function filterNotes(note) {
    const filtered = products.filter(product =>
        product.notes === note
    );

    displayProducts(filtered);

    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   NEWSLETTER
========================= */

function subscribe(event) {
    event.preventDefault();

    alert(
        "Thank you for joining the ELYANA community."
    );
}


/* =========================
   PLACE ORDER
========================= */

async function placeOrder() {
    if (cart.length === 0) {
        alert("Your bag is empty.");
        return;
    }

    const name = document
        .getElementById("customerName")
        .value
        .trim();

    const phone = document
        .getElementById("customerPhone")
        .value
        .trim();

    const city = document
        .getElementById("customerCity")
        .value
        .trim();

    const address = document
        .getElementById("customerAddress")
        .value
        .trim();

    const notes = document
        .getElementById("customerNotes")
        .value
        .trim();

    const message = document.getElementById("orderMessage");

    if (!name || !phone || !city || !address) {
        message.textContent =
            "Please fill in all required delivery details.";

        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const deliveryCharge = 200;

    const finalTotal = total + deliveryCharge;

    // FIX: renamed from 'products' to avoid shadowing the global products array
    const cartSummary = cart
        .map(item =>
            `${item.name} (${item.size}) x${item.quantity} — PKR ${item.price * item.quantity}`
        )
        .join("\n");

    const orderData = {
        name: name,
        phone: phone,
        city: city,
        address: address,
        products: cartSummary,
        subtotal: `PKR ${total}`,
        delivery: `PKR ${deliveryCharge}`,
        total: `PKR ${finalTotal}`,
        payment: "Cash on Delivery",
        notes: notes || "None"
    };

    message.textContent = "Placing your order...";

    try {
        const response = await fetch(FORMSPREE_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            message.innerHTML = `
                <strong>Order placed successfully! ✨</strong><br><br>
                We will contact you shortly to confirm your delivery.
            `;

            cart = [];
            updateCart();

            document.getElementById("customerName").value = "";
            document.getElementById("customerPhone").value = "";
            document.getElementById("customerCity").value = "";
            document.getElementById("customerAddress").value = "";
            document.getElementById("customerNotes").value = "";

        } else {
            message.textContent =
                "Something went wrong. Please try again.";
        }

    } catch (error) {
        console.error(error);

        message.textContent =
            "Unable to place the order. Please try again.";
    }
}


/* =========================
   START WEBSITE
========================= */

displayProducts();
updateCart();
