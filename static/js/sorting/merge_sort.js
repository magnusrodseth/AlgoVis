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
    array = generateArray(arraySize, MIN_LIMIT, MAX_LIMIT);
    generateBlocks(array);

    // Make these buttons interactable again.
    slowSortButton.disabled = false;
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
        block.style.height = `${value*0.75}px`;
        block.style.transform = `translateX(${blockWidth * i * 1.5}px)`;
        block.style.width = `${blockWidth}px`;
        block.style.marginLeft = "1px";
        block.style.marginRight = "1px";

        // Append each block to the container
        container.appendChild(block);
    }
}

// Executes the function mergeSort with a high delay.
// Suitable for low sized arrays.
// Sorting buttons are disabled to prevent error in sorting.
slowSortButton.addEventListener("click", function () {
    mergeSort(array, animationSpeedMs = 1000);
    slowSortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
})

// Executes the function mergeSort with a high delay.
// Suitable for low sized arrays.
// Sorting buttons are disabled to prevent error in sorting.
mediumSortButton.addEventListener("click", function () {
    mergeSort(array, animationSpeedMs = 250);
    slowSortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
})

// Executes the function mergeSort with a low delay.
// Suitable for medium sized arrays.
// Sorting buttons are disabled to prevent error in sorting.
fastSortButton.addEventListener("click", function () {
    mergeSort(array, animationSpeedMs = 1);
    slowSortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
})

// Source: https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial
// The author of the following code is Clement Mihailescu.
// This efficient solution to the merge sort algorithm is taken from AlgoExpert.
function getMergeSortAnimations(array) {
    // Defining an arrays that will contain animation for comparisons
    const animations = [];

    if (array.length <= 1) {
        return array;
    }

    // The support array is used as a middle man when sorting the main array
    let supportArray = [];
    for (let i = 0; i < array.length; i++) {
        supportArray.push(array[i]);
    }

    mergeSortHelper(array, 0, array.length - 1, supportArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    supportArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(supportArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(supportArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, supportArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    supportArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    // At every point in the 'doMerge' function, another animation is added.
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);

        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);

        if (supportArray[i] <= supportArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the support array.
            animations.push([k, supportArray[i]]);
            mainArray[k++] = supportArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the support array.
            animations.push([k, supportArray[j]]);
            mainArray[k++] = supportArray[j++];
        }
    }

    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);

        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);

        // We overwrite the value at index k in the original array with the
        // value at index i in the support array.
        animations.push([k, supportArray[i]]);
        mainArray[k++] = supportArray[i++];
    }

    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);

        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);

        // We overwrite the value at index k in the original array with the
        // value at index j in the support array.
        animations.push([k, supportArray[j]]);
        mainArray[k++] = supportArray[j++];
    }
}

// The 'mergeSort' function get animations
function mergeSort(array, animationSpeedMs) {
    const animations = getMergeSortAnimations(array);

    // Defining an array 'newAnimations' that will contain 3 elements:
    // the steps in the process of visually swpaping positions between 2 block.
    // See the variable 'isColorChange':
    // Using the modulo operator, we can determine when to swap 2 blocks.
    const newAnimations = [];
    for (const animation of animations) {
        newAnimations.push(animation.comparison);
        newAnimations.push(animation.comparison);
        newAnimations.push(animation.swap);
    }

    // Iterating over 'newAnimations'
    for (let i = 0; i < newAnimations.length; i++) {
        const blocks = document.querySelectorAll('.block');

        // Every 3 values, we have a 'new start' of a new animation
        const isColorChange = (i % 3 !== 2);
        if (isColorChange) {
            const [blockOneIdx, blockTwoIdx] = animations[i];
            const blockOneStyle = blocks[blockOneIdx].style;
            const blockTwoStyle = blocks[blockTwoIdx].style;
            // If we're at the first of a triplet,
            // the color will be changed to green.
            const color = (i % 3 === 0) ? "#13CE66" : "#d0d8ff";

            // A timer with the delay in milliseconds, multiplied by index i.
            setTimeout(() => {
                blockOneStyle.backgroundColor = color;
                blockTwoStyle.backgroundColor = color;
            }, i * animationSpeedMs);
        } else {
            // A timer with the delay in milliseconds, multiplied by index i.
            setTimeout(() => {
                const [blockOneIdx, newHeight] = animations[i];
                const blockOneStyle = blocks[blockOneIdx].style;
                // This is the swapping of heights
                blockOneStyle.height = `${newHeight*0.75}px`;
            }, i * animationSpeedMs);
        }
    }
    // Sorting buttons are enabled
    slowSortButton.disabled = false;
    mediumSortButton.disabled = false;
    fastSortButton.disabled = false;
}

// On page load, a random array is generated with 'size', 'min' and 'max' values
array = generateArray(DEFAULT_SIZE, MIN_LIMIT, MAX_LIMIT);
generateBlocks(array);