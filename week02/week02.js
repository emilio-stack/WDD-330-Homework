//Emilio
function displayInput() {
    // Get the input
    input = document.getElementById("input").value;

    // Display the input
    document.getElementById("part1").innerHTML = input;
}

//Lakerum
function addNums()
{
    number = document.getElementById('input_within').value;
    let result = 0;
    for(let i=1; i<= number; i++ )
    {
        result+=i;
    }
    document.getElementById('display_adds').innerHTML=result;
    return result;
       
};

//Erik
function testForBlank(input1,input2) {
    console.log(input1,input2);
    let works = true;
    if (input1 === "") {
        console.log("failA")
        works = false;
    }
    else if (input2 === "") {
        console.log("failB")
        works = false;
    }
    else {};
    return (works);
};

function testForNumber(input1,input2) {
    console.log(input1,input2);
    let works = true;
    if (isNaN(input1) === true) {
        console.log("fail1")
        works = false;
    }
    else if (isNaN(input2) === true) {
        console.log("fail2")
        works = false;
    }
    else {};
    return (works);
};


function addInputs(testForBlank,testForNumber) {
    let add1=document.getElementById("input_Add1").value;
    let add2=document.getElementById("input_Add2").value;
    let works1 = testForBlank(add1,add2);
    add1 = Number(add1);
    add2 = Number(add2);
    let works2 = testForNumber(add1,add2);
    if ((works1 === false) || (works2 ===false)) {
        alert("Input an actual number!")
        document.getElementById("input_Add1").value = "";
        document.getElementById("input_Add2").value = "";
        return;
    }
    let sum = add1+add2;
    document.getElementById("display_Add").innerHTML = sum
    console.log(add1,add2,sum)
};
function subInputs(testForBlank,testForNumber) {
    let sub1=document.getElementById("input_Sub1").value;
    let sub2=document.getElementById("input_Sub2").value;
    let works1 = testForBlank(sub1,sub2);
    sub1 = Number(sub1);
    sub2 = Number(sub2);
    let works2 = testForNumber(sub1,sub2);
    if ((works1 === false) || (works2 ===false)) {
        alert("Input an actual number!")
        document.getElementById("input_Sub1").value = "";
        document.getElementById("input_Sub2").value = "";
        return;
    }
    let diff = sub1-sub2;
    document.getElementById("display_Sub").innerHTML = diff
    console.log(sub1,sub2,diff)
};
function multInputs(testForBlank,testForNumber) {
    let mult1=document.getElementById("input_Mult1").value;
    let mult2=document.getElementById("input_Mult2").value;
    let works1 = testForBlank(mult1,mult2);
    mult1 = Number(mult1);
    mult2 = Number(mult2);
    let works2 = testForNumber(mult1,mult2);
    if ((works1 === false) || (works2 ===false)) {
        alert("Input an actual number!")
        document.getElementById("input_Mult1").value = "";
        document.getElementById("input_Mult2").value = "";
        return;
    }
    let prod = mult1*mult2;
    document.getElementById("display_Mult").innerHTML = prod;
    console.log(mult1,mult2,prod);
};
function divInputs(testForBlank,testForNumber) {
    let div1=(document.getElementById("input_Div1").value);
    let div2=(document.getElementById("input_Div2").value);
    let works1 = testForBlank(div1,div2);
    div1 = Number(div1);
    div2 = Number(div2);
    let works2 = testForNumber(div1,div2);
    if ((works1 === false) || (works2 ===false)) {
        alert("Input an actual number!")
        document.getElementById("input_Div1").value = "";
        document.getElementById("input_Div2").value = "";
        return;
    }
    let quot = div1/div2;
    document.getElementById("display_Div").innerHTML = quot;
    console.log(div1,div2,quot);
};


function main() {
    document.getElementById("submit-button").addEventListener('click', displayInput);

    document.getElementById('submit_add_witin').addEventListener('click',addNums);

    document.getElementById("submit_Add").addEventListener("click", e=> {
        addInputs(testForBlank,testForNumber);
    });
    document.getElementById("submit_Sub").addEventListener("click", e=> {
        subInputs(testForBlank,testForNumber);
    });
    document.getElementById("submit_Mult").addEventListener("click", e=> {
        multInputs(testForBlank,testForNumber);
    });
    document.getElementById("submit_Div").addEventListener("click", e=> {
        divInputs(testForBlank,testForNumber);
    });

};

main();