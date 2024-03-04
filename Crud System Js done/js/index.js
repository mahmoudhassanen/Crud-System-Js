var ProductName = document.getElementById('ProductName')
var ProductPrice = document.getElementById('ProductPrice')
var ProductModel = document.getElementById('ProductModel')
var ProductDesc = document.getElementById('ProductDesc')
var table = document.getElementById('table')
var tBody = document.getElementById('tBody')
var addProductBtn = document.getElementById('addProductBtn')
var updateProductBtn = document.getElementById('updateProductBtn')
var position = 0; // to save index when get value in row and use it in update function
var ProductList  ; //Array to save object when add product do not delete last any element
if (localStorage.getItem("productList") == null ) {

    ProductList = [];
}
else
{
    ProductList = JSON.parse(localStorage.getItem("productList"))
   
    displayProduct(ProductList);

}
// function add product to get value of input and push in array 

function addProduct() {
    var product = {
        name : ProductName.value,
        price : ProductPrice.value,
        model : ProductModel.value,
        desc : ProductDesc.value
    }
    ProductList.push(product)
    displayProduct(ProductList);
    localStorage.setItem('productList' , JSON.stringify(ProductList));
    updateProductValue();

    console.log(ProductList)
}
// function display to make loop in array and display it in table
function displayProduct(arr) {
    var productCartoon = ''
    for (let i = 0; i < arr.length; i++) {
        
        productCartoon += `<tr> 
        <td>${[i+1]}</td>
        <td>${arr[i].newName ? arr[i].newName : arr[i].name }</td>
        <td>${arr[i].newPrice ? arr[i].newPrice : arr[i].price }</td>
        <td>${arr[i].model}</td>
        <td>${arr[i].desc}</td>
        <td><button type="button" class="btn btn-danger" onclick="getUpdateProduct(${i})">Update</button></td>
        <td><button type="button" class="btn btn-warning " onclick="deleteProduct(${i})">Delete</button></td> </tr>`
    }
    document.getElementById('tBody').innerHTML = productCartoon;
  
  
}

//function delete element in array 
function deleteProduct(index) {
    ProductList.splice(index,1);
    localStorage.setItem('productList' , JSON.stringify(ProductList));
    console.log(ProductList);
    displayProduct(ProductList);
    console.log(ProductList);
}
//function to search by name
function searchByName(tem) {
var foundedList = [];
for (let i = 0; i < ProductList.length; i++) {
    if (ProductList[i].name.toLowerCase().includes(tem.toLowerCase()) == true) {
        ProductList[i].newName = ProductList[i].name.toLowerCase().replace(tem.toLowerCase() , `<span class="text-dark">${tem}  </span>`)
        foundedList.push(ProductList[i]);
    }
    
}
    displayProduct(foundedList);
}

// function search by price
function searchByPrice(tem) {
    var foundedList = [];
    for (let i = 0; i < ProductList.length; i++) {
        if (ProductList[i].price.includes(tem) >= true) {
             ProductList[i].newPrice = ProductList[i].price.replace(tem ,  `<span class="text-dark">${tem}  </span>`)  
            foundedList.push(ProductList[i]);
        }
        
    }
        displayProduct(foundedList);
    }
// function getUpdateProduct product 
// first get value of row to input
// when change any value display it in same row
function getUpdateProduct(index) {
    position = index;
    addProductBtn.classList.add("d-none");
    updateProductBtn.classList.replace('d-none' , 'd-block')
    // ProductName.value = ProductList[index].name;
    // ProductPrice.value = ProductList[index].price;
    // ProductModel.value = ProductList[index].model;
    // ProductDesc.value = ProductList[index].desc;
    updateProductValue(ProductList[index])
}
//make function to clear if value ' ' if have name return value to update code enhancement
function updateProductValue(flag) {
    ProductName.value = flag ? flag.name :   '';
    ProductPrice.value = flag ? flag.price : '';
    ProductModel.value =  flag ? flag.model :'';
    ProductDesc.value = flag ? flag.desc :'';
    
}
// update in the same index
function update_product() {
    addProductBtn.classList.replace("d-none" , "d-block");
    updateProductBtn.classList.replace('d-block' , 'd-none')
   ProductList[position].name = ProductName.value;
   ProductList[position].price = ProductPrice.value;
   ProductList[position].model = ProductModel.value;
   ProductList[position].desc = ProductDesc.value;
displayProduct(ProductList)
localStorage.setItem('productList' , JSON.stringify(ProductList))
updateProductValue();
}