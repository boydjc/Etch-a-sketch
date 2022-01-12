function createGrid(squareNum) {
	// retrieve grid container
	let etchContainer = document.querySelector("#gridContainer");

	// row
	for(let i=1; i<=squareNum; i++) {
		// column
		for(let a=1; a<=squareNum; a++) {
			let gridSquare = document.createElement('div');
			gridSquare.setAttribute('style', `grid-column: ${a};
											  grid-row: ${i};
											  border: 1px solid black;`);
			etchContainer.appendChild(gridSquare);
		}
	}
}

// get the range slider and use it to control the number of squares we have
// in the grid

let squareRange = document.querySelector("#squareRange");

squareRange.addEventListener('change', (e) => {

	// empty the grid then create a new one with the 
	// correct number of squares
	let gridContainer = document.querySelector("#gridContainer");
	while(gridContainer.firstChild) {
		gridContainer.removeChild(gridContainer.firstChild);
	}

	createGrid(squareRange.value);
});


createGrid(25);
