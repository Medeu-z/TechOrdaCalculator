let css_link;
let mode;
let textView;
let cancel;
let back;
let percent;
let viewNumber;
let firstNumber;
let secondNumber;
let operator;
let operatorsBtn;
function declare(){
    css_link = document.querySelector("#body__mode");
    mode =  document.querySelector(".mode");
    textView = document.querySelector(".text__view");
    cancel = document.querySelector(".cancel");
    back = document.querySelector(".back");
    percent = document.querySelector(".percent");
    operatorsBtn = document.querySelectorAll("td:last-child input");
    resetVars("0");
}
declare();
function events(){
    mode.addEventListener('click', () => {
        if(mode.firstElementChild.classList[0] == "bi-moon-fill"){
            css_link.setAttribute("href", "./css/dark.css");
            mode.firstElementChild.setAttribute("class", "bi-brightness-high-fill");
        }else{
            css_link.setAttribute("href", "./css/light.css");
            mode.firstElementChild.setAttribute("class", "bi-moon-fill");
        }
    });
    cancel.addEventListener('click', () => {
        cancel.value = "AC";
        resetVars("0");
        changeBtnColor(null, operatorsBtn);
    });
    back.addEventListener('click', () => {
        viewNumber = textView.innerText; 
        if(!viewNumber.includes("e")){
            if(viewNumber.length != 1){
                    viewNumber = String(viewNumber);
                    viewNumber  =  viewNumber.slice(0, viewNumber.length - 1);
            }else{
                    viewNumber = "0";
            }
        }
        textView.innerText = viewNumber;
    });
    percent.addEventListener('click', () => {
        viewNumber = textView.innerText;
        viewNumber = viewNumber / 100;
        textView.innerText = viewNumber;
    });
}
events();
function addNumber(num){
    if(secondNumber.length == 0) changeBtnColor(null, operatorsBtn);
    if(cancel.value != "C") cancel.value="C";
    if(viewNumber.length < 9){
        if(viewNumber == "0" && num != ".") viewNumber = "";
        if((num == "." && !viewNumber.includes(".")) || num != ".") viewNumber += num;
        textView.innerText = viewNumber;
    } 
}
function addOperator(e, elem){
    changeBtnColor(elem, operatorsBtn);
    checkDot(viewNumber);
    try{
        if(operator.length != 0){
            if(secondNumber.length != 0 || viewNumber.length != 0){
                if(secondNumber.length == 0) secondNumber = viewNumber; 
                firstNumber = count();
                secondNumber = "";
                viewNumber = "";
                textView.innerText =  firstNumber;
            }
        }else{
            firstNumber = textView.innerText;
            viewNumber = "";
        }
        operator = e;
    }catch(err){
        textView.innerText =  "ERROR";
        secondNumber = "";
        viewNumber = "";
        changeBtnColor(null, operatorsBtn);
    }
}
function equal(){
    changeBtnColor(null, operatorsBtn);
    checkDot(textView.innerText);
    try{
        secondNumber = textView.innerText;
        viewNumber = count();
        resetVars(viewNumber);
    }catch(err){
        textView.innerText =  "ERROR";
        secondNumber = "";
        viewNumber = "";
    }
}
function resetVars(viewNum){
    textView.innerText = viewNum;
    viewNumber = "0";
    firstNumber = "";
    secondNumber = "";
    operator = "";
}
function count(){
    return (operator == "/" && secondNumber == "0") ?  "ERROR" : String(eval(firstNumber + operator + secondNumber));
}
function checkDot(str){
    if(str[str.length-1] == "."){
        if(str.length > 1)str += "0";
        if(str.length == 1)str = "0";
    }
}
function changeBtnColor(e, elements){
    elements.forEach(element => {
        if(element == e){
            element.classList.remove("not__active");
            element.classList.add("active");
        }else{
            element.classList.add("not__active");
            element.classList.remove("active");
        }
    });  
}
