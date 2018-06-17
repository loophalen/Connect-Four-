class Connect4 {
    constructor(selector) {
        this.ROWS = 6; 
        this.COLS = 7;
        this.selector = selector; 
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

        function findLastEmptyCell(col) {
            const cells = $(`.col[data-col='${col}']`); 
            for(let i = cells.length -1; i >= 0; i-- ){
                const $cell = $(cells[i]); 
                if ($cell.hasClass('empty')){
                    return $cell; 
                }
            } 
            return nulll; 
            // console.log(cells);  

        }
        //mouse enter on hover on col
        $board.on('mouseenter', '.col.empty', function(){
            // console.log('here', this); 
            const col = $(this).data('col'); 
            const $lastEmptyCell = findLastEmptyCell(col); 
            $lastEmptyCell.addClass(`next-red`); 
            // console.log(col); 

        })

        //remove classes on mouse leave function 
        $board.on('mouseleave', '.col', function(){
            $('.col').removeClass(`next-red`); 
        })


    }
} 