// Creates a node in a given row and col with specific attributes
function createNode(row, col) {
    return {
        row: row,
        col: col,
        isStartNode: (col == START_NODE_COL && row == START_NODE_ROW),
        isDetourNode: (col == DETOUR_NODE_COL && row == DETOUR_NODE_ROW),
        isTargetNode: (col == TARGET_NODE_COL && row == TARGET_NODE_ROW),
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    }
}

function addDetourNode() {

}