const linkCategory = document.querySelector("#linkCategory");
const submitButton = document.querySelector("#submitButton");
const addBtn = document.querySelector("#addBtn");
const cancelButton = document.querySelector("#cancelButton");
const addLinkPanel = document.querySelector("#addLinkPanel");
const linksList = document.querySelector("#linksList");
const addedCategories = document.querySelector("#addedCategories");

let editIndex = -1;
let linkCategories = [];
let links = [
    {
        title: 'New Link 1',
        url: 'url.com1',
        categories: ['node', 'angular']
    },
    {
        title: 'New Link 2',
        url: 'url.com2',
        categories: ['node', 'angular']
    },
    {
        title: 'New Link 3',
        url: 'url.com3',
        categories: ['node', 'angular']
    }
];

displayLinks();

addBtn.addEventListener('click', (event) => {
    console.log("Add btn clicked");
    showFormPanel();
});

cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("Cancel button clicked");
    hideFormPanel();
});

function showFormPanel() {
    addLinkPanel.classList.remove("hidden");
    displayLinkCategories();

}
function hideFormPanel() {
    addLinkPanel.classList.add("hidden");
    clearLinkForm();

}

linkCategory.addEventListener('keydown', function(event) {
    if(event.keyCode === 188) {
        event.preventDefault();

        linkCategories.push(linkCategory.value);
        linkCategory.value = '';

        //Display the updated categories.
        displayLinkCategories();
    }
})

function displayLinkCategories() {
    console.log("Displaying Link Categories");
    addedCategories.innerHTML = '';
    for(let category of linkCategories) {
        var categoryHTMLString = `<span class="category">${category}</span>`;
        addedCategories.innerHTML += categoryHTMLString;
    }
}

function clearLinkForm() {
    linkTitle.value = '';
    linkUrl.value = '';
    linkCategories.value = '';
    linkCategories = [];
    addedCategories.innerHTML = '';
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

    if(editIndex === -1) {
        links.unshift(newLink);
    } else { 
        links[editIndex] = newLink;
        editIndex = -1;
    }

    clearLinkForm();
    displayLinkCategories();
    hideFormPanel();
    displayLinks();
});

function displayLinks() {
    linksList.innerHTML = '';
    let index = 0;
    for(let link of links) {
        let linkHTMLString = `
        <div class="link panel">
            <div class="link-options">
                <button class="btn-sm" onclick="deleteLink(${index})">Delete</button>
                <button class="btn-sm" onclick="editLink(${index})">Edit</button>
            </div>
            <a href="${link.url}"><h1 class="header">${link.title}</h1></a>
            <p class="link-date">${Date.now()}</p>
            <div class="categories">
                Categories:
                `;
            for(let category of link.categories) {
                linkHTMLString += `<span class="category">${category}</span>`;
            }
            linkHTMLString += `
                </div>
            </div>`;

    linksList.innerHTML += linkHTMLString;
    index++;
    }
}

function deleteLink(index) {
    links.splice(index,1);
    displayLinks();
}

function editLink(index) {
    editIndex = index;
    linkTitle.value = links[index].title;
    linkUrl.value = links[index].url
    linkCategories = links[index].categories;
    showFormPanel();
}