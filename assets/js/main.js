
 const getCategories= async () => {
    const {data} = await axios.get(`https://dummyjson.com/products/category-list`);
        return data
 }

  const showCategories = async () => {
    const categories = await getCategories();
    document.querySelector(".categories .container .row").innerHTML= categories.map((category) =>{
        return `
        <div class='category'>
        <h2>${category}</h2>
        <a href="categoryDetails.html?category=${category}">Details</a>
        </div>
        `
    }).join("");
  } 
  const getProducts = async () => {
   const {data} = await axios.get(`https://dummyjson.com/products`);
   return data
  }
  const showProducts = async () =>{
    const product = await getProducts();
    document.querySelector(".products .container .row").innerHTML=product.products.map((product)=>{
      return`
      <div class = product>
      <h2>${product.title}</h2>
      <p>${product.price}</p>
      <img src="${product.thumbnail}"/>
      </div>
      
      `
    }).join("");
  }
  showCategories();
  showProducts();