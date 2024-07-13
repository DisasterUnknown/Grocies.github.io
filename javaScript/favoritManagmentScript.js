let cartTable = document.getElementById("cartTable");

let addFavBtn = document.getElementById("addFavBtn");
let useFavBtn = document.getElementById("useFavBtn");
console.log("Wolf");


function addFavorit() {
    tableData = [];

    for (let i = 1; i < (cartTable.rows.length - 2); i++) {
        let row = cartTable.rows[i];

        let item = row.cells[0].textContent;
        let quantity = row.cells[1].textContent;
        let price = parseInt((row.cells[2].textContent).replace(/,/g, ""));
        // console.log(`Item: ${item}, Quantity: ${quantity}, Price: ${price}`);

        tableData.push({item, quantity, price});
    }

    let tableDataJSON = JSON.stringify(tableData);
    localStorage.setItem("favoritList", tableDataJSON);
}


function useFavorit() {
    tableDataJSON = localStorage.getItem("favoritList");
    
    if (!tableDataJSON) {
        window.alert("No Data Found!!");
    }

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
        itemCell3.innerHTML =   `<div class="priceCell">
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



addFavBtn.addEventListener("click", addFavorit);
useFavBtn.addEventListener("click", useFavorit);