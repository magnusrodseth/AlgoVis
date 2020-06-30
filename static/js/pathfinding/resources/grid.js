// Creates a 2D array (grid) from a given amount of rows and columns.
function generateGrid(rows, cols) {
    let grid = [];

    for (let col = 0; col < cols; col++) {
        let currentRow = []
        for (let row = 0; row < rows; row++) {
            let currentNode = createNode(row, col);
            currentRow.push(currentNode)
        }
        grid.push(currentRow);
    }

    return grid;
}

function resetGrid() {
    $(".grid-div").empty();
    grid = generateGrid(ROWS, COLS);
    drawGrid(grid);
}

// The DOM element of the parent div that holds all children nodes.
let gridDiv = document.querySelector(".grid-div");

// Expects 2D array as grid and visualizes it as DOM
function drawGrid(grid) {
    gridDiv.style.width = `${(ROWS * NODE_WIDTH) + (ROWS*NODE_HORIZONTAL_MARGIN*2)}px`;
    gridDiv.style.height = `${(COLS * NODE_HEIGHT) + (COLS*NODE_HORIZONTAL_MARGIN*2)}px`;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            let node = grid[row][col];
            const nodeDiv = document.createElement("div");

            if (node.isWall) {
                nodeDiv.classList.add("wall-node");
            }

            nodeDiv.classList.add("node-div");

            // Adds Bootstrap class "img-thumbnail"
            // to each nodeDiv to improve looks
            nodeDiv.classList.add("img-thumbnail");

            // Each node element has an id of their row and column.
            // This is later used to look up a node div if we only know row and col.
            nodeDiv.setAttribute("id", `${row}-${col}`);

            nodeDiv.style.transform = `translateX(${row * 2})px`;

            if (node.isStartNode) {
                nodeDiv.classList.add("start-node");
            }

            if (node.isTargetNode) {
                nodeDiv.classList.add("target-node");
            }

            gridDiv.appendChild(nodeDiv);

            // Each node has several mouse event handlers.
            nodeDiv.addEventListener("mousedown", function () {
                handleMouseDown(row, col);
            })
            nodeDiv.addEventListener("mouseenter", function () {
                handleMouseEnter(row, col);
            })
            nodeDiv.addEventListener("mouseup", function () {
                handleMouseUp();
            })
        }
    }
}