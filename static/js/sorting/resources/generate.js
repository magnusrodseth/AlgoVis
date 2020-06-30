// Display the default slider value
output.innerHTML = `Array size: ${slider.value}`;

// Define a mutable array, where each item will be displayed as blocks relative to one another
var array = [];

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

// On page load, a random array is generated with 'size', 'min' and 'max' values
array = generateArray(DEFAULT_SIZE, MIN_LIMIT, MAX_LIMIT);
generateBlocks(array);