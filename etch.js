let toggleDraw = false;
let gridToggle = true;

let gridContainer = document.querySelector("#gridContainer");
gridContainer.addEventListener('click', (e) => {

	let penIndicatorLabel = document.querySelector("#penIndicatorLabel");
	let penImage = document.querySelector('#penIndicator img');

	if(toggleDraw) {
		toggleDraw = false;
		penIndicatorLabel.innerHTML = "Pen Off";
		penIndicatorLabel.style.color = "#1D3357";
		penImage.src = "assets/images/penOff.png";
	}else {
		toggleDraw = true;
		penIndicatorLabel.innerHTML = "Pen On";
		penIndicatorLabel.style.color = "white";
		penImage.src = "assets/images/penOn.png";
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
											  background-color: rgb(255, 255, 255);
											  border: 1px solid #A8DADC;`);

			gridSquare.addEventListener('mouseover', (e) => {
				if(toggleDraw) {
					let blackColorToggle = document.querySelector("#blackColorToggle");
					let randomColorToggle = document.querySelector("#randomColorToggle");
					let shadeColorToggle = document.querySelector("#shadeColorToggle");
					let eraseColorToggle = document.querySelector("#eraseColorToggle");

					if(blackColorToggle.checked) {
						gridSquare.style.backgroundColor = "rgb(0, 0, 0)";
					}else if(randomColorToggle.checked) {
						// get random color
						let red = Math.floor(Math.random() * 256);
						let green = Math.floor(Math.random() * 256);
						let blue = Math.floor(Math.random() * 256);
						gridSquare.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
					}else if(shadeColorToggle.checked) {
						// get the current color of the square
						let currentColor = gridSquare.style.backgroundColor;
						currentColor = currentColor.split(',');
						for(let i=0; i<currentColor.length; i++) {
							currentColor[i] = currentColor[i].replace(' ', '');
							currentColor[i] = currentColor[i].replace(')', '');
							currentColor[i] = currentColor[i].replace('(', '');
							currentColor[i] = currentColor[i].replace('rgb', '');
							currentColor[i] = parseInt(currentColor);
						}

						let newColor = [parseInt(currentColor[0] - (currentColor[0] * .10)),
										parseInt(currentColor[1] - (currentColor[1] * .10)),
										parseInt(currentColor[2] - (currentColor[2] * .10))]

						// make sure we don't have any negative values before assigning the new color
						for(color in newColor) {
							if(color < 0) {
								color = 0;
							}
						}

						gridSquare.style.backgroundColor = `rgb(${newColor[0]},
																${newColor[1]},
																${newColor[2]})`
					}else if(eraseColorToggle.checked) {
						gridSquare.style.backgroundColor = 'rgb(255, 255, 255)';
					}
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

	gridOnToggle.checked = true;
	gridOffToggle.checked = false;
	createGrid(squareRange.value);
});


// make sure black color and grid on are selected by default
let blackToggle = document.querySelector("#blackColorToggle");
blackToggle.checked = true;
let gridOnToggle = document.querySelector("#gridOnToggle");
gridOnToggle.checked = true;
gridOnToggle.onclick = () => {
	let gridContainer = document.querySelector("#gridContainer");
	let gridChildren = gridContainer.children;
	for(let i=0; i<gridChildren.length; i++) {
		gridChildren[i].style.border = '1px solid #A8DADC';
	}
};


// add an event listener to the grid toggle buttons
let gridOffToggle = document.querySelector("#gridOffToggle");
gridOffToggle.onclick = () => {
	let gridContainer = document.querySelector("#gridContainer");
	let gridChildren = gridContainer.children;
	for(let i=0; i<gridChildren.length; i++) {
		gridChildren[i].style.border = 'none';
	}
};

// event listener for clear button

let clearButton = document.querySelector("#clearButton"); 
clearButton.addEventListener('click', (e) => {
	createGrid(squareRange.value);
});


createGrid(25);
