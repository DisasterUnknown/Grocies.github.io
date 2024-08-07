let cartTable = document.getElementById("cartTable");

let addFavBtn = document.getElementById("addFavBtn");
let useFavBtn = document.getElementById("useFavBtn");
let setOrderPage = document.getElementById("setOrderPageLink");


// Adding the current item list to the favorits list 
function addFavorit() {

    if (cartTable.rows.length > 3) {
        let tableData = [];
        for (let i = 1; i < (cartTable.rows.length - 2); i++) {
            let row = cartTable.rows[i];

            let item = row.cells[0].textContent;
            let quantity = row.cells[1].textContent;
            let price = parseInt((row.cells[2].textContent).replace(/,/g, ""));
            // console.log(`Item: ${item}, Quantity: ${quantity}, Price: ${price}`);

            tableData.push({ item, quantity, price });
        }

        // Converting the data into JSON string
        let tableDataJSON = JSON.stringify(tableData);
        localStorage.setItem("favoritList", tableDataJSON);

        window.alert("Data added");
    } else {
        window.alert("The Cart is Empty!");
    }
}


// Using the favorit list to fill the table 
function useFavorit() {
    let tableDataJSON = localStorage.getItem("favoritList");

    if (!tableDataJSON) {
        window.alert("No Data Found!!");
    } else {

        // Converting the data into complex data 
        let tableData = JSON.parse(tableDataJSON);

        cartTable.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    `;

        let cartTotal = 0;
        tableData.forEach(data => {
            let row = cartTable.insertRow();

            let itemCell1 = row.insertCell(0);
            let itemCell2 = row.insertCell(1);
            let itemCell3 = row.insertCell(2);

            itemCell1.textContent = data.item;
            itemCell1.className = "items";
            itemCell2.textContent = data.quantity;
            itemCell3.innerHTML = `<div class="priceCell">
                                        <span>${data.price.toLocaleString('en-US')}</span>
                                        <button onclick="deleteRow(this)">x</button>
                                    </div>`;

            cartTotal += data.price;
        });

    cartTable.innerHTML += `
    <tr>
        <td class="items">&nbsp;</td>
        <td class="quantity">&nbsp;</td>
        <td class="price">&nbsp;</td>
    </tr>

    <tr>
        <td colspan="2" class="items">Total</td>
        <td id="totalPrice">${cartTotal.toLocaleString('en-US')}</td>
    </tr>
    `
    }
}

// Directing to the set oder Page 
function changePage() {
    if (cartTable.rows.length > 3) {

        let currentTableData = [];
        for (let i = 1; i < (cartTable.rows.length - 2); i++) {
            let row = cartTable.rows[i];

            let item = row.cells[0].textContent;
            let quantity = row.cells[1].textContent;
            let price = parseInt((row.cells[2].textContent).replace(/,/g, ''));

            currentTableData.push({ item, quantity, price });
        }

        let currentTableDataJSON = JSON.stringify(currentTableData);
        localStorage.setItem('currentTableData', currentTableDataJSON);

        // Dirrecting the user into the setOrder page 
        window.location.href = 'setOrder.html';

    } else {
        window.alert("Please Add some Items to the Cart!");
    }
}


// Calling the functions
addFavBtn.addEventListener("click", addFavorit);
useFavBtn.addEventListener("click", useFavorit);

setOrderPage.addEventListener("click", changePage);