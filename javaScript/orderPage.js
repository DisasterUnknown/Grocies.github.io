// Referancing the elements from the DOM
let fruitSelect = document.getElementById("fruitSelect");
let vegeSelect = document.getElementById("vegeSelect");
let dariySelect = document.getElementById("dariySelect");
let meatSelect = document.getElementById("meatSelect");
let bakingSelect = document.getElementById("bakingSelect");
let cosmeticsSelect = document.getElementById("cosmeticsSelect");

// JSON file Locations 
let vegeJsonLocation = "../JSON/vege.json";
let fruitJsonLocation = "../JSON/fruits.json";
let meatJsonLocation = "../JSON/meat.json";
let cosmeticsJsonLocation = "../JSON/cosmetics.json";
let beveragesJsonLocation = "../JSON/beverages.json";
let dairyJsonLocation = "../JSON/dairy.json";

// Adding the products to the respective sections
function selectionListCreation(selectionList, productJSONLocation) {
    fetch(productJSONLocation)
        .then(res => res.json())
        .then(data => {dataCreation(data)})
        .catch(error => console.log(error))

    function dataCreation(data) {
        data = data[0];
        let keyList = Object.keys(data);
        
        keyList.forEach(product => {
            selectionList.innerHTML += `<option value="${product}">${product}</option>`
        });
    }
}

// Calling the functions then the page is been loaded
window.onload = selectionListCreation(fruitSelect, fruitJsonLocation);
window.onload = selectionListCreation(vegeSelect, vegeJsonLocation);
window.onload = selectionListCreation(dariySelect, dairyJsonLocation);
window.onload = selectionListCreation(meatSelect, meatJsonLocation);
window.onload = selectionListCreation(bakingSelect, beveragesJsonLocation);
window.onload = selectionListCreation(cosmeticsSelect, cosmeticsJsonLocation);




// ----------------------------------------------------------------------------------------------------------------------------------------
// Referancing the elements from the DOM
let cosmeticsQuantity = document.getElementById("cosmeticsQuantity");
let bakingQuantity = document.getElementById("bakingQuantity");
let meatQuantity = document.getElementById("meatQuantity");
let dariyQuantity = document.getElementById("dariyQuantity");
let vegeQuantity = document.getElementById("vegeQuantity");
let fruitQuantity = document.getElementById("fruitQuantity");

let fruitBtn = document.getElementById("fruitBtn");
let vegeBtn = document.getElementById("vegeBtn");
let dariyBtn = document.getElementById("dariyBtn");
let cosmeticsBtn = document.getElementById("cosmeticsBtn");
let meatBtn = document.getElementById("meatBtn");
let bakingBtn = document.getElementById("bakingBtn");




// ----------------------------------------------------------------------------------------------------------------------------------------
// Checking for individual form validations (fields filled or not)
function formValidity(formID, selectList, itemQuantity, fileLocation) {
    let form = document.getElementById(formID);

    if (form.checkValidity()) {
        // Calling the formSettings Function (Gathering the form data {quantitly, product, price}) 
        formSettings(selectList, itemQuantity, null, 0, fileLocation);
    } else {
        form.reportValidity();
    }
}


// Function to add the products to the cart 
function formSettings(selectList, itemQuantity, elementID, functionID, fileLocation) {
    // Importing the json file
    function jsonImport(fileLocation) {
        fetch(fileLocation)
            .then(res => res.json())
            .then(data => processData(data))
            .catch(error => console.log(error))
    }

    // Importing the JSON files into the page
    function processData(data) {
        data = data[0]
        let itemName = selectList.value;
        itemQuantity = itemQuantity.value;
        let itemPrice = data[itemName] * itemQuantity;
        // console.log(`Name: ${itemName}, Quantity: ${itemQuantity}, Price: Rs.${itemPrice}`);

        if (functionID == 1) {
            elementID.innerHTML = `Rs. ${numberFormat(itemPrice)}`;
        } else {
            addToCart(itemName, itemQuantity, itemPrice);
        }
    }

    jsonImport(fileLocation)
}




// ----------------------------------------------------------------------------------------------------------------------------------------
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
    manageTotalCartPrice("add", itemPrice);
}


// Remove Item from cart Function
function deleteRow(Btn) {
    let row = Btn.parentNode.parentNode.parentNode;
    row.parentNode.removeChild(row);

    let itemPrice = Btn.parentNode.querySelector('span').textContent;
    manageTotalCartPrice("delete", itemPrice);
}


