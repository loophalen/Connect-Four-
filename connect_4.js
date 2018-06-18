class Connect4 {
    constructor(selector) {
        this.ROWS = 6; 
        this.COLS = 7;
        this.player = 'red'; 
        this.selector = selector; 
        this.isGameOver = false; 
        this.createGrid();
        this.setupEventListeners(); 
    } 

        // const $grid = $(selector); 
        // $grid.html('hello');
        // this.createGrid() 

        ///create grid method
        createGrid(){
            const $board = $(this.selector); 
            // console.log($board); 
            // create for loop for rows and cols
            for (let row = 0; row < this.ROWS; row++) {
                const $row = $('<div>').addClass('row').attr('data-row', row); 
                $board.append($row);
            for (let col = 0; col < this.COLS; col++) {
                const $col = $('<div>').addClass('col empty')
                //add data col-data row
                    .attr('data-col', col)
                    .attr('data-row', row);   
                $row.append($col); 
            }
        }
            
    }
    //create event listners for grid
    setupEventListeners(){
        const $board = $(this.selector); 
        const that = this; 

        function findLastEmptyCell(col) {
            const cells = $(`.col[data-col='${col}']`); 
            for(let i = cells.length -1; i >= 0; i-- ){
                const $cell = $(cells[i]); 
                if ($cell.hasClass('empty')){
                    return $cell; 
                }
            } 
            return null; 
            // console.log(cells);  

        }
        //mouse enter on hover on col
        $board.on('mouseenter', '.col.empty', function(){
            if (that.isGameOver) return;
            // console.log('here', this); 
            const col = $(this).data('col'); 
            const $lastEmptyCell = findLastEmptyCell(col); 
            $lastEmptyCell.addClass(`next-${that.player}`); 
            // console.log(col); 

        })

        //remove classes on mouse leave function 
        $board.on('mouseleave', '.col', function(){
            $('.col').removeClass(`next-${that.player}`); 
        })

        $board.on('click', '.col.empty', function(){
            if (that.isGameOver) return; 
            const col = $(this).data('col'); 
            const row = $(this).data('row'); 
            const $lastEmptyCell = findLastEmptyCell(col); 
            $lastEmptyCell.removeClass(`empty next-${that.player}`); 
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.data('player', that.player); 

            const winner = that.checkForWinner(row, col) 
            if (winner){
                that.isGameOver = true; 
                alert(`Game Over! Player ${that.player} has won!`)
                return; 
            }
            
            //alternates between red and black pieces
            that.player = (that.player === 'red') ? 'black' : 'red'; 
            $(this).trigger('mouseenter'); 
            
        })
    }

    //create win conditions horizontal, vertical, diagnals 
    checkForWinner(row, col) {
        const that = this; 

        function $getCell(i, j){
            return $(`.col[data-row='${i}'][data-col='${j}']`); 
        }        
        
        //check direction method 
        function checkDirection(direction){
            let total = 0; 
            let i = row + direction.i; 
            let j = col + direction.j;
            let $next = $getCell(i, j);
            while (i >= 0 &&
                i < that.ROWS &&
                j >= 0 &&
                j < that.COLS &&
                $next.data('player') === that.player){
                total++; 
                i += direction.i; 
                j += direction.j; 
                $next = $getCell(i, j); 
            }
            return total;   

        }

        function checkWin(directionA, directionB){
            const total = 1 + 
                checkDirection(directionA) +
                checkDirection(directionB); 
            if (total >= 4) {
                return that.player; 
            } else {
                return null; 
            }
        }

        //check diagonal from bottom left to top right
        function checkDiagonalA (){
            return checkWin({i: 1, j: -1}, {i: 1, j: 1}); 
        }

        //check diagonal from top left to bottom right
        function checkDiagonalB (){
            return checkWin({i: 1, j: 1}, {i: -1, j: -1}); 
        }

        //check vertical direction 
        function checkVerticals(){
            return checkWin({i: -1, j: 0}, {i: 1, j: 0}); 
        }

        // check horizontal direction 
        function checkHorizontals(){
            return checkWin({i: 0, j: -1}, {i: 0, j: 1}); 
        }
        
        return checkVerticals() || checkHorizontals() || checkDiagonalA() || checkDiagonalB()
    }

     
} 