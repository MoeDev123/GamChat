const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");

button.addEventListener("click",updateDB);
let badwords = ["hate","nigger","nigga","fuck","bitch","pussy","cunt","shit","cracker","spick","chink","asshole","dick","glizzy"];




let db = firebase.database().ref(); 
let room3 = firebase.database().ref("Mobile");






function updateDB(event){ 
    event.preventDefault();
    let username        = usernameElement.value;
    let message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    
    
   
    
    let words = message.split(" ");

    for (let i = 0; i<words.length; i++){
      let contain = badwords.includes(words[i].toLowerCase());
      if (contain == true){
        message = message.replace(words[i], "******Thats Not a Nice word******");
      } 
    }


    let value = {
        
        NAME: username,
        MESSAGE: message 
    };

    room3.push(value);
}


room3.on("child_added",addMessageToBoard);
let messageContainer = document.querySelector(".allMessages");

function addMessageToBoard(rowData){
   
    let row = rowData.val();  
    console.log(row);
 
    let name = row.NAME;
    let sentence = row.MESSAGE;
    
    let newP  = document.createElement("p");
    newP.innerText = name + ": " + sentence;
    messageContainer.appendChild(newP);
}