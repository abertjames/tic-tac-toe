/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// set up players /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Player = (sign, type, difficulty) => {
    //x is true o is false for sign 
    //huamn player is false AI is true for type

    let _sign = sign;
    let _type = type;
    let _difficulty = difficulty;

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// control gameboard input/display //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gameBoard = (() => {

    const player1 = Player(true, false, 0);
    const player2 = Player(false, false, 0);

    const updatePlayer = (player, sign, type, difficulty) => {
        player.updatePlayer(sign, type, difficulty);
    };

    const getPlayer = (player) => {
        if(player == "player1"){
            return player1
        } else if (player == "player2"){
            return player2
        }
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
        _enableInput();
        AiController.resetAiBoard();
    }

    const _enableInput = () => {
        signOneSelector.removeAttribute("disabled");
        signTwoSelector.removeAttribute("disabled");
        botOrNot1.removeAttribute("disabled");
        botOrNot2.removeAttribute("disabled");
        p1_difficulty.removeAttribute("disabled");
        p2_difficulty.removeAttribute("disabled");
    };

    const _disableInput = () => {
        signOneSelector.setAttribute("disabled", "");
        signTwoSelector.setAttribute("disabled", "");
        botOrNot1.setAttribute("disabled", "");
        botOrNot2.setAttribute("disabled", "");
        p1_difficulty.setAttribute("disabled", "");
        p2_difficulty.setAttribute("disabled", "");
    }

    const applyInput = (e) => {
        const input = document.createElement('img');
        let _currentPlayer = gameProgression.getCurrentPlayer();

        if (e.path[0].innerHTML != ''){
            return


        } else if (getPlayer(_currentPlayer).getPlayerType() == true){
            return


        } else if (_currentPlayer == "player1"){
            if (player1.getPlayerSign() == true){
                input.src = "icons/close.svg";
                AiController.updateAiBoard(e.target.id,true);
            } else if(player1.getPlayerSign() == false) {
                input.src = "icons/circle-outline.svg";
                AiController.updateAiBoard(e.target.id,false);
            }
        } else if (_currentPlayer == "player2"){
            if (player2.getPlayerSign() == true){
                input.src = "icons/close.svg";
                AiController.updateAiBoard(e.target.id,true);
            } else if(player2.getPlayerSign() == false) {
                input.src = "icons/circle-outline.svg";
                AiController.updateAiBoard(e.target.id,false);
            }
        }
        e.path[0].appendChild(input);
        // console.log(e)
        // console.log(e.target.id)
        gameProgression.checkWin();
        
    }

    const gameBoard = document.getElementById("gameBoard");
    gameBoard.addEventListener("click", () => {
        _disableInput();
        if(player1.getPlayerType() == true && !(_grid.some((item) => item.innerHTML!='')) ){
            setTimeout(AiController.checkDifficulty, 2500);
        }
    });

    let _grid = Array.from(document.querySelectorAll(".grid-item"));
    _grid.forEach((item) => item.addEventListener('click', applyInput));
    const getContent = (index) => _grid[index].innerHTML;
    const getGrid = () => _grid;
    // console.log(_grid);

    return {restart, getContent, applyInput, getGrid, updatePlayer, getPlayer}
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// control game progression and win conditions ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const gameProgression = (() => {

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
        } else {
            gameProgression.changePlayerTurn();
        }
    }
    
    const resultModal = document.getElementById("resultModal");
    const overlay = document.getElementById("overlay");
    overlay.addEventListener('click', () => {
        resultModal.style.display = "none";
        overlay.style.display = "none";
        gameBoard.restart();
        AiController.resetAiBoard();
    });

    const _congratulateWinner = () => {
        overlay.style.display = "block";
        resultModal.style.display = "block";
        resultModal.textContent = "The winner is " + `${_currentPlayer}` + "!";
    }

    let _currentPlayer = "player1";
    const changePlayerTurn = () => {
        if (_currentPlayer == "player1"){
            _currentPlayer = "player2";
            if (gameBoard.getPlayer("player2").getPlayerType() == true){
            setTimeout(AiController.checkDifficulty, 2500);
            }
        } else if (_currentPlayer == "player2"){
            _currentPlayer = "player1";
            if (gameBoard.getPlayer("player1").getPlayerType() == true){
            setTimeout(AiController.checkDifficulty, 2500); 
            }
        }
    }

    const getCurrentPlayer = () => _currentPlayer;
    const setCurrentPlayer = () => _currentPlayer = "player1";;

    return {checkWin, getCurrentPlayer, changePlayerTurn, setCurrentPlayer}
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// AI functions ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const AiController = (() => {

    // const _openSquares = () => gameBoard.getGrid().filter((item) => item.innerHTML== '');
    const _openSquares = () => Ai_board.filter((item) => (item != 'x' && item != 'o'));
    const _randomIndex = () => Math.floor(Math.random()*(_openSquares().length-1));
    const _randomNumber = () => Math.floor(Math.random()*100);
    
    const checkDifficulty = () => {
        const _randNum = _randomNumber();
        if (_randNum >= gameBoard.getPlayer(gameProgression.getCurrentPlayer()).getDifficulty()){
            _randomMove();
        } else if (_randNum <= gameBoard.getPlayer(gameProgression.getCurrentPlayer()).getDifficulty()){
            //call AI 
        }
    };

    const _randomMove = () => {
        let _openSqs = _openSquares();
        let _randInd = _randomIndex();
        let _sign;
        const _input = document.createElement("img");

        if(gameBoard.getPlayer(gameProgression.getCurrentPlayer()).getPlayerSign() == true){
            _input.src = "icons/close.svg";
            _sign = true;
        } else if (gameBoard.getPlayer(gameProgression.getCurrentPlayer()).getPlayerSign() == false){
            _input.src = "icons/circle-outline.svg";
            _sign = false;
        }

        gameBoard.getGrid()[_openSqs[_randInd]].appendChild(_input);
        updateAiBoard(_openSqs[_randInd],_sign);
        gameProgression.checkWin();
    };

    let Ai_board = [0,1,2,3,4,5,6,7,8];
    const updateAiBoard = (index,sign) => {
        if (sign == true){
            Ai_board[index] = 'x';
        } else if (sign == false){
            Ai_board[index] = 'o'
        }
        console.log(Ai_board);
    };
    const resetAiBoard = () => {
        Ai_board =  [0,1,2,3,4,5,6,7,8];
    };

    return {checkDifficulty, updateAiBoard, resetAiBoard}
})();