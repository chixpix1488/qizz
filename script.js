let question_field = document.querySelector(".question")
let answer_buttons = document.querySelectorAll(".answer")
let start_button = document.querySelector('.start-btn')
let countainer_main = document.querySelector('.main')
let countainer_start = document.querySelector('.start')
let countainer_start_h3 = countainer_start.querySelector('h3')

function randint(min, max){
    return Math.round(Math.random() * (max-min) + min)

}

let signs = ["+", "-", "/", "*"]

function returnRandSign(){
    return signs [randint(0,3)]
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { 
    randomIndex = Math.floor(Math.random() * currentIndex); 
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

class Question{
   constructor(){
       let a = randint(1, 30)
       let b = randint(1, 30)
       let sign = returnRandSign()
       this.question = `${a} ${sign} ${b}`


       if(sign == "+"){this.correct = a + b}
       else if(sign =="-"){this.correct = a - b}
       else if(sign =="*"){this.correct = a * b}
       else if(sign =="/"){this.correct = a / b}


       this.answers = [
           randint(this.correct - 15, this.correct - 1),
           randint(this.correct - 15, this.correct - 1),
           this.correct,
           randint(this.correct + 15, this.correct + 1),
           randint(this.correct + 15, this.correct + 1)
       ]
       shuffle(this.answers)
   }
   display(){
       question_field.innerHTML = this.question
       for(let i = 0; i < this.answers.length; i++){
           answer_buttons[i].innerHTML = this.answers[i]
       }
   }
}

let click = new Question
click.display()

let current_question
let total_answers = 0
let cor_answers = 0

start_button.addEventListener("click", function(){
    countainer_start.style.display = "none"
    countainer_main.style.display = "flex"
    current_question = new Question
    current_question.display()

    total_answers = 0
    cor_answers = 0

    setTimeout(function(){
        countainer_start.style.display = "flex"
        countainer_main.style.display = "none"
        countainer_start_h3.innerHTML = `Вы дали ${total_answers} ответов. Из них ${cor_answers} правильных и ${total_answers - cor_answers} неправильных`
    }, 10000)

})

for(let i = 0; i < answer_buttons.length; i++){
    answer_buttons[i].addEventListener("click", function(){
        if (answer_buttons[i].innerHTML == current_question.correct){
            answer_buttons[i].style.background = "#00FF00"
            anime({
                targets: answer_buttons[i],
                background: "#FFFFFF",
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
            cor_answers++    

        } else {
            answer_buttons[i].style.background = "#FF0000"
            anime({
                targets: answer_buttons[i],
                background: "#FFFFFF",
                duration: 500,
                delay: 100,
                easing: 'linear'

            })    
        }



        total_answers
        current_question = new Question
        current_question.display()

    })
}
