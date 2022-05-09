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
    console.log(_columns);

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

        if (_turn == 'x'){
            input.src = "icons/close.svg";
        } else if (_turn == 'o'){
            input.src = "icons/circle-outline.svg";
        }
        e.path[0].appendChild(input);

        // _grid[index].appendChild(input);
        // gameProgression.checkWin;
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
    const checkWin = () => {
        //check rows
        if (_grid[0].innerHTML==_grid[1].innerHTML==_grid[2].innerHTML ||
            _grid[3].innerHTML==_grid[4].innerHTML==_grid[5].innerHTML ||
            _grid[6].innerHTML==_grid[7].innerHTML==_grid[8].innerHTML) {
                //compare sign to computer/player1/player2 and open winning module
        
            //check columns
            } else if (_grid[0].innerHTML==_grid[3].innerHTML==_grid[6].innerHTML ||
                       _grid[1].innerHTML==_grid[4].innerHTML==_grid[7].innerHTML ||
                       _grid[2].innerHTML==_grid[5].innerHTML==_grid[8].innerHTML) {
                            //compare sign to computer/player1/player2 and open winning module
                //check diagonals
                } else if (_grid[0].innerHTML==_grid[4].innerHTML==_grid[8].innerHTML || 
                           _grid[2].innerHTML==_grid[4].innerHTML==_grid[6].innerHTML) {
                                //compare sign to computer/player1/player2 and open winning module
                           }
    }
    
    const getTurn = () => _turn;

    const changePlayerTurn = () => {
        
    }

    return {changeTurn, checkWin, getTurn}
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// AI functions ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

