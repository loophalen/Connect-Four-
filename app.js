console.log('tofu')

///create gameboard grid
$(()=>{
    
    const connect4 = new Connect4 ('#gameboard')

    $('#restart').click(function(){
        connect4.restart(); 
    })
   

}) 