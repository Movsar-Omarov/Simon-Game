const colorButtons = document.querySelectorAll("section"),
powerButton = document.querySelector("#power-button"),
strictButton = document.querySelector("#strict-button"),
startButton = document.querySelector("button"),
successDisplay = document.querySelector("#wins")

let difficult = 1,
powerButtonClicked = false,
strictButtonClicked = false,
combination = [],
isTurnOfUser = false,
combinationByUser = [],
wins = 0

function AddToClickedColorPrematurelyClass(clickedButton) {
    if (colorButton == clickedButton) {
        clickedButton.classList.add("clicked")
     
        setTimeout(function() {
            clickedButton.classList.remove("clicked")
        }, 500)
    }
}

function SetColorWhite(clickedButton) {
    for (colorButton of colorButtons) {
        AddToClickedColorPrematurelyClass(clickedButton)
   }
}

function ClickRandomColors() {
    const pickRandomButtons = setInterval(() => {
        const randomNumber = Math.floor(Math.random()*colorButtons.length)
        
        colorButtons[randomNumber].click()
        console.log(combination, "comp")
        
        if (combination.length >= difficult) {
            clearInterval(pickRandomButtons)
            console.log("end")
            isTurnOfUser = true
        }
    }, 1000)
    
}

function ValidatePickedColors() {
    const areAllColorsRight = combinationByUser.every((color, indexOfColor) => {
        return color == combination[indexOfColor]
    })
    
    if (!areAllColorsRight) return false
    if (combinationByUser.length == combination.length) return true
}

function CompleteRound() {
    if (ValidatePickedColors()) {
        wins++
        difficult++
        successDisplay.textContent = wins
        console.log("win")
    }
    if (strictButtonClicked) {
        wins = 0
        difficult = 1
        successDisplay.textContent = "-"
        console.log("strict")
    }
    combination = []
    combinationByUser = []
    isTurnOfUser = false
    startButton.disabled = false
    console.log("lose") // if upon this lose state stands win on the console, 
    // ignore this statement lose
}

function StartNewRound() {
    console.log(ValidatePickedColors())
    if (ValidatePickedColors() == undefined || ValidatePickedColors == null) {}
    else CompleteRound()
} 

powerButton.addEventListener("click", function() {
    powerButtonClicked = !powerButtonClicked
    
    if (powerButtonClicked) successDisplay.textContent = "-" 
    else successDisplay.textContent = ""
})

startButton.addEventListener("click", function() {
    if (powerButtonClicked) {
        ClickRandomColors()
        startButton.disabled = true
    }
})

colorButtons.forEach((colorButton) => {
    const color = colorButton.dataset.color
    
    colorButton.addEventListener("click", function() {
        if (isTurnOfUser) {
            combinationByUser.push(color)
            console.log(combinationByUser, "me")
            StartNewRound()
        }
        else combination.push(color)

        SetColorWhite(colorButton)
    })
})

strictButton.addEventListener("click", function() {
   strictButtonClicked = !strictButtonClicked
})

window.addEventListener("load", function() {
    powerButton.checked = false
    strictButton.checked = false
})