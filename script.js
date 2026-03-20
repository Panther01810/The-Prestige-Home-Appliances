//ADD TO CART
localStorage.setItem("prestigeCart", JSON.stringify(cart));
document.addEventListener("DOMContentLoaded", () => {

    const savedCart = localStorage.getItem("prestigeCart");

    if (savedCart) {
        cart = JSON.parse(savedCart);

        cart.forEach(item => {
            total += item.price;
        });

        updateCartUI();
    }

});
//updated add to cart function
let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name + " - Ksh " + item.price;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total;
    cartCount.textContent = cart.length;
}

function toggleCart() {
    document.getElementById("cartPanel").classList.toggle("show-cart");
}

function clearCart() {
    cart = [];
    total = 0;
    updateCartUI();
}
//product filtering
function filterProducts(category) {
    const products = document.querySelectorAll(".product");
    products.forEach(product=> {
        if (category==="all"){
            product.style.display="block";
        } else {
            if(product.classList.contains(category)){
                product.style.display="block";
            }else{product.style.display="none";}
        }
    })
}

//Form Validation (contact us)
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || phone === "" || message === "") {
                alert("Please fill in all fields.");
                return;
            }

            if (!email.includes("@")) {
                alert("Please enter a valid email.");
                return;
            }

            if (phone.length < 10) {
                alert("Phone number must be at least 10 digits.");
                return;
            }

            alert("Message sent successfully!");
            form.reset();
        });
    }
});
//chatbot prestige 
//suppose we auto greet customers
setTimeout(() => {

    const chatBody = document.getElementById("chatBody");

    if (chatBody) {

        const greet = document.createElement("p");
        greet.className = "bot";
        greet.textContent = "Need help choosing an appliance? I'm here to help!";

        chatBody.appendChild(greet);
    }

}, 500);

//now lets hndle input and feedback

function toggleChatbot() {
    const chatbot = document.getElementById("chatbot");

    if (chatbot.style.display === "flex") {
        chatbot.style.display = "none";
    } else {
        chatbot.style.display = "flex";
    }
}

function sendMessage() {

    const input = document.getElementById("userInput");
    const message = input.value.toLowerCase();
    const chatBody = document.getElementById("chatBody");

    if (message.trim() === "") return;

    const userMessage = document.createElement("p");
    userMessage.className = "user";
    userMessage.textContent = message;
    chatBody.appendChild(userMessage);

    let response = "Sorry, I didn't understand that. Please contact support.";

    if (message.includes("hello") || message.includes("hi")) {
        response = "Hello 👋 How can I assist you today?";
    }

    else if (message.includes("products")) {
        response = "We sell televisions, refrigerators, washing machines, microwaves, air conditioners, kettles, blenders, and home sound systems.";
    }

    else if (message.includes("location")) {
        response = "Prestige Home Appliances is located in Nairobi, Kenya.";
    }

    else if (message.includes("price")) {
        response = "Our prices vary depending on the appliance. Please check the products page for details.";
    }

    else if (message.includes("contact")) {
        response = "You can contact us through the contact form on the Contact Us page.";
    }

    else if (message.includes("delivery")) {
        response = "Yes 🚚 We offer delivery services within Kenya.";
    }

    const botMessage = document.createElement("p");
    botMessage.className = "bot";
    botMessage.textContent = response;

    const typing = document.createElement("p");
typing.className = "bot";
typing.textContent = "Prestige Bot is typing...";
chatBody.appendChild(typing);

setTimeout(() => {
    typing.textContent = response;
}, 1000);

    input.value = "";

    chatBody.scrollTop = chatBody.scrollHeight;
};
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("userInput");

    if (input) {
        input.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    }

});
//suppose we add quick responses
function quickQuestion(type) {

    const responses = {
        products: "We sell televisions, refrigerators, washing machines, microwaves, air conditioners, kettles, blenders, and home sound systems.",
        
        price: "Our appliance prices range from Ksh 5,000 to over Ksh 80,000 depending on the product and features.",
        
        delivery: "Yes 🚚 Prestige Home Appliances offers delivery services within Kenya.",
        
        location: "Our main showroom is located in Nairobi, Kenya.",
        
        contact: "You can contact us using the Contact Us page or call our customer support team."
    };

    const chatBody = document.getElementById("chatBody");

    const userMessage = document.createElement("p");
    userMessage.className = "user";
    userMessage.textContent = type;
    chatBody.appendChild(userMessage);

    const botMessage = document.createElement("p");
    botMessage.className = "bot";
    botMessage.textContent = responses[type];

    chatBody.appendChild(botMessage);

    chatBody.scrollTop = chatBody.scrollHeight;
}

//contact us
// ===== EMAILJS INITIALIZATION =====

(function(){
    emailjs.init("6ZgX2jtZPKJPo5X_i");
})();

document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("contactForm");

    if(form){

        form.addEventListener("submit", function(e){
            e.preventDefault();

            const status = document.getElementById("form-status");
            status.textContent = "Sending message...";

            emailjs.sendForm(
                "service_7lteibd",
                "template_r3j4hbx",
                this
            )
            .then(function(){
                status.textContent = "Message sent successfully ✅";
                form.reset();
            }, function(error){
                status.textContent = "Failed to send message ❌";
                console.log(error);
            });

        });
    }

});
