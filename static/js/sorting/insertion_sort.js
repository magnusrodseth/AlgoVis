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