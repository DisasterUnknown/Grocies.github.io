let totalCartPrice = 0;

let fruitBtn = document.getElementById("fruitBtn");
let vegeBtn = document.getElementById("vegeBtn");
let dariyBtn = document.getElementById("dariyBtn");
let cosmeticsBtn = document.getElementById("cosmeticsBtn");
let meatBtn = document.getElementById("meatBtn");
let bakingBtn = document.getElementById("bakingBtn");

// Checking for form validation
function checkValidity(formID, selectList, itemQuantity) {
    let form = document.getElementById(formID);

    if (form.checkValidity()) {
        // Calling the formSettings Function 
        formSettings(selectList, itemQuantity);
    } else {
        form.reportValidity();
    }
}

// Function to add the products to the cart 
function formSettings(selectList, itemQuantity) {
    let productList = {
        // Fruits List
        "Papaya": 460.00,
        "Banana (Seeni)": 210.00,
        "Apple": 1950.00,
        "Orange": 1890.00,
        "Melon": 200.00,
        "Mango": 680.00,
        "Avocado": 450.00,
        "Dragon Fruit": 1760.00,

        // Vegetables List
        "Batana": 470.00,
        "Capsicum": 490.00,
        "Carrot": 450.00,
        "Cauliflower": 870.00,
        "Cucumber": 190.00,
        "Garlic": 1010.00,
        "Green Beans": 340.00,
        "Green Cucumber": 550.00,
        "Kakiri": 90.00,
        "Leeks": 280.00,
        "Onions": 690.00,
        "Potatoes": 350.00,

        // Dairy Produce List 
        "Yoghurt Pack": 560.00,
        "Whipping Cream": 3800.00,
        "Cheese Spread": 810.00,
        "Cream Cheese": 1890.00,
        "Cheese Wedges": 950.00,
        "Curd": 770.00,
        "Processed Cheese": 940.00,
        "Salted Butter": 1450.00,
        "Swiss Cheese": 600.00,
        "Vanil Yoghurt": 160.00,
        "Cheese Ball": 1980.00,
        "Berry Yoghurt": 162.00,

        // Cosmetics List 
        "Black Suede": 9280.00,
        "Musk": 5280.00,
        "Gold Scrub": 1950.00,
        "Men Skin Care": 2950.00,
        "Ice Roller": 1050.00,
        "Day Cream": 9500.00,
        "Body Soap": 12760.00,
        "Lip Gloss": 990.00,
        "Hair Clipper": 14850.00,

        // Meat and Seafood List 
        "Chicken Liver": 1410.00,
        "Pork Cubes": 2590.00,
        "Pork Leg Bone": 2500.00,
        "Mutton Leg": 4990.00,
        "Thalapath Small": 1990.00,
        "Octopus": 1510.00,
        "Prawns": 4360.00,
        "Hendella": 1600.00,

        // Baking, Cooking Ingredients List
        "Seasoning Cubes": 93.00,
        "Wijaya Sego": 110.00,
        "Curry Powder": 445.00,
        "Rock Salt": 1232.00,
        "Goraka": 41.00,
        "Biriyani Mix": 247.00,
        "Pepper Powder": 812.00,
        "Chilli Pieces": 397.00,
    }

    let itemName = selectList.value;
    itemQuantity = itemQuantity.value
    let itemPrice = productList[itemName] * itemQuantity;
    // console.log(`Name: ${itemName}, Quantity: ${itemQuantity}, Price: Rs.${itemPrice}`);

    addToCart(itemName, itemQuantity, itemPrice);

}

// Add item to cart function
function addToCart(itemName, itemQuantity, itemPrice) {
    let cartTable = document.getElementById("cartTable");


    // Adding a new row to the table 
    let itemNewRow = cartTable.insertRow(1);

    // Adding new cells to the table 
    let itemCell1 = itemNewRow.insertCell(0);
    let itemCell2 = itemNewRow.insertCell(1);
    let itemCell3 = itemNewRow.insertCell(2);

    // Assigning values to the cells of the table 
    itemCell1.innerHTML = itemName;
    itemCell1.className = "items";

    itemCell2.innerHTML = itemQuantity;
    itemCell3.innerHTML = `<div class="priceCell">
                                <span>${numberFormat(itemPrice)}</span>
                                <button onclick="deleteRow(this)">x</button>
                            </div>`;


    // Calling the total price function 
    manageTotalCartPrice(0, itemPrice);
}

// Remove Item from cart Function
function deleteRow(Btn) {
    let row = Btn.parentNode.parentNode.parentNode;
    row.parentNode.removeChild(row);

    let itemPrice = Btn.parentNode.querySelector('span').textContent;
    manageTotalCartPrice(1, itemPrice);
}

// Mannaging the total price of the cart
function manageTotalCartPrice(functionNo, itemPrice) {
    let totalPrice = document.getElementById("totalPrice");
    let totalCartPrice = parseInt(numberDeformat(totalPrice.innerText));

    if (functionNo == 0) {
        totalCartPrice += itemPrice;
        totalPrice.innerHTML = numberFormat(totalCartPrice);
        
    } else if (functionNo == 1) {
        totalCartPrice = totalCartPrice - numberDeformat(itemPrice);
        totalPrice.innerHTML = numberFormat(totalCartPrice);
    }

}


// Formating the numbers with commars 
function numberFormat(number) {
    return number.toLocaleString('en-US');
}

// Formating the numbers without commars
function numberDeformat(number) {
    return parseInt(number.replace(/,/g, ''));
}


// Calling the Functions
fruitBtn.addEventListener("click", function () {
    let fruitSelect = document.getElementById("fruitSelect");
    let fruitQuantity = document.getElementById("fruitQuantity");

    checkValidity("fruitForm", fruitSelect, fruitQuantity);
});

vegeBtn.addEventListener("click", function () {
    let vegeSelect = document.getElementById("vegeSelect");
    let vegeQuantity = document.getElementById("vegeQuantity");

    checkValidity("vegeForm", vegeSelect, vegeQuantity);
});

dariyBtn.addEventListener("click", function () {
    let dariySelect = document.getElementById("dariySelect");
    let dariyQuantity = document.getElementById("dariyQuantity");

    checkValidity("dairyForm", dariySelect, dariyQuantity);
});

meatBtn.addEventListener("click", function () {
    let meatSelect = document.getElementById("meatSelect");
    let meatQuantity = document.getElementById("meatQuantity");

    checkValidity("meatForm", meatSelect, meatQuantity);
});

bakingBtn.addEventListener("click", function () {
    let bakingSelect = document.getElementById("bakingSelect");
    let bakingQuantity = document.getElementById("bakingQuantity");

    checkValidity("bakingForm", bakingSelect, bakingQuantity);
});

cosmeticsBtn.addEventListener("click", function () {
    let cosmeticsSelect = document.getElementById("cosmeticsSelect");
    let cosmeticsQuantity = document.getElementById("cosmeticsQuantity");

    checkValidity("cosmaticsForm", cosmeticsSelect, cosmeticsQuantity);
});