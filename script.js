// index.html

if (
  window.location.pathname.includes('index.html') ||
  window.location.pathname.includes('womenClothing.html') ||
  window.location.pathname.includes('kidsClothing.html') ||
  window.location.pathname.includes('menClothing.html')
) {
  const btn = document.querySelectorAll('.buy-btn');

  btn.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const description = button.dataset.description;
      const rating = button.dataset.rating;
      const price = button.dataset.price;
      const image = button.dataset.image;

      const url = `addtocart.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}&rating=${encodeURIComponent(rating)}`;
      window.location.href = url;
    });
  });
}

// addtocart.html

if(window.location.pathname.includes('addtocart.html')){   
  const params = new URLSearchParams(window.location.search)
  const product_name = params.get('name')
  const product_description = params.get('description')
  const product_rating = params.get('rating')
  const product_price = params.get('price')
  const product_image = params.get('image')


  const data = document.querySelector('.place-order')
  
  if(product_name  && product_description && product_price && product_rating && product_image){
    data.innerHTML = `
    <div class="my_items justify-content-center">
      <div class="container">
        <div class="row mt-5 pt-5 mx-5">
          <div class="col-md-6">
          <div class="card" style="width: 20rem; height:auto">
            <img class="p-2" src= ${product_image}>
            </div>
           </div>
          <div class="col-md-6 pt-4">
            <h1 class="fw-bold product-name">${product_name}</h1>
            <p class="text-muted product-description">${product_description}</p>
            <p class="fw-bold  product-rating"><i class="fa-solid fa-star text-warning"></i> ${product_rating} / 5</p>  
            <p>₹${product_price}</p> 
             <p class="fw-bold quantity">Select Quantity</p>            
             <div class="boxes pb-4 d-flex text-center">
              <div class="box box1"><i class="fa-solid fa-plus"></i></div>
              <div class="box box2">1</div>
              <div class="box box3"><i class="fa-solid fa-minus"></i></div>           
             </div>
             <button class="btn btn-success cart me-2 text-uppercase">Buy Now</button>
             <button class="btn btn-primary wishlist text-uppercase">Wishlist</button>
          </div>
        </div>
      </div>
    </div>`
    
    // items increase and decrease count logic
    const i_count=document.querySelector('.box1')
    const count=document.querySelector('.box2')
    const d_count=document.querySelector('.box3')
    let i = 1
    count.textContent=i
    i_count.addEventListener('click',()=>{
      i++
      count.textContent = i
      
    })
    d_count.addEventListener('click',()=>{
      if(i>1){
      i--
       count.textContent = i
      }
    })

    // notification msg
    const popup_notification = document.getElementById('notification')
    const my_cart = document.querySelector('.cart') 
    const my_wishlist = document.querySelector('.wishlist')
    let price

    my_cart.addEventListener('click',()=>{
      notification.style.display = "block"
      price =  product_price * i
      notification.textContent = `Item bought. Total price is ₹${price}`
    })

    my_wishlist.addEventListener('click',()=>{
      notification.style.display = "block"
      notification.textContent = `${product_name} added to wishlist`
    })
    
  } 
}







