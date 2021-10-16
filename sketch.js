// The graph module is self-contained in one global variable
let whrGraph;

// P5js methods

function preload() {    
    loadTable(
      'data/ranking-of-happiness-by-country-2018-2020.csv', 'csv', 'header',
        
      // Callback function - called when table is loaded
      function(table) {
          // Gets the graph module
          whrGraph = graph(table);
      }
    );
}

function setup() {
    // Creates canvas using the graph module config
    let canvas = createCanvas(whrGraph.config.canvasWidth, whrGraph.config.canvasHeight);
	canvas.parent('content');
    
    let userMessage = select('#user-message');
    userMessage.hide();   
}

function draw() {
    textFont('Arial', 16);
    
    // Graph module public method to initialise the graph
    whrGraph.draw();
    
    noLoop();
}

function keyPressed() {
  if (keyCode === 13) {
    applySearchFilter();
  }
}

// Graph module public methods for user operations

function applySearchFilter() {
    let searchInput = select('#search-input');
    whrGraph.applySearchFilter(searchInput.elt.value);
}

function applyCheckboxFilter(event) {
    let checkboxes = select('#legend').elt.getElementsByTagName('input');
    let key = int(event.target.value);
    
    // Allowing animation to complete
    for (let checkbox of checkboxes) {
       checkbox.disabled = true;
    }
    
    whrGraph.applyCheckboxFilter(key, event.target.checked);
    
    setTimeout(function () {
        for (let checkbox of checkboxes) {
           checkbox.disabled = false;
        }
    }, 2000); 
}

function resetToDefault() {
    select('#search-input').elt.value = '';
    let checkboxes = select('#legend').elt.getElementsByTagName('input');
    
    for (let checkbox of checkboxes) {
       checkbox.checked = true;
    }
    
    whrGraph.resetToDefault();
}