let qCount = localStorage.getItem('qNum');
let aCount = 0;

function displaySubQ (question, num) {
    let questionList = document.querySelector(".questionList");
    let newQ = document.createElement("div");
    newQ.className = "question my-6";

    //문제 번호 출력
    let numOfQ = document.querySelector(".mt-4").cloneNode(true);
    numOfQ.querySelector(".qtext").innerHTML = "Question " + num;
    newQ.appendChild(numOfQ);
    
    //문제 지문 출력
    let content = document.querySelector(".mt-3").cloneNode(true);
    content.querySelector(".contentBox").innerHTML = question.content;
    newQ.appendChild(content);

    //정답 출력
    /*
    let answer = document.querySelector(".answer").cloneNode(true);
    answer.querySelector(".answerBox").innerHTML = question.answer;
    newQ.appendChild(answer);
    */

    //채점 결과 출력
    let uAnswer = localStorage.getItem('u'+num);
    let userAns = document.querySelector(".answerIncorrect").cloneNode(true);
    if (question.answer === uAnswer) {
        userAns = document.querySelector(".answerCorrect").cloneNode(true);
        userAns.querySelector(".answerBox").innerHTML = uAnswer;
        aCount++;
    }
    else{
        userAns.querySelector(".answerBox").innerHTML = uAnswer;
    }
    newQ.appendChild(userAns);

    //해설 출력
    let comment = document.querySelector(".comment").cloneNode(true);
    comment.querySelector(".contentBox").innerHTML = question.comment;
    newQ.appendChild(comment);


    //문제를 문제 리스트에 추가
    questionList.appendChild(newQ);
}

function displayObjQ (question, num) {
    let questionList = document.querySelector(".questionList");
    let newQ = document.createElement("div");
    newQ.className = "question my-6";

    //문제 번호 출력
    let numOfQ = document.querySelector(".mt-4").cloneNode(true);
    numOfQ.querySelector(".qtext").innerHTML = "Question " + num;
    newQ.appendChild(numOfQ);

    //문제 지문 출력
    let content = document.querySelector(".mt-3").cloneNode(true);
    content.querySelector(".contentBox").innerHTML = question.content;
    newQ.appendChild(content);


    //문제 보기 입력
    let choiceList = document.querySelector(".choiceList").cloneNode(true);
    choiceList.innerHTML += `<label for="exampleFormControlInput1" class="form-label">Answer</label>`
    let answer = question.answer
    let uAnswer = localStorage.getItem('u'+num)
    let right = 0
    let choiceCount = question.choice.length;
    if (JSON.stringify(answer) === uAnswer){
        aCount+=1;
        right = 1;
    }
    if (right === 1)
    {
        for (let i = 0; i < choiceCount; i++){
            if (answer.includes(i+1)){
                choiceList.innerHTML += `<div class="answerCorrect">
                <div class="mb-3">
                <div class="answerBox Correct form-control is-valid">` +question.choice[i]+ `</div>
                <div class="valid-feedback">Right Answer!!</div>
                </div>
            </div>`
            }
            else{
                choiceList.innerHTML += `<div class="answer">
                <div class="mb-3">
                    <div class="answerBox">`
                    +question.choice[i]+`
                    </div>
                </div>
            </div>`
            }
        }
        newQ.appendChild(choiceList);    
    }
    else 
    {
        for (let i = 0; i < choiceCount; i++){
            if (uAnswer.includes(i+1)){
                choiceList.innerHTML +=  `<div class="answerIncorrect">
                <div class="mb-3">
                <div class="answerBox Correct form-control is-invalid">`+question.choice[i]+`</div>                    
                <div class="invalid-feedback">Wrong Answer!!</div>
                </div>
            </div>`
            }
            else{
                choiceList.innerHTML += `<div class="answer">
                <div class="mb-3">
                    <div class="answerBox">`
                    +question.choice[i]+`
                    </div>
                </div>
            </div>`
            }
        }
        if(uAnswer==='[]'){
            //답안 미선택 오답
            choiceList.innerHTML += `<div class="text-danger mt-3" style="font-size:0.875rem">Wrong Answer!!</div>`;
        }
        newQ.appendChild(choiceList);    
    }
    //해설 출력
    let comment = document.querySelector(".comment").cloneNode(true);
    comment.querySelector(".contentBox").innerHTML = question.comment;
    newQ.appendChild(comment);

    //문제를 문제 리스트에 추가
    questionList.appendChild(newQ);
}

//샘플 양식 숨기기
let hide = document.querySelector(".question");
hide.id = "hide";
document.getElementById("hide").style.display = "none";


//채점 진행
for (let i=1; i <= qCount; i++){
    question = JSON.parse(localStorage.getItem(i))
    if (question.qType == "Objective"){
        displayObjQ(question, i);
    }
    else{
        displaySubQ(question, i);
    }
}


//맞은 개수 출력
document.querySelector(".scoreBox").innerHTML = aCount+'<span class="qCount"> /'+qCount+'</span>';