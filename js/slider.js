var game = new Object();
game.tiles = Array.from(document.getElementsByClassName('tile')); //is our board
game.gameStarted = false;
game.img = {
  1: "img_01.jpg", //for setting the board up
  2: "img_02.jpg",
  3: "img_03.jpg",
  4: "img_04.jpg",
  5: "img_05.jpg",
  6: "img_06.jpg",
  7: "img_07.jpg",
  8: "img_08.jpg",
  9: "img_09.jpg",
  10: "img_10.jpg",
  11: "img_11.jpg",
  12: "img_12.jpg",
  13: "img_13.jpg",
  14: "img_14.jpg",
  15: "img_15.jpg",
  16: ""
};
game.blanktile = document.getElementById('blank'); //the blank tile
game.winCondition = Array.from(document.getElementsByClassName('tile')); //current game condition will be checked against this
game.helpenabled = false;
game.frame = document.getElementById('frame');
game.wrapper = document.getElementById('wrapper');
game.slectImg = document.getElementsByClassName('imgsel');
game.options = document.getElementById('changeimage');

function setPuzzleImage(foldername) { //adding images to every tile in the game
//  game.frame.style.backgroundImage = "url('" + "../img/natalia" + "/" + "frame.jpg" + "')"
  for (var i = 0; i < game.tiles.length; i++) {
    var tileImg = i + 1;
    game.tiles[i].style.backgroundImage = "url('" + "../img/natalia" + "/" + game.img[tileImg] + "')"
  }
}

function addClickEvent() { //adding click event to each tile
  for (var i = 0; i < game.tiles.length - 1; i++) {
    game.tiles[i].addEventListener('click', function() {
      shiftPuzzle(this);
      win();
    });
  }
  //reset button
  //shuffle button
  for (var i = 0; i < game.slectImg.length; i++) {
    game.slectImg[i].addEventListener('click', function() {
      game.tiles = Array.from(document.getElementsByClassName('tile'));
      setPuzzleImage(this.name);
      setTiles(game);
      game.wrapper.style.display = "none";
    });
  }
  game.options.addEventListener('click', function() {
    // body...
    game.wrapper.style.display = "inline-block";
  });
}

function shuffle(array) { //shuffle is part of set tiles
  var a = Math.floor(((Math.random() * 150) + 150));
  //console.log(a);
  var r1_c1 = [3, 1];
  var r1_c2 = [1, -1, 3];
  var r1_c3 = [1, -1, 3];
  var r1_c4 = [3, -1];
  var r2_c1 = [1, 3, -3];
  var r2_c2 = [1, 3, -3, -1];
  var r2_c3 = [1, 3, -3, -1];
  var r2_c4 = [-1, -3, 3];
  var r3_c1 = [1, 3, -3];
  var r3_c2 = [1, 3, -3, -1];
  var r3_c3 = [1, 3, -3, -1];
  var r3_c4 = [-1, -3, 3];
  var r4_c1 = [-3, 1];
  var r4_c2 = [1, -1, -3];
  var r4_c3 = [1, -1, -3];
  var r4_c4 = [-3, -1];
  var moves;

  for (var i = 0; i < a; i++) {
    var position = Array.prototype.indexOf.call(array, game.blanktile);
    if (position == 0) {
      moves = r1_c1;
    }
    if (position == 1) {
      moves = r1_c2;
    }
    if (position == 2) {
      moves = r1_c3;
    }
    if (position == 3) {
      moves = r1_c4;
    }
    if (position == 4) {
      moves = r2_c1;
    }
    if (position == 5) {
      moves = r2_c2;
    }
    if (position == 6) {
      moves = r2_c3
    }
    if (position == 7) {
      moves = r2_c4;
    }
    if (position == 8) {
      moves = r3_c1;
    }
    if (position == 9) {
      moves = r3_c2;
    }
    if (position == 10) {
      moves = r3_c3;
    }
    if (position == 11) {
      moves = r3_c4;
    }
    if (position == 12) {
      moves = r4_c1;
    }
    if (position == 13) {
      moves = r4_c2;
    }
    if (position == 14) {
      moves = r4_c3;
    }
    if (position == 15) {
      moves = r4_c4
    }
    move = moves[Math.floor(Math.random() * moves.length)];
    //console.log(moves)
    //console.log(move);
    //console.log(position);
    array[position] = array[position + move];
    array[position + move] = game.blanktile;
  }
  return array
}

function setTiles(gameobj) {
  var a = gameobj.tiles
  a = shuffle(a);
  var set = [
    [a[0], a[1], a[2], a[3]],
    [a[4], a[5], a[6], a[7]],
    [a[8], a[9], a[10], a[11]],
    [a[12], a[13], a[14], a[15]]
  ];
  for (var i = 0; i < 4; i++) {
    position = (Array.prototype.indexOf.call(set[0], set[0][i])) * 125
    set[0][i].style.top = "0px";
    set[0][i].style.left = position.toString() + "px";
  }
  for (var i = 0; i < 4; i++) {
    position = (Array.prototype.indexOf.call(set[1], set[1][i])) * 125
    set[1][i].style.top = "125px";
    set[1][i].style.left = position.toString() + "px";
  }
  for (var i = 0; i < 4; i++) {
    position = (Array.prototype.indexOf.call(set[2], set[2][i])) * 125
    set[2][i].style.top = "250px";
    set[2][i].style.left = position.toString() + "px";
  }
  for (var i = 0; i < 4; i++) {
    position = (Array.prototype.indexOf.call(set[3], set[3][i])) * 125
    set[3][i].style.top = "375px";
    set[3][i].style.left = position.toString() + "px";
  }
}

