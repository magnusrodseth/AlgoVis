const container = document.querySelector(".data-container");

const slowSortButton = document.querySelector(".slowSortButton");
slowSortButton.addEventListener("click", function () {
    bubbleSort(delay = 1000);
    slowSortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
});

const mediumSortButton = document.querySelector(".mediumSortButton");
mediumSortButton.addEventListener("click", function () {
    bubbleSort(delay = 250);
    sortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
});

const fastSortButton = document.querySelector(".fastSortButton");
fastSortButton.addEventListener("click", function () {
    bubbleSort(delay = 50);
    sortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
});

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
    sortButton.disabled = false;
    fastSortButton.disabled = false;
    return;
}

const output = document.querySelector(".output-array-size");