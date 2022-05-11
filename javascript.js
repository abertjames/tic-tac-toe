/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// set up players /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Player = ((sign,type) => {
    const _sign = sign;
    const _type = type;
    const _turn = true;

    const getPlayerSign = () => _sign;
    const getPlayerTurn = () => _turn;
    return {getPlayerSign, getPlayerTurn}
})();

const AiPlayer = (() => {

})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// control gameboard input/display //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gameBoard = (() => {

    const restartButton = document.getElementById("restart");
    restartButton.onclick = () => restart();
    const restart = () => {
        _grid.forEach((item) => item.innerHTML = '');
        gameProgression.setCurrentPlayer();
    }

    const _getIndex = () => {

    }

    const getContent = (index) => _grid[index].innerHTML;
    const getGrid = () => _grid;

    const applyInput = (e) => {

        const input = document.createElement('img');
        let _turn = gameProgression.getTurn();
        // console.log(e.path[0].innerHTML)

        if (e.path[0].innerHTML != ''){
            return
        } else if (_turn == 'x'){
            input.src = "icons/close.svg";
        } else if (_turn == 'o'){
            input.src = "icons/circle-outline.svg";
        }
        e.path[0].appendChild(input);

        gameProgression.checkWin();
        // gameProgression.changePlayerTurn();
        gameProgression.changeTurn();
    }

    // const _initialize = (() => {
    // })();

    let _grid = Array.from(document.querySelectorAll(".grid-item"));
    _grid.forEach((item) => item.addEventListener('click', applyInput));
    console.log(_grid);

    return {restart, getContent, applyInput, getGrid}
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// control game progression and win conditions ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gameProgression = (() => {

    let player1;
    let player2;

    let _turn = 'x';
    const changeTurn = () => {
        if (_turn == 'x'){
            _turn = 'o';
        } else if (_turn == 'o') {
            _turn = 'x';
        }
    }

    const checkWin = () => {
        // //check rows and prevents an empty row from triggering a win
        // if (((gameBoard.getContent(0)===gameBoard.getContent(1)===gameBoard.getContent(2) && gameBoard.getContent(0)!=='') || 
        //      (gameBoard.getContent(3)===gameBoard.getContent(4)===gameBoard.getContent(5) && gameBoard.getContent(3)!=='') || 
        //      (gameBoard.getContent(6)===gameBoard.getContent(7)===gameBoard.getContent(8) && gameBoard.getContent(6)!==''))) {

        //         _congratulateWinner();
        
        //     //check columns and prevents and empty column from triggering a win
        //     } else if (((gameBoard.getContent(0)===gameBoard.getContent(3)===gameBoard.getContent(6) && gameBoard.getContent(0)!=='') || 
        //                 (gameBoard.getContent(1)===gameBoard.getContent(4)===gameBoard.getContent(7) && gameBoard.getContent(1)!=='') || 
        //                 (gameBoard.getContent(2)===gameBoard.getContent(5)===gameBoard.getContent(8) && gameBoard.getContent(2)!==''))) {

        //                     _congratulateWinner();
                        
        //         //check diagonals
        //         } else if ((gameBoard.getContent(0)===gameBoard.getContent(4)===gameBoard.getContent(8) || 
        //                     gameBoard.getContent(2)===gameBoard.getContent(4)===gameBoard.getContent(6)) && gameBoard.getContent(4)!=='') {

        //                         _congratulateWinner();
                
        //                     //check tie by checking if the board is full
        //                    } else if (!(gameBoard.getGrid().some((item) => item.innerHTML == ''))){
        //                         resultModal.textContent = "The winner is the power of friendship :)"
        //                    }
        //row
        if (gameBoard.getContent(0)==gameBoard.getContent(1) && gameBoard.getContent(0)==gameBoard.getContent(2) && gameBoard.getContent(0)!=''){
            _congratulateWinner();

        } else if (gameBoard.getContent(3)==gameBoard.getContent(4) && gameBoard.getContent(3)==gameBoard.getContent(5) && gameBoard.getContent(3)!=''){
            _congratulateWinner();

        } else if (gameBoard.getContent(6)==gameBoard.getContent(7) && gameBoard.getContent(6)==gameBoard.getContent(8) && gameBoard.getContent(6)!=''){
            _congratulateWinner();

            //col
        } else if (gameBoard.getContent(0)==gameBoard.getContent(3) && gameBoard.getContent(0)==gameBoard.getContent(6) && gameBoard.getContent(0)!='' ){
            _congratulateWinner();

        } else if (gameBoard.getContent(1)===gameBoard.getContent(4) && gameBoard.getContent(1)==gameBoard.getContent(7) && gameBoard.getContent(1)!=''){
            _congratulateWinner();

        } else if (gameBoard.getContent(2)===gameBoard.getContent(5) && gameBoard.getContent(2)==gameBoard.getContent(8) && gameBoard.getContent(2)!=''){
            _congratulateWinner();

            //diag
        } else if (gameBoard.getContent(0)===gameBoard.getContent(4) && gameBoard.getContent(0)==gameBoard.getContent(8) && gameBoard.getContent(4)!=''){
            _congratulateWinner();

        } else if (gameBoard.getContent(2)===gameBoard.getContent(4) && gameBoard.getContent(2)==gameBoard.getContent(6) && gameBoard.getContent(4)!='') {
            _congratulateWinner();

        }



    }
    
    const getTurn = () => _turn;

    const resultModal = document.getElementById("resultModal");
    const overlay = document.getElementById("overlay");
    overlay.addEventListener('click', () => {
        resultModal.style.display = "none";
        overlay.style.display = "none";
        gameBoard.restart();
    });

    const _congratulateWinner = () => {
        overlay.style.display = "block";
        resultModal.style.display = "block";
        resultModal.textContent = "The winner is " + `${_currentPlayer}` + "!";
    }

    let _currentPlayer = player1;
    const changePlayerTurn = () => {
        if (currentPlayer == player1){
            currentPlayer = player2;
        } else if (currentPlayer == player2){
            currentPlayer = player1;
        }
    }

    const getCurrentPlayer = () => _currentPlayer;
    const setCurrentPlayer = () => {
        _currentPlayer = player1;
        _turn = 'x';
    };

    return {changeTurn, checkWin, getTurn, getCurrentPlayer, changePlayerTurn, setCurrentPlayer}
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// AI functions ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

