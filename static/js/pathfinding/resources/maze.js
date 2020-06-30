function generateRandomMaze(width, height) {
    removeAllWalls(grid);
    const PROBABILITY = 0.25;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            let node = grid[row][col];
            let randNum = Math.random();
            // Set a PROBABILITY of 25% of a node turning into a wall
            if (randNum <= PROBABILITY) {
                if (!(node.isStartNode || node.isTargetNode)) {
                    let newNode = {
                        ...node,
                        isWall: !node.isWall,
                    };
                    grid[row][col] = newNode;
                }
            }
        }
    }
}

// The recursiveDivision function uses helper functions to clear and draw new walls
// Inspiration from source: https://stackoverflow.com/questions/23530756/maze-recursive-division-algorithm-design
function recursiveDivision() {
    removeAllWalls(grid);
    addOuterWalls();
    addInnerWalls(isHorizontal = true, 1, ROWS - 2, 1, COLS - 2);
}

// Encapsulates grid in walls
function addOuterWalls() {
    for (let i = 0; i < grid.length; i++) {
        if (i == 0 || i == grid.length - 1) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].isWall = true;
            }
        } else {
            grid[i][0].isWall = true;
            grid[i][ROWS - 1].isWall = true;
        }

        // Checks if current node is start or target node. 
        // If so, remove isWall attribute.
        for (let j = 0; j < grid[i].length; j++) {
            let node = grid[i][j];
            if (node.isStartNode || node.isTargetNode || node.isDetourNode) {
                node.isWall = false;
            }
        }
    }
}

// The addInnerWalls function takes a boolean value isHorizontal to decide the 
// direction of the wall to be built.
function addInnerWalls(isHorizontal, minX, maxX, minY, maxY) {
    if (isHorizontal) {
        if (maxX - minX < 2) {
            return;
        }

        let y = Math.floor(getRandomInt(minY, maxY) / 2) * 2;

        addHorizontalWall(minX, maxX, y);

        addInnerWalls(!isHorizontal, minX, maxX, minY, y - 1);
        addInnerWalls(!isHorizontal, minX, maxX, y + 1, maxY);
    } else {
        if (maxY - minY < 2) {
            return;
        }

        let x = Math.floor(getRandomInt(minX, maxX) / 2) * 2;
        addVerticalWall(minY, maxY, x);

        addInnerWalls(!isHorizontal, minX, x - 1, minY, maxY);
        addInnerWalls(!isHorizontal, x + 1, maxX, minY, maxY);
    }
}

// The addHorizontalWall adds a wall if there is no colliding opening node
// or no start / target node.
function addHorizontalWall(minX, maxX, y) {
    let opening = Math.floor(getRandomInt(minX, maxX) / 2) * 2 + 1;

    for (let i = minX; i <= maxX; i++) {
        let node = grid[y][i];
        if (!(i == opening)) {
            if (!(node.isStartNode || node.isTargetNode) || node.isDetourNode) {
                node.isWall = true;
            }
        }
    }
}

// The addVerticalWall adds a wall if there is no colliding opening node
// or no start / target node.
function addVerticalWall(minY, maxY, x) {
    let opening = Math.floor(getRandomInt(minY, maxY) / 2) * 2 + 1;

    for (let i = minY; i <= maxY; i++) {
        let node = grid[i][x];
        if (!(i == opening)) {
            if (!(node.isStartNode || node.isTargetNode || node.isDetourNode)) {
                node.isWall = true;
            }
        }
    }
}

// Source: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    // Returns a random integer between min (inclusive) and max (inclusive)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The removeAllWalls function clear the grid of all wall nodes.
function removeAllWalls(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j].isWall = false;
        }
    }
}