let arr = []; // global array which stores the height of all bars 

function generateArray(){
    arr = []; //Clears the array first so old values don't pile up on repeated clicks.
    for (let i = 0; i < 8; i++) {
        // Math.random() gives a decimal between 0 and 1. Multiply by 300 to get 0–300,
        //  Math.floor removes the decimal, +10 ensures minimum height of 10px.
        let randomHeight = Math.floor(Math.random() * 300) + 10;
        let bar = document.getElementById("bar" + i);

        // Sets the bar's visual height AND saves the number into arr.
        bar.style.height = randomHeight + "px";
        arr.push(randomHeight);
    }
}

function bubbleSort(){
    document.getElementById("algo-btn").innerText = "Bubble Sort";
    document.getElementById("algo-desc").innerText = "The bubble sort works, by checking two adjacent elements and then swaps them to their correct position";
    let n = arr.length;
    let steps = [];

    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                steps.push([j, j+1, true]);
            } else {
                steps.push([j, j+1, false]);
            } // Instead of animating immediately, we first run the entire sort and save every single comparison into steps. Each step stores 3 things — left index, right index, and whether a swap happened.
        }
    }

    for (let k = 0; k < steps.length; k++) {
        //This says — "run this function after this many milliseconds". It does NOT pause the code, it just schedules something for later.
        // setTimeout(func, 0 * 300);   // runs at 0ms
        //setTimeout(func, 1 * 300);   // runs at 300ms
        //setTimeout(func, 2 * 300);   // runs at 600ms
        //All three are scheduled instantly, but they fire at different times — creating the animation effect!
        // This is the trickiest part. The problem is — by the time setTimeout fires, the loop is already done and k is at its final value. So every timeout would use the same k!
        //The fix is to wrap it in an outer function that takes k as a parameter and immediately calls itself with (k). This freezes the current value of k for each timeout. Think of it like making a copy of k for each iteration.
        setTimeout(function(k) {
            return function() {
                // This is called destructuring — it unpacks the array [j, j+1, true/false] into three separate variables in one line.
                let [a, b, isSwap] = steps[k];
                for (let x = 0; x < 8; x++) {
                document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
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
                }
            }
        }(k), k * 300); // Waits until ALL steps are done (total time = steps × 300ms), then resets all bars back to steelblue.
    }

    
    // reset all bars to steelblue after sorting is done
    // reset all bars to steelblue after sorting is done
setTimeout(function() {
    
    for (let i = 0; i < 8; i++) {
        setTimeout(function(i) {
            return function() {
                document.getElementById("bar" + i).style.backgroundColor = "steelblue";
                document.getElementById("message").innerText = "The data is now sorted";
            }
        }(i), i * 100);
    }
}, steps.length * 300 + 300);
}

function selectionSort(){
    document.getElementById("algo-btn").innerText = "Selection Sort";
    document.getElementById("algo-desc").innerText = "The selection sort works by finding the minimum element and placing it in the correct position ";
    let n = arr.length;
    let steps = [];

    for (let i = 0; i < n-1; i++) {
        let min = i;
        for (let j = i+1; j < n; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
            steps.push([j, min, false]);
        }
                let temp = arr[i];
                arr[i] = arr[min];
                arr[min] = temp;
                steps.push([i, min, true]);
                
    }
             // Instead of animating immediately, we first run the entire sort and save every single comparison into steps. Each step stores 3 things — left index, right index, and whether a swap happened.

        // Animation   
        for (let k = 0; k < steps.length; k++) {
        setTimeout(function(k) {
            return function() {
                // This is called destructuring — it unpacks the array [j, j+1, true/false] into three separate variables in one line.
                let [a, b, isSwap] = steps[k];
                for (let x = 0; x < 8; x++) {
                document.getElementById("bar" + x).style.backgroundColor = "rgb(131, 78, 115)";
                }
            // then highlight just the two
                let barA = document.getElementById("bar" + a);
                 let barB = document.getElementById("bar" + b);
                    barA.style.backgroundColor = "red";
                    barB.style.backgroundColor = "yellow";
                // Only swap visually if a swap actually happened in the algorithm.
                if (isSwap) {
                    let temp = barA.style.height;
                    barA.style.height = barB.style.height;
                    barB.style.height = temp;
                    barB.style.backgroundColor = "Yellow";
                }
            }
        }(k), k * 300); // Waits until ALL steps are done (total time = steps × 300ms), then resets all bars back to steelblue.
    }  
        // Green Animation 
    setTimeout(function() {
    for (let i = 0; i < 8; i++) {
        setTimeout(function(i) {
            return function() {
                document.getElementById("bar" + i).style.backgroundColor = "steelblue";
                document.getElementById("message").innerText = "The data is now sorted";
            }
        }(i), i * 100);
    }
}, steps.length * 300 + 300);
}