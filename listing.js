// Get the URL query
const url = new URL(window.location.href);
const id = url.searchParams.get("id")

// Get the listing card and listing card container.
const listingCardTemplate = document.getElementById("listingCard")
const listingCardContainer = document.getElementById("listingCardContainer")


fetch("https://sossh.github.io/rathalos/testData.json")
.then(res => res.json())
.then(data => {
    item = data[parseInt(id)]

    // Set the page title.
    document.title = item.title

    // Set the title on body
    const pageTitle = document.getElementById("pageTitle")
    pageTitle.textContent = item.title

    item.listings.forEach(listing => {
        // clone the template, so it can be edited.
        const newListingCard = listingCardTemplate.content.cloneNode(true);

        const listingTitle = newListingCard.getElementById("listingTitle")
        listingTitle.textContent = listing.title

        const itemPriceLink = newListingCard.getElementById("itemPriceLink")
        itemPriceLink.textContent = listing.price.toString()
        itemPriceLink.setAttribute("href",listing.url)

        const websiteObtained = newListingCard.getElementById("websiteObtained")
        websiteObtained.textContent = listing.websiteObtained

        const image = newListingCard.getElementById("image")
        image.setAttribute("src",listing.image)


        // Add the new card to the listing card container.
        listingCardContainer.append(newListingCard)
    });


    



    

})