/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// set up players /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Player = ((sign) => {
    const _sign = sign;
    const _turn = true;

    const getPlayerSign = () => _sign;
    const getPlayerTurn = () => _turn;
    return {getPlayerSign, getPlayerTurn}
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// control gameboard input/display //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gameBoard = (() => {
    let _grid = Array.from(document.querySelectorAll(".grid-item"));

    console.log(_grid);

    const _getIndex = () => {

    }

    const getContent = (index) => {
        const content = _grid[index].innerHTML;
    }

    const resetGrid = () => {
        _grid.forEach((item) => item.innerHTML = '');
    }

    const applyInput = (e) => {

        const input = document.createElement('img');
        let _turn = gameProgression.getTurn();
        console.log(e.path[0].innerHTML)

        if (e.path[0].innerHTML != ''){
            return
        } else if (_turn == 'x'){
            input.src = "icons/close.svg";
        } else if (_turn == 'o'){
            input.src = "icons/circle-outline.svg";
        }
        e.path[0].appendChild(input);

        // _grid[index].appendChild(input);
        // gameProgression.checkWin(e);
        gameProgression.changeTurn();
    }

    const _initialize = (() => {
        _grid.forEach((item) => item.addEventListener('click', applyInput));
    })();

    return {resetGrid, getContent, applyInput}
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// control game progression and win conditions ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gameProgression = (() => {

    let _turn = 'x';
    const changeTurn = () => {
        if (_turn == 'x'){
            _turn = 'o';
        } else if (_turn == 'o') {
            _turn = 'x';
        }
    }
    const checkWin = (e) => {
        //check rows
        if ((gameBoard.getContent(0)==gameBoard.getContent(1)==gameBoard.getContent(2) || 
             gameBoard.getContent(3)==gameBoard.getContent(4)==gameBoard.getContent(5) || 
             gameBoard.getContent(6)==gameBoard.getContent(7)==gameBoard.getContent(8))) {

                _congratulateWinner(e);
                //compare sign to computer/player1/player2 and open winning module
        
            //check columns
            } else if ((gameBoard.getContent(0)==gameBoard.getContent(3)==gameBoard.getContent(6) || 
                        gameBoard.getContent(1)==gameBoard.getContent(4)==gameBoard.getContent(7) || 
                        gameBoard.getContent(2)==gameBoard.getContent(5)==gameBoard.getContent(8))) {

                            _congratulateWinner(e);
                        
                            //compare sign to computer/player1/player2 and open winning module

                //check diagonals
                } else if ((gameBoard.getContent(0)==gameBoard.getContent(4)==gameBoard.getContent(8) || 
                            gameBoard.getContent(2)==gameBoard.getContent(4)==gameBoard.getContent(6))) {

                                _congratulateWinner(e);
                
                                //compare sign to computer/player1/player2 and open winning module
                           }
    }
    
    const getTurn = () => _turn;

    const _congratulateWinner = (e) => {
        if (e.path[0].innerHTML == Player.getPlayerSign){

        }
    }

    const changePlayerTurn = () => {
        
    }

    return {changeTurn, checkWin, getTurn}
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// AI functions ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

