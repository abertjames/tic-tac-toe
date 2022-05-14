/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// set up players /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Player = (sign, type, difficulty) => {
    //x is true o is false for sign 
    //huamn player is true AI is false for type

    let _sign = sign;
    //make an if statment for if sign is x or o and make _sign an appropriate image source link
    let _type = type;
    let _difficulty = difficulty;

    //have each button input update either player1 or player2 and then there doesnt need to be an input for these for player
    const updatePlayer = (sign, type, difficulty) => {
        _sign = sign;
        _type = type;
        _difficulty = difficulty;
    }
    const getPlayerType = () => _type;
    const getDifficulty = () => _difficulty;
    const getPlayerSign = () => _sign;

    return {getPlayerSign, getDifficulty, updatePlayer, getPlayerType}
};

const AiPlayer = (() => {

})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// control gameboard input/display //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gameBoard = (() => {

    const player1 = Player(true, false, null);
    const player2 = Player(false, false, null);

    const updatePlayer = (player, sign, type, difficulty) => {
        player.updatePlayer(sign, type, difficulty);
    };

    const signOneSelector = document.getElementById("p1_sign");
    signOneSelector.addEventListener("change", (e) => {
        updatePlayer(player1, !player1.getPlayerSign(), player1.getPlayerType(), player1.getDifficulty());
        updatePlayer(player2, !player2.getPlayerSign(), player2.getPlayerType(), player2.getDifficulty());
        if (e.target.value == 'o'){
            signTwoSelector.value = 'x';
        } else if (e.target.value == 'x'){
            signTwoSelector.value = 'o';
        }
    });

    const signTwoSelector = document.getElementById("p2_sign");
    signTwoSelector.addEventListener("change", (e) => {
        updatePlayer(player2, !player2.getPlayerSign(), player2.getPlayerType(), player2.getDifficulty());
        updatePlayer(player1, !player1.getPlayerSign(), player1.getPlayerType(), player2.getDifficulty());
        if (e.target.value == 'x'){
            signOneSelector.value = 'o';
        } else if (e.target.value == 'o'){
            signOneSelector.value = 'x';
        }
    });

    const botOrNot1 = document.getElementById("botOrNot1");
    botOrNot1.addEventListener("change", () => {
        updatePlayer(player1, player1.getPlayerSign(), !player1.getPlayerType(), player1.getDifficulty());
    });

    const botOrNot2 = document.getElementById("botOrNot2");
    botOrNot2.addEventListener("change", () => {
        updatePlayer(player2, player2.getPlayerSign(), !player2.getPlayerType(), player2.getDifficulty());
    });

    const p1_difficulty = document.getElementById("p1_difficulty");
    p1_difficulty.addEventListener("change", (e) => {
        updatePlayer(player1, player1.getPlayerSign(), player1.getPlayerType(), e.target.value);
    });

    const p2_difficulty = document.getElementById("p2_difficulty");
    p2_difficulty.addEventListener("change", (e) => {
        updatePlayer(player2, player2.getPlayerSign(), player2.getPlayerType(), e.target.value);
    });


    const restartButton = document.getElementById("restart");
    restartButton.onclick = () => restart();
    const restart = () => {
        _grid.forEach((item) => item.innerHTML = '');
        gameProgression.setCurrentPlayer();
    }

    const _getIndex = () => {

    }

    const applyInput = (e) => {

        const input = document.createElement('img');
        let _turn = gameProgression.getTurn();
        let _currentPlayer = gameProgression.getCurrentPlayer();
        // console.log(_currentPlayer);
        // console.log(e.path[0].innerHTML)

        // if (e.path[0].innerHTML != ''){
        //     return
        // } else if (_turn == 'x'){
        //     input.src = "icons/close.svg";
        // } else if (_turn == 'o'){
        //     input.src = "icons/circle-outline.svg";
        // }

        if (e.path[0].innerHTML != ''){
            return
        } else if (_currentPlayer == "player1"){
            input.src = player1.getPlayerSign();
        } else if (_currentPlayer == "player2"){
            input.src = player2.getPlayerSign();
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
    const getContent = (index) => _grid[index].innerHTML;
    const getGrid = () => _grid;
    // console.log(_grid);

    // need to add a get player function because the ai will need to grab the dificulty level 
    return {restart, getContent, applyInput, getGrid, updatePlayer}
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
    const getTurn = () => _turn;

    const checkWin = () => {
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
            
        //tie
        } else if (!gameBoard.getGrid().some((item) => item.innerHTML == '')){
            overlay.style.display = "block";
            resultModal.style.display = "block";
            resultModal.textContent = "The winner is the power of friendship :)"
        }
    }
    
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

    // need to check if the player is a bot here 
    let _currentPlayer = "player1";
    const changePlayerTurn = () => {
        if (_currentPlayer == "player1"){
            _currentPlayer = "player2";
        } else if (_currentPlayer == "player2"){
            _currentPlayer = "player1";
        }
    }

    const getCurrentPlayer = () => _currentPlayer;
    const setCurrentPlayer = () => {
        _currentPlayer = "player1";
        _turn = 'x';
    };


    return {changeTurn, checkWin, getTurn, getCurrentPlayer, changePlayerTurn, setCurrentPlayer}
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// AI functions ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

