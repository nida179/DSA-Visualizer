let arr = []; // global array which stores the height of all bars 
let currentSearch = "linear"; // default

function getStarted(){
    document.getElementById("landing").style.display = "none";
    document.getElementById("layout-div").style.display = "flex";
}
let text = "Welcome to DSA Visualizer! This website is designed to help you understand Data Structures and Algorithms through interactive animations.";
let index = 0;

function typeWriter(){
    if(index < text.length){
        document.getElementById("typewriter").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 30);
    }
}
typeWriter();
function generateArray(){
    resetStats();
    arr = []; //Clears the array first so old values don't pile up on repeated clicks.
    for (let i = 0; i < 6; i++) {
        // Math.random() gives a decimal between 0 and 1. Multiply by 300 to get 0–300,
        //  Math.floor removes the decimal, +10 ensures minimum height of 10px.
        let randomHeight = Math.floor(Math.random() * 300) + 10;
        let bar = document.getElementById("bar" + i);
        // Sets the bar's visual height AND saves the number into arr.
        bar.style.height = randomHeight + "px";
        bar.innerHTML = randomHeight; // shows the number inside the bar
        arr.push(randomHeight);
    }
}

let comparison = 0;
let swaps = 0;
let passes = 0;
const comparisonE1 = document.getElementById("ComparisonValue");
const swapsE1 = document.getElementById("SwapsValue");
const passesE1 = document.getElementById("PassesValue");

function updateStatsDisplay(){
    comparisonE1.textContent = comparison;
    swapsE1.textContent = swaps;
    passesE1.textContent = passes;
}

function resetStats(){
    comparison = 0;
    swaps = 0;
    passes = 0;
    updateStatsDisplay();
}

// Marks whichever sidebar button was just clicked as the active one,
// and removes the pill highlight from every other button.
function setActiveButton(btn){
    document.querySelectorAll(".algo-btn").forEach(function(b){
        b.classList.remove("active");
    });
    if (btn) btn.classList.add("active");
}

function bubbleSort(btn){
    setActiveButton(btn);
    resetStats(); // start every run at 0

    document.getElementById("algo-btn").innerText = "Bubble Sort";
    document.getElementById("algo-desc").innerText = "The bubble sort works, by checking two adjacent elements and then swaps them to their correct position";
    let n = arr.length;
    let steps = [];

    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            comparison++; // every check counts as a comparison, swap or not
            if (arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swaps++;
                // store a snapshot of the counts at this exact step
                steps.push([j, j+1, true, comparison, swaps, passes]);
            } else {
                steps.push([j, j+1, false, comparison, swaps, passes]);
            } // Instead of animating immediately, we first run the entire sort and save every single comparison into steps.
        }
        passes++; // one full pass through the array just finished
    }

    for (let k = 0; k < steps.length; k++) {
        setTimeout(function(k) {
            return function() {
                // unpack index a, index b, whether a swap happened, and the counts at this step
                let [a, b, isSwap, c, s, p] = steps[k];

                // update the live stat numbers to match this step
                comparison = c;
                swaps = s;
                passes = p;
                updateStatsDisplay();

                for (let x = 0; x < 6; x++) {
                document.getElementById("bar" + x).style.backgroundColor = "rgb(158, 114, 145)";
                }
            // then highlight just the two
                let barA = document.getElementById("bar" + a);
                 let barB = document.getElementById("bar" + b);
                    barA.style.backgroundColor = "DarkRed";
                    barB.style.backgroundColor = "yellow";
                
                // Only swap visually if a swap actually happened in the algorithm.
                if (isSwap) {

                    let temp = barA.style.height;
                    barA.style.height = barB.style.height;
                    barB.style.height = temp;

                    // also swap the numbers!
                    let tempText = barA.innerHTML;
                    barA.innerHTML = barB.innerHTML;
                    barB.innerHTML = tempText;
                }
            }
        }(k), k * 300);
    }

    // reset all bars to steelblue after sorting is done
    setTimeout(function() {
        updateStatsDisplay(); // final sync — passes lags by one during animation, this corrects it
        for (let i = 0; i < 6; i++) {
            setTimeout(function(i) {
                return function() {
                    document.getElementById("bar" + i).style.backgroundColor = "steelblue";
                    document.getElementById("message").innerText = "The data is now sorted";
                }
            }(i), i * 100);
        }
    }, steps.length * 300 + 300);
}

