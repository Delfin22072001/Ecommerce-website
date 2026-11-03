const cards = document.querySelector('.cards')
const categoryData = document.querySelector('.category-cards')
const search = document.querySelector('.search')
const myProducts = document.querySelector('.my-products')
const navbar = document.querySelector('.nav-content')
const toggler = document.querySelector('.toggler')
const cartCount = document.querySelector('.cart-count')
const priceInput = document.querySelector('.price-input')
let cartArray = JSON.parse(localStorage.getItem('cart')) || []
let myCart = document.querySelector('.cart-items')

//navbar toggler
if (navbar && toggler) {
  toggler.addEventListener('click', () => {
    navbar.classList.toggle('active')
    toggler.classList.toggle('active')
  })
}

const newArrivals = [ 
  { id: 1, name: "Linen Oxford Shirt", description: "Breathable linen-cotton blend with a relaxed collar.", price: 1799, originalPrice: 2299, sizes: ["S", "M", "L", "XL"], colors: ["Sky Blue", "White", "Olive"], rating: 4.5, inStock: true, arrivalDate: "2026-10-12", image: "Images/new-arrivals/Linen.webp" },
  { id: 2, name: "Slim Fit Chinos", description: "Stretch cotton twill, tapered leg, easy all-day comfort.", price: 1999, originalPrice: 2499, sizes: ["28", "30", "32", "34", "36"], colors: ["Khaki", "Navy", "Charcoal"], rating: 4.4, inStock: true, arrivalDate: "2026-10-10", image: "Images/new-arrivals/Slim.webp" },
  { id: 3, name: "Floral Wrap Dress", description: "Midi length with a tie waist and flutter sleeves.", price: 2299, originalPrice: 2999, sizes: ["XS", "S", "M", "L", "XL"], colors: ["Lilac Floral", "Navy Floral"], rating: 4.7, inStock: true, arrivalDate: "2026-10-16", image: "Images/new-arrivals/Floral.webp" },
  { id: 4, name: "High-Rise Wide Leg Jeans", description: "Rigid denim with a flattering high waist and full leg.", price: 2199, originalPrice: 2799, sizes: ["26", "28", "30", "32", "34"], colors: ["Mid Blue", "Black"], rating: 4.4, inStock: true, arrivalDate: "2026-10-11", image: "Images/new-arrivals/High-Rise.webp" },
  { id: 5, name: "Ribbed Knit Cardigan", description: "Soft button-front cardigan that layers over anything.", price: 1899, originalPrice: 2499, sizes: ["S", "M", "L", "XL"], colors: ["Cream", "Mauve", "Grey"], rating: 4.5, inStock: true, arrivalDate: "2026-10-14", image: "Images/new-arrivals/Ribbed.webp" },
  { id: 6, name: "Dino Print T-Shirt Set", description: "Two-piece cotton set with a tee and matching shorts.", price: 799, originalPrice: 999, sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: ["Green", "Blue"], rating: 4.6, inStock: true, arrivalDate: "2026-10-13", image: "Images/new-arrivals/Dino.jpg" },
  { id: 7, name: "Denim Dungaree", description: "Soft washed denim with adjustable straps and snap sides.", price: 1299, originalPrice: 1699, sizes: ["2-3Y", "4-5Y", "6-7Y"], colors: ["Light Wash", "Dark Wash"], rating: 4.5, inStock: true, arrivalDate: "2026-10-10", image: "Images/new-arrivals/Denim.webp" },
  { id: 8, name: "Girls Tulle Party Dress", description: "Layered tulle skirt with a cotton-lined bodice.", price: 1599, originalPrice: 1999, sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"], colors: ["Pink", "Lavender"], rating: 4.8, inStock: true, arrivalDate: "2026-10-17", image: "Images/new-arrivals/Girls.webp" },
  { id: 9, name: "Vitamin C Face Serum", description: "Lightweight daily serum for a brighter, even-looking tone.", price: 749, originalPrice: 999, sizes: ["30 ml"], colors: [], rating: 4.5, inStock: true, arrivalDate: "2026-10-15", image: "Images/new-arrivals/Vitamin.avif" },
  { id: 10, name: "Matte Liquid Lipstick", description: "Long-wear matte finish that stays comfortable.", price: 499, originalPrice: 649, sizes: ["4 ml"], colors: ["Berry", "Rose Nude", "Brick Red", "Plum"], rating: 4.3, inStock: true, arrivalDate: "2026-10-12", image: "Images/new-arrivals/Matte.webp" },
  { id: 11, name: "Hydrating Sunscreen SPF 50", description: "No white cast, light gel texture, suits daily wear.", price: 599, originalPrice: 799, sizes: ["50 ml"], colors: [], rating: 4.6, inStock: true, arrivalDate: "2026-10-09", image: "Images/new-arrivals/Hydrating.webp" }
]

const categories = [
  { id: 1, name: "Men", image: "Images/home-category/men-image.jpg"},
  { id: 2, name: "Women", image: "Images/home-category/women-image.jpg"},
  { id: 3, name: "Kids", image: "Images/home-category/kids-image.avif"},
  { id: 4, name: "Beauty", image: "Images/home-category/beauty-image.jpg"}
];

const products = [
  { id: 1, name: "Men's Cotton T-Shirt", description: "Soft round-neck tee in breathable combed cotton.", category: "men", price: 499, originalPrice: 699, sizes: ["S", "M", "L", "XL"], colors: ["White", "Black", "Navy"], rating: 4.3, inStock: true, image: "Images/products/men-tshirt.webp" },
  { id: 2, name: "Women's Floral Dress", description: "Flowy knee-length dress with a soft floral print.", category: "women", price: 1499, originalPrice: 1999, sizes: ["XS", "S", "M", "L", "XL"], colors: ["Lilac Floral", "Navy Floral"], rating: 4.6, inStock: true, image: "Images/products/women-dress.webp" },
  { id: 3, name: "Kids Cartoon T-Shirt", description: "Soft cotton tee with a fun cartoon print.", category: "kids", price: 349, originalPrice: 499, sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: ["Red", "Blue", "Yellow"], rating: 4.5, inStock: true, image: "Images/products/kids-tshirt.webp" },
  { id: 4, name: "Men's Slim Fit Jeans", description: "Stretch denim with a slim fit and tapered leg.", category: "men", price: 1299, originalPrice: 1799, sizes: ["28", "30", "32", "34", "36"], colors: ["Dark Blue", "Black"], rating: 4.4, inStock: true, image: "Images/products/men-jeans.jpg" },
  { id: 5, name: "Women's Cotton Kurti", description: "Straight-cut cotton kurti with simple embroidery.", category: "women", price: 799, originalPrice: 1099, sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Mustard", "Teal", "Pink"], rating: 4.4, inStock: true, image: "Images/products/women-kurti.webp" },
  { id: 6, name: "Kids Denim Shorts", description: "Washed denim shorts with an elastic waist.", category: "kids", price: 599, originalPrice: 799, sizes: ["2-3Y", "4-5Y", "6-7Y"], colors: ["Light Wash", "Dark Wash"], rating: 4.4, inStock: true, image: "Images/products/kids-shorts.jpg" },
  { id: 7, name: "Men's Casual Shirt", description: "Relaxed full-sleeve shirt for work and weekends.", category: "men", price: 899, originalPrice: 1199, sizes: ["S", "M", "L", "XL"], colors: ["Sky Blue", "Grey", "Olive"], rating: 4.2, inStock: true, image: "Images/products/men-shirt.webp" },
  { id: 8, name: "Argan Hair Oil", description: "Nourishing oil that adds shine and reduces frizz.", category: "beauty", price: 449, originalPrice: 599, sizes: ["100 ml"], colors: [], rating: 4.4, inStock: true, image: "Images/products/beauty-hair-oil.webp" },
  { id: 9, name: "Women's Silk Saree", description: "Soft silk saree with a zari border and blouse piece.", category: "women", price: 2499, originalPrice: 3299, sizes: ["Free Size"], colors: ["Maroon", "Green", "Royal Blue"], rating: 4.7, inStock: true, image: "Images/products/women-saree.jpg" },
  { id: 10, name: "Girls Party Frock", description: "Layered frock with a cotton lining and bow detail.", category: "kids", price: 799, originalPrice: 1099, sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"], colors: ["Pink", "Lavender"], rating: 4.7, inStock: true, image: "Images/products/kids-frock.jpg" },
  { id: 11, name: "Men's Running Shoes", description: "Lightweight cushioned shoes with a grippy sole.", category: "men", price: 1999, originalPrice: 2699, sizes: ["7", "8", "9", "10", "11"], colors: ["Black", "Grey", "Blue"], rating: 4.5, inStock: true, image: "Images/products/men-shoes.webp" },
  { id: 12, name: "Eau de Parfum Spray", description: "Long-lasting fresh floral fragrance.", category: "beauty", price: 999, originalPrice: 1399, sizes: ["50 ml"], colors: [], rating: 4.2, inStock: true, image: "Images/products/beauty-perfume.jpg" },
  { id: 13, name: "Women's Leather Handbag", description: "Spacious handbag with a zip closure and inner pockets.", category: "women", price: 1599, originalPrice: 2199, sizes: ["One Size"], colors: ["Tan", "Black"], rating: 4.3, inStock: true, image: "Images/products/women-handbag.webp" },
  { id: 14, name: "Kids Sneakers", description: "Light sneakers with a velcro strap and soft sole.", category: "kids", price: 899, originalPrice: 1199, sizes: ["10C", "11C", "12C", "13C"], colors: ["White", "Blue"], rating: 4.3, inStock: true, image: "Images/products/kids-shoes.avif" },
  { id: 15, name: "Men's Hooded Sweatshirt", description: "Warm fleece-lined hoodie with a kangaroo pocket.", category: "men", price: 1499, originalPrice: 1999, sizes: ["S", "M", "L", "XL"], colors: ["Charcoal", "Maroon", "Navy"], rating: 4.4, inStock: true, image: "Images/products/men-hoodie.jpg" },
  { id: 16, name: "Women's High-Waist Jeans", description: "Stretch high-rise jeans with a flattering fit.", category: "women", price: 1399, originalPrice: 1899, sizes: ["26", "28", "30", "32", "34"], colors: ["Mid Blue", "Black"], rating: 4.5, inStock: true, image: "Images/products/women-jeans.webp" },
  { id: 18, name: "Soft Teddy Bear Toy", description: "Plush teddy bear, safe and washable.", category: "kids", price: 499, originalPrice: 699, sizes: ["Medium"], colors: ["Brown", "Cream"], rating: 4.6, inStock: true, image: "Images/products/kids-toy.webp" },
  { id: 19, name: "Men's Leather Wallet", description: "Slim bi-fold wallet with card slots and coin pocket.", category: "men", price: 599, originalPrice: 849, sizes: ["One Size"], colors: ["Brown", "Black"], rating: 4.1, inStock: true, image: "Images/products/men-wallet.webp" },
  { id: 20, name: "Aloe Vera Face Wash", description: "Gentle daily cleanser that leaves skin fresh and soft.", category: "beauty", price: 249, originalPrice: 329, sizes: ["100 ml"], colors: [], rating: 4.3, inStock: true, image: "Images/products/beauty-facewash.webp" },
  { id: 21, name: "Women's Block Heel Sandals", description: "Comfortable block heels with a cushioned footbed.", category: "women", price: 1099, originalPrice: 1499, sizes: ["5", "6", "7", "8"], colors: ["Beige", "Black"], rating: 4.2, inStock: true, image: "Images/products/women-sandals.avif" },
  { id: 22, name: "Kids School Backpack", description: "Padded straps and roomy compartments for school.", category: "kids", price: 699, originalPrice: 949, sizes: ["One Size"], colors: ["Blue", "Green", "Pink"], rating: 4.4, inStock: true, image: "Images/products/kids-backpack.jpg" }
];

localStorage.setItem('newArrivals', JSON.stringify(newArrivals))
localStorage.setItem('categories', JSON.stringify(categories))
localStorage.setItem('products', JSON.stringify(products))

const newArrivalList = JSON.parse(localStorage.getItem('newArrivals')) || []
const categoriesList = JSON.parse(localStorage.getItem('categories')) || []
const productsList = JSON.parse(localStorage.getItem('products')) || []

if (cards) {
  cards.innerHTML = newArrivalList.map((newArrival, _) => (
    `<div class="card">
        <img src="${newArrival.image}" alt="${newArrival.name}"/>
        <h3 class="heading">${newArrival.name}</h3>
        <p class="price">₹${newArrival.price}</p>
      <div>
      <button class="btn" onclick=addToCart(${newArrival.id})>Add to Cart</button>
      </div>        
    </div>`
  )).join('')
}

if (categoryData) {
  categoryData.innerHTML = categoriesList.map((category, _) => (
    `<div class="category">
        <img src="${category.image}" alt="${category.name}" />
      </div>`
  )
  ).join('')
}

if (myProducts) {
  myProducts.innerHTML = productsList.map((product, _) => (
    `<div class="card">
        <img src="${product.image}" alt="${product.name}"/>
        <h3 class="heading">${product.name}</h3>
        <p class="price">₹${product.price}</p>
      <div>
      <button class="btn" onclick=addToCart(${product.id})>Add to Cart</button>
      </div>        
    </div>`
  )
  ).join('')
}

//search
const newArrivalCard = document.querySelectorAll('.card')

function searchProduct(value) {
  newArrivalCard.forEach((card) => {
    const heading = card.querySelector('.heading').textContent.toLowerCase()
    if (heading.includes(value)) {
      card.style.display = "block"
    }
    else {
      card.style.display = "none"
    }
  })
}

if (search) {
  search.addEventListener('input', (e) => {
    const searchValue = e.target.value.trim().toLowerCase()
    searchProduct(searchValue)
  })
}

// add to cart
function addToCart(id) {

  const cartItems = [...newArrivalList].find((items) => (items.id === id)) || [...productsList].find((items) => (items.id === id))

  const addedItems = cartArray.some((item) => item.id === id)
  if (addedItems) {
    alert("Already present")
    return
  }

  cartArray.push(cartItems)
  localStorage.setItem('cart', JSON.stringify(cartArray))
  countUpdate()
}

function countUpdate() {
  if (cartCount) {
    cartCount.textContent = cartArray.length
    cartCount.style.display = cartArray.length > 0 ? "block" : "none"
  }
}
countUpdate()

// cart page
function displayCart() {
  if (myCart) {
    myCart.innerHTML = cartArray.length > 0 ? cartArray.map((cart, _) => {
      return (
        `<div class="cart-products">
          <div><img src="${cart.image}" alt="${cart.name}"></div>
          <div>
            <h3>${cart.name}</h3>
            <button class="remove-item" onclick=removeItem(${cart.id})>
              <i class="fa-solid fa-xmark"></i>
            </button>     
            <p class="desc">${cart.description}</p>
            <span>₹${cart.price}</span>
            <span class="original-price">₹${cart.originalPrice}</span>
            <p class="return"><i class="fa-solid fa-arrow-rotate-left"></i><b> 7 days</b> return available</p>
            <p class="delivery-date"><i class="fa-regular fa-circle-check"></i> Delivery within 1 week</p>
          </div>    
      </div>`
      )
    }
    ).join("") :
      (
        `<div class="empty-container">
        <div class="empty-contents">
        <img src="Images/shopping-bag.jpg" alt="shopping bag" width="300"/>
          <h2>Hey it feels so light!</h2>
          <p>There is nothing in your bag. Let's add some items</p>
          <a href="shop.html" class="btn">Shop Now</a>
        </div>
      </div>`
      )
  }
}
displayCart()
calculateTotal()

function calculateTotal() {
  if (priceInput) {
    const priceValue = cartArray.map((item) => (
      item.price
    ))
    const total = cartArray.length > 0 ? priceValue.reduce((prev, curr) => prev + curr) : ""
    priceInput.innerHTML = cartArray.length > 0 ? `<b>Total Price: ₹${total}</b>` : ""

  }
}

function removeItem(id) {
  cartArray = cartArray.filter((item) => (
    item.id != id
  ))
  localStorage.setItem('cart', JSON.stringify(cartArray))
  displayCart()
  countUpdate()
  calculateTotal()
}


window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    cartArray = JSON.parse(localStorage.getItem('cart')) || []
    countUpdate()
    displayCart()
    calculateTotal()
  }
})
