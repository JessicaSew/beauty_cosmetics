//this is global and other functions reference to it for stored data
let arrayMakeup; 
document.addEventListener('DOMContentLoaded', () => {
    const productDropDown = document.getElementById("product-dropdown")
    const makeupContainer = document.getElementById("makeup-list")
    const searchInput = document.getElementById("search-bar")

    fetchMakeup(makeupContainer)

    productDropDown.addEventListener("change", dropDownListener);

    searchInput.addEventListener("input", (event) => 
    {
    searchListener(event, makeupContainer)
    })

    reviewSection();

})

// Fetches the data from the API and then turns the json data into Javascript Objects

function fetchMakeup(makeupContainer) 
{
    fetch('http://makeup-api.herokuapp.com/api/v1/products.json?product_catergory')
    .then(res => res.json())
    .then(data => 
        {
      arrayMakeup = data.slice(0,40)
        for (const element of arrayMakeup) 
        {
                renderMakeup(element,makeupContainer)
        }
    })
    .catch(function(error)
    {
        console.log(error)
    }) 

}

// searchListener searches the arrayMakeup based off of the product 
//name and renders the found product

 function searchListener(event, makeupContainer)
 {
    let value = event.target.value.trim().toLowerCase()
    //if the field is not empty check the length and then 
    // .trim() removes whitespaces before the string and after 
    
    if (value)
    {
    // clears the container so the data is not appended to the container
        makeupContainer.innerHTML = ""
        // the for loop is rendering the makeup data and making the 
        // search value case insensitive and the product name including 
        // the value
        
        arrayMakeup.map((element) => {
            if (element.name.toLowerCase().includes(value))
            {
                renderMakeup(element, makeupContainer)
            } 
        })
    }
 }

// renderMakeup takes in the data, creates tags, and adds them to the makeup container

function renderMakeup(data, makeupContainer) 
{
    const liTag = document.createElement("li")
    const imgTag = document.createElement("img")
    const aTag = document.createElement("a")
    aTag.href ="#"
    aTag.innerText = data.name 
    // aTag has an event listener that listens for a click and then
    // clears the makeup container and displays the image source
    aTag.addEventListener("click", () => 
    {
        makeupContainer.innerHTML =""
        imgTag.src = data.image_link

    // the product button does not show until the image source is clicked
    // and then it listens for a click and calls click listener
        const productBtn = document.createElement("button")
        productBtn.innerText = "All Products"
        
        productBtn.addEventListener("click", () =>
        {
           clickListener(makeupContainer)

        })

        liTag.append(imgTag,productBtn)
        makeupContainer.appendChild(liTag)
    })

    liTag.appendChild(aTag)
    
// the if statement displays only image links with extension of .jpg or .png
//appends to makeup container
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

// reviewSection listens for a submit event and then renders reviews 
// and post reviews 

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

// fecthes the posted reviews to be passed in renderReviews

function fetchReviews()
{
    fetch('http://localhost:3000/reviews/')
    .then(res => res.json())
    .then(reviews => {
        reviews.forEach( review => 
            {
                renderReviews(review.content)
            })
    })
}
 
//renderReviews displays reviews in reviewList

function renderReviews(review)
{ 
    const reviewList = document.getElementById("review-list")
    const list = document.createElement("li")
    list.innerText = review
    reviewList.append(list)
}

// post reviews to JSON server and to store reviews data

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
//dropDownValue gets the value from the drop down item

  const dropDownValue = document.getElementById("product-dropdown").value
  const makeupContainer = document.getElementById("makeup-list")
  
  console.log(dropDownValue)
  const liTag = document.createElement("li")
  const imgTag = document.createElement("img")
  makeupContainer.innerHTML = ""

// rendering the makeup based off of the product category if only
// it starts with the drop down value

let count = 0
for (const element of arrayMakeup) 
{
    count = count+1; 
    if (count < SIZE)
    {
        // checking to see if category is not empty
         if(element.category !== null)
         {
             if (element.category.startsWith(dropDownValue))
             {
                 renderMakeup(element,makeupContainer)
             }   
         }
    }
}
    //product button is rendered for the product catergory

    const productBtn = document.createElement("button")
    productBtn.innerText = "All Products"   
    productBtn.addEventListener("click", () =>
    {
        clickListener(makeupContainer)
    })
        liTag.append(imgTag,productBtn)
        makeupContainer.appendChild(liTag)
}

// clickListener listens for the click of the all products button and
// renders all the makeup data

function clickListener(makeupContainer)
{
    makeupContainer.innerHTML = ""
    let count = 0
    for (const element of arrayMakeup) 
    {
      count = count+1; 
      if (count < SIZE)
        {
            renderMakeup(element,makeupContainer)
        }
    }
}


