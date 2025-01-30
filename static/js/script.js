const products = [
    {
        id: 1,
        category: 'Furniture',
        name: 'Yellow Chair',
        price: 299,
        image: 'static/picture/product.png',
        description: 'Comfortable and cheap'
    },
    {
        id: 2,
        category: 'Furniture',
        name: 'Grey Sofa',
        price: 599,
        image: 'static/picture/product3.png',
        description: 'Very Comfortable but expensive'
    },
    {
        id: 3,
        category: 'Lamps',
        name: 'Table Lamp',
        price: 99,
        image: 'static/picture/product2.png',
        description: 'Care for your eyes'
    },
];

let shoppingCart = [];

const categoryButtons = document.querySelectorAll('.category');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        showProductList(category);
    });
});

const categoryLink = document.getElementById('category-link');
categoryLink.addEventListener('click', backToCategory);

const cartButton = document.getElementById('cart-button');
cartButton.addEventListener('mouseover', showDropdown);


function showProductList(category) {
    let productList = document.getElementById('product-list');
    let productPage = document.getElementById("productPage")
    productList.style.display='grid'
    productPage.style.display='none'

    productList.innerHTML = '';
    const filteredProducts = products.filter(product => product.category === category);
    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product';
        productItem.innerHTML = `
      <img src="${product.image}" alt="${product.image}" class="product-img" onclick="jumpToProductDetail(${product.id})">
      <div class="product-name " id="product${product.id}" onclick="jumpToProductDetail(${product.id})"><a href="#">${product.name}</a></div>
      <div class="product-price">$${product.price}</div>
      <button type="button" class="btn btn-primary add-button" data-product-id="${product.id}">Add to Cart</button>
    `;
        productList.appendChild(productItem);
    });

    let thirdNav=document.getElementById("third-nav");
    let secondNav=document.getElementById("second-nav");
    let secondNavLink=secondNav.querySelector('a');
    secondNavLink.innerText='>'+category;
    secondNav.style.display='inline'
    thirdNav.style.display='none'

    const addButtons = document.querySelectorAll('.add-button');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    if (product) {
        const existingProduct = shoppingCart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            shoppingCart.push({ ...product, quantity: 1 });
        }
        updateShoppingCart();
        alert(`${product.name} has been added to the shopping cart!`);
    }
}

function updateShoppingCart() {
    const shoppingList = document.getElementById('shopping-list');
    shoppingList.innerHTML = '';
    let total = 0;

    shoppingCart.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
      <span>${product.name}</span>
      <input type="number" class="quantity-input" value="${product.quantity}" onchange="updateQuantity(${product.id}, this.value)">
      <span>$${product.price}</span>
    `;
        shoppingList.appendChild(listItem);
        total += product.price * product.quantity;
    });

    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $${total}`;
}

function updateQuantity(productId, newQuantity) {
    const product = shoppingCart.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(newQuantity);
        if (product.quantity <= 0) {
            shoppingCart = shoppingCart.filter(item => item.id !== productId);
        }
        updateShoppingCart();
    }
}

function jumpToProductDetail(productId) {
    products.find(product => product.id === productId);
    let productList=document.getElementById('product-list');
    let productPage = document.getElementById("productPage")
    productPage.src = 'product.html?id=' + encodeURIComponent(productId);
    productPage.style.display='block'
    productList.style.display='none'
    let thirdNav=document.getElementById("third-nav");
    document.getElementById("second-nav");
    let thirdNavLink=thirdNav.querySelector('a');
    thirdNavLink.innerText=">Product"+productId;
    thirdNav.style.display='inline'
}

function backToCategory(){
    let productList=document.getElementById('product-list');
    let productPage = document.getElementById("productPage");
    productList.style.display='grid'
    productPage.style.display='none'
    let thirdNav=document.getElementById("third-nav");
    let secondNav=document.getElementById("second-nav");
    secondNav.style.display='inline'
    thirdNav.style.display='none'
}

function showDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown.style.display = "block";
    dropdown.addEventListener('mouseleave', hideDropdown);
}

function hideDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown.style.display = "none";
    dropdown.removeEventListener('mouseleave', hideDropdown);
}
