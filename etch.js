function createGrid() {
	// retrieve grid container
	let etchContainer = document.querySelector("#gridContainer");

	for(let i=0; i<16; i++) {
		let gridSquare = document.createElement('div');
		gridSquare.classList.add('gridSquare');
		etchContainer.appendChild(gridSquare);
	}
}

createGrid();
