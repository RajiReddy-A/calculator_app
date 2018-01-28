function calculator() {
  
  var prevText='', presentText, lastEntry='',Ans=0,resultDisplayed=false,operator='*';
 
  var numArray=['0','1','2','3','4','5','6','7','8','9'];
  var opArray=['%','/','*','-','+'];
  // button(symbol,id)
  var buttonStore = [
    ["AC", "AC"],
    ["CE", "CE"],
    ["%", "REM"],
    ["Ans", "Ans"],
    [7, 7],
    [8, 8],
    [9, 9],
    ["/", "by"],
    [4, 4],
    [5, 5],
    [6, 6],
    ["*", "pro"],
    [1, 1],
    [2, 2],
    [3, 3],
    ["-", "sub"],
    [0, 0],
    [".", "dot"],
    ["=", "equal"],
    ["+", "add"],
    ["(","open"],
    [")","close"]
  ];
  
  //creating and displaying buttons
  for (var i = 0; i < buttonStore.length; i++) {
    var opt = "";
    if (i % 4 === 3) {
      opt = "<br>";
    }
    $(".buttons").append("<button class='eachButtonRow'" + " id=" + buttonStore[i][1] + "><h4><span id='text" + buttonStore[i][1] + "'>" + buttonStore[i][0] + "</span></h4></button>" + opt + opt);
  }

  //displaying data on screen
  function resultDisplay(input) {
    $('#theDisplay').text("");
    $('#theDisplay').append("<h3>"+input+"</h3>");
  }

  $("button").click(function() {
    $('#screenBorder').css('outline','1px solid #4d90fe');
    presentText = $('#text' + this.id).text();
    if (this.id === "AC" ) {
      prevText='', presentText, lastEntry,resultDisplayed=false,operator='*';
      resultDisplay("");
      $('#prevAns').text("Ans = "+Ans);
      $('#dot').prop('disabled',false);
    }
    
    //clearing data using CE
    else if(this.id === "CE"){
      $('#prevAns').text("Ans = "+Ans);
      var displayedText=$('#theDisplay').text();
      if(displayedText[displayedText.length-1]==='s'){
        resultDisplay(displayedText.substr(0,displayedText.length-3));
      }
      else if(displayedText[displayedText.length-1]==='.'){
        resultDisplay(displayedText.substr(0,displayedText.length-1));
        $('#dot').prop('disabled',false);
      }
      else if(displayedText==='Error'){
        resultDisplay("");
        $('#dot').prop('disabled',false);
      }
      else{
        resultDisplay(displayedText.substr(0,displayedText.length-1));
      }
      displayedText=$('#theDisplay').text();
      lastEntry=displayedText[displayedText.length-1];
      if(lastEntry==='s'){lastEntry='Ans';}
    }
    
    //calculate & display the result when = pressed
    else if(this.id==="equal"){
      var tempDisplay=$('#theDisplay').text();
     var tempAns;
        try{
          tempAns=eval(tempDisplay)
        } catch(e){
          tempAns="Error";
          }
      if(tempAns !== "Error"){
        tempAns=tempAns.toPrecision(10);
        tempAns=tempAns-0;
        Ans=tempAns;
      } 
      resultDisplay(tempAns);
      lastEntry=tempAns;
      resultDisplayed=true;
      $('#prevAns').text(tempDisplay+" =");
      $('#prevAns').css('visibility','visible');
      $('#dot').prop('disabled',false);
    }
    //when numbers and operators are pressed
    else {
      //when answer displayed & new number is pressed, clear result and display number
      if(resultDisplayed){
        if(numArray.indexOf(presentText) !== -1){
          resultDisplay("");  
        }
        $('#prevAns').text("Ans = "+Ans);
      }
      
      //resultDisplayed=false;
      prevText = $('#theDisplay').text();
      if(prevText==='Error'){
        resultDisplay("");
        prevText="";
      }
      //if last entry is operator and again operator is entered,replace it
      if (opArray.indexOf(lastEntry)!== -1 && opArray.indexOf(presentText)!== -1) {
        prevText = prevText.substr(0, prevText.length - lastEntry.length);
        
        resultDisplay(prevText + $('#text' + this.id).text());
        lastEntry = presentText;
      }
      //if Ans is entered with nothing before,just enter Ans
      else if((prevText.trim()==='' && presentText==='Ans') || (resultDisplayed && presentText==='Ans')){
        resultDisplay(presentText);
        lastEntry=presentText;
      }
      //if operator is entered without number,add preceeding zero
      else if(prevText.trim()==='' && opArray.indexOf(presentText) !== -1){
        resultDisplay("0"+presentText);
        lastEntry=presentText;
      }
      else {
          //if Ans followed by number, add operator * 
          if(lastEntry==="Ans" && opArray.indexOf(presentText) === -1){
            presentText="*"+presentText;
          }
          //if last text is a number and present text is Ans or (, add preceeding *
          else if((presentText==="Ans" || presentText==='(') && opArray.indexOf(lastEntry) === -1){
            presentText="*"+presentText;
          }
        resultDisplay(prevText + presentText);
        //disable dot if it is used in the present number
        if(presentText==='.'){$('#dot').prop('disabled',true);}
        if(opArray.indexOf(presentText) !== -1){$('#dot').prop('disabled',false);}
        lastEntry = presentText;
      }
      resultDisplayed=false;
    }
  });
}

$(document).ready(function() {
  calculator();  
});