function selectionSort(btn){
    setActiveButton(btn);
    resetStats();
    document.getElementById("algo-btn").innerText = "Selection Sort";
    document.getElementById("algo-desc").innerText = "The selection sort works by finding the minimum element and placing it in the correct position ";
    let n = arr.length;
    let steps = [];

    for (let i = 0; i < n-1; i++) {
        let min = i;
        for (let j = i+1; j < n; j++) {
            comparison++; // every check counts, regardless of whether min changes
            if (arr[min] > arr[j]) {
                min = j;
            }
            steps.push([j, min, false, comparison, swaps, passes]);
        }
                let temp = arr[i];
                arr[i] = arr[min];
                arr[min] = temp;
                swaps++; // this swap runs once per outer loop, even if min === i
                steps.push([i, min, true, comparison, swaps, passes]);
                passes++; // one outer-loop pass just finished
                
    }

        // Animation   
        for (let k = 0; k < steps.length; k++) {
        setTimeout(function(k) {
            return function() {
                let [a, b, isSwap, c, s, p] = steps[k];
                comparison = c;
                swaps = s;
                passes = p;
                updateStatsDisplay();
                for (let x = 0; x < 6; x++) {
                document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
                }
            // then highlight just the two
                let barA = document.getElementById("bar" + a);
                 let barB = document.getElementById("bar" + b);
                    barA.style.backgroundColor = "red";
                    barB.style.backgroundColor = "yellow";
                if (isSwap) {
                    let temp = barA.style.height;
                    barA.style.height = barB.style.height;
                    barB.style.height = temp;
                    barB.style.backgroundColor = "Yellow";

                    let tempText = barA.innerHTML;
                    barA.innerHTML = barB.innerHTML;
                    barB.innerHTML = tempText;
                }
            }
        }(k), k * 300);
    }  
        // Green Animation 
    setTimeout(function() {
    updateStatsDisplay();
    for (let i = 0; i < 6; i++) {
        setTimeout(function(i) {
            return function() {
                document.getElementById("bar" + i).style.backgroundColor = "steelblue";
                document.getElementById("message").innerText = "The data is now sorted";
            }
        }(i), i * 100);
    }
}, steps.length * 300 + 300);
}
function insertionSort(btn){
    setActiveButton(btn);
    resetStats();
    document.getElementById("algo-btn").innerText = "Insertion Sort";
    document.getElementById("algo-desc").innerText = "The Insertion sort works by assuming the 1st element as sorted and then\n compare it with next elements and if we find other elements smaller then we insert that in its correct position";

    let n = arr.length;
    let steps = [];

    for(let i = 1; i < n; i++){
    let hold = arr[i];
    let gap = i;

    while(gap > 0 && hold < arr[gap-1]){
        comparison++; // each while-check is a comparison
        arr[gap] = arr[gap-1];
        swaps++; // insertion sort shifts instead of swapping — counted here as the "move"
        gap--;
        steps.push([gap, gap+1, [...arr], comparison, swaps, passes]); // save snapshot
    }
    arr[gap] = hold;
    passes++; // one full insertion pass just finished
    steps.push([gap, i, [...arr], comparison, swaps, passes]); // save snapshot
}
    for (let k = 0; k < steps.length; k++) {
        setTimeout(function(k) {
            return function() {
            let [a, b, snapshot, c, s, p] = steps[k];
            comparison = c;
            swaps = s;
            passes = p;
            updateStatsDisplay();
            for (let x = 0; x < 6; x++) {
                document.getElementById("bar" + x).style.height = snapshot[x] + "px";
                document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
                document.getElementById("bar" + x).innerHTML = snapshot[x];
        }
        document.getElementById("bar" + a).style.backgroundColor = "red";
        document.getElementById("bar" + b).style.backgroundColor = "yellow";
    }   
}(k), k * 300);
}  
        // Green Animation 
    setTimeout(function() {
    updateStatsDisplay();
    for (let i = 0; i < 6; i++) {
        setTimeout(function(i) {
            return function() {
                document.getElementById("bar" + i).style.backgroundColor = "steelblue";
                document.getElementById("message").innerText = "The data is now sorted";
            }
        }(i), i * 100);
    }
}, steps.length * 300 + 300);
}

