document.addEventListener("DOMContentLoaded", function () {
  // Slider
  const slider = document.querySelector(".slider");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  if (slider && prevButton && nextButton) {
    let currentIndex = 0;
    const slideCount = document.querySelectorAll(".slide").length;

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSliderPosition();
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSliderPosition();
    });

    function updateSliderPosition() {
      const offset = -currentIndex * 100;
      slider.style.transform = `translateX(${offset}%)`;
    }

    // Call the function to initialize the slider position
    updateSliderPosition();
  }

  // Search Bar and Product Tiles
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const productGrid = document.getElementById("product-grid");

  const products = [
    {
      id: 1,
      name: "ONLY Women's Polyester Shift Mini Dress",
      price: "$19.99",
      image: "https://m.media-amazon.com/images/I/61ghAHo+EOL._UY879_.jpg",
    },
    {
      id: 2,
      name: "Miss Chase Women Dress",
      price: "$39.99",
      image: "https://m.media-amazon.com/images/I/813xB53Y7VL._UY879_.jpg",
    },
    {
      id: 3,
      name: "TOPLOT Women's Midi Dress",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/81IilnpDbaL._UY879_.jpg",
    },
    {
      id: 4,
      name: "GRECIILOOKS Western Dresses for Women | A-Line Knee-Length Black Dress | Midi Western Dress for Women | Digital Printed Casual Dress",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/711saX5YIRL._UY879_.jpg",
    },
    {
      id: 5,
      name: "Lymio Dresses for Women || Western Dresses for Women || Dress for Women || Dresses",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/81s3Bg2AaVL._UY879_.jpg",
    },
    {
      id: 6,
      name: "Soch Women Pink Rayon Floral Tunic",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/81XEZwinqoL._UY879_.jpg",
    },
    {
      id: 7,
      name: "Soch Women Maroon Botanical Print Cotton Kaftan",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/71YSuy+bOZL._UY879_.jpg",
    },
    {
      id: 8,
      name: "KOTTY Womens High Rise Cotton Lycra Jeans",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/612+ZjkLFoL._UY879_.jpg",
    },
    {
      id: 9,
      name: "LEOTUDE Women's Casual Printed Short Sleeve with Round Neck, Oversized Longline Drop Shoulder, Very Trendy Printed, Boho Style T-Shirt",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/61iKv6-unXL._UY879_.jpg",
    },
    {
      id: 10,
      name: "HSR Women Stylish Sleeveless High Mock Neck Stretchable Knit Regular Fit Tank Top (Free Size)",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/51CHzirfbnL._UX679_.jpg",
    },
    {
      id: 11,
      name: "Urbano Fashion Men's Printed Full Sleeve Slim Fit Cotton T-Shirt",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/61bDoqhvEPL._UX679_.jpg",
    },
    {
      id: 12,
      name: "Alan Jones Clothing Men's Slim Fit Track pants",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/81t3XS8UciL._UY879_.jpg",
    },
    {
      id: 13,
      name: "Lymio Casual Shirt for Men|| Shirt for Men|| Men Stylish Shirt || Men Printed Shirt (Karrey)",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/71UkW9i6uRL._UX679_.jpg",
    },
    {
      id: 14,
      name: "Peppyzone Men's Camouflage Regular Fit Track Pant",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/616eqgWV4SL._UY879_.jpg",
    },
    {
      id: 15,
      name: "Amazon Brand - Symbol Men Dress Pants",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/71p+y8xHJFL._UY879_.jpg",
    },
  ];

  function generateProductTiles(products) {
    productGrid.innerHTML = "";
    products.forEach((product) => {
      const productTile = document.createElement("div");
      productTile.className = "product-tile";
      productTile.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h1>${product.name}</h1>
              <p>${product.price}</p>
              <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
          `;
      productGrid.appendChild(productTile);
    });
  }

  if (searchButton && searchInput && productGrid) {
    searchButton.addEventListener("click", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      generateProductTiles(filteredProducts);
    });

    // Display default product tiles
    generateProductTiles(products);

    productGrid.addEventListener("click", function (event) {
      if (event.target.classList.contains("add-to-cart")) {
        const productId = parseInt(
          event.target.getAttribute("data-product-id")
        );
        const selectedProduct = products.find(
          (product) => product.id === productId
        );
        addToCart(selectedProduct);
        alert(`Added ${selectedProduct.name} to cart!`);
      }
    });
  }
});

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(product);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");

  // Retrieve cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  function generateCartItems(cartItems) {
    cartItemsContainer.innerHTML = "";
    cartItems.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="remove-from-cart" data-product-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  generateCartItems(cartItems);

  // Remove from cart event handler
  cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart")) {
      const productId = parseInt(event.target.getAttribute("data-product-id"));
      removeFromCart(productId);
      const updatedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      generateCartItems(updatedCartItems);
    }
  });
});

function removeFromCart(productId) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCart = cartItems.filter((item) => item.id !== productId);
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
}

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Implement form submission logic here
      alert("Message sent successfully!");
      contactForm.reset();
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Basic validation (replace with actual login logic)
    if (username === "admin" && password === "password") {
      // Successful login
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
      errorMessage.textContent = "Invalid username or password";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Add registration logic here
    alert("Registration submitted!");
  });
});
