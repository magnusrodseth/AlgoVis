const container = document.querySelector(".data-container");
const slowSortButton = document.querySelector(".slowSortButton");
const mediumSortButton = document.querySelector(".mediumSortButton");
const fastSortButton = document.querySelector(".fastSortButton");
const slider = document.querySelector(".array-size-range");
const output = document.querySelector(".output-array-size");

// Display the default slider value
output.innerHTML = `Array size: ${slider.value}`;

// Define a mutable array, where each item will be displayed as blocks relative to one another
var array = [];

// Define a minimum and maximum value for items in the randomly generated array
const MIN_LIMIT = document.querySelector(".array-size-range").min;
const MAX_LIMIT = document.querySelector(".array-size-range").max;
const DEFAULT_SIZE = slider.value;

slider.oninput = function () {
    // Update the current slider value each time you drag the slider handle,
    // and store this value in 'arraySize'
    output.innerHTML = `Array size: ${this.value}`;
    var arraySize = document.querySelector(".array-size-range").value;

    // Empty existing walue in blocks and empty values in array
    $(".data-container").empty();
    array = [];

    // A new random array. Generate visual blocks from these values.
    array = generateArray(size = arraySize, MIN_LIMIT, MAX_LIMIT);
    generateBlocks(array);

    // Make these buttons interactable again.
    sortButton.disabled = false;
    fastSortButton.disabled = false;
    return;
}

// Populate an array of 'size' with random whole numbers between 'min' and 'max'
function generateArray(size, min, max) {
    for (var i = 0; i < size; i++) {
        // Source: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
        var value = Math.floor(Math.random() * (max - min) + min);
        array.push(value);
    }
    return array;
}

// Generate visible blocks on the page from 'array'
function generateBlocks(array) {
    // Give each block a dynamic width given 'containerWidth' and the length of 'array'
    var containerWidth = document.querySelector(".data-container").offsetWidth;
    var blockWidth = Math.floor((containerWidth - 150) / array.length);

    for (var i = 0; i < array.length; i++) {
        var value = array[i];

        // Give each block a class '.block', dynamic height, x-position, width and styling
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.height = `${value*3}px`;
        block.style.transform = `translateX(${blockWidth * i * 1.5}px)`;
        block.style.width = `${blockWidth}px`;
        block.style.marginLeft = "1px";
        block.style.marginRight = "1px";

        // Give each block a corresponding label.
        // The label will only be visible if the length of 'array' is less than 16
        const blockLabel = document.createElement("label");
        blockLabel.classList.add("block__id");
        blockLabel.innerHTML = value;
        if (array.length >= 16) {
            blockLabel.style.visibility = "hidden";
        }

        // Append each block to the container
        block.appendChild(blockLabel);
        container.appendChild(block);
    }
}


function swap(el1, el2) {
    return new Promise(resolve => {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);

        const transform1 = style1.getPropertyValue("transform");
        const transform2 = style2.getPropertyValue("transform");

        el1.style.transform = transform2;
        el2.style.transform = transform1;

        // Wait for the transition to end
        window.requestAnimationFrame(function () {
            setTimeout(() => {
                // Swap the position of element 1 and 2 in container
                container.insertBefore(el2, el1);
                resolve();
            }, 100);
        });
    });
}

// Executes the function insertionSort with a high delay.
// Suitable for low sized arrays.
// Sorting buttons are disabled to prevent error in sorting.
slowSortButton.addEventListener("click", function () {
    insertionSort(delay = 1000);
    slowSortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
})

// Executes the function insertionSort with a high delay.
// Suitable for low sized arrays.
// Sorting buttons are disabled to prevent error in sorting.
mediumSortButton.addEventListener("click", function () {
    insertionSort(delay = 250);
    sortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
})

// Executes the function insertionSort with a low delay.
// Suitable for medium sized arrays.
// Sorting buttons are disabled to prevent error in sorting.
fastSortButton.addEventListener("click", function () {
    insertionSort(delay = 50);
    sortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
})

async function insertionSort(delay) {
    if (delay && typeof delay !== "number") {
        alert("sort: First argument must be a typeof Number");
        return;
    }

    // Create a NodeList of divs containing the value of each element in the random array
    let blocks = document.querySelectorAll(".block");

    // Iterate over 'block'. Begin looping from index 1.
    for (var i = 1; i < blocks.length; i++) {
        // Select a key value that acts as the iteration's reference point
        var keyBlock = blocks[i];

        // 'keyBlock' gets a green color
        keyBlock.style.backgroundColor = "#13CE66";

        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        // Define another reference point 'j'
        var j = i - 1;

        // While the reference point 'j' is greater than or equal to 0
        // and the value of 'keyBlock' is less than the value of
        // 'blocks[j]', swap the two values.
        // Decrement 'j' to keep the while-loop going
        while ((j >= 0) && (Number(blocks[j].childNodes[0].innerHTML) > Number(keyBlock.childNodes[0].innerHTML))) {
            await swap(blocks[j], blocks[j + 1]);
            blocks = document.querySelectorAll(".block");
            j--;
        }

        // A block that has been compared is set back to normal color.
        blocks[j + 1].style.backgroundColor = "#d0d8ff";

        // Redefine the NodeList blocks.
        blocks = document.querySelectorAll(".block");
    }
    // Sorting buttons are enabled
    slowSortButton.disabled = false;
    mediumSortButton.disabled = false;
    fastSortButton.disabled = false;
}

// On page load, a random array is generated with 'size', 'min' and 'max' values
array = generateArray(DEFAULT_SIZE, MIN_LIMIT, MAX_LIMIT);
generateBlocks(array);