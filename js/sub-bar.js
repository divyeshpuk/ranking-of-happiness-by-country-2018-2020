// --------------------------------------------------------------------
// SubBar class constructor
// --------------------------------------------------------------------

function SubBar(xPos, yPos, width, height, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = color;
}

// Draws and animates sub-bar into position
SubBar.prototype.draw = function(barXPos) {
    let self = this;
    let timer = null;
    let currentX;
    let startTime = new Date().getTime();
    let currentTime;
    let elapsedTime;
    
    // Easing pattern type for the animation
    let pattern = floor(random(1, 13));
    let distance;
    let interval = 25;

    clearInterval(timer);
    
    // Moves sub-bar incrementally (and horizontally) for a second towards its final position
    timer = setInterval(function() {
        currentTime = new Date().getTime();
        elapsedTime = min(1, (currentTime - startTime) / 1000);
        distance = self.xPos - barXPos;
        currentX = barXPos + (easingPattern(pattern, elapsedTime) * distance);
        
        fill(self.color);
        rect(currentX, self.yPos, self.width, self.height);

        if (elapsedTime === 1) {
            clearInterval(timer);
            timer = null;
        };
    }, interval);
};