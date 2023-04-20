const Grids = document.querySelectorAll(".grids")
const winCombos = [[1,4,7],[2,5,8],[3,6,9],[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7]]
const player1Text = document.querySelector('.player1')
const player2Text = document.querySelector('.player2')
const scoreCard = document.querySelector('.scoreCard')
const scoreCardResultText = document.querySelector('.result')
const restart = document.querySelector('.restart')

restart.addEventListener('click', ()=>{
    location.reload()
})
const player1 = {
    name:'player1',
    array:[]
}
const player2 = {
    name:'player2',
    array:[]
}
let result 
let clickCount = 0

let bool = false

const check_for__win_algo = (player,playerName)=>{
    player.sort()
    let tempWinPlayerCombo = []
    let won = false
    winCombos.forEach(winCombo=>{
        winCombo.forEach(winId=>{
            player.forEach(playerId=>{
                    if(playerId == winId){
                        tempWinPlayerCombo.push(playerId)
                    }
            })
        })
        if(tempWinPlayerCombo.length === 3) {
            won = true
            return
        }
        tempWinPlayerCombo = []
    })

    if(won === true){
        return {playerName,status:true}
    }
    
    return false
}

//fill the grids
Grids.forEach(gridElement=>{
        gridElement.addEventListener('click',(event)=>{
            clickCount++
            if(clickCount%2 === 0){
                //player2
                player2.array.push(gridElement.id)
                gridElement.innerHTML = '⭕'      
                bool = true   
                markActivePlayer(player1Text,player2Text)   
           }
            else{
                //player1
                player1.array.push(gridElement.id)
                gridElement.innerHTML = '✖'
                bool= false
                markActivePlayer(player2Text,player1Text)   
            }        

            //check for win
            
            if(clickCount>=5){
                let playerParameter = (bool)?player2 : player1
                let result = check_for__win_algo( playerParameter.array , playerParameter.name )
                if(result.status === true){
                    showScoreCard(`${result.playerName} won`)
                }
            }
            if(!result.status && clickCount>=9){
                showScoreCard('draw')
            }
        },{once:true})
    })

function markActivePlayer(activePlayer,inActivePlayer){
    activePlayer.style.background = 'rgb(118, 255, 68)'
    inActivePlayer.style.background = "none"
}

function showScoreCard(text){
    scoreCard.style.display = 'grid'
    scoreCardResultText.innerHTML = text
}