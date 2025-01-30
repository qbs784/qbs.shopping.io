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

let product=document.getElementById("product-detail")
let searchParams = new URLSearchParams(window.location.search);

let id = parseInt(searchParams.get('id'));
//find the product and display it
let pro = products.find(item => item.id === id);
product.innerHTML = `
<div class="container">
<div class="product-container">
  <div class="product-image">
    <img src="${pro.image}" class="img-fluid" alt="Product Image">
    
  </div>
  <div class="product-details">
    <h2>${pro.name}</h2>
    <p>Price: $ ${pro.price}</p>
    <button class="btn btn-primary" onclick="addToCart(id)">Add to Cart</button>
  </div>
</div>

<hr>

<div class="product-description">
  <h2>Product Description</h1>
  <p>${pro.description}</p>
</div>
</div>  
    `;