// Mannaging the total price of the cart
let totalCartPrice = 0;
function manageTotalCartPrice(command, itemPrice) {
    let totalPrice = document.getElementById("totalPrice");
    let totalCartPrice = parseInt(numberDeformat(totalPrice.innerText));

    if (command == "add") {
        totalCartPrice += itemPrice;
        totalPrice.innerHTML = numberFormat(totalCartPrice);

    } else if (command == "delete") {
        totalCartPrice = totalCartPrice - numberDeformat(itemPrice);
        totalPrice.innerHTML = numberFormat(totalCartPrice);
    }

}




// ----------------------------------------------------------------------------------------------------------------------------------------
// Number formating function
// Formating the numbers with commars 
function numberFormat(number) {
    return number.toLocaleString('en-US');
}

// Formating the numbers without commars
function numberDeformat(number) {
    return parseInt(number.replace(/,/g, ''));
}





// ----------------------------------------------------------------------------------------------------------------------------------------
// Calling the add to cart Functions 
fruitBtn.addEventListener("click", function () {
    formValidity("fruitForm", fruitSelect, fruitQuantity, fruitJsonLocation);
});

vegeBtn.addEventListener("click", function () {
    formValidity("vegeForm", vegeSelect, vegeQuantity, vegeJsonLocation);
});

dariyBtn.addEventListener("click", function () {
    formValidity("dairyForm", dariySelect, dariyQuantity, dairyJsonLocation);
});

meatBtn.addEventListener("click", function () {
    formValidity("meatForm", meatSelect, meatQuantity, meatJsonLocation);
});

bakingBtn.addEventListener("click", function () {
    formValidity("bakingForm", bakingSelect, bakingQuantity, beveragesJsonLocation);
});

cosmeticsBtn.addEventListener("click", function () {
    formValidity("cosmaticsForm", cosmeticsSelect, cosmeticsQuantity, cosmeticsJsonLocation);
});



// ----------------------------------------------------------------------------------------------------------------------------------------
// Calling the product section item display
function callFunctions(inputFeild, fieldSection, selectionList, fileLocation) {
    // Checking if the user goes beyound 4 digits
    if (inputFeild.value.length > 4) {
        inputFeild.value = inputFeild.value.slice(0, 4);
    }

    let sectionPrice = document.querySelector(fieldSection);
    formSettings(selectionList, inputFeild, sectionPrice, 1, fileLocation);
}




// Calling the main function (callFunction)
fruitQuantity.addEventListener("input", function () {
    callFunctions(fruitQuantity, "#fruitForm p", fruitSelect, fruitJsonLocation);
});
fruitSelect.addEventListener("change", function () {
    callFunctions(fruitQuantity, "#fruitForm p", fruitSelect, fruitJsonLocation);
});


vegeQuantity.addEventListener("input", function () {
    callFunctions(vegeQuantity, "#vegeForm p", vegeSelect, vegeJsonLocation);
});
vegeSelect.addEventListener("change", function () {
    callFunctions(vegeQuantity, "#vegeForm p", vegeSelect, vegeJsonLocation);
});


dariyQuantity.addEventListener("input", function () {
    callFunctions(dariyQuantity, "#dairyForm p", dariySelect, dairyJsonLocation);
});
dariySelect.addEventListener("change", function () {
    callFunctions(dariyQuantity, "#dairyForm p", dariySelect, dairyJsonLocation);
});


cosmeticsQuantity.addEventListener("input", function () {
    callFunctions(cosmeticsQuantity, "#cosmaticsForm p", cosmeticsSelect, cosmeticsJsonLocation);
});
cosmeticsSelect.addEventListener("change", function () {
    callFunctions(cosmeticsQuantity, "#cosmaticsForm p", cosmeticsSelect, cosmeticsJsonLocation);
});


meatQuantity.addEventListener("input", function () {
    callFunctions(meatQuantity, "#meatForm p", meatSelect, meatJsonLocation);
});
meatSelect.addEventListener("change", function () {
    callFunctions(meatQuantity, "#meatForm p", meatSelect, meatJsonLocation);
});


bakingQuantity.addEventListener("input", function () {
    callFunctions(bakingQuantity, "#bakingForm p", bakingSelect, beveragesJsonLocation);
});
bakingSelect.addEventListener("change", function () {
    callFunctions(bakingQuantity, "#bakingForm p", bakingSelect, beveragesJsonLocation);
});









