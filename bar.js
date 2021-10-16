// --------------------------------------------------------------------
// Bar class constructor
// --------------------------------------------------------------------

function Bar() {
    // bar is a colection of sub-bars
    this.bar = [];
}

Bar.prototype.addSubBar = function(subBar) {
    this.bar.push(subBar);
};

Bar.prototype.getBar = function() {
    return this.bar;
};

Bar.prototype.getSubBar = function(index) {
    return this.bar[index];
};

Bar.prototype.draw = function(barXPos) {
    for (let subBar of this.bar) {
        subBar.draw(barXPos);
    }
};