// disable moving key
window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
// variable for change step (does not change)
var changePuzzle = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
// puzzle 
var playPuzzle = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
var pointerX, pointerY;
var start = false;

const createRandomMatrix =()=> {
    let temp = []
    let a = 0, b = 1;
    playPuzzle[0][0] = "pointer.jpg"
    for(let i=0; i<15; i++){
        let ran = Math.floor(Math.random()*15+1);
        let flag = false;
        for(let j = 0; j<temp.length; j++) {
            if(temp[j]==ran){
                flag = true
                break;
            }
        }
        if(flag==true){
            i--;
        } else {
            temp.push(ran);
            playPuzzle[a][b++]=puzzlePics[ran-1];
            if(b==4){
                a++;
                b=0;
            }
        }
    }
}
const putPuzzlePics =()=>{
    let temp = 0, a=0, b=0;
    for(let i=1; i<=16; i++) {
        $("#p-"+i).attr("src","img/"+playPuzzle[a][b++]);
        if(b==4) {
            b=0;
            a++;
        }
    }
    $("#p-1").attr("src","img/pointer.jpg")
}
const movingElement =(event)=>{
    movedElement(event.which)
}
const movedWithButton =(n)=>{
    if(start)
        movedElement(n)
}
const movedElement =(n)=>{
    let temp;
    switch(n){
        // left
        case 37:
            if(pointerX!=0){
                temp = playPuzzle[pointerY][pointerX]
                playPuzzle[pointerY][pointerX] = playPuzzle[pointerY][pointerX-1]
                playPuzzle[pointerY][pointerX-1] = temp
                $("#p-"+changePuzzle[pointerY][pointerX]).attr("src","img/"+playPuzzle[pointerY][pointerX])
                $("#p-"+changePuzzle[pointerY][pointerX-1]).attr("src","img/"+playPuzzle[pointerY][pointerX-1])
                pointerX-=1;
            }
            break;
        // right
        case 39:
            if(pointerX!=3){
                temp = playPuzzle[pointerY][pointerX]
                playPuzzle[pointerY][pointerX] = playPuzzle[pointerY][pointerX+1]
                playPuzzle[pointerY][pointerX+1] = temp 
                $("#p-"+changePuzzle[pointerY][pointerX]).attr("src","img/"+playPuzzle[pointerY][pointerX])
                $("#p-"+changePuzzle[pointerY][pointerX+1]).attr("src","img/"+playPuzzle[pointerY][pointerX+1])
                pointerX+=1;
            }
            break;
        // up
        case 38:
            if(pointerY!=0){
                temp = playPuzzle[pointerY][pointerX]
                playPuzzle[pointerY][pointerX] = playPuzzle[pointerY-1][pointerX]
                playPuzzle[pointerY-1][pointerX] = temp 
                $("#p-"+changePuzzle[pointerY][pointerX]).attr("src","img/"+playPuzzle[pointerY][pointerX])
                $("#p-"+changePuzzle[pointerY-1][pointerX]).attr("src","img/"+playPuzzle[pointerY-1][pointerX])
                pointerY-=1;
            }
            break;
        //down
        case 40:
            if(pointerY!=3){
                temp = playPuzzle[pointerY][pointerX]
                playPuzzle[pointerY][pointerX] = playPuzzle[pointerY+1][pointerX]
                playPuzzle[pointerY+1][pointerX] = temp
                $("#p-"+changePuzzle[pointerY][pointerX]).attr("src","img/"+playPuzzle[pointerY][pointerX])
                $("#p-"+changePuzzle[pointerY+1][pointerX]).attr("src","img/"+playPuzzle[pointerY+1][pointerX])
                pointerY+=1;
            }
            break;
    }
    if(pointerX==3 && pointerY==3) {
        checkPuzzle();
    }
}
const checkPuzzle =()=>{
    var flag = false;
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++) {
            if(playPuzzle[i][j]!=originalPuzzle[i][j]){
                flag = true;
            }
        }
    }
    if(!flag){
        $("#p-16").attr("src","img/"+puzzlePics[15])
        $(document).unbind("keyup");
        start = false;
        swal({
            title: "You win!",
            icon: "success",
            button: "Aww yiss!",
        });
    }
}
const startGame =()=>{
    start = true
    $(document).unbind("keyup");
    $("#start").hide();
    $("#restart").show();
    createRandomMatrix();
    putPuzzlePics()
    pointerX = 0;
    pointerY = 0;
    $(document).bind("keyup",movingElement);
}

$(document).ready(()=>{
    $("#start").click(startGame);
    $("#restart").click(startGame);
});