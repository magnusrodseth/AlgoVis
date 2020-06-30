// An array of all tutorial pages
const tutorialPages = document.querySelectorAll(".tutorial-pages");

// Keep track of which tutorial page currently at
let pageCount = 1;
let maxPageCount = tutorialPages.length;


// Parent div for all children pages
let div = document.querySelector(".tutorial-div")

function displayTutorial() {
    div.style.display = "block";


    // All other pages than the one currently being displayed, is
    // not displayed
    for (let i = 0; i < tutorialPages.length; i++) {
        let page = document.getElementById(`page-${pageCount}`)
        page.style.display = "block";
        tutorialPages[i].style.display = "none";
    }

    // DOM for page counter
    let pageCounter = document.querySelector(".page-counter");
    pageCounter.innerHTML = `${pageCount} / ${maxPageCount}`;

    // The nextPageButton advances the tutorial.
    const nextPageButton = document.querySelector(".next-page-button");
    buttons.push(nextPageButton);
    nextPageButton.addEventListener("click", function () {
        if (pageCount >= maxPageCount) {
            nextPageButton.disabled = true;
        } else {
            pageCount += 1;
            pageCounter.innerHTML = `${pageCount} / ${maxPageCount}`;
            previousPageButton.disabled = false;
        }
        displayNextPage(pageCount, maxPageCount);
    })

    // The previousPageButton goes one page back in the tutorial.
    const previousPageButton = document.querySelector(".previous-page-button");
    buttons.push(previousPageButton);
    previousPageButton.addEventListener("click", function () {
        if (pageCount <= 1) {
            previousPageButton.disabled = true;
        } else {
            pageCount -= 1;
            pageCounter.innerHTML = `${pageCount} / ${maxPageCount}`;
            nextPageButton.disabled = false;
        }
        displayPreviousPage(pageCount);
    })

    // The exitTutorialButton exits the tutorial
    const exitTutorialButton = document.querySelector(".exit-tutorial-button");
    buttons.push(exitTutorialButton);
    exitTutorialButton.addEventListener("click", function () {
        nextPageButton.disabled = false;
        previousPageButton.disabled = false;
        exitTutorial();
    })
}

function displayNextPage(pageCount, maxPageCount) {
    if (pageCount > maxPageCount) {
        return;
    } else {
        for (let i = 0; i < tutorialPages.length; i++) {
            let page = document.getElementById(`page-${pageCount}`)
            page.style.display = "block";
            tutorialPages[i].style.display = "none";
        }
    }
}

function displayPreviousPage(pageCount) {
    if (pageCount < 1) {
        return;
    } else {
        for (let i = 0; i < tutorialPages.length; i++) {
            let page = document.getElementById(`page-${pageCount}`)
            page.style.display = "block";
            tutorialPages[i].style.display = "none";
        }
    }
}

function exitTutorial() {
    pageCount = 1;
    div.style.display = "none";
}