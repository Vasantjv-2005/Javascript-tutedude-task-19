// Getting elements from HTML

let cartItems = document.getElementById("cartItems");
let totalAmount = document.getElementById("totalAmount");
let emptyMessage = document.getElementById("emptyMessage");

let addButtons = document.querySelectorAll(".add-btn");
let skipButtons = document.querySelectorAll(".skip-btn");

let addToCartBtn = document.getElementById("addToCartBtn");
let bookNowBtn = document.getElementById("bookNowBtn");

let bookingForm = document.getElementById("bookingForm");
let bookingSection = document.getElementById("bookingSection");


// Creating an empty array for storing services

let selectedServices = [];


// Function to display selected services

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (selectedServices.length === 0) {

        cartItems.innerHTML = '<p id="emptyMessage">No items have been added yet.</p>';

    } else {

        selectedServices.forEach(function (service, index) {

            let item = document.createElement("div");

            item.classList.add("cart-item");

            item.innerHTML = `
                <div>
                    <h4>${service.name}</h4>
                    <p>₹${service.price}</p>
                </div>

                <button class="remove-btn" data-index="${index}">
                    Remove
                </button>
            `;

            cartItems.appendChild(item);

            total = total + service.price;

        });

    }

    // Updating the total amount

    totalAmount.textContent = "₹" + total;

}


// Adding services to the cart

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let name = button.getAttribute("data-name");

        let price = Number(button.getAttribute("data-price"));

        let service = {
            name: name,
            price: price
        };

        selectedServices.push(service);

        displayCart();

        button.textContent = "Added";

        button.disabled = true;

    });

});


// Skipping services

skipButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let card = button.closest(".service-card");

        card.style.display = "none";

    });

});


// Removing services from cart

cartItems.addEventListener("click", function (event) {

    if (event.target.classList.contains("remove-btn")) {

        let index = Number(event.target.getAttribute("data-index"));

        selectedServices.splice(index, 1);

        displayCart();

        // Enable the Add Item button again

        addButtons.forEach(function (button) {

            let name = button.getAttribute("data-name");

            let alreadyAdded = selectedServices.some(function (service) {
                return service.name === name;
            });

            if (!alreadyAdded) {

                button.disabled = false;

                button.textContent = "Add Item";

            }

        });

    }

});


// Add to Cart button

addToCartBtn.addEventListener("click", function () {

    if (selectedServices.length === 0) {

        alert("Please add at least one service to your cart.");

    } else {

        alert("Your services have been added to the cart!");

    }

});


// Book Now button

bookNowBtn.addEventListener("click", function () {

    if (selectedServices.length === 0) {

        alert("Please select at least one service before booking.");

    } else {

        bookingSection.scrollIntoView({
            behavior: "smooth"
        });

    }

});


// Booking form submission

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (selectedServices.length === 0) {

        alert("Please select a service before booking.");

        return;

    }

    let name = document.getElementById("fullName").value;

    let email = document.getElementById("email").value;

    alert(
        "Booking Successful!\n\n" +
        "Name: " + name +
        "\nEmail: " + email +
        "\nTotal Amount: " + totalAmount.textContent
    );

    // Clear the cart after booking

    selectedServices = [];

    displayCart();

    addButtons.forEach(function (button) {

        button.disabled = false;

        button.textContent = "Add Item";

    });

    bookingForm.reset();

});


// Logout button

document.getElementById("logoutBtn").addEventListener("click", function () {

    let confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        alert("You have been logged out successfully!");

    }

});