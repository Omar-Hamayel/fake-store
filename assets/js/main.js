
 const getCategories= async () => {
    const {data} = await axios.get(`https://dummyjson.com/products/category-list`);
        return data
 }

  const showCategories = async () => {
    document.querySelector(".loader-container").classList.add("active")
    const categories = await getCategories();
    console.log(categories)
    document.querySelector(".categories .container .row").innerHTML= categories.map((category) =>{
        return `
        <a class='category' href="categoryDetails.html?category=${category}">
        <h2>${category}</h2>
        </a>
        `
    }).join("");
    document.querySelector(".loader-container").classList.remove("active")
  } 
  const getProducts = async (page) => {
    console.log(page);
    const skip = (page - 1) * 10
    const {data} = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
   return data
  }
  const showProducts = async (page = 1) =>{
    document.querySelector(".loader-container").classList.add("active")
    try{
    const product = await getProducts(page);
    const numOfPages = Math.ceil((product.total)/10);
    document.querySelector(".products .container .row").innerHTML=product.products.map((product)=>{
      return`
      <div class = product>
      <h2>${product.title}</h2>
      <p>${product.price}</p>
      <img src="${product.thumbnail}"/>
      </div>
      
      `
    }).join("");
    let paginationList = ``
    if(page == 1){
      paginationList += `<li class="page-item"><button disabled class="page-link" href="#">&laquo;</button></li>`
    }
    else{
      paginationList += `<li class="page-item"><button onclick=showProducts('${page -1}') class="page-link" href="#">&laquo;</button></li>`
    }


    for(i=1;i<=numOfPages;i++){
      paginationList += `<li class="page-item ${i == page?'active':''}"><button onclick=showProducts('${i}') class="page-link" href="#">${i}</button></li>`
    }

    
    if(page == numOfPages){
      paginationList+= `<li class="page-item"><button disabled class="page-link" href="#">&raquo;</button></li>`
    }
    else{
      paginationList+= `<li class="page-item"><button onclick=showProducts('${(parseInt(page) + 1)}') class="page-link" href="#">&raquo;</button></li>`
    }
    document.querySelector(".pagination-container .pagination").innerHTML=paginationList
  }
  catch(error){
    document.querySelector(".products .container .row").innerHTML=`<p>Error</p>`
  }
  finally{
    document.querySelector(".loader-container").classList.remove("active")
  }

  }
  showCategories();
  showProducts();