function merge(arr,left,mid,right,steps){
    let i = left;
    let j = mid+1;
    let k = 0;
    let temp = [];

    while(i<=mid && j<=right){
        comparison++; // comparing the two halves' front elements
        if(arr[i]<arr[j]){
            temp[k] = arr[i];
            i++;
        } else {
            temp[k] = arr[j];
            j++;
        }
        k++;
    }
    while(i<=mid){
        temp[k] = arr[i];
        k++;
        i++;
    }
    while(j<=right){
        temp[k] = arr[j];
        k++;
        j++;
    }
    for(let i=0;i<k;i++){
        arr[left+i] = temp[i];
        swaps++; // each element placed back counts as a "move"
    }
    passes++; // one merge operation just completed
    steps.push([left,right,[...arr],comparison,swaps,passes])
}
function mergeSort(arr, left, right,steps){
   if(left>=right)  return;

   let mid = Math.floor((left+right) /2);
   mergeSort(arr,left,mid,steps); // left half
    mergeSort(arr,mid+1,right,steps); // right half
    merge(arr,left,mid,right,steps);  
}
function mergeSortMain(btn){
    setActiveButton(btn);
    resetStats();
    document.getElementById("algo-btn").innerText = "Merge Sort";
    document.getElementById("algo-desc").innerText = "Divides array into halves, sorts each half recursively, then merges them";
    
    let steps = [];
    mergeSort(arr, 0, arr.length - 1, steps);

    // animation — same snapshot approach as insertion sort
    for(let k = 0; k < steps.length; k++){
        setTimeout(function(k){
            return function(){
                let [left, right, snapshot, c, s, p] = steps[k];
                comparison = c;
                swaps = s;
                passes = p;
                updateStatsDisplay();
                for(let x = 0; x < 6; x++){
                    document.getElementById("bar" + x).style.height = snapshot[x] + "px";
                    document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
                    document.getElementById("bar" + x).innerHTML = snapshot[x];
                }
                // highlight the merged section
                for(let x = left; x <= right; x++){
                    document.getElementById("bar" + x).style.backgroundColor = "red";
                }
            }
        }(k), k * 300);
    }

    // green animation
    setTimeout(function(){
        updateStatsDisplay();
        for(let i = 0; i < 6; i++){
            setTimeout(function(i){
                return function(){
                    document.getElementById("bar" + i).style.backgroundColor = "steelblue";
                    document.getElementById("message").innerText = "The data is now sorted";
                }
            }(i), i * 100);
        }
    }, steps.length * 300 + 300);
}

function partition(arr,left,right,steps){
    let pivot = arr[right];
    let ind = left-1;
    for(let i=left;i<right;i++){
        comparison++; // comparing arr[i] against the pivot
        if(arr[i]<pivot){
            ind++;
            let temp = arr[i];
            arr[i] = arr[ind];
            arr[ind] = temp;
            swaps++;
            steps.push([ind, i, [...arr],right,comparison,swaps,passes]); // after each swap
        }
    }
    ind++;
    let temp = arr[right];
    arr[right] = arr[ind];
    arr[ind] = temp;
    swaps++; // placing the pivot into its final position
    passes++; // one partition operation just completed
    steps.push([ind, right, [...arr], ind, comparison, swaps, passes]); // added pivot index at the end
    return ind;
}
function quickSort(arr,left,right,steps){
    if(left>right) return;

    let piv = partition(arr,left,right,steps);
    quickSort(arr,left,piv-1,steps);
    quickSort(arr,piv+1,right,steps);
}

function quickSortMain(btn){
    setActiveButton(btn);
    resetStats();
    document.getElementById("algo-btn").innerText = "Quick Sort";
    document.getElementById("algo-desc").innerText = "It picks an element as a pivot and partition the array into two halves (left & right), sorts each half recursively, then merges them";
    
    let steps = [];
    quickSort(arr, 0, arr.length - 1, steps);

    // animation — same snapshot approach as insertion sort
    for(let k = 0; k < steps.length; k++){
        
        setTimeout(function(k){
            return function(){
                let [a, b, snapshot, pivotIndex, c, s, p] = steps[k];
                comparison = c;
                swaps = s;
                passes = p;
                updateStatsDisplay();
                for(let x = 0; x < 6; x++){
                document.getElementById("bar" + x).style.height = snapshot[x] + "px";
                document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
                document.getElementById("bar" + x).innerHTML = snapshot[x];
    }
    
    // then color AFTER reset
        document.getElementById("bar" + pivotIndex).style.backgroundColor = "orange";
        document.getElementById("bar" + a).style.backgroundColor = "red";
            }
        }(k), k * 300);
    }

    // green animation
    setTimeout(function(){
        updateStatsDisplay();
        for(let i = 0; i < 6; i++){
            setTimeout(function(i){
                return function(){
                    document.getElementById("bar" + i).style.backgroundColor = "steelblue";
                    document.getElementById("message").innerText = "The data is now sorted";
                }
            }(i), i * 100);
        }
    }, steps.length * 300 + 300);
}

