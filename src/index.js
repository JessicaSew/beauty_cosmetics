
const productDropDown = document.getElementById("product-dropdown")
const makeupContainer = document.getElementById("makeup-list")
const searchInput = document.getElementById("search-bar")
let arrayMakeup 

function fetchMakeup() 
{
    let i;
    fetch('http://makeup-api.herokuapp.com/api/v1/products.json?product_catergory')
    .then(res => res.json())
    .then(data => 
    {
    for (i = 0; i < 500; i++) 
    {
        console.log(data[i])
        renderMakeup(data[i])
    }
    arrayMakeup = data
    })
    .catch(function(error)
    {
        console.log(error)
    }) 
}

 function searchListener(event, arrayMakeup)
 {
    let value = event.target.value
    if (value && value.trim().length > 0)
    {
        makeupContainer.innerHTML = ""
        for (i = 0; i < 500; i++) 
        {
            value = value.trim().toLowerCase();
            if (arrayMakeup[i].name.toLowerCase().includes(value))
            {
                renderMakeup(arrayMakeup[i])
            }
        }
    }
 }

function renderMakeup(data) 
{
    const liTag = document.createElement("li")
    const imgTag = document.createElement("img")
    const aTag = document.createElement("a")
    aTag.href ="#"
    aTag.innerText = data.name 

    aTag.addEventListener("click", () => 
    {
        makeupContainer.innerHTML =""
        imgTag.src = data.image_link

        const productBtn = document.createElement("button")
        productBtn.innerText = "All Products"
        
        productBtn.addEventListener("click", () =>
        {
           clickListener()

        })

        liTag.append(imgTag,productBtn)
        makeupContainer.appendChild(liTag)
    })

    liTag.appendChild(aTag)
    
    if (data.image_link.endsWith('.jpg') || data.image_link.endsWith('.png')) 
    {
        imgTag.src = data.image_link
        liTag.append(imgTag)
        makeupContainer.appendChild(liTag)

        const pTag = document.createElement("p")
        pTag.innerHTML = data.description

        liTag.append(pTag)
        makeupContainer.appendChild(liTag)
    }
}

function reviewSection()
{
    const reviewForm = document.getElementById("reviews")
    const reviewInput = document.getElementById("review-input")
  
    reviewForm.addEventListener("submit", (e) => 
    {
        e.preventDefault()

        renderReviews(reviewInput.value)
        postReview(reviewInput.value)
        e.target.reset()
    }) 
    
    fetchReviews()
}

function fetchReviews()
{
    fetch('http://localhost:3000/reviews/')
    .then(res => res.json())
    .then(reviews => reviews.forEach( review => 
    {
        renderReviews(review.content)
    })
)}

function renderReviews(review)
{ 
    const reviewList = document.getElementById("review-list")
    const list = document.createElement("li")
    list.innerText = review
    reviewList.append(list)
}


function postReview(review)
{
fetch('http://localhost:3000/reviews/',
 {
    method: "POST",
    headers: 
    {
        "Content-type": "application/json",
        "Accept": "application/json"
    },
        body: JSON.stringify(
    {
        content: review
    })
 })
}



function dropDownListener()
{
  const dropDownValue = document.getElementById("product-dropdown").value
  const liTag = document.createElement("li")
  const imgTag = document.createElement("img")
  makeupContainer.innerHTML = ""

  for (i = 0; i < 500; i++) 
    {
        if(arrayMakeup[i].category != null)
        {
            if (arrayMakeup[i].category.startsWith(dropDownValue))
            {
                renderMakeup(arrayMakeup[i])
            }   
        }
    }

    const productBtn = document.createElement("button")
    productBtn.innerText = "All Products"   
    productBtn.addEventListener("click", () =>
    {
        clickListener()
    })
        liTag.append(imgTag,productBtn)
        makeupContainer.appendChild(liTag)

}

function clickListener()
{
  makeupContainer.innerHTML = ""
  for (i = 0; i < 500; i++) 
    {
        renderMakeup(arrayMakeup[i])
    }

}

productDropDown.addEventListener("click", dropDownListener);
fetchMakeup()

searchInput.addEventListener("input", (event) => 
{
    searchListener(event, arrayMakeup)
})

setTimeout(reviewSection, 8000);

