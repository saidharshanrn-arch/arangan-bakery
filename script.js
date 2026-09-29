/* =========================================================
   ARANGAN BAKERY - SITE SCRIPT
   ---------------------------------------------------------
   EDIT HERE: All cafe details live in CAFE_INFO below.
   Change them once and every button, link and text on the
   page updates automatically.
   ========================================================= */

const CAFE_INFO = {
  name: "Arangan Bakery",
  address: "[Street Address], Salem, Tamil Nadu",
  mapQuery: "Salem, Tamil Nadu", // What Google Maps should search for
  hours: "Open daily, 7:00 AM – 10:00 PM",
  hoursShort: "7AM–10PM",
  phone: "[Phone Number]", // Shown on the page
  phoneDial: "+910000000000", // Used for click-to-call (include country code, no spaces)
  whatsapp: "910000000000", // Country code + number, digits only
  email: "[Email Address]",
  instagramHandle: "@aranganbakery",
  instagramUrl: "https://instagram.com/",
};

/* =========================================================
   MENU
   To add an item: copy one line and change the details.
   "category" must match one of the ids in MENU_CATEGORIES.
   ========================================================= */

const MENU_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee" },
  { id: "tea", label: "Tea" },
  { id: "cool-drinks", label: "Cool Drinks" },
  { id: "breakfast", label: "Breakfast" },
  { id: "snacks", label: "Snacks" },
  { id: "desserts", label: "Desserts" },
  { id: "special", label: "Special Items" },
];

const MENU_ITEMS = [
  { name: "Filter Coffee", description: "Slow-dripped South Indian decoction with frothy hot milk.", price: "₹30", image: "images/filter-coffee.webp", category: "coffee", badge: "Bestseller" },
  { name: "Cappuccino", description: "Rich espresso with velvety steamed milk and fine foam.", price: "₹90", image: "images/cappuccino.webp", category: "coffee" },
  { name: "Cold Coffee", description: "Chilled coffee blended with ice cream and chocolate drizzle.", price: "₹90", image: "images/cold-coffee.jpg", category: "coffee" },

  { name: "Masala Chai", description: "Strong tea brewed with ginger, cardamom and cinnamon.", price: "₹25", image: "images/masala-chai.jpg", category: "tea", badge: "Bestseller" },
  { name: "Ginger Lemon Tea", description: "Soothing honey, fresh ginger and a squeeze of lemon.", price: "₹40", image: "images/ginger-lemon-tea.webp", category: "tea" },
  { name: "Mint Green Tea", description: "Light, refreshing green tea with fresh mint leaves.", price: "₹45", image: "images/green-tea.webp", category: "tea" },

  { name: "Fresh Lime Soda", description: "Sweet, salted or mixed with fresh mint and plenty of ice.", price: "₹50", image: "images/lime-soda.webp", category: "cool-drinks" },
  { name: "Thick Milkshakes", description: "Chocolate, strawberry or vanilla, topped with whipped cream.", price: "₹80", image: "images/milkshakes.jpg", category: "cool-drinks" },

  { name: "Bread Omelette", description: "Toasted bread with a fluffy masala omelette and onions.", price: "₹50", image: "images/bread-omelette.webp", category: "breakfast" },
  { name: "Bun Butter Jam", description: "Soft house-baked bun with creamy butter and fruit jam.", price: "₹40", image: "images/bun-butter.webp", category: "breakfast" },
  { name: "Veg Maggi", description: "Hot masala noodles tossed with fresh vegetables.", price: "₹50", image: "images/veg-maggi.webp", category: "breakfast" },

  { name: "Bhujia Sandwich", description: "Grilled veg sandwich with green chutney and crunchy bhujia.", price: "₹60", image: "images/bhujia-sandwich.webp", category: "snacks" },
  { name: "Pani Puri", description: "Crispy puris with spiced potato and tangy mint water.", price: "₹40", image: "images/pani-puri.webp", category: "snacks" },
  { name: "Mayonnaise Puri", description: "A creamy twist on chaat with sev, onion and tomato.", price: "₹50", image: "images/mayo-puri.webp", category: "snacks" },

  { name: "Chocolate Truffle Pastry", description: "Layers of moist sponge and glossy dark chocolate ganache.", price: "₹70", image: "images/truffle-pastry.webp", category: "desserts" },
  { name: "Chocolate Eclair", description: "Choux pastry filled with cream and dipped in chocolate.", price: "₹45", image: "images/eclair.webp", category: "desserts" },
  { name: "Assorted Cookies", description: "Butter, chocolate and jam cookies baked fresh daily. Per 250g.", price: "₹120", image: "images/pastry-display.jpg", category: "desserts" },

  { name: "Salem Thattu Vadai Set", description: "Our hometown favourite, layered with veggies and chutney.", price: "₹50", image: "images/thattu-vadai.webp", category: "special", badge: "Local favourite" },
  { name: "Creamy Chicken Pasta", description: "Penne in a rich white sauce with herbs and cheese.", price: "₹90", image: "images/chicken-pasta.webp", category: "special" },
  { name: "Celebration Cake", description: "Custom cakes for birthdays and occasions. Per 500g, from", price: "₹550", image: "images/celebration-cake.webp", category: "special" },
];

