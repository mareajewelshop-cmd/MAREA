const grid = document.getElementById("product-grid");
const filters = document.querySelectorAll(".filter");

function renderProducts(category = "Todos"){
  const visible = category === "Todos" ? products : products.filter(p => p.category === category);
  grid.innerHTML = visible.map((p,index) => `
    <article class="product-card reveal visible">
      <div class="product-image">
        <span class="product-number">0${index+1} / ${p.category}</span>
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <div>
          <div class="product-name">${p.name}</div>
          <div class="product-category">${p.category}</div>
        </div>
        <div class="product-price">${p.price}</div>
        <div class="product-desc">${p.description}</div>
        <a class="product-query" href="#contacto">Consultar disponibilidad →</a>
      </div>
    </article>
  `).join("");
}
renderProducts();

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
menuButton.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".mobile-nav a").forEach(a => a.addEventListener("click", () => mobileNav.classList.remove("open")));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
