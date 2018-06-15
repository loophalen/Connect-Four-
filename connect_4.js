class Connect4 {
    constructor(selector) {
        this.ROWS = 6; 
        this.COLS = 7;
        this.selector = selector; 
        this.createGrid();
    } 

        // const $grid = $(selector); 
        // $grid.html('hello');
        // this.createGrid() 

        ///create grid method
        createGrid(){
            const $board = $(this.selector); 
            // console.log($board); 
            // for loop for rows and cols
            for (let row = 0; row < this.ROWS; row++) {
                const $row = $('<div>').addClass('row');
                $board.append($row);
            for (let col = 0; col < this.COLS; col++) {
                const $col = $('<div>').addClass('col empty'); 
                $row.append($col); 
            }
            }
            // console.log($board.html()); 
        }
} 