function runSearch(){
    if(currentSearch == "linear"){
        linearSearch();
    } else {
        binarySearch();
    }
}

function showLinearSearch(btn){
     setActiveButton(btn);
     currentSearch = "linear"; // default

    document.getElementById("search-panel").style.display = "flex";
    document.getElementById("algo-btn").innerText = "Linear Search";
    document.getElementById("algo-desc").innerText = "It linearly checks the array and if the value is found it returns that value";
    document.getElementById("message").innerText = "";
    for(let x = 0; x < 6; x++){
        document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
    }
}

function linearSearch(){

    
    // read current bar values directly from what's displayed
    arr = [];
    for(let i = 0; i < 6; i++){
     arr.push(Number(document.getElementById("bar" + i).innerHTML));
    }
     // reset message

    document.getElementById("message").innerText = "";
    
    // reset bar colors
    for(let x = 0; x < 6; x++){
        document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
    }
    let target = Number(document.getElementById("searchValue").value);
    
    document.getElementById("algo-btn").innerText = "Linear Search";
    document.getElementById("algo-desc").innerText = "It linearly checks the array and if the value is found it returns that value";
    
    let steps = [];
    
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == target){
            steps.push([i, true]);
            break;
        } else {
            steps.push([i, false]);
        }
    }
    
    for(let k = 0; k < steps.length; k++){
        setTimeout(function(k){
            return function(){
                let [i, isFound] = steps[k];
                
                for(let x = 0; x < 6; x++){
                    document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
                }
                
                if(isFound){
                    document.getElementById("bar" + i).style.backgroundColor = "green";
                    document.getElementById("message").innerText = "Value found at index " + i + "!";
                } else {
                    document.getElementById("bar" + i).style.backgroundColor = "red";
                    document.getElementById("message").innerText = "Searching...";
                }
            }
        }(k), k * 500);
    }
    setTimeout(function(){
    let found = steps[steps.length - 1][1];
    if(!found){
        document.getElementById("message").innerText = "Value not found!";
    }
}, steps.length * 500 + 100);
}

// called from sidebar
function showBinarySearch(btn){
     setActiveButton(btn);
     currentSearch = "binary"; // default

    document.getElementById("search-panel").style.display = "flex";
    document.getElementById("algo-btn").innerText = "Binary Search";
    document.getElementById("algo-desc").innerText = "Works on sorted arrays, divides the array in half each time to find the target";
    document.getElementById("message").innerText = "";
    for(let x = 0; x < 6; x++){
        document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
    }
}

function binarySearch(){
    document.getElementById("search-panel").style.display = "flex";
    document.getElementById("algo-btn").innerText = "Binary Search";
    document.getElementById("algo-desc").innerText = "Works on sorted arrays, divides the array in half each time to find the target";

    arr = [];
    for(let i = 0; i < 6; i++){
        arr.push(Number(document.getElementById("bar" + i).innerHTML));
    }

    let target = Number(document.getElementById("searchValue").value);
    let l = 0, r = arr.length - 1;
    let steps = [];

    while(l <= r){
        let mid = Math.floor((l + r) / 2);
        if(arr[mid] == target){
            steps.push([mid, true]);
            break;
        } else if(target > arr[mid]){
            steps.push([mid, false]);
            l = mid + 1;
        } else {
            steps.push([mid, false]);
            r = mid - 1;
        }
    }

    for(let k = 0; k < steps.length; k++){
        setTimeout(function(k){
            return function(){
                let [i, isFound] = steps[k];
                
                for(let x = 0; x < 6; x++){
                    document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
                }
                
                if(isFound){
                    document.getElementById("bar" + i).style.backgroundColor = "green";
                    document.getElementById("message").innerText = "Value found at index " + i + "!";
                } else {
                    document.getElementById("bar" + i).style.backgroundColor = "red";
                    document.getElementById("message").innerText = "Searching...";
                }
            }
        }(k), k * 500);
    }
    setTimeout(function(){
    let found = steps[steps.length - 1][1];
    if(!found){
        document.getElementById("message").innerText = "Value not found!";
    }
}, steps.length * 500 + 100);
}