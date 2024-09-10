const jsonUrl = "https://sossh.github.io/rathalos/testData.json";
const listingPagePath = "listing.html";

const itemCardTemplate = document.getElementById("itemCardTemplate");
const itemCardContainer = document.getElementById("itemCardContainer");
const searchInput = document.querySelector("[data-search]");

let items = [];

// Runs everytime the user types into the input.
searchInput.addEventListener("input", e => {
    const userSearchInput = e.target.value;
    items.forEach(itemData => {

        // Check if the users search input lines up with title or category
        const isVisible = itemData.title.toLowerCase().includes(userSearchInput.toLowerCase()) || itemData.itemCategory.toLowerCase().includes(userSearchInput.toLowerCase())

        // Adds the .hide class to the element if it shouldn't be shown
        itemData.element.classList.toggle("hide", !isVisible)
    });
    
});

fetch(jsonUrl)
    .then(res => res.json())
    .then(data => {
        items = data.map(item => {
            

            // create a new item card. 

            // clone the template, so it can be edited.
            let newCard = itemCardTemplate.content.cloneNode(true);

            // change elements on the new clone.
            const title = newCard.getElementById("itemTitleLink");
            title.textContent = item.title;
            title.setAttribute('href', (listingPagePath+"?id="+item.id.toString()));

            //const itemCardLink = newCard.getElementById("itemCardLink")
            //itemCardLink.setAttribute("href", (listingPagePath+"?id="+item.id.toString()))

            const numItemListings = newCard.getElementById("numItemListings");
            numItemListings.textContent = item.numItemListings.toString();

            const lowestPriceListing = newCard.getElementById("lowestPriceListing");
            lowestPriceListing.textContent = "$" + item.lowestPriceListing.toString();

            const averagePriceListing = newCard.getElementById("averagePriceListing");
            averagePriceListing.textContent = "$" + item.averagePriceListing.toString();

            const itemCategory = newCard.getElementById("itemCategory");
            itemCategory.textContent = item.itemCategory;


            // Price change logic to determine color
            let priceChange = newCard.getElementById("priceChange");
            if(item.priceChange < 0) {
                // price has gone down so chnage is negative
                priceChange.textContent = "-$" + (-1*item.priceChange).toString();
                priceChange.style.color = "green";
            }
            else if(item.priceChange > 0) {
                // price has gone up so chnage is positive
                priceChange.textContent = "+$" + item.priceChange.toString();
                priceChange.style.color = "red";
            }
            else{
                // price is likely 0 so no change
                priceChange.textContent = "$" + item.priceChange.toString();
                priceChange.style.color = "white";
            }

            // Get rid of the document fragment
            newCard = newCard.children[0];

            // Add the new card to the itemCardContainer.
            itemCardContainer.append(newCard);

            // return the object of search data so it can be used for the searchbar
            return {title: item.title, itemCategory: item.itemCategory, element:newCard}
            
        });


    });
///a = document.getElementById(...);
///a.setAttribute("href", "somelink url");