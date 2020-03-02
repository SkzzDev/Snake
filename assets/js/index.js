$(document).ready(function() {

	function addSq(x, y, sq) {
		var e = draw.rect(18, 18).radius(4).move((x * 20) + 2, (y * 20) + 2);
		if (sq == null) {
			squaresDir.unshift(cD);
			sq = squaresLen;
			squaresLen++;
		}
		squares[sq] = [x, y, e];
	}

	function setNewcPB() {
		cPB[0] = Math.floor(Math.random() * 40);
		cPB[1] = Math.floor(Math.random() * 40);
		cPB[2].move((cPB[0] * 20) + 5, (cPB[1] * 20) + 5);
	}

	// Set default SVG Canvas
	var draw = SVG('drawing').size(800, 800);
	
	var body = $("body"), canvas = $("#drawing");
	var canvasOffset = canvas.offset();
	var posX, posY;
	var squares = [];
	var squaresLen = 0;
	var cD = 2;
	var cPB = [0, 0, draw.circle(10)];
	var points = 0;
	var squaresDir = [];
	var exit = 0;
	var timeInterval = 100;

	setNewcPB();

	addSq(5, 0);
	addSq(4, 0);
	addSq(3, 0);
	addSq(2, 0);
	addSq(1, 0);
	addSq(0, 0);


	var idInterval = setInterval(function() {

		console.log("sqd1:");
		console.log(squaresDir);

		for (i = 0; i < squaresLen - 1; i++) {
			squaresDir[i] = squaresDir[i + 1];
		}
		squaresDir[squaresLen - 1] = cD;

		console.log("sqd2:");
		console.log(squaresDir);

		for (sq in squares) {
			sq = parseInt(sq);
			switch (squaresDir[squaresLen - 1 - sq]) {
				case 1:
					squares[sq][1]--;
					if (squares[sq][1] < 0) {
						squares[sq][1] = 39;
						squares[sq][2].remove();
						addSq(squares[sq][0], 39, sq);
					} else {
						squares[sq][2].y((squares[sq][1] * 20) + 2);
					}
					break;
				case 2:
					squares[sq][0]++;
					if (squares[sq][0] > 39) {
						squares[sq][0] = 0;
						squares[sq][2].remove();
						addSq(0, squares[sq][1], sq);
					} else {
						squares[sq][2].x((squares[sq][0] * 20) + 2);
					}
					break;
				case 3:
					squares[sq][1]++;
					if (squares[sq][1] > 39) {
						squares[sq][1] = 0;
						squares[sq][2].remove();
						addSq(squares[sq][0], 0, sq);
					} else {
						squares[sq][2].y((squares[sq][1] * 20) + 2);
					}
					break;
				case 4:
					squares[sq][0]--;
					if (squares[sq][0] < 0) {
						squares[sq][0] = 39;
						squares[sq][2].remove();
						addSq(39, squares[sq][1], sq);
					} else {
						squares[sq][2].x((squares[sq][0] * 20) + 2);
					}
					break;
			}
		}

		for (i = squaresLen - 1; i > 0; i--) {
			if (squares[0][0] == squares[i][0] && squares[0][1] == squares[i][1]) {
				exit = 1;
				clearInterval(idInterval);
				break;
			}
		}

		if (!exit && squares[0][0] == cPB[0] && squares[0][1] == cPB[1]) {
			points++;
			$("#points").text(points);
			setNewcPB();
			switch (squaresDir[0]) {
				case 1:
					addSq(squares[squaresLen - 1][0], squares[squaresLen - 1][1] + 1);
					break;
				case 2:
					addSq(squares[squaresLen - 1][0] - 1, squares[squaresLen - 1][1]);
					break;
				case 3:
					addSq(squares[squaresLen - 1][0], squares[squaresLen - 1][1] - 1);
					break;
				case 4:
					addSq(squares[squaresLen - 1][0] + 1, squares[squaresLen - 1][1]);
					break;
			}
		}
	}, timeInterval);

	$(body).keydown(function(key) {
		switch (key.which) {
			case 37: // LEFT
				if (squaresDir[squaresLen - 1] != 2) {
					cD = 4;
				}
				break;
			case 38: // UP
				if (squaresDir[squaresLen - 1] != 3) {
					cD = 1;
				}
				break;
			case 39: // RIGHT
				if (squaresDir[squaresLen - 1] != 4) {
					cD = 2;
				}
				break;
			case 40: // DOWN
				if (squaresDir[squaresLen - 1] != 1) {
					cD = 3;
				}
				break;
		}
	});

});