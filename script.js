/* Helper Functions */

const borderDark = () =>{
    for(let i = 11;i<100;i++){
        if(i%10 == 0)continue;
        if((i%10)%3 == 0 && i%10 != 9){
            let x = document.getElementById(i);
            x.style.borderRight = "2px solid black";
        }
        let y = parseInt(i/10);
        if(y%3==0 && y!=9){
            let z = document.getElementById(i);
            z.style.borderBottom = "2px solid black";
        }
    }
}

var arr = new Array(9);
for(let i = 0;i<9;i++){
    arr[i] = new Array(9);
}

const reset = () =>{
    for(let i = 11;i<100;i++){
        if(i%10 === 0){
            continue;
        }
        let x = document.getElementById(i);
        x.textContent = "";
    }
}

function isPossible(row, col, num) {
    for(let i = 0;i<9;i++){
        if(arr[i][col]==num){
            return false;
        }
    }
    for(let i=0;i<9;i++){
        if(arr[row][i]==num){
            return false;
        }
    }
    let x,y;
    if(row<3)x = 0;
    else if(row<6)x = 3;
    else x = 6;
    if(col<3)y = 0;
    else if(col<6) y = 3;
    else y = 6;

    for(let i = 0;i<3; i++){
        for(let j = 0;j<3;j++){
            if(arr[i+x][j+y] === num){
                return false;
            }
        }
    }
    return true;
}

function rec(row, col){
    if(row == 9)return true;
    if(col==9){
        return rec(row+1,0);
    }
    if(arr[row][col]!=0){
        return rec(row,col+1);
    }
    for(let i = 1;i<10;i++){
        if(isPossible(row,col,i)){
            arr[row][col] = i;
            if(rec(row,col+1)){
                return true;
            }
            arr[row][col] = 0;
        }
    }
    return false;
}

const solve = () =>{
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let x = (i+1)+""+(j+1);
            let y = document.getElementById(x);
            if(y.textContent=="")arr[i][j] = 0;
            else arr[i][j] = parseInt(y.textContent);
        }
    }
    for(let i = 0;i<9;i++){
        for(let j=0;j<9;j++){
            console.log(arr[i][j]);
        }
    }
    if(rec(0,0)){
        for(let i=11;i<100;i++){
            if(i%10 === 0)continue;
            let x = document.getElementById(i);
            let temp = 0;
            if(x.textContent=="")temp = 1;
            x.textContent = arr[parseInt(i/10) - 1][i%10 - 1];
            if(temp)x.style.color = "blue";
            else x.style.fontWeight = "bold";
        }
    }else{
        reset();
        alert("Invalid Input!!");
    }
}

/* Init variables */
const solveButton = document.getElementById("solve-button");
const resetButton = document.getElementById("reset-button");
const allCells = document.querySelectorAll(".cell");


/* Main Code */
reset();
borderDark();
resetButton.addEventListener("click", reset);
solveButton.addEventListener("click",solve); 