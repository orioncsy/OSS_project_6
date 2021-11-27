let qCount = localStorage.getItem('qNum'); // 출제한 문제 개수

function displaySubQ (question, num) {
    let questionList = document.querySelector(".questionList");
    let newQ = document.createElement("div");
    newQ.className = "question";

    //문제 번호 출력
    let numOfQ = document.querySelector(".mt-4").cloneNode(true);
    numOfQ.querySelector(".qtext").innerHTML = "Question " + num;
    newQ.appendChild(numOfQ);
    
    //문제 지문 출력
    let content = document.querySelector(".mt-3").cloneNode(true);
    content.querySelector(".contentBox").innerHTML = question.content;
    newQ.appendChild(content);

    //답 입력칸 출력
    let answer = document.querySelector(".answer").cloneNode(true);
    newQ.appendChild(answer);

    //문제를 문제 리스트에 추가
    questionList.appendChild(newQ);
}

function displayObjQ (question, num) {
    let questionList = document.querySelector(".questionList");
    let newQ = document.createElement("div");
    newQ.className = "question";

    //문제 번호 입력
    let numOfQ = document.querySelector(".mt-4").cloneNode(true);
    numOfQ.querySelector(".qtext").innerHTML = "Question " + num;
    newQ.appendChild(numOfQ);
    
    //문제 지문 입력
    let content = document.querySelector(".mt-3").cloneNode(true);
    content.querySelector(".contentBox").innerHTML = question.content;
    newQ.appendChild(content);

    //문제 보기 입력
    let choiceList = document.querySelector(".choiceList").cloneNode(true);
    let choiceCount = question.choice.length;
    for (let i = 0; i < choiceCount; i++){
        choiceList.innerHTML +=  `<div class="form-check">
        <input class="form-check-input" type="checkbox" value="">
        <label class="form-check-label" for="flexCheckDefault">`+
          question.choice[i] + `</label>
          </div>`
        
    }
    newQ.appendChild(choiceList);

    //문제를 문제 리스트에 추가
    questionList.appendChild(newQ);
}

for (let i=1; i <= qCount; i++){
    question = JSON.parse(localStorage.getItem(i))
    if (question.qType == "Objective"){
        displayObjQ(question, i);
    }
    else{
        displaySubQ(question, i);
    }
}

let hide = document.querySelector(".question");
hide.id = "hide";
document.getElementById("hide").style.display = "none";


document.querySelectorAll(".btn-success").forEach(btn => {btn.addEventListener('click',() => {  
    let ansCount = document.querySelectorAll(".question").length;

    //주관식 정답 저장
    let subAnsList = document.querySelectorAll(".answer .form-control");
    //객관식 정답 저장
    let choiceList = document.querySelectorAll(".choiceList");

    let sNum = 1, oNum = 1; // 주관식 개수, 객관식 개수
    for (let i = 1; i < ansCount; i++) {
        question = JSON.parse(localStorage.getItem(i))

        if (question.qType === 'Objective'){
            let answer = []
            choiceList[oNum].querySelectorAll(".form-check-input").forEach((node, index) => {
                if (node.checked){
                    answer.push(index+1);
            }})
            localStorage.setItem('u'+i, answer);
            oNum+=1;
        }
        else{
            localStorage.setItem('u'+i, subAnsList[sNum].value)
            sNum+=1;
        }
    }
});})
