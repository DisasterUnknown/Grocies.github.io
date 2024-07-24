let userName = document.getElementById("userName");
let userTelNo = document.getElementById("userTelNo");

let userCardNo = document.getElementById("userCardNo");
let userCVV = document.getElementById("userCVV");

let submitBtn = document.getElementById("submitBtn");


// Thanking the user for using Grocies and displaying the diliver date
setOrder = () => {
    if ((userTelNo.value.length == 10) && (userCardNo.value.length == 16) && (userCVV.value.length == 3)) {
        let currentDate = new Date();

        let date = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        let userMsg = `Thank you for visiting our website! \nYour order will be dilivered by ${date + 3}.${month}.${year}`;

        window.alert(userMsg);

    } else {
        window.alert("Please Recheck The Details!");
    }
}


// Validation functions 
userName.addEventListener("input", function () {
    userName.value = userName.value.replace(/\d/g, '');
});

userTelNo.addEventListener("input", function () {
    userTelNo.value = userTelNo.value.slice(0, 10);
});

userCardNo.addEventListener("input", function () {
    userCardNo.value = userCardNo.value.slice(0, 16);
});

userCVV.addEventListener("input", function () {
    userCVV.value = userCVV.value.slice(0, 3);
});

// Calling the set order function
submitBtn.addEventListener("click", setOrder);