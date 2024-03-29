let addbtn = document.getElementById("add_question_btn");
let cpltbtn0 = document.getElementById("complete_btn_0");
let cpltbtn1 =  document.getElementById("complete_btn_1");

let qarea = document.getElementById("q_area");
let qidx = 1;


//문항 추가
function addSbjQuestion() {
    let div = document.createElement("div");
    div.className = "question my-6";
    
    let qtextwrapper = document.createElement("div");
    qtextwrapper.innerHTML =   `<span class="qtext">Question ` + (qidx) + `</span>
                                <button type="button" class="btn btn-outline-danger mt-4 me-3 float-end" aria-label="delete Question" title="Delete this Question">
                                    <i class="bi bi-trash"></i></button>`;
    qtextwrapper.querySelector(".btn").addEventListener("click", () => {
        qtextwrapper.parentElement.remove(); // add close btn for removing this choice item
    });
    div.appendChild(qtextwrapper);
    qarea.appendChild(div);

    div.insertAdjacentHTML("beforeend",`<div class="type mt-4">
                                            <div class="d-flex justify-content-between">
                                                <div class="btn-group mb-4 qtypeSelect" role="group" aria-label="Basic radio toggle button group">
                                                    <input class="btn btn-outline-primary", type="button", value="Objective">
                                                    <input class="btn btn-primary", type="button", value="Subjective">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content">
                                            <div class="mb-4">
                                                <label for="exampleFormControlTextarea1" class="form-label">Question content</label>
                                                <textarea class="form-control" id="content" rows="3" placeholder="Enter your question"></textarea>
                                        </div></div>
                                        <div class="answerSubject mb-5">
                                            <div>
                                                <label for="exampleFormControlInput1" class="form-label">Answer</label>
                                                <input type="text" class="form-control answerS" placeholder="Enter your answer">
                                        </div></div>
                                        
                                        <div class="comment">
                                            <div class="mb-3 mt-3">
                                                <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
                                                <textarea class="form-control comment" rows="3"></textarea>
                                        </div></div>`);

    qtypeHandler(div); //add event listener
    qidx++;
}

addbtn.addEventListener("click", () => {
    addSbjQuestion();
});


//문제 유형 선택
document.querySelectorAll(".question").forEach( question => qtypeHandler(question));

function qtypeHandler(question) {
    let btnO = question.querySelector('input[value="Objective"]');
    let btnS = question.querySelector('input[value="Subjective"]');
    btnO.addEventListener("click", ()=>{
        // Change Subject Question to Object one.
        btnO.classList.replace("btn-outline-primary", "btn-primary");
        btnS.classList.replace("btn-primary", "btn-outline-primary");
    
        let answer = question.querySelector(".answerSubject");
        answer.className = "answerObject mb-5";
        answer.innerHTML = `<div class="mb-2 choiceList">
                                <label for="exampleFormControlInput1" class="form-label">Answer</label>
                                <div class="input-group choice">
                                    <div class="input-group-text">
                                        <input class="form-check-input me-2" type="checkbox" value="" aria-label="check for correct one">
                                    </div>
                                    
                                    <input type="text" class="form-control" placeholder="Input answer"
                                        aria-label="Input group example" aria-describedby="btnGroupAddon">
                                </div>
                            </div>
                            <div>
                            <button type="button" class="btn btn-link btn-sm addItem"> Add more...</button>
                            </div>`;

        answer.querySelector(".addItem").addEventListener("click", () => addAnswerItem(answer)); //TODO: 중복 없애기
        //add event listener
    });
    btnS.addEventListener("click", ()=>{
        // Change Object Question to Subject one.
        btnS.classList.replace("btn-outline-primary", "btn-primary");
        btnO.classList.replace("btn-primary", "btn-outline-primary");
    
        let answer = question.querySelector(".answerObject");
        answer.className = "answerSubject mb-5";
        answer.innerHTML = `<div>
                                <label for="exampleFormControlInput1" class="form-label">Answer</label>
                                <input type="text" class="form-control answerS" placeholder="Enter your answer">
                            </div>`;
    
    });
    
};


