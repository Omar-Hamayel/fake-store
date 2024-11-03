
const getProducts = async()=>{
   const params= new URLSearchParams(window.location.search).get('category');
   console.log(params)
    const {data} = await axios.get(`https://dummyjson.com/products/category/${params}`)
    return data
}
const showProducts = async () =>{
    const product  = await getProducts();
    document.querySelector(".products .container .row").innerHTML=product.products.map ((product)=>{
        return `
        <div class = product>
        <img src="${product.thumbnail}"/>
        <h2>${product.title}</h2>
        <p>${product.price}</p>
        </div>
      `  
    }).join("");
}
showProducts();