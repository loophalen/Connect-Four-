console.log('tofu')

///create gameboard grid
$(()=>{
    
    const connect4 = new Connect4 ('#gameboard')
    
    //calls red or blacks turn
    connect4.onPlayerMove = function(){
        $('#player').text(connect4.player); 
    }

    //restart 
    $('#restart').click(function(){
        connect4.restart(); 
    })
   

}) 