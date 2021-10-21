// --------------------------------------------------------------------
// Graph module
// --------------------------------------------------------------------

// Implements Module Design Pattern
function graph(table) {
    // Incoming table data is in scope of graph's lexical environment like a private variable
    
    // Private or local variables
    let buffer = 10;
    let scale = 100;
    let subBarHeight = 16.2;
    let graphHeight = buffer + (subBarHeight + buffer) * table.getRowCount();
    let graphUnits = table.getColumnCount();
    let config = {
        canvasWidth: windowWidth * 0.63,
        canvasHeight: graphHeight + (buffer * 2)
    };
    let graphXPos = (config.canvasWidth) * 0.27;
    let rows = [];
    let colorObj = {
        slateBlue: color(60, 80, 215),
        teal: color(0, 128, 128),
        yellowGreen: color(154, 205, 50),
        orange: color(255, 165, 0),
        darkRed: color(159, 0, 0),
        crimson: color(220, 20, 60),
        orchid: color(218, 102, 244)
    };
    let colorMap = getMap(colorObj);
    let userMessage = select('#user-message');
    let userFilters;
    
    // Private or inner methods (closures)
    
    // Creates SubBar instances and adds them to a Row instance
    function addSubBars(row, rowArr, rowIndex, subBarXPos, subBarYPos) {
        for (let i = 0; i < rowArr.length; i++) {
            if (userFilters.legendKeys.checked[i]) {
                let width = scaleNumber(rowArr[i], scale);
                let subBar = new SubBar(subBarXPos, subBarYPos, width, subBarHeight, getSubBarColor(i));
                row.addSubBar(subBar);
                subBarXPos = subBarXPos + width;
            }
        }
    }

    // Creates Row instances
    function setRows() {
        userFilters = getDefaultUserFilters();
        
        for (let i = 0; i < table.getRowCount(); i++) {
            let tableRow = table.getRow(i);
            let rowScore = sumSelectedItems(tableRow.arr, [0]);
            let rowArr = tableRow.arr.slice(1);
            let rowNumber = i + 1;
            let rowText = tableRow.getString(0);
            let subBarYPos = i * (subBarHeight + buffer) + buffer;
            let textYPos = subBarYPos + subBarHeight;
            let row = new Row(rowNumber, rowText, buffer, textYPos, graphXPos, rowArr);
            row.setValue('score', rowScore);
            addSubBars(row, rowArr, i, graphXPos, subBarYPos);
            rows.push(row);
        }     
    }
    
    function shuffleRows() {
        let selectedKeysIndexes = getselectedKeysIndexes();
        
        for (let row of rows) {
            let rowScore = sumSelectedItems(row.scores, selectedKeysIndexes);
            row.setValue('score', rowScore);
        }
        
        rows = compareNumbers(rows, 'score');
        
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let subBarXPos = graphXPos;
            let subBarYPos = i * (subBarHeight + buffer) + buffer;
            let textYPos = subBarYPos + subBarHeight;

            row.setValue('number', i + 1);
            row.setValue('textYPos', textYPos);
            row.bar = new Bar();
            
            addSubBars(row, row.scores, i, subBarXPos, subBarYPos);
        }
    }
    
    function getselectedKeysIndexes() {
        let selectedKeysIndexes = [];
        
        userFilters.legendKeys.checked.forEach(function(el, i) {
           !el && selectedKeysIndexes.push(i);
        });
        
        return selectedKeysIndexes;
    }
    
    function getFilteredRows() {
        let selectedKeysIndexes = getselectedKeysIndexes();
        let searchText = userFilters.search.currentValue.replace(/\s/g, '').toLowerCase();
        let filteredRows = [];
        
        for (let row of rows) {
            let rowScore = sumSelectedItems(row.scores, selectedKeysIndexes);
            let rowText = row.text.replace(/\s/g, '').toLowerCase();
            
            if (((rowText).indexOf(searchText) > -1 || !searchText) &&
               userFilters.legendKeys.checked.indexOf(true) > -1 &&
               rowScore) {
                filteredRows.push(row);
            }      
        }
        
        for (let i = 0; i < filteredRows.length; i++) {
            let row = filteredRows[i];
            let subBarYPos = i * (subBarHeight + buffer) + buffer;
            let textYPos = subBarYPos + subBarHeight;
            row.textYPos = textYPos;
            let bar = row.getSubBarList();
            
            for (let subBar of bar) {
                subBar.yPos = subBarYPos;
            }
        }
        
        return filteredRows;
    }

    function drawUnits() {
        for (let i = 0, count = 0; i <= graphUnits * scale; i = i + scale, count++) {
            let leftPosition = graphXPos;
            stroke(176);
            line(leftPosition + i, buffer, leftPosition + i, graphHeight + buffer);

            noStroke();
            fill(176);
            text(count, leftPosition + i + buffer, graphHeight + buffer);
        }
    }

    function getSubBarColor(index) {
        return colorMap.get(index);
    }
    
    function getDefaultUserFilters() {
        return {
            search: {
                currentValue: '',
                previousValue: ''
            },
            legendKeys: {
                checked: new Array(table.getColumnCount() - 1).fill(true)
            }
        };
    }
    
    function drawFilteredRows() {
        let filteredRows = getFilteredRows();
        
        if (filteredRows.length) {
            drawUnits();
            
            for (let row of filteredRows) {
                row.draw();
            }
        } else {
            userMessage.show();
        }
    }
    
    // Public methods
    
    function draw() {
        drawUnits();
        
        for (let row of rows) {
            row.draw();
        }
    }

    function applySearchFilter(currentValue) {
        userFilters.search.currentValue = currentValue;
        
        if (currentValue !== userFilters.search.previousValue) {
            userFilters.search.previousValue = currentValue;
            clear();
            userMessage.hide();
            drawFilteredRows();
        }
    }
    
    function applyCheckboxFilter(key, value) {
        userFilters.legendKeys.checked[key] = value;    
        clear();
        userMessage.hide();
        shuffleRows();
        drawFilteredRows();
    }
    
    function resetToDefault() {
        clear();
        userMessage.hide();
        rows = [];
        setRows();
        draw();
    }
    
    setRows();
    
    // Exposes config and methods to the client for initialisation and user operations
    return {
        config: config,
        draw: draw,
        applySearchFilter: applySearchFilter,
        applyCheckboxFilter: applyCheckboxFilter,
        resetToDefault: resetToDefault
    };
}
