let tilesArray = document.querySelectorAll('td');
console.log(tilesArray);
let counter = 0 

// for (i=0; i<tilesArray.length; i++) {
//   let tile = 
// }

for (tile of tilesArray) {
  console.log(tilesArray);
  tile.addEventListener('click', changeSign)
}

function changeSign (e) {
  // console.log(e.target.closest('td'))
  tile = e.target.closest('td');
  value = tile.innerHTML;
  console.log(value)
  // switch(value) {
  //   case "":
  //     e.target.closest('td').innerHTML = "X";
  //     break;
  //   case "X":
  //     e.target.closest('td').innerHTML = "O";
  //     break;
  //   case "O":
  //     e.target.closest('td').innerHTML = ""
  //     break;
  // }

  
  if (counter % 2 == 0) {
    //   is x turn
    e.target.closest('td').innerHTML = "X"
    e.target.closest('td').style.color = "red"
  }
  else 
  {
    //  is o turn
    e.target.closest('td').innerHTML = "O"
    e.target.closest('td').style.color = "red"
  }
  counter++ 

};

const resetButton = document.getElementById('reset');

function resetBoardDiv() {
  for (tile of tilesArray) {
    console.log(tilesArray);
    tile.innerHTML = "";
  }
}
reset.addEventListener('click', resetBoardDiv);


// Ways to win:
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
