4/* D-Clothing - frontend prototype using localStorage
   Keys:
   - dcl_products, dcl_users, dcl_user (current), dcl_cart, dcl_orders, dcl_admin
*/

const store = {
  get(k,f){ return JSON.parse(localStorage.getItem(k) || JSON.stringify(f)); },
  set(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
};

// seed demo products if none
if(!store.get('dcl_products', null)){
  store.set('dcl_products', [
    {id:1, name:'D-Clothing Cozy Hoodie', price:1499, img:'assets/Images/hoodie.jpg', desc:'Soft fleece, perfect for winter', badge:'Bestseller'},
    {id:2, name:'D-Clothing Classic Tee', price:599, img:'assets/Images/tshirt.jpg', desc:'Breathable cotton tee', badge:'New'},
    {id:3, name:'D-Clothing Slim Jeans', price:1799, img:'assets/Images/jeans.jpg', desc:'Stretch denim, slim fit', badge:'worthless'},
    {id:4, name:'D-Clothing Bomber Jacket', price:2999, img:'assets/Images/jacket.jpg', desc:'Lightweight and stylish', badge:'Limited'}
  ]);
}

// helpers
function qs(id){ return document.getElementById(id); }
function getProducts(){ return store.get('dcl_products', []); }
function getCart(){ return store.get('dcl_cart', []); }
function getCurrentUser(){ return store.get('dcl_user', null); }

function updateCartCount(){
  const count = getCart().reduce((s,i)=>s+i.qty,0);
  const el = qs('cart-count');
  if(el) el.textContent = count;
}

// render product grid
function renderProducts(containerId){
  const el = qs(containerId);
  if(!el) return;
  const products = getProducts();
  el.innerHTML = products.map(p => `
    <div class="card">
      <img class="product-image" src="${p.img}" alt="${p.name}">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div class="product-title">${p.name}</div>
          <div class="small">${p.desc}</div>
        </div>
        ${p.badge ? `<div class="badge">${p.badge}</div>` : ''}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="price">₹${p.price}</div>
        <div class="actions">
          <a class="cta" href="product.html?id=${p.id}">View</a>
          <button class="icon-btn" onclick="addToCart(${p.id})" title="Add to cart" style="background:var(--brand);color:white;padding:8px 10px;border-radius:10px">Add</button>
        </div>
      </div>
    </div>
  `).join('');
  updateCartCount();
}

// product detail
function renderProductDetail(id, containerId){
  const p = getProducts().find(x=>x.id==+id);
  const c = qs(containerId);
  if(!p || !c) return;
  c.innerHTML = `
    <div style="display:flex;gap:20px;flex-wrap:wrap">
      <img src="${p.img}" style="width:420px;max-width:100%;border-radius:12px;object-fit:cover">
      <div style="flex:1">
        <h2>${p.name}</h2>
        <div class="small">${p.desc}</div>
        <h3 class="price" style="margin-top:12px">₹${p.price}</h3>
        <div style="margin-top:16px; display:flex; gap:10px; align-items:center;">
          <div class="qty-controls">
            <button onclick="changeQuantityInDetail(-1)">-</button>
            <input id="detail-qty" value="1" style="width:54px;text-align:center;border-radius:8px;padding:8px;border:1px solid #e6e9ef">
            <button onclick="changeQuantityInDetail(1)">+</button>
          </div>
          <button class="cta" onclick="addToCart(${p.id}, +qs('detail-qty').value)">Add to cart</button>
        </div>
      </div>
    </div>
  `;
}

function changeQuantityInDetail(delta){
  const el = qs('detail-qty');
  if(!el) return;
  let v = parseInt(el.value)||1;
  v = Math.max(1, v + delta);
  el.value = v;
}

// cart functions
function addToCart(productId, qty=1){
  qty = Number(qty) || 1;
  const cart = getCart();
  const prod = getProducts().find(p=>p.id==productId);
  const idx = cart.findIndex(i=>i.id==productId);
  if(idx>-1) { cart[idx].qty += qty; }
  else cart.push({id:productId, name:prod.name, price:prod.price, qty});
  store.set('dcl_cart', cart);
  toast('Added to cart');
  updateCartCount();
}

function renderCart(containerId){
  const el = qs(containerId);
  if(!el) return;
  const cart = getCart();
  if(cart.length===0){ el.innerHTML = '<div class="card center">Your cart is empty</div>'; updateCartCount(); return; }
  let total = 0;
  el.innerHTML = `<div class="card">
    <table class="table">
      <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th></th></tr></thead>
      <tbody>
        ${cart.map((it, idx) => { total += it.price * it.qty; return `
          <tr>
            <td>${it.name}</td>
            <td>
              <div class="qty-controls">
                <button onclick="changeQty(${idx}, -1)">-</button>
                <span style="min-width:36px;display:inline-block;text-align:center">${it.qty}</span>
                <button onclick="changeQty(${idx}, 1)">+</button>
              </div>
            </td>
            <td>₹${it.price * it.qty}</td>
            <td><button onclick="removeFromCart(${idx})">Remove</button></td>
          </tr>` }).join('')}
      </tbody>
    </table>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
      <div class="small">Total: <strong>₹${total}</strong></div>
      <div>
        <button class="cta" onclick="proceedCheckout()">Checkout (COD)</button>
      </div>
    </div>
  </div>`;
  updateCartCount();
}

function changeQty(index, delta){
  const cart = getCart();
  cart[index].qty = Math.max(1, cart[index].qty + delta);
  store.set('dcl_cart', cart);
  renderCart('cart-container');
  updateCartCount();
}

function removeFromCart(index){
  const cart = getCart();
  cart.splice(index,1);
  store.set('dcl_cart', cart);
  renderCart('cart-container');
  updateCartCount();
}

// checkout (COD)
function proceedCheckout(){
  const user = getCurrentUser();
  if(!user){ alert('Please login to place order'); location.href='login.html'; return; }
  const cart = getCart();
  if(!cart.length){ alert('Cart empty'); return; }
  const orders = store.get('dcl_orders', []);
  const total = cart.reduce((s,i)=>s + i.qty * i.price, 0);
  const order = { id:'ORD'+Date.now(), user:user.email, items:cart, total, status:'Placed', date: new Date().toISOString() };
  orders.push(order);
  store.set('dcl_orders', orders);
  store.set('dcl_cart', []);
  toast('Order placed — Cash on Delivery');
  // small notification UI (in-page)
  localStorage.setItem('dcl_last_notification', JSON.stringify({title:'Order Placed', text:`${order.id} placed — ₹${order.total}`}));
  setTimeout(()=> location.href='orders.html', 1000);
}

// orders for user
function renderUserOrders(containerId){
  const el = qs(containerId);
  const user = getCurrentUser();
  if(!el) return;
  if(!user){ el.innerHTML = '<div class="card">Please <a href="login.html">login</a> to view orders</div>'; return; }
  const orders = (store.get('dcl_orders', [])).filter(o=>o.user === user.email);
  if(orders.length===0){ el.innerHTML = '<div class="card">No orders yet</div>'; return; }
  el.innerHTML = orders.map(o => `
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between"><div><strong>${o.id}</strong></div><div class="small">${new Date(o.date).toLocaleString()}</div></div>
      <div class="small">Status: ${o.status}</div>
      <div style="margin-top:8px">${ o.items.map(it=>`<div>${it.qty} × ${it.name} — ₹${it.price * it.qty}</div>`).join('') }</div>
      <div style="margin-top:8px"><strong>Total ₹${o.total}</strong></div>
    </div>
  `).join('');
}

// Auth (simple)
function registerUser(name, email, pass){
  let users = store.get('dcl_users', []);
  if(users.find(u=>u.email === email)) return {ok:false, msg:'User exists'};
  users.push({name, email, pass});
  store.set('dcl_users', users);
  return {ok:true};
}
function loginUser(email, pass){
  const users = store.get('dcl_users', []);
  const u = users.find(x => x.email===email && x.pass===pass);
  if(!u) return {ok:false, msg:'Invalid credentials'};
  store.set('dcl_user', {name:u.name, email:u.email});
  return {ok:true};
}
function logout(){
  localStorage.removeItem('dcl_user');
  localStorage.removeItem('dcl_admin');
  location.href = 'index.html';
}

// Admin demo
function adminLogin(email, pass){
  if(email==='admin@dclothing.com' && pass==='admin123'){ store.set('dcl_admin', {email}); return {ok:true}; }
  return {ok:false, msg:'Invalid admin credentials'};
}
function adminAddProduct(p){
  const products = getProducts();
  p.id = products.length ? Math.max(...products.map(x=>x.id)) + 1 : 1;
  products.push(p);
  store.set('dcl_products', products);
}

// admin helpers
function adminGetCustomers(){ return store.get('dcl_users', []); }
function adminGetOrders(){ return store.get('dcl_orders', []); }

// small toast (simple)
function toast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.position='fixed'; t.style.right='20px'; t.style.bottom='20px';
  t.style.background='rgba(17,24,39,0.95)'; t.style.color='white'; t.style.padding='12px 16px'; t.style.borderRadius='10px';
  t.style.boxShadow='0 8px 30px rgba(2,6,23,0.3)'; t.style.zIndex=9999;
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.opacity=0; setTimeout(()=>t.remove(),300)}, 2200);
}

// run on load
document.addEventListener('DOMContentLoaded', ()=>{
  updateCartCount();
  // show last notification (if any)
  const n = localStorage.getItem('dcl_last_notification');
  if(n){ const obj = JSON.parse(n); toast(`${obj.title}: ${obj.text}`); localStorage.removeItem('dcl_last_notification'); }
});
