

let head = null; // empty list

function insertAtBeginning(){
    
    let value = document.getElementById("nodeValue").value;
    let node = {
        data: value,
        next: null
    }
    node.next = head;
    head = node; 
    displayList();
    document.getElementById("nodeValue").value = "";
}
function insertAtEnd(){
    let value = document.getElementById("nodeValue").value;
    let node = {
        data: value,
        next: null
    }
    if(head == null){
    head = node;
    displayList();
    document.getElementById("nodeValue").value = "";
    return; // stop here!
}
    let current = head;
    while(current.next != null){
    current = current.next;
    }
    current.next = node;
    displayList();
    document.getElementById("nodeValue").value = "";
}
function deleteNode(){
    let value = Number(document.getElementById("nodeValue").value);
    
    // Case 1 - list is empty
    if(head == null){
        document.getElementById("message").innerText = "List is empty!";
        return;
    }
    
    // Case 2 - delete head node
    if(head.data == value){
        head = head.next;
        displayList();
        document.getElementById("nodeValue").value = "";
        return;
    }
    
    // Case 3 - delete middle/end node
    let current = head;
    while(current.next != null){
        if(current.next.data == value){
            current.next = current.next.next; // skip the node
            displayList();
            document.getElementById("nodeValue").value = "";
            return;
        }
        current = current.next;
    }
    
    // value not found
    document.getElementById("message").innerText = "Value not found!";
}
function searchNode(){
    let value = Number(document.getElementById("nodeValue").value);

    if(head == null){
        document.getElementById("message").innerText = "List is empty!";
        return;
    }

    let current = head;
    let index = 0;
    while(current != null){
        if(current.data == value){
            document.getElementById("message").innerText = "Value found at index: " + index;
            document.getElementById("nodeValue").value = "";
            return;
        }
        current = current.next;
        index++;
    }
    document.getElementById("message").innerText = "Value not found!";
}
function displayList(){
    let display = document.getElementById("list-display");
    display.innerHTML = ""; // clear first
    
    let current = head;
    while(current != null){
        // create a box showing current.data
        // add an arrow
        display.innerHTML += "<div class='node'>" + current.data + "</div>";
        display.innerHTML += "<span>→</span>";
        current = current.next;
    }
    display.innerHTML += "<span>NULL</span>";
}