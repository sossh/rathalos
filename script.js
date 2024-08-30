const jsonUrl = "https://sossh.github.io/rathalos/testData.json"
const listingPagePath = "listing.html"

const itemCardTemplate = document.getElementById("itemCard")
const itemCardContainer = document.getElementById("itemCardContainer")

fetch(jsonUrl)
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            

            // create a new item card. 

            // clone the template, so it can be edited.
            const newCard = itemCardTemplate.content.cloneNode(true);

            // change elements on the new clone.
            const title = newCard.getElementById("itemTitleLink");
            title.textContent = item.title;
            title.setAttribute('href', (listingPagePath+"?id="+item.id.toString()));

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
            // add the new card to the itemCardContainer.
            itemCardContainer.append(newCard);

            
        });


    });
///a = document.getElementById(...);
///a.setAttribute("href", "somelink url");