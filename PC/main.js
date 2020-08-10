const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");

button.addEventListener("click",updateDB);


let db = firebase.database().ref(); 
let room2 = firebase.database().ref("PC");

function updateDB(event){ 
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    
    let value = {
        
        NAME: username,
        MESSAGE: message
    };
    room2.push(value);
}


room2.on("child_added",addMessageToBoard);
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