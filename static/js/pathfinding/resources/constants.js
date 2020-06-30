// Defining number of rows and columns.
// This is max amount for this grid, given the layout.
const ROWS = 25;
const COLS = 9;

// Defining each nodes styling
const NODE_WIDTH = 40;
const NODE_HEIGHT = 40;
const NODE_HORIZONTAL_MARGIN = 2;

// Defining start positions for start and target node
const START_NODE_COL = 1;
const START_NODE_ROW = 1;
const DETOUR_NODE_COL = 2;
const DETOUR_NODE_ROW = ROWS - 2;
const TARGET_NODE_COL = COLS - 2;
const TARGET_NODE_ROW = ROWS - 20;

// Defining the delays in ms
const OPTIMAL_PATH_DELAY = 25;
const SLOW_DELAY = 75;
const MEDIUM_DELAY = 25;
const FAST_DELAY = 5;

// Set delay to MEDIUM_DELAY by default. Can be changed by user.
let delay = MEDIUM_DELAY;

// Defining constants for color
const WET_ASPHALT = "#34495e";
const LIGHT_GREY = "#f8f9fa";
const LIGHT_BLUE = "#d0d8ff";
const YELLOW = "#FBC530";