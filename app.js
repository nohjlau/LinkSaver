const linkCategory = document.querySelector("#linkCategory");
const submitButton = document.querySelector("#submitButton");

let linkCategories = [];
let links = [];
console.log(linkCategory);

linkCategory.addEventListener('keydown', function(event) {
    if(event.keyCode === 188) {
        event.preventDefault();

        linkCategories.push(linkCategory.value);
        linkCategory.value = '';

        //Display the updated categories.
    }
})

function displayLinkCategories() {
    console.log("Displaying Link Categories");
}


submitButton.addEventListener('click', (event) => {
    event.preventDefault();


    const title = linkTitle.value;
    const url = linkUrl.value;
    const categories = linkCategories;

    const newLink = {
        title,
        url,
        categories
    }

    links.push(newLink);

    linkTitle.value = '';
    linkUrl.value = '';
    linkCategories.value = '';
    linkCategories = [];

    displayLinkCategories();
});