let allProduct;
let totalProducts = 0;
let price = 0;
let deliveryCharge = 10;
let shippingCost = 10;
let totalPrice = 0;
let tax = 0;
let grandTotal = 0;
let discount = 0;
let finalTotal = 0;

const pair = [];


async function searchProducts() {
    let data = await fetch('https://api.escuelajs.co/api/v1/products');
    let response = await data.json();
    allProduct = response;
    for (let j = 3; j < response.length; j++) {
        const first = response[j].id;
        const second = 0;
        pair.push([first, second]);
    }
    fetchProducts(response)
}
let products = document.querySelector('.service-product-insider');
async function fetchProducts(response) {
    for (let i = 3; i < response.length; i++) {
        let description = response[i].description;
        let title = response[i].title;
        let image = response[i].images;
        let price = response[i].price;
        let ID = response[i].id;
        products.innerHTML += `<div class="product-card">
                     <img src="${image}"
                         alt="">
                     <hr class="line-after-img">
                     <h4>${title.length > 18 ? title.substring(0, 16) : title
            }</h4>
                     <p>${description.length > 50
                ? description.substring(0, 50).concat(' ...')
                : description
            }</p>
            <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </div>
                      <strong style="font-size: 20px;"> $ ${price} </strong>
                      <div class="product-card-buttons">
                      <button class="product-card-button2"id="remove" href="#!" value="${ID}" onclick="remove(this)"><span class="material-symbols-outlined">
                      remove_shopping_cart
                      </span></button>
                      <button class="product-card-button1" id="add"href="#!" value="${ID}" onclick="add(this)"><span class="material-symbols-outlined">
                      add_shopping_cart
                      </span></button>
                      
                  </div>
                 </div>`;
    }

}
searchProducts()

function calculate() {
    var t = 0;
    for (let j = 0; j < pair.length; j++) {
        t += parseInt(pair[j][1]);

    }
    totalProducts = t;
    totalPrice = price + deliveryCharge + shippingCost;
    tax = totalPrice * (15 / 100);
    grandTotal = totalPrice + tax;
    discount = grandTotal * (5 / 100);
    finalTotal = grandTotal - discount;
    if (totalProducts != 0) {
        document.getElementById('totalProducts').innerHTML = parseInt(totalProducts);
        document.getElementById('price').innerHTML = '$ ' + parseInt(price);
        document.getElementById('deliveryCharge').innerHTML = '$ ' + parseInt(deliveryCharge);
        document.getElementById('shippingCost').innerHTML = '$ ' + parseInt(shippingCost);
        document.getElementById('totalPrice').innerHTML = '$ ' + parseInt(totalPrice);
        document.getElementById('tax').innerHTML = '$ ' + parseInt(tax);
        document.getElementById('grandTotal').innerHTML = '$ ' + parseInt(grandTotal);
        document.getElementById('discount').innerHTML = '$ ' + parseInt(discount + 1);
        document.getElementById('finalTotal').innerHTML = '$ ' + parseInt(finalTotal);
    }
    else {
        document.getElementById('totalProducts').innerHTML = 0;
        document.getElementById('price').innerHTML = '$ ' + 0;
        document.getElementById('deliveryCharge').innerHTML = '$ ' + 0;
        document.getElementById('shippingCost').innerHTML = '$ ' + 0;
        document.getElementById('totalPrice').innerHTML = '$ ' + 0;
        document.getElementById('tax').innerHTML = '$ ' + 0;
        document.getElementById('grandTotal').innerHTML = '$ ' + 0;
        document.getElementById('discount').innerHTML = '$ ' + 0;
        document.getElementById('finalTotal').innerHTML = '$ ' + 0;
    }


}

function add(val1) {
    var x = parseFloat(val1.value);
    for (let i = 3; i < allProduct.length; i++) {
        if (allProduct[i].id == x) {
            price += allProduct[i].price;

        }
    }
    for (let i = 0; i < pair.length; i++) {
        if (pair[i][0] == x) {
            pair[i][1] = parseInt(pair[i][1]) + 1;
        }
    }
    calculate();

}


function remove(val2) {
    
    var x = parseFloat(val2.value);
    var f = 0;
    var dPrice = 0;
    for (let i = 1; i < allProduct.length; i++) {
        if (allProduct[i].id == x) {
            dPrice = allProduct[i].price;

        }
    }
    for (let i = 0; i < pair.length; i++) {
        if (pair[i][0] == x) {
            if (pair[i][1] > 0) {
                pair[i][1] = parseInt(pair[i][1]) - 1;
                price = price - dPrice;
            }
            // pair[i][1] = parseInt(pair[i][1]) + 1;
        }
    }
    calculate()
    setTimeout(clearInnerHTML,2000);
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

showSlides2();

function showSlides2() {
  let i;
  let dots = document.getElementsByClassName("dot");
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides2, 4000); // Change image every 2 seconds
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[slideIndex-1].className += " active";
}
 function clearInnerHTML()
 {
    document.getElementById('message').innerHTML =' ';
 }
function order() {
    console.log("clicked")
    if (totalProducts != 0) {
        document.getElementById('message').innerHTML = `<div class=" Message-success" role="alert">
        Order Successful!
    </div>`
    totalProducts = 0;
    price = 0;
    deliveryCharge = 10;
    shippingCost = 10;
    totalPrice = 0;
    tax = 0;
    grandTotal = 0;
    discount = 0;
    finalTotal = 0;
    for (let i = 0; i < pair.length; i++)
    {
        pair[i][1]=0;
    }
    }
    else {
        
        document.getElementById('message').innerHTML = `<div class="Message-unsuccess" role="alert">
         Cart is empty!
    </div>`
    }
    document.getElementById('totalProducts').innerHTML = 0;
    document.getElementById('price').innerHTML = '$ ' + 0;
    document.getElementById('deliveryCharge').innerHTML = '$ ' + 0;
    document.getElementById('shippingCost').innerHTML = '$ ' + 0;
    document.getElementById('totalPrice').innerHTML = '$ ' + 0;
    document.getElementById('tax').innerHTML = '$ ' + 0;
    document.getElementById('grandTotal').innerHTML = '$ ' + 0;
    document.getElementById('discount').innerHTML = '$ ' + 0;
    document.getElementById('finalTotal').innerHTML = '$ ' + 0;

    setTimeout(clearInnerHTML,2000);
}
