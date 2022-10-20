const container= document.getElementById("container"); // 
const display = document.getElementById("display"); // 
const reset = document.getElementById("reset");

const Game = () => {
    let turn = true; 
    let winner = 0;
    const gameBoard = new Array(9)
    const playerTurn= () => {
        document.getElementById("display").innerHTML="";
        let displayTurn = document.createElement('div');
        if (winner){
            if (winner === 1){
                displayTurn.textContent = "Player 1 Wins!";
            }

        }
        else {
        turn? displayTurn.textContent = "Player 1's Turn (X)" : displayTurn.textContent = "Player 2's Turn (O)";
        }
        display.appendChild(displayTurn);

    }
    
    const createGrid= () =>{
        gameBoard.fill("."); 
        container.style.display = 'grid';
        container.style.gridTemplateRows = 'repeat(3, 50px)'; // For each row, set to row width based on .grid class width 
        container.style.gridTemplateColumns = `repeat(3,50px)`; // Repeat for col


    for (let num=0; num<9; num++ ){ //Number buttons
        let cell = document.createElement("button"); //creates new div element for each cell (numbers)
        cell.textContent = gameBoard[num];
        cell.addEventListener('click', () => {
            // 
            
            let cellX = document.createElement("button");
            if (!winner){
            turn? cellX.textContent = 'X':cellX.textContent = 'O';  
            turn? gameBoard[num]= 'X':gameBoard[num] = 'O';  
            turn? cellX.style.backgroundColor='#FFCCCB':cellX.style.backgroundColor='lightblue';  
            container.replaceChild(cellX, cell); 
            turn = !turn;
            playerTurn();
            winCheck(); }
            

            } ); 
        container.appendChild(cell).className = "button"; //Adds element to parent
        };
    }

    const resetButton = () => {
        let cell = document.createElement("button"); //creates new div element for each cell (numbers)
        cell.textContent = 'Reset';
        cell.addEventListener('click', () => {
            turn = true; 
            winner = 0;
            playerTurn();
            document.getElementById("container").innerHTML="";
            
            createGrid();
        })
        reset.appendChild(cell).className = "button";
    }

    const winCheck = () => { 
        let check = new Array(8).fill('');
        for (var j =0; j<3; j++){
            for (var i =0; i<3; i++){
                check[j] += gameBoard[i+j*3]; // check horiz
                check[i+3] += check[j][i]; //check vertical 
                
                if (i==j){
                    check[6]+=gameBoard[i+j*3]; //1st diag
                }
            }
        }
        check[7]+= gameBoard[2]+gameBoard[4]+gameBoard[6]; //2nd diag

        if (check.includes("XXX")){
            winner = 1;
            playerTurn()}
        else if (check.includes("OOO")){
            winner = 2;
            playerTurn()}

    }
    
    return{playerTurn, createGrid, resetButton} 
};


const board = Game();
board.playerTurn();
board.resetButton();
board.createGrid();