//addItem 구현
document.querySelectorAll(".answerObject").forEach( objAns => {
    let addItem = objAns.querySelector(".addItem");
    addItem.addEventListener("click", () => addAnswerItem(objAns));
});

function addAnswerItem(answer) {
    let choiceList = answer.querySelector(".choiceList");
    let choice = choiceList.querySelector(".choice");
    let clone = choice.cloneNode(true);
    clone.querySelector(".form-check-input").checked=false; //reset checked
    clone.querySelector(".form-control").value=""; //reset input
    clone.insertAdjacentHTML("beforeend", `<button type="button" class="btn-close my-auto mx-1" aria-label="delete item" title="Delete this answer choice"></button>`);
    clone.querySelector(".btn-close").addEventListener("click", () => {
        clone.remove(); // add close btn for removing this choice item
    });
    choiceList.appendChild(clone);
};

//init
window.addEventListener("load", () => {
    addSbjQuestion(); // init with first question
});

//save
document.querySelectorAll(".btn-success").forEach(btn => {btn.addEventListener('click',() => {

    //문제가 객관식이면 Objective, 주관식이면 Subjective 저장
    let typeList = document.querySelectorAll('.btn-primary');
    //문제 저장
    let contentList = document.querySelectorAll(".content .form-control");
    //해설 저장
    let commentList = document.querySelectorAll(".comment .form-control");
    
    //주관식 정답 저장
    let subAnsList = document.querySelectorAll(".answerS");
    
    //객관식 정답 저장
    let choiceList = document.querySelectorAll(".answerObject .choiceList");

    let pastinvalid = document.querySelectorAll(".is-invalid");
    pastinvalid.forEach(node=> node.classList.remove("is-invalid"));
    let pastFeedback = document.querySelectorAll(".invalid-feedback, .text-danger");
    pastFeedback.forEach(node=>node.remove());

    let qNum = typeList.length; //문제 개수 저장
    let sNum = 0, oNum = 0; // 주관식 개수, 객관식 개수
    localStorage.setItem('qNum', qNum);
    let isAllValid = true;
    for (let i = 0; i < qNum; i++){
        let question = {}
        let qType = typeList[i].value
        question.qType = qType;
        question.content = contentList[i].value;
        question.comment = commentList[i].value;
        if (qType === 'Objective'){
            let answer = []
            choiceList[oNum].querySelectorAll(".form-check-input").forEach((node, index) => {
                if (node.checked){
                    answer.push(index+1);
            }})
            let choice = []
            choiceList[oNum].querySelectorAll(".form-control").forEach((node) => {
                choice.push(node.value);
                // console.log('value: ' + node.value);
                if ( !node.value ) {
                    isAllValid = false;
                    node.classList.add("is-invalid");
                    node.parentNode.insertAdjacentHTML("beforeend", `<div class="invalid-feedback mb-1">Please enter the answer.</div>`);
                }
            })
            question.answer = answer
            question.choice = choice
            if ( question.answer.length === 0 ){
                isAllValid = false;
                choiceList[oNum].querySelectorAll(".form-check-input").forEach(node => {
                    node.classList.add("is-invalid");
                });
                choiceList[oNum].parentNode.insertAdjacentHTML("beforeend" ,`<div class="text-danger mt-3" style="font-size:0.875rem">At least 1 answer should be checked.</div>`);
            }
            oNum+=1;
        }
        else{
            question.answer = subAnsList[sNum].value
            // console.log(question.answer);
            if ( !question.answer ) {
                isAllValid = false;
                subAnsList[sNum].classList.add("is-invalid");
                subAnsList[sNum].insertAdjacentHTML("afterend", `<div class="invalid-feedback">Please enter the answer.</div>`);
            }
            sNum+=1;
        }
        localStorage.setItem(i+1, JSON.stringify(question))
    }
    if(isAllValid){
        location.href='../index.html';
    }
});})