// At the moment,
// quick sort is the only sorting algorithm that does not animate properly.
// I'm taking a break from quick sort and moving on to pathfinding algorithms.
// Later, I can visualize quick sort. For now, I'm more interested in pathfinding.

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
  mediumSortButton.disabled = false;
  fastSortButton.disabled = false;
  return;
};

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
    block.style.height = `${value * 0.7}px`;
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

// Executes the function mergeSort with a high delay.
// Suitable for low sized arrays.
// Sorting buttons are disabled to prevent error in sorting.
slowSortButton.addEventListener("click", function () {
  $(".data-container").empty();
  quickSort(array, 0, array.length - 1);
  generateBlocks(array);
  slowSortButton.disabled = true;
  mediumSortButton.disabled = true;
  fastSortButton.disabled = true;
});

// Executes the function mergeSort with a high delay.
// Suitable for low sized arrays.
// Sorting buttons are disabled to prevent error in sorting.
mediumSortButton.addEventListener("click", function () {
  sortButton.disabled = true;
  mediumSortButton.disabled = true;
  fastSortButton.disabled = true;
});

// Executes the function mergeSort with a low delay.
// Suitable for medium sized arrays.
// Sorting buttons are disabled to prevent error in sorting.
fastSortButton.addEventListener("click", function () {
  sortButton.disabled = true;
  mediumSortButton.disabled = true;
  fastSortButton.disabled = true;
});

function quickSort(array, start, end) {
  if (start >= end) {
    return;
  }

  let pivotIndex = quickSortHelper(array, start, end);

  // Execute both recursive calls to quickSort simultanously,
  // but wait for both to finish before continuing.
  // await Promise.all([
  //   quickSort(array, start, pivotIndex - 1),
  //   quickSort(array, pivotIndex + 1, end),
  // ]);

  quickSort(array, start, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, end);
}

function quickSortHelper(array, start, end) {
  let pivotIndex = start;
  let pivotValue = array[end];
  for (let i = start; i < end; i++) {
    if (array[i] < pivotValue) {
      swap(array, i, pivotIndex);
      pivotIndex++;
    }
  }
  swap(array, pivotIndex, end);

  return pivotIndex;
}

function swap(array, a, b) {
  sleep(25);

  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

// This is JavaScript's current version of a sleep function.
// Source: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// On page load, a random array is generated with 'size', 'min' and 'max' values
array = generateArray(DEFAULT_SIZE, MIN_LIMIT, MAX_LIMIT);
generateBlocks(array);
