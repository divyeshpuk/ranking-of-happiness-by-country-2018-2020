// --------------------------------------------------------------------
// Row class constructor
// --------------------------------------------------------------------

function Row(number, text, textXPos, textYPos, barXPos, scores) {
    this.number = number;
    this.text = text;
    this.textXPos = textXPos;
    this.textYPos = textYPos;
    this.barXPos = barXPos;
    this.scores = scores;
    this.score;
    this.bar = new Bar();
}

Row.prototype.addSubBar = function(subBar) {
   this.bar.addSubBar(subBar);
}

Row.prototype.draw = function() {
    fill(32);
    let txt = `${this.number}. ${this.text} (${this.score.toFixed(3)})`;
    text(txt, this.textXPos, this.textYPos);
    this.bar.draw(this.barXPos);
};

Row.prototype.setValue = function(prop, value) {
   this[prop] = value;
}

Row.prototype.getSubBarList = function() {
   return this.bar.getBar();
}