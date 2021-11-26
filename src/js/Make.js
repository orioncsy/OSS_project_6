//addItem 구현
document.querySelector(".addItem").addEventListener("click", () =>
{
    choice = document.querySelector('.choice');
    clone = choice.cloneNode(true);
    choiceList = document.querySelector(".choiceList")
    choiceList.appendChild(clone);
});