function shiftPuzzle(tile) {
  if (isRight(tile)) {
    moveRight(tile);
  } else if (isLeft(tile)) {
    moveLeft(tile);
  } else if (isTop(tile)) {
    moveTop(tile);
  } else if (isDown(tile)) {
    moveDown(tile)
  }
}

function isRight(tile) {
  var position = Array.prototype.indexOf.call(game.tiles, tile);
  //console.log(position);
  blank_position = position + 1;
  if (Object.is(game.tiles[blank_position], game.blanktile) && position != 3 && position != 7 && position != 11 && position != 15) {
    return true;
  }
}

function moveRight(tile) {
  var position = Array.prototype.indexOf.call(game.tiles, tile);
  var current_posX = tile.style.left;
  var res = current_posX.split('px')[0];
  current = eval(res);
  tile.style.left = (current + 125).toString() + "px";
  var blank_position = Array.prototype.indexOf.call(game.tiles, game.blanktile);
  var current_blank_posX = game.blanktile.style.left;
  var res_blank = current_blank_posX.split('px')[0];
  var current_blank = eval(res_blank);
  game.blanktile.style.left = (current_blank - 125).toString() + "px";
  //game.tiles = Array.from(game.tiles);
  game.tiles[blank_position] = game.tiles[position]
  game.tiles[position] = game.blanktile;
}

function isLeft(tile) {
  var position = Array.prototype.indexOf.call(game.tiles, tile);
  blank_position = position - 1;
  if (Object.is(game.tiles[blank_position], game.blanktile) && position != 0 && position != 4 && position != 8 && position != 12) {
    return true;
  }
}

function moveLeft(tile) {
  var position = Array.prototype.indexOf.call(game.tiles, tile);
  var current_posX = tile.style.left;
  var res = current_posX.split('px')[0];
  current = eval(res);
  tile.style.left = (current - 125).toString() + "px";
  var blank_position = Array.prototype.indexOf.call(game.tiles, game.blanktile);
  var current_blank_posX = game.blanktile.style.left;
  var res_blank = current_blank_posX.split('px')[0];
  var current_blank = eval(res_blank);
  game.blanktile.style.left = (current_blank + 125).toString() + "px";
  //game.tiles = Array.from(game.tiles);
  game.tiles[blank_position] = game.tiles[position]
  game.tiles[position] = game.blanktile;
}

function isTop(tile) {
  var position = Array.prototype.indexOf.call(game.tiles, tile);
  blank_position = position - 4;
  if (Object.is(game.tiles[blank_position], game.blanktile)) {
    return true;
  }
}

function moveTop(tile) {
  var position = Array.prototype.indexOf.call(game.tiles, tile);
  var current_posY = tile.style.top;
  var res = current_posY.split('px')[0];
  current = eval(res);
  tile.style.top = (current - 125).toString() + "px";
  var blank_position = Array.prototype.indexOf.call(game.tiles, game.blanktile);
  var current_blank_posY = game.blanktile.style.top;
  var res_blank = current_blank_posY.split('px')[0];
  var current_blank = eval(res_blank);
  game.blanktile.style.top = (current_blank + 125).toString() + "px";
  game.tiles[blank_position] = game.tiles[position]
  game.tiles[position] = game.blanktile;
}

function isDown(tile) {
  var position = Array.prototype.indexOf.call(game.tiles, tile);
  blank_position = position + 4;
  if (Object.is(game.tiles[blank_position], game.blanktile)) {
    return true;
  }
}

function moveDown(tile) {
  var position = Array.prototype.indexOf.call(game.tiles, tile);
  var current_posY = tile.style.top;
  var res = current_posY.split('px')[0];
  current = eval(res);
  tile.style.top = (current + 125).toString() + "px";
  var blank_position = Array.prototype.indexOf.call(game.tiles, game.blanktile);
  var current_blank_posY = game.blanktile.style.top;
  var res_blank = current_blank_posY.split('px')[0];
  var current_blank = eval(res_blank);
  game.blanktile.style.top = (current_blank - 125).toString() + "px";
  game.tiles[blank_position] = game.tiles[position]
  game.tiles[position] = game.blanktile;
}

function isEqual(currentboard, winboard) {
  for (var i = 0; i < currentboard.length; i++) {
    if (currentboard[i] != winboard[i]) {
      return false
    }
  }
  return true;
}

function win() {
  // body...
  var help = document.getElementById('help');
  var completion = document.getElementById('completion');
  if (isEqual(game.tiles, game.winCondition)) {
    setTimeout(function() {
      help.classList.toggle("w3-hide");
      completion.classList.toggle("w3-hide");
    }, 200);
  }
}


(function(global) {
  // body...
  setPuzzleImage();
  addClickEvent();
  setTiles(global);
}(game));

function shownumbers() {
  var help = document.getElementsByClassName('number');
  if (game.helpenabled) {
    game.helpenabled = false;
    for (var i = 0; i < help.length; i++) {
      help[i].style.display = "none";
    }
  } else {
    game.helpenabled = true
    for (var i = 0; i < help.length; i++) {
      help[i].style.display = "inline-block";
    }
  }
}
