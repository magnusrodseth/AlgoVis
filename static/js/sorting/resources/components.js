const container = document.querySelector(".data-container");
const slowSortButton = document.querySelector(".slowSortButton");
const mediumSortButton = document.querySelector(".mediumSortButton");
const fastSortButton = document.querySelector(".fastSortButton");

const slider = document.querySelector(".array-size-range");
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
    slowSortButton.disabled = false;
    mediumSortButton.disabled = false;
    fastSortButton.disabled = false;
    return;
}

const output = document.querySelector(".output-array-size");