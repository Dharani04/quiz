document.onload = quiz();
var index;
var score = 0;
var jque;
var op;
var question;
var butid;

function quiz()
{
    
    index = 0;
    var request = new XMLHttpRequest();
    request.open("GET", "json.json", false);
    request.send(null)
    quiz = JSON.parse(request.responseText);
    console.log(quiz);  
        
}   

function next() {

    if (index < 6) {
        if (index > 0)
            check();
        butid = document.getElementById("butt");
        console.log(butid);
        if(index < 4)
        butid.innerHTML = "Next";
        if (index == 4)
            butid.innerText = "Submit";           
        if (document.getElementById("qchange"))
            qchange.parentNode.removeChild(qchange);
        question = document.createElement("h3");
        question.setAttribute("id", "qchange");
        question.innerHTML = quiz.quiz[index].Question;
        jque = document.getElementById("que");
        jque.appendChild(question);
        op = document.getElementById("option");
        if (op)
        {
            op.parentNode.removeChild(op);
        }
        op = document.createElement("div");
        op.setAttribute("id", "option");
        for (var i = 0; i < 4; i++)
        {
            var radio = document.createElement("input");
            radio.type = "radio";
            radio.value = quiz.quiz[index].option[i];
            radio.name = "correct_ans";
            op.appendChild(radio);
            var label = document.createElement("label");
            label.innerHTML = quiz.quiz[index].option[i];
            op.appendChild(label);
            var br = document.createElement("br");
            op.appendChild(br);
            jque.appendChild(op);
        }
        index++;
    }        

}
function check()
{
    var marked = document.getElementsByName("correct_ans");
    for (var i = 0; i < 4; i++)
    {
        if (marked[i].checked)
        {
            if (marked[i].value == quiz.quiz[index-1].answer)
                score++;
            console.log(score);      
            
        }
    }

    if (index == 5)
    {           
        jque.removeChild(op);
        jque.removeChild(question);       
        butid.parentNode.removeChild(butid);
        var congrats = document.getElementById("congrats")
        congrats.innerHTML = "Congratulations..!! ";
        congrats.setAttribute("class", "score");
        var result = document.getElementById("score");
        result.innerHTML = "You scored "+ score;
        result.setAttribute("class", "score");
    }
    
}