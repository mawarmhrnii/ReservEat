// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");

document.addEventListener("DOMContentLoaded", function () {
  // TAB
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".history-content, .card-list");

  // CART
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemCount = document.querySelector(".cart-button span");
  const cartItemsList = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total");
  const cartIcon = document.querySelector(".cart-button");
  const sidebar = document.querySelector(".sidebar");

  // TAB BUTTON START
  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      tab.classList.add("active");

      // Hide all tab contents
      tabContents.forEach((content) => content.classList.remove("active"));

      // Show the corresponding tab content
      const target = document.getElementById(tab.getAttribute("data-tab"));
      target.classList.add("active");
    });
  });

  // CART MENU
  let cartItems = [];
  let totalAmount = 0;

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const item = {
        name: document.querySelectorAll(".card-menu .card-title")[index]
          .textContent,
        price: parseFloat(
          document
            .querySelectorAll(".price")
            [index].textContent.replace("Rp", "")
            .trim()
            .replace(/,/g, "")
        ),
        quantity: 1,
      };

      const existingItem = cartItems.find(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push(item);
      }

      totalAmount += item.price;

      updateCartUI();
    });
  });

  function updateCartUI() {
    updateCartItemCount(cartItems.length);
    updateCartItemList();
    updateCartTotal();
  }

  function updateCartItemCount(count) {
    cartItemCount.textContent = count;
  }

  function updateCartItemList() {
    cartItemsList.innerHTML = "";
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item", "individual-cart-item");
      cartItem.innerHTML = `
        <span>(${item.quantity}x) ${item.name}</span>
        <span class=price-remove>
        <span class="each-price">Rp${(item.price * item.quantity).toFixed(
          3
        )}</span>
        <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
      </span>
        `;

      cartItemsList.append(cartItem);
    });

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.closest(".remove-btn").dataset.index;
        removeItemFromCart(index);
      });
    });
  }

  function removeItemFromCart(index) {
    const removeItem = cartItems.splice(index, 1)[0];
    totalAmount -= removeItem.price * removeItem.quantity;
    updateCartUI();
  }

  function updateCartTotal() {
    cartTotal.textContent = `Rp${totalAmount.toFixed(3)}`;
  }

  cartIcon.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  const closeButton = document.querySelector(".sidebar-close");
  closeButton.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
});

// Ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};
