// Defining boolean values for mouse events
let mouseIsPressed = false;
let nodeIsUpdated = false;

// Takes row and col as parameter and uses the function
// getNewGridWithToggledWalls to re-draw the grid with updated walls. 
function handleMouseDown(row, col) {
    if ((row == TARGET_NODE_COL && col == TARGET_NODE_ROW) ||
        (row == START_NODE_COL && col == START_NODE_ROW) ||
        (row == DETOUR_NODE_COL && col == DETOUR_NODE_ROW)) {
        return;
    }
    let newGrid = getNewGridWithToggledWalls(grid, row, col);
    grid = newGrid;
    // Switch mouseIsPressed to only accept walls if user holds mouse down.
    // See the function handleMouseEnter.
    mouseIsPressed = true;

    // Empties the gridDiv and re-draws the grid.
    $(".grid-div").empty();
    drawGrid(grid);
}

// Takes row and col as parameter and uses the function
// getNewGridWithToggledWalls to re-draw the grid with updated walls.
// Only works when user holds mouse click down.
function handleMouseEnter(row, col) {
    if ((row == TARGET_NODE_COL && col == TARGET_NODE_ROW) ||
        (row == START_NODE_COL && col == START_NODE_ROW) ||
        (row == DETOUR_NODE_COL && col == DETOUR_NODE_ROW)) {
        return;
    }
    if (!mouseIsPressed) {
        return;
    }
    let newGrid = getNewGridWithToggledWalls(grid, row, col);
    grid = newGrid;
    $(".grid-div").empty();
    drawGrid(grid);
}

// Reverses mouseIsPressed,
// so the user can't hover over nodes and create walls.
function handleMouseUp() {
    mouseIsPressed = false;
}

// Takes in grid, row and col as parameter.
// Creates a copy of grid, updates a node to a wall,
// and re-draws visual grid.
function getNewGridWithToggledWalls(grid, row, col) {
    let newGrid = grid.slice();
    let node = grid[row][col];
    // New node's isWall attributes will always be the
    // opposite of the old node's isWall attribute.
    let newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
}