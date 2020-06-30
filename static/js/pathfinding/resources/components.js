// Defining array containing buttons
let buttons = [];

// The reset button clears the grid
const resetButton = document.querySelector(".reset-button");
buttons.push(resetButton);
resetButton.addEventListener("click", function () {
    resetGrid();
})

// The maze dropdown contains buttons that populate the grid with a maze
const mazeDropdown = document.querySelector(".maze-dropdown");
buttons.push(mazeDropdown);

// The recursive division button generates a recursive division maze
const recursiveDivisionButton = document.querySelector(".recursive-division-button");
buttons.push(recursiveDivisionButton);
recursiveDivisionButton.addEventListener("click", function () {
    $(".grid-div").empty();
    recursiveDivision();
    drawGrid(grid);
})

// The random maze button generates a random maze
const randomMazeButton = document.querySelector(".random-maze-button");
buttons.push(randomMazeButton);
randomMazeButton.addEventListener("click", function () {
    $(".grid-div").empty();
    generateRandomMaze(ROWS, COLS);
    drawGrid(grid);
})

// The detour button adds a detour node to the grid
const detourButton = document.querySelector(".detour-button");
buttons.push(detourButton);
detourButton.addEventListener("click", function () {
    addDetourNode();
})

// The speed dropdown contains buttons that regulate the speed of the animation
const speedDropdown = document.querySelector(".speed-dropdown");
buttons.push(speedDropdown);

// Animates in slow speed
const slowSpeedButton = document.querySelector(".slow-speed");
buttons.push(slowSpeedButton);
slowSpeedButton.addEventListener("click", function () {
    delay = SLOW_DELAY;
})

// Animates in medium speed
const mediumSpeedButton = document.querySelector(".medium-speed");
buttons.push(mediumSpeedButton);
mediumSpeedButton.addEventListener("click", function () {
    delay = MEDIUM_DELAY;
})

// Animates in fast speed
const fastSpeedButton = document.querySelector(".fast-speed");
buttons.push(fastSpeedButton);
fastSpeedButton.addEventListener("click", function () {
    delay = FAST_DELAY;
})

// The tutorialButton displays a modal that teaches the user how
// to use the pathfinding algorithm
const tutorialButton = document.querySelector(".tutorial-button");
buttons.push(tutorialButton);
tutorialButton.addEventListener("click", function () {
    displayTutorial();
})

// The visualizeButton starts visualizing the Dijkstra algorithm
const visualizeButton = document.querySelector(".visualize-button");
buttons.push(visualizeButton);
visualizeButton.addEventListener("click", function () {
    for (const button of buttons) {
        button.disabled = true;
    }
    let startNode = grid[START_NODE_COL][START_NODE_ROW];
    let targetNode = grid[TARGET_NODE_COL][TARGET_NODE_ROW];
    // The Dijkstra function returns an array in the order they were visited
    visitedNodesInOrder = dijkstra(grid, startNode, targetNode);
    visualizeDijkstra(visitedNodesInOrder, delay);
})