// Utilidades simples para demo de carrito y UI
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

const cart = [];
const prices = { p1: 129900, p2: 159900, p3: 199900 };

function formatCOP(v){
  return v.toLocaleString('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 });
}

function renderCart(){
  const list = $('#cartList');
  const total = $('#cartTotal');
  list.innerHTML = '';
  let sum = 0;

  cart.forEach((item, i) => {
    sum += item.price * item.qty;
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <span>${item.title} × ${item.qty}</span>
      <strong>${formatCOP(item.price * item.qty)}</strong>
      <button class="btn btn-outline" data-remove="${i}">Quitar</button>
    `;
    list.appendChild(li);
  });

  total.textContent = formatCOP(sum);
}

function addToCart(id){
  const title = {
    p1: 'Camiseta Snowfit Pro',
    p2: 'Leggins Active',
    p3: 'Cortaviento Urban'
  }[id] || 'Producto';

  const price = prices[id] || 0;
  const idx = cart.findIndex(i => i.id === id);
  if (idx >= 0) cart[idx].qty += 1;
  else cart.push({ id, title, price, qty: 1 });
  renderCart();
}

function removeFromCart(index){
  cart.splice(index, 1);
  renderCart();
}

function initEvents(){
  $$('#productos .add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => addToCart(btn.dataset.id));
  });

  $('#cartList').addEventListener('click', e => {
    const i = e.target.getAttribute('data-remove');
    if (i !== null) removeFromCart(parseInt(i, 10));
  });

  $('#checkout').addEventListener('click', () => {
    if (!cart.length) return alert('Tu carrito está vacío.');
    alert('¡Gracias por tu compra! (demo)');
  });

  $('#ctaHero')?.addEventListener('click', () => {
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
  });

  $('#contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Validación mínima
    if (!data.nombre || !data.email || !data.mensaje) {
      $('#formMsg').textContent = 'Por favor completa todos los campos.';
      return;
    }
    $('#formMsg').textContent = 'Mensaje enviado. Te contactaremos pronto.';
    e.currentTarget.reset();
  });

  // Año en footer
  $('#year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', initEvents);
