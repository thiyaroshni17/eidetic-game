document.addEventListener("DOMContentLoaded", () => {
    const easy = 4
    const medium = 5
    const hard = 9

    var level
    var levelpic

    const inputbtn = document.querySelector(".input-content button")
    const inputcontent = document.querySelectorAll(".input-content input")

    inputcontent.forEach((input) => {
        if (input.value = '') {
            inputbtn.disabled = true
        }
    })

    const totalcards = document.querySelector(".total-cards")
    var mainlist = []

    const randomlist = (level) => {
        mainlist = []

        for (let i = 1; i <= level * 2; i++) {
            let newnum;
            do {
                newnum = Math.floor(Math.random() * (level * 2)) + 1;
            } while(mainlist.includes(newnum))
            mainlist.push(newnum)    
        }

        mainlist = mainlist.map(num => num > level ? num - level : num);
        
    }

    const checklevel = document.querySelector(".checklevel").textContent
    var scr, orgscr;
    var cardstotal;

    if (checklevel === "easy") {
        level = easy
        levelpic = "easy"
        orgscr = 8
        scr = 8
        cardstotal = 8
        totalcards.style.gridTemplateColumns = `repeat(4, 110px)`
        randomlist(level)
    }
    else if (checklevel === "medium") {
        level = medium
        levelpic = "medium"
        orgscr = 10
        scr = 10
        cardstotal = 10
        totalcards.style.gridTemplateColumns = `repeat(5, 110px)`
        randomlist(level)
    }
    else if (checklevel === "hard") {
        level = hard
        levelpic = "hard"
        orgscr = 10
        scr = 10
        cardstotal = 18
        totalcards.style.gridTemplateColumns = `repeat(6, 110px)`
        totalcards.style.gap = "10px 40px"
        randomlist(level)
    }
    
    for (let i = 0; i <= (level * 2) - 1; i++) {
        var imager = `../static/images/${levelpic}levelpic/img${mainlist[i]}.png`
        totalcards.innerHTML += `<div class="thecards glowb">
        <div class="thefront"></div>
        <div class="theback">
            <img src="${imager}" alt="Card Image">
        </div>
        </div>`
    }

    let firstCard, secondCard = null;
    let lockBoard = false;

    const flipCard = (card) => {
        if (lockBoard) return;
        if (card === firstCard) return;

        card.classList.add("flipped");

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        lockBoard = true;

        checkForMatch();
    };

    const checkForMatch = () => {
        const firstCardImg = firstCard.querySelector(".theback img").src
        const secondCardImg = secondCard.querySelector(".theback img").src
        const isMatch = firstCardImg === secondCardImg

        if (isMatch) {
            disabledCards()
        }
        else {
            unflipcards()
        }
    };
    
    let total = 0;
    let lastscreen = document.querySelector(".last-screen")
    const lsbtn = document.querySelector(".ls-btn")

    const disabledCards = () => {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        total = total + 2

        let nextlevel;
        if (total === cardstotal) {
            lastscreen.style.display = " flex"
            document.querySelector(".last-screen img").src = "images/victory.gif"
            document.querySelector(".last-screen h4").textContent = "You won the game!"
            if (checklevel ==="easy") {
                nextlevel = "mediumlevel.html"
            }
            else if (checklevel ==="medium") {
                nextlevel = "hardlevel.html"
            }
            else {
                nextlevel = "levels.html"
            }
            lsbtn.addEventListener("click", () => {
                window.location.href = `${nextlevel}`
            })

        }
        resetBoard();
    };

    const score = document.querySelector(".content h3 p")

    const unflipcards = () => {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            scr--
            score.innerHTML = `${scr} / ${orgscr}`
            if (scr === 0){
                lastscreen.style.display = " flex"
                document.querySelector(".last-screen div img").src = "images/lost.gif"
                document.querySelector(".last-screen div h4").textContent = "You lost the game!"
                lsbtn.innerHTML = "Play Again"
                lsbtn.addEventListener("click", () => {
                    location.reload()
                })
            }
            resetBoard();

        }, 1500);
    };

    const resetBoard = () => {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    };

    document.querySelectorAll(".thecards").forEach(card => {
        card.addEventListener("click", () => flipCard(card));
    });
});