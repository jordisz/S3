// Exercise 10
// Move this variable to a json file and load the data in this js
var products = [
    {
        name: 'Cooking oil',
        price: 10.5,
        type: 'grocery'
    },
    {
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery'
    },
    {
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
var cartList = [];
var cart = [];
var subtotal = {
    grocery: {
        value: 0, 
        discount: 0
    },
    beauty: {
        value: 0, 
        discount: 0
    },
    clothes: {
        value: 0, 
        discount: 0
    },
};
var total = 0;

// Exercise 1
function addToCartList(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    for (let i = 0; i < products.length; i++) {
        if(i === id - 1) {
            cartList.push(products[i]);
        }
    }
}

// Exercise 2
function cleanCart() {
        cartList = [];          // We could delete this line if we remove the function addToCartList() (exercise 1)
        cart = [];
        clearTotals();
}

// Exercise 3
function calculateSubtotals() {
    // 1. Create a for loop on the "cartList" array 
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
    for (let i = 0; i < cart.length; i++) {
        switch (cart[i].type) {
            case "grocery":
                if(cart[i].subtotalWithDiscount !== 0){
                    subtotal.grocery.discount += (cart[i].subtotal - cart[i].subtotalWithDiscount);
                } 
                subtotal.grocery.value += cart[i].subtotal;
                break;
            case "beauty":
                if(cart[i].subtotalWithDiscount !== 0){
                    subtotal.beauty.discount += (cart[i].subtotal - cart[i].subtotalWithDiscount);
                } 
                subtotal.beauty.value += cart[i].subtotal;
                break;
            case "clothes":
                if(cart[i].subtotalWithDiscount !== 0){
                    subtotal.clothes.discount += (cart[i].subtotal - cart[i].subtotalWithDiscount);
                } 
                subtotal.clothes.value += cart[i].subtotal;
                break;
        }
    }
}

// Exercise 4
function calculateTotal() {
    // Calculate total price of the cart either using the "cartList" array
    for (let category in subtotal) {
        total += subtotal[category].value - subtotal[category].discount;
        total = +total.toFixed(2);
    }
}

// Exercise 5
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    for(let i = 0; i < cartList.length; i++){
        let index = cart.findIndex(product => product.name === cartList[i].name);
        if (index > -1) {
            cart[index].quantity += 1;
            cart[index].subtotal += cart[index].price;
        } else {
            let newItem = {
                name: cartList[i].name,
                price: cartList[i].price,
                type: cartList[i].type,
                quantity: 1,
                subtotal: cartList[i].price,
                subtotalWithDiscount: 0
            }
            cart.push(newItem);
        }
    }
}

// Exercise 6
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    let oilIndex = cart.findIndex(product => product.name === 'Cooking oil');
    let cupcakeMixtureIndex = cart.findIndex(product => product.name === 'Instant cupcake mixture');
    if(oilIndex > -1  && cart[oilIndex].quantity >= 3){
        cart[oilIndex].subtotalWithDiscount = cart[oilIndex].quantity * 10;
    } else if (oilIndex > -1) {
        cart[oilIndex].subtotalWithDiscount = 0;
    }
    if(cupcakeMixtureIndex > -1 && cart[cupcakeMixtureIndex].quantity >= 10){
        cart[cupcakeMixtureIndex].subtotalWithDiscount = +(cart[cupcakeMixtureIndex].subtotal * 2/3).toFixed(2);
    } else if (cupcakeMixtureIndex > -1){
        cart[cupcakeMixtureIndex].subtotalWithDiscount = 0;
    }
}

// Exercise 7
function addToCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    for (let i = 0; i < products.length; i++) {
        if(i === id - 1) {         
            let index = cart.findIndex(product => product.name === products[i].name);   // Look for product index in the cart array
            if(index > -1) {                                                            // If product is already in the cart array, increment quantity and price
                cart[index].quantity += 1;
                cart[index].subtotal += cart[index].price;
            } else {
                let newItem = {                                                         // If product is not in the cart array, create product object and push it
                    name: products[i].name,
                    price: products[i].price,
                    type: products[i].type,
                    quantity: 1,
                    subtotal: products[i].price,
                    subtotalWithDiscount: 0
                }
                cart.push(newItem);
            }
        }
    }
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    for (let i = 0; i < products.length; i++) {
        if(i === id - 1) { 
            let index = cart.findIndex(product => product.name === products[i].name);       // Look for product index in the cart array
            if(index > -1  && cart[index].quantity > 1) {                                   // If product exists in the cart array and quantity > 1, decrement quantity and price
                cart[index].quantity -= 1;
                cart[index].subtotal -= cart[index].price;
            } else if (index > -1 && cart[index].quantity == 1) {                           // Else if quantity = 1, remove item from cart
                cart.splice(index, 1);
            }
        }
    }
}

// Exercise 9
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    let list = document.querySelector(".list");
    let totalH3 = document.querySelector(".bill");

    applyPromotionsCart();
    clearTotals();  // To prevent unwanted increments when closing and reopening the cart modal
    list.innerHTML = "";

    if(cart.length > 0){
        for(i = 0; i < cart.length; i++){
            let listItem = document.createElement("li");

            let descriptionQuantityPrice = document.createTextNode(cart[i].name + " x " + cart[i].quantity + " : $" + cart[i].subtotal.toFixed(2));
            let button = document.createElement("button");  // Create removeFromChart button
            if(cart[i].quantity > 1){
                button.classList.add("btn-decrement");
                button.innerHTML = "-1";
            } else {
                button.classList.add("btn-remove");
                button.innerHTML = "X";
            }
            let index = products.findIndex(product => product.name === cart[i].name) + 1;
            button.onclick = function () {
                removeFromCart(index);
                printCart();
            }
                    
            listItem.appendChild(descriptionQuantityPrice);
            listItem.appendChild(button);
            list.appendChild(listItem);
            
            if(cart[i].subtotalWithDiscount !== 0){             // If product has a discount, print it
                let difference = cart[i].subtotal - cart[i].subtotalWithDiscount;

                let listDiscount = document.createElement("li");
                listDiscount.classList.add("discount");         // Maybe style discounts differently
                listDiscount.appendChild(document.createTextNode(cart[i].name + " discount: -$" + difference));
                list.appendChild(listDiscount);
            }
        }

        calculateSubtotals();
        calculateTotal();
        totalH3.innerHTML = "Total: $" + total;
    } else {
        totalH3.innerHTML = "Your cart is empty";
    }
}

function clearTotals() {
    subtotal = {
        grocery: {
            value: 0, 
            discount: 0
        },
        beauty: {
            value: 0, 
            discount: 0
        },
        clothes: {
            value: 0, 
            discount: 0
        },
    };
    total = 0;
}