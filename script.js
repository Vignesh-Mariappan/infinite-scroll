const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let photosArray = [];
let imageLoaded = 0;
let totalImages = 0;
let readyToLoad = false;

const count = 30;
const apiKey = '1-AoWVRnI7G65iiPgIFEeTdsHcmGmIRkgSciU41cgTE';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Images loaded function to check whether all the images are loaded
function imagesLoaded() {
    imageLoaded++;
    if(imageLoaded === (totalImages - 2)) {
        ready = true;
        loader.hidden = true;
    }
}

//Helper function to set the attributes
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);    
    }
}

//Display the photos in the screen
function displayPhotos() {
    imageLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank'
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description
        });
        img.addEventListener('load', imagesLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Ajax call to fetch the photos
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch(error) {
        console.log(error);
    }
}



//Scroll Event on windows load
window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight
        && ready) {
        getPhotos();
        ready = false;
    }
});

//On load
getPhotos();