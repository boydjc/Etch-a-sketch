let toggleDraw = false;

let gridContainer = document.querySelector("#gridContainer");
gridContainer.addEventListener('click', (e) => {

	let penIndicatorLabel = document.querySelector("#penIndicatorLabel");

	if(toggleDraw) {
		toggleDraw = false;
		penIndicatorLabel.innerHTML = "Pen Off";
		penIndicatorLabel.style.color = "#1D3357";
	}else {
		toggleDraw = true;
		penIndicatorLabel.innerHTML = "Pen On";
		penIndicatorLabel.style.color = "white";
	}	
});

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
											  background-color: white;
											  border: 1px solid #A8DADC;`);
			gridSquare.addEventListener('mouseover', (e) => {
				if(toggleDraw) {
					gridSquare.style.backgroundColor = "black";
				}
			});
			etchContainer.appendChild(gridSquare);
		}
	}
}

// get the range slider and use it to control the number of squares we have
// in the grid

let squareRange = document.querySelector("#squareRange");

squareRange.addEventListener('change', (e) => {

	// update the label for the range slider
	let squareRangeLabel = document.querySelector("#squareRangeLabel");
	squareRangeLabel.innerHTML = `${squareRange.value} x ${squareRange.value}`; 

	// empty the grid then create a new one with the 
	// correct number of squares
	let gridContainer = document.querySelector("#gridContainer");
	while(gridContainer.firstChild) {
		gridContainer.removeChild(gridContainer.firstChild);
	}

	createGrid(squareRange.value);
});

// event listener for clear button

let clearButton = document.querySelector("#clearButton"); 
clearButton.addEventListener('click', (e) => {
	createGrid(squareRange.value);
});


createGrid(25);
