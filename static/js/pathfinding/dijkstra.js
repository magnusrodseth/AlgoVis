// Dijkstra's pathfinding algorithm.
// Takes a 2D array (grid), a startNode and a targetNode as parameter.
// Returns an array of visited nodes in order.
// Makes nodes point to their previous node,
// essentially allowing a linked list to compute the optimal path
// by backtracking from the finish node.
// Helper functions:
// getAllNodes, sortNodesAscending, updateUnvisitedNeighbors, getUnvisitedNeighbors.
function dijkstra(grid, startNode, targetNode) {
    let visitedNodesInOrder = [];
    // startNode begins with a distance of 0.
    // All other nodes begin with a distance of Infinity.
    startNode.distance = 0;

    // Creates a copy of grid.
    let unvisitedNodes = getAllNodes(grid);


    while (!!unvisitedNodes.length) {
        // Sorts unvisited nodes in ascending order.
        sortNodesAscending(unvisitedNodes);

        // shift "pops" off first element in array
        let closestNode = unvisitedNodes.shift();

        // If a node encounters a wall, continue the iteration.
        if (closestNode.isWall) {
            continue;
        }

        // If the closest node's distance is Infinity,
        // this means there is no path to targetNode.
        if (closestNode.distance == Infinity) {
            return visitedNodesInOrder;
        }

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode == targetNode) {
            return visitedNodesInOrder;
        }


        updateUnvisitedNeighbors(closestNode, grid);
    }
}

// Takes a 2D array as parameter and returns a copy of grid.
function getAllNodes(grid) {
    let unvisitedNodes = [];
    for (let i = 0; i < grid.length; i++) {
        let row = grid[i];
        for (let j = 0; j < row.length; j++) {
            let node = row[j];
            unvisitedNodes.push(node);
        }
    }
    return unvisitedNodes;
}

// Uses the native JavaScript sort method to sort unvisitedNodes
function sortNodesAscending(unvisitedNodes) {
    unvisitedNodes.sort(function (firstNode, secondNode) {
        return firstNode.distance - secondNode.distance;
    });
}

// Takes in a given node and the full grid.
// Updates all unvisited neighbors with distance
// and a pointer to previous node.
// Helper functions: getUnvisitedNeighbors.
function updateUnvisitedNeighbors(node, grid) {
    let unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (let i = 0; i < unvisitedNeighbors.length; i++) {
        let neighbor = unvisitedNeighbors[i];

        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

// Takes in a given node and the full grid.
// Checks all neighboring nodes if the are visited,
// and uses the native JavaScript filter method to filter out neighbors.
function getUnvisitedNeighbors(node, grid) {
    let neighbors = [];
    let row = node.row,
        col = node.col;
    if (col > 0) {
        neighbors.push(grid[col - 1][row])
    }
    if (col < grid.length - 1) {
        neighbors.push(grid[col + 1][row])
    }
    if (row > 0) {
        neighbors.push(grid[col][row - 1]);
    }
    if (row < grid[0].length - 1) {
        neighbors.push(grid[col][row + 1])
    }
    // Source: https://www.w3schools.com/jsref/jsref_filter.asp
    return neighbors.filter(neighbor => (!neighbor.isVisited));
}

// Uses the returned value from the dijkstra function,
// and animates the pathfinding process with a given delay.
function visualizeDijkstra(visitedNodesInOrder, delay) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        // If i equals the length of visitedNodesInOrder,
        // the end has been reached. The animation for optimal path can now
        // proceed.
        if (i == visitedNodesInOrder.length) {
            setTimeout(function () {
                let targetNode = visitedNodesInOrder[visitedNodesInOrder.length - 1];
                let optimalPath = findOptimalPath(targetNode);
                visualizeOptimalPath(optimalPath);
            }, i * delay);
            return;
        }
        // If i is not yet the length of visitedNodesInOrder,
        // update the current node with a LIGHT_BLUE color.
        setTimeout(function () {
            let node = visitedNodesInOrder[i];
            let gridNode = document.getElementById(`${node.col}-${node.row}`);
            gridNode.style.backgroundColor = LIGHT_BLUE;
        }, i * delay);
    }
}

// Effectively uses the pointers in the linked list to
// backtrack through previous nodes to find the optimal path.
function findOptimalPath(targetNode) {
    let optimalPath = [];
    let currentNode = targetNode;
    while (currentNode.previousNode != null) {
        // Unshift inserts new elements at the start of an array.
        optimalPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return optimalPath;
}

// Uses the returned value from findOptimalPath
// to animate the process with a constant delay.
// The current node gets a YELLOW color.
function visualizeOptimalPath(optimalPath) {
    for (let i = 0; i < optimalPath.length; i++) {
        setTimeout(function () {
            let node = optimalPath[i];
            let nodeDiv = document.getElementById(`${node.col}-${node.row}`);
            nodeDiv.style.backgroundColor = YELLOW;
        }, i * OPTIMAL_PATH_DELAY);
    }
    for (const button of buttons) {
        button.disabled = false;
    }
}

grid = generateGrid(ROWS, COLS);
drawGrid(grid);