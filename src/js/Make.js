let addbtn = document.getElementById("add_question_btn");
let cpltbtn0 = document.getElementById("complete_btn_0");
let cpltbtn1 =  document.getElementById("complete_btn_1");

let qarea = document.getElementById("q_area");
let qidx = 1;

function addSbjQuestion() {
    let div = document.createElement("div");
    div.className = "question_sbj";
    
    let qtext = document.createElement("div");
    qtext.className = "qtext";
    qtext.innerHTML = "Question " + (++qidx)

    let optiondiv = document.createElement("div");
    optiondiv.className = "type mt-4"
    optiondiv.innerHTML = "<div class=\"d-flex justify-content-between\">\r\n                        <div class=\"btn-group mb-4\" role=\"group\" aria-label=\"Basic radio toggle button group\">\r\n                            <input type=\"radio\" class=\"btn-check\" name=\"btnradio_o\" autocomplete=\"off\" checked>\r\n                            <label class=\"btn btn-outline-primary\">Objective<\/label>\r\n    \r\n                            <input type=\"radio\" class=\"btn-check\" name=\"btnradio_s\" autocomplete=\"off\">\r\n                            <label class=\"btn btn-outline-primary\">Subjective<\/label>\r\n                        <\/div>\r\n    \r\n                    <\/div>"

    div.appendChild(qtext);
    div.appendChild(optiondiv);
    
    qarea.appendChild(div);
    div.insertAdjacentHTML("afterend", "<div class=\"content\">\r\n                    <div class=\"mb-4\">\r\n                        <label for=\"exampleFormControlTextarea1\" class=\"form-label\">Question content<\/label>\r\n                        <textarea class=\"form-control\" id=\"content\" rows=\"3\" placeholder=\"Enter your question\"><\/textarea>\r\n                    <\/div>\r\n                <\/div>\r\n    \r\n                <div class=\"answerSubject\">\r\n                    <div class=\"mb-3\">\r\n                        <label for=\"exampleFormControlInput1\" class=\"form-label\">Answer<\/label>\r\n                        <input type=\"text\" class=\"form-control\" id=\"answerS\" placeholder=\"Enter your answer\">\r\n                    <\/div>\r\n                <\/div>\r\n    \r\n                <div class=\"comment\">\r\n                    <div class=\"mb-3 mt-3\">\r\n                        <label for=\"exampleFormControlTextarea1\" class=\"form-label\">Comment<\/label>\r\n                        <textarea class=\"form-control\" id=\"comment\" rows=\"3\"><\/textarea>\r\n                    <\/div>\r\n                <\/div>");
}

addbtn.addEventListener("click", () => {
    addSbjQuestion();
});

//addItem 구현
document.querySelector(".addItem").addEventListener("click", () =>
{
    choice = document.querySelector('.choice');
    clone = choice.cloneNode(true);
    choiceList = document.querySelector(".choiceList")
    choiceList.appendChild(clone);
});


