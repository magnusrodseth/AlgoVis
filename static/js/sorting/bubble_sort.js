// In this 'async' function, the 'await' keyword is permitted.
// Executes the bubble sort, and animates the change.
async function bubbleSort(delay) {
    if (delay && typeof delay !== "number") {
        alert("sort: First argument must be a typeof Number");
        return;
    }

    // Execute the bubble sort
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            // Get value of each block in collection of blocks
            const value1 = Number(blocks[j].childNodes[0].innerHTML);
            const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            // Compare values and swap if condition is met.
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1], delay);
                blocks = document.querySelectorAll(".block");
            }

            blocks[j].style.backgroundColor = "#d0d8ff";
            blocks[j + 1].style.backgroundColor = "#d0d8ff";
        }

        // Every sorted block gets a green color
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }

    // Sorting buttons are enabled
    slowSortButton.disabled = false;
    mediumSortButton.disabled = false;
    fastSortButton.disabled = false;
}

slowSortButton.addEventListener("click", function () {
    bubbleSort(delay = 1000);
    slowSortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
});

mediumSortButton.addEventListener("click", function () {
    bubbleSort(delay = 250);
    slowSortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
});

fastSortButton.addEventListener("click", function () {
    bubbleSort(delay = 50);
    slowSortButton.disabled = true;
    mediumSortButton.disabled = true;
    fastSortButton.disabled = true;
});