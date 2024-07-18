// Loading the table data when the setOrder page is been load 
function createSetOrderTable() {
    let setOrderPageCartTable = document.getElementById("setOrderPageCart");
    let setOrderPageTableDataJSON = localStorage.getItem("currentTableData");

    // Converting the data into complex data 
    let tableData = JSON.parse(setOrderPageTableDataJSON);

    setOrderPageCartTable.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    `;

    let cartTotal = 0;
    tableData.forEach(data => {
        let row = setOrderPageCartTable.insertRow();

        let itemCell1 = row.insertCell(0);
        let itemCell2 = row.insertCell(1);
        let itemCell3 = row.insertCell(2);

        itemCell1.textContent = data.item;
        itemCell1.className = "items";
        itemCell2.textContent = data.quantity;
        itemCell3.innerHTML = data.price.toLocaleString('en-US');

        cartTotal += data.price;
    });

    setOrderPageCartTable.innerHTML += `
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

window.onload = createSetOrderTable;