/* =========================================================
   Below this line is the site behaviour.
   You normally won't need to change anything here.
   ========================================================= */

function whatsappUrl(message) {
  return `https://wa.me/${CAFE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

function fillCafeInfo() {
  document.querySelectorAll("[data-info]").forEach((el) => {
    const value = CAFE_INFO[el.dataset.info];
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-phone-link]").forEach((el) => {
    el.href = `tel:${CAFE_INFO.phoneDial}`;
  });

  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.href = whatsappUrl(el.dataset.whatsapp);
    el.target = "_blank";
    el.rel = "noopener";
  });

  const query = encodeURIComponent(`${CAFE_INFO.name}, ${CAFE_INFO.mapQuery}`);
  document.getElementById("mapFrame").src = `https://www.google.com/maps?q=${query}&output=embed`;
  document.getElementById("directionsLink").href = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  document.getElementById("emailLink").href = `mailto:${CAFE_INFO.email}`;
  document.getElementById("instagramLink").href = CAFE_INFO.instagramUrl;
  document.getElementById("year").textContent = new Date().getFullYear();
}

/* ---------- Menu rendering and filtering ---------- */

function createMenuCard(item) {
  const card = document.createElement("article");
  card.className = "menu-card";
  card.dataset.category = item.category;

  const categoryLabel = MENU_CATEGORIES.find((c) => c.id === item.category)?.label || "";
  const badge = item.badge ? `<span class="menu-badge">${item.badge}</span>` : "";

  card.innerHTML = `
    <div class="menu-media">
      <img src="${item.image}" alt="${item.name}" loading="lazy" width="800" height="600">
      ${badge}
    </div>
    <div class="menu-body">
      <p class="menu-category">${categoryLabel}</p>
      <div class="menu-title-row">
        <h3>${item.name}</h3>
        <span class="menu-price">${item.price}</span>
      </div>
      <p class="menu-desc">${item.description}</p>
    </div>
  `;
  return card;
}

function renderMenu(category) {
  const grid = document.getElementById("menuGrid");
  const items = category === "all" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === category);

  grid.innerHTML = "";
  items.forEach((item, index) => {
    const card = createMenuCard(item);
    card.style.animationDelay = `${Math.min(index, 8) * 50}ms`;
    grid.appendChild(card);
  });
}

function setupMenu() {
  const filters = document.getElementById("menuFilters");

  MENU_CATEGORIES.forEach((cat, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-btn";
    button.textContent = cat.label;
    button.dataset.category = cat.id;
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    filters.appendChild(button);
  });

  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;
    filters.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
    renderMenu(button.dataset.category);
  });

  renderMenu("all");
}

/* ---------- Navigation ---------- */

function setupNavigation() {
  const header = document.getElementById("header");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  function closeMenu() {
    header.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navLinks = document.querySelectorAll(".nav-link");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
}

/* ---------- Scroll reveal animations ---------- */

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  elements.forEach((el) => observer.observe(el));
}

/* ---------- Contact form validation ---------- */

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    phone: (v) => (/^(\+91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/\s/g, "")) ? "" : "Please enter a valid 10-digit mobile number."),
    message: (v) => (v.trim().length >= 10 ? "" : "Please write a message of at least 10 characters."),
  };

  function validateField(field) {
    const error = rules[field.name](field.value);
    document.getElementById(`${field.name}Error`).textContent = error;
    field.setAttribute("aria-invalid", error ? "true" : "false");
    return !error;
  }

  Object.keys(rules).forEach((name) => {
    const field = form.elements[name];
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    const fields = Object.keys(rules).map((name) => form.elements[name]);
    const results = fields.map(validateField);
    const firstInvalid = fields[results.indexOf(false)];

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const { name, phone, message } = form.elements;
    const text = `Hello Arangan Bakery!\n\nName: ${name.value.trim()}\nPhone: ${phone.value.trim()}\n\n${message.value.trim()}`;
    window.open(whatsappUrl(text), "_blank", "noopener");

    status.textContent = `Thank you, ${name.value.trim()}! Your message is ready to send on WhatsApp.`;
    status.classList.add("success");
    form.reset();
  });
}

/* ---------- Start everything ---------- */

document.addEventListener("DOMContentLoaded", () => {
  fillCafeInfo();
  setupMenu();
  setupNavigation();
  setupReveal();
  setupContactForm();
});
