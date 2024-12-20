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

    // Set the title on webpage
    const pageTitle = document.getElementById("pageTitle")
    pageTitle.textContent = item.title

    // Add the date scraped
    const scrapedDate = document.getElementById("dateScraped")
    scrapedDate.textContent = item.scrapedAtTime

    item.listings.forEach(listing => {
        // clone the template, so it can be edited.
        const newListingCard = listingCardTemplate.content.cloneNode(true);

        const listingTitle = newListingCard.getElementById("listingTitle")
        listingTitle.textContent = listing.title
        listingTitle.setAttribute("href",listing.listingURL)

        const itemPriceLink = newListingCard.getElementById("itemPriceLink")
        itemPriceLink.textContent = "$"+listing.listingPrice.toFixed(2).toString()
        itemPriceLink.setAttribute("href",listing.listingURL)

        const websiteObtained = newListingCard.getElementById("websiteObtained")
        websiteObtained.textContent = listing.listingWebsite
        websiteObtained.setAttribute("href",listing.listingURL)

        const image = newListingCard.getElementById("listingImage")
        image.setAttribute("src",listing.listingImage)
        const imageLink = newListingCard.getElementById("listingImageLink")
        imageLink.setAttribute("href",listing.listingURL)


        // Add the new card to the listing card container.
        listingCardContainer.append(newListingCard)
    });


    



    

})