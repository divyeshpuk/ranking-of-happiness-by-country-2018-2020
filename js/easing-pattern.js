// --------------------------------------------------------------------
// Third party animation utility
// --------------------------------------------------------------------

let easingPattern = function ( type, time ) {
	let pattern;
	switch(type) {
        // 'easeInQuad'
	    case 1:
			pattern = time * time; // accelerating from zero velocity
			break;
            
        // 'easeOutQuad'
	    case 2:
			pattern = time * (2 - time); // decelerating to zero velocity
			break;
            
        // 'easeInOutQuad'    
	    case 3:
			pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
			break;
            
        // 'easeInCubic'
	    case 4:
			pattern = time * time * time; // accelerating from zero velocity
			break;
            
        // 'easeOutCubic'
	    case 5:
			pattern = (--time) * time * time + 1; // decelerating to zero velocity 
			break;
            
        // 'easeInOutCubic'
	    case 6:
			pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
			break;
            
        // 'easeInQuart'
	    case 7:
			pattern = time * time * time * time; // accelerating from zero velocity
			break;
            
        // 'easeOutQuart'
	    case 8:
			pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
			break;
            
        // 'easeInOutQuart'
	    case 9:
			pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
			break;
            
        // 'easeInQuint'
	    case 10:
			pattern = time * time * time * time * time; // accelerating from zero velocity
			break;
            
        // 'easeOutQuint'
	    case 11:
			pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
			break;
            
        // 'easeInOutQuint'
	    case 12:
			pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
			break;
	}
        
  	return pattern || time; // no easing, no acceleration
};