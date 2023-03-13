const playerX = "Cross";
const playerO = "Circle";
const combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const cellElements = document.querySelectorAll(".cell");
const textplay = document.getElementById("textPlay")
const scoreCross = document.getElementById("scoreCross")
const scoreCircle = document.getElementById("scoreCircle")
const btnrestart = document.getElementById("restart-btn")
let player_0_Turn = false
//console.log("esto es cells",cellElements[0]);

let go = "Circle"
textplay.textContent= `${go} goes first`
let scorecross = 0;
let scorecircle = 0;


const Cells = () => {
    for (let i = 0; i < cellElements.length; i++) {
        cellElements[i].addEventListener('click', fillCells)
    }
}

const fillCells = (e) => {
    const display = document.createElement('div')
    display.classList.add(go)
    e.target.append(display)
    go = go === "Circle" ? "Cross": "Circle";
    textplay.textContent = `It´s now ${go}´s turn`;
    e.target.removeEventListener('click', fillCells);
    checkScore()
}

const checkScore = () => {
    combinations.forEach(element => {
        const circleWins = element.every(cell => cellElements[cell].firstChild?.classList.contains("Circle"))
        const crossWins = element.every(cell => cellElements[cell].firstChild?.classList.contains("Cross"))
        const draw = element.every(cell => cellElements[cell].firstChild.classList)? "draw":null 
        console.log(draw)
        
        if (circleWins){
            textplay.textContent = "Circle Wins!"
            cellElements.forEach(element => element.removeEventListener('click', fillCells ));
            //cellElements.forEach(element => {element.replaceWith(element.cloneNode(true))});
            scorecircle = scorecircle + 1
            return
        }
        
        if (crossWins){
            textplay.textContent = "Cross Wins!"
            cellElements.forEach(element => element.removeEventListener('click', fillCells ));
            //cellElements.forEach(element => {element.replaceWith(element.cloneNode(true))});
            scorecross = scorecross + 1
            return
        }
        
    })
}

const scorediv = () =>{
    scoreCircle.textContent = `Circle: ${scorecircle}`
    scoreCross.textContent =  `Cross: ${scorecross}`
}

const handleRestartClick = (e) =>{
    const crosses = document.querySelectorAll('.Cross');
    crosses.forEach(cross => cross.parentNode.removeChild(cross));
    
    const circles = document.querySelectorAll('.Circle');
    circles.forEach(circle => circle.parentNode.removeChild(circle));

    scorediv()

    textplay.textContent = `${go} goes first`;
    
    Cells()        
}

btnrestart.addEventListener("click", handleRestartClick)
Cells()
