
//llamado a Filter
const filtercontainer = document.querySelector ('.filter')

//limite de paginacion
let limit = 5


// llamado a Rendercards
const callingrendercards = document.querySelector ('.boxes-shop')

// llamado al carrito para renderizar
const cartheader = document.querySelector ('.carrito')

// llamado a carrito para evento
const opencart = document.getElementById ('menu-shop')

// id para elementos de carro
let cartId = 1;

// llamado a brands
const brandsRendering = document.querySelector('.cards-brands');




//// filtrado de categorias ///
const applyfilter = (type) => {

    let filterant = []
    if (type !== 'todos') {
        filterant = product_list.filter (anteojo => anteojo.category.includes (type))
    }
    else {
        filterant = product_list
    }

    console.log('filtered:',filterant);
    rendercards (filterant);
};

// Ver mas

const showmorepages = () => {
    limit = limit + 5;
    console.log('limit:',limit);
    rendercards (product_list);
}

/// Render Boxes anteojos
const createproductstemplate = (product) => {
    const {id, nombre, precio, dimensiones, cardImg, } = product;
    
    return `
    <div class="caja-shop">
        <div class="box-shop-imagen">
            <img src=${cardImg} alt=${nombre}>
        </div>
        <div class="caja-title">
            <h2>${nombre}</h2>
            <p>Precio ${precio}</p>
            <div class="caja-dimensiones">
            <span>Dimensiones <br> ${dimensiones}</span>
            </div>
        </div>
        <div class="add-to-cart">
            <button id="add-to-cart-button" 
            data-id=${id}
            data-name=${nombre}
            data-img=${cardImg}
            onclick="addToCart('${id}'); setCartVisibility(true);"
            >
            <span>Agregar al carrito</span>
            <img src="./Assets/Iconos/shop-2.png" alt="" id="cart-button">
            </button>
        </div>
    </div>
    `
};

const rendercards = (product_list) => {
    callingrendercards.innerHTML = product_list.map((prod,index) => index < limit ? createproductstemplate(prod) : null).join("");
};


// Agregar al carrito
const addToCart = (id) => { 
    const cartItem = product_list.map((item) => {
        if(item.id === id){
            return {
                "id": item.id,
                "cart_id":cartId,
                "nombre": item.nombre,
                "precio": item.precio,
                "category": item.ctegory,
                "cardImg": item.cardImg
              }
        }
    }).find(item => item);
    cartId = cartId +1;
    cart_list.push(cartItem)
    rendershopcart(cart_list)

    // Guardar en LocalStorage
    saveinlocalstorage();
}

const createshopcard = (product) => {
   const {id, nombre, precio, cardImg,cart_id} = product;

   return ` <div class="card-shop-list">
        <img src=${cardImg} alt="${nombre}">
        <div id="shop-info-text">
        <h4 id=${id}>${nombre}</h4>
        <p> Precio: ${precio}</p>
   </div>
   <div class="shop-cart-actions">
        <button id="eliminateitem" onclick="removeFromCart(${cart_id})"><img src="./Assets/Iconos/trash.svg" alt="" id="shop-1-ico"></button>
   </div>
    </div>`
}

// Carrito
const rendershopcart = (cart_list) => {
    cartheader.innerHTML = cart_list.map(createshopcard).join("");
    let total = 0
    for (const producto of cart_list) {
        const precio = convertirAValorNumerico(producto.precio)
        total=total+precio
    }
    console.log(total);
    const totalPrice = document.getElementById("totalprice");
    totalPrice.innerHTML= `Total $${total}`
    console.log(totalPrice)
}

// Funcion para abrir y cerrar carrito
const setCartVisibility = (isVisible) => {
    opencart.checked = isVisible;
};

// Eliminar del carrito
const removeFromCart = (id) => {

    cart_list = cart_list.filter((item) => item.cart_id !== id);
    rendershopcart(cart_list);

    // Guardar en LocalStorage
    saveinlocalstorage();
}

/// Local Storage JSON
const saveinlocalstorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart_list));
};

// Conversor
function convertirAValorNumerico(precio) {
    return Number(precio.slice(1).split('.').join(''))
};

//Renderizado de Brands
const createBrandsTemplate = (brandsEyewear) => {
    const { id, brandimg } = brandsEyewear;

    const numberOfImages = 1;
    const images = Array.from({ length: numberOfImages }, (_, index) => `
        <img src="${brandimg}" id="${id}-${index + 1}">
    `);

    return images.join("");
};

const renderBrands = (brandsEyewear) => {
    brandsRendering.innerHTML = brandsEyewear.map(createBrandsTemplate).join("");
};

//////////////////////////////////////////////////////////

const Localstoragecart = () => {
    const itemscartsave = localStorage.getItem('cart');
    if (itemscartsave) {
        cart_list = JSON.parse(itemscartsave);
        rendershopcart(cart_list);
    }
};

const init = () => {
    rendercards (product_list);
    Localstoragecart();
    renderBrands(Brandseyewear);
};

    
init ();