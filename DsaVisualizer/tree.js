
let head = null;

function insert() {

    let input = document.getElementById("nodeValue").value;

    if (input == "") {
        return;
    }

    let value = Number(input);

    if (search(head, value)) {
        document.getElementById("message").innerText = value + " already exists!";
        return;
    }
    let node = {
        data: value,
        left: null,
        right: null
    };

    if (head == null) {

        head = node;

    } else {

        insertNode(head, node);

    }

    displayTree();

    document.getElementById("nodeValue").value = "";
}

function insertNode(root, node) {

    if (node.data < root.data) {

        if (root.left == null) {

            root.left = node;

        } else {

            insertNode(root.left, node);

        }

    } else {

        if (root.right == null) {

            root.right = node;

        } else {

            insertNode(root.right, node);

        }
    }
}

function displayTree() {
    let display = document.getElementById("list-display");
    display.innerHTML = "";
    if (head == null) return;

    // First calculate positions
    let positions = {};
    let nodeRadius = 25;
    let levelHeight = 80;
    let canvasWidth = 600;

    function calcPos(node, level, left, right) {
        if (!node) return;
        let x = (left + right) / 2; // center between left and right boundary
        let y = level * levelHeight + nodeRadius + 10; //how far down based on depth
        positions[node.data] = { x, y, node };
        calcPos(node.left, level + 1, left, (left + right) / 2); // left half
        calcPos(node.right, level + 1, (left + right) / 2, right); // right half
    }

    calcPos(head, 0, 0, canvasWidth);

    // Build SVG
    let svgLines = "";
    let svgCircles = "";

    for (let key in positions) {
        let { x, y, node } = positions[key];

        if (node.left && positions[node.left.data]) {
            let cx = positions[node.left.data].x;
            let cy = positions[node.left.data].y;
            svgLines += `<line x1="${x}" y1="${y}" x2="${cx}" y2="${cy}" stroke="lightblue" stroke-width="2"/>`;
        }
        if (node.right && positions[node.right.data]) {
            let cx = positions[node.right.data].x;
            let cy = positions[node.right.data].y;
            svgLines += `<line x1="${x}" y1="${y}" x2="${cx}" y2="${cy}" stroke="lightblue" stroke-width="2"/>`;
        }

        svgCircles += `
            <circle cx="${x}" cy="${y}" r="${nodeRadius}" fill="lightblue" stroke="black" stroke-width="2"/>
            <text x="${x}" y="${y+5}" text-anchor="middle" fill="white" font-weight="bold" font-size="13">${node.data}</text>
        `;
    }

    let maxY = 0;
    for (let key in positions){
        if (positions[key].y>maxY) maxY = positions[key].y;
    }
    display.innerHTML = `
        <svg width="${canvasWidth}" height="${maxY + 60}" style="overflow:visible">
            ${svgLines}
            ${svgCircles}
        </svg>
    `;
}


function inOrder() {

    let result = [];

    inorderTraversal(head, result);

    document.getElementById("message").innerHTML =
        "Inorder Traversal: " + result.join(" → ");
}

function inorderTraversal(root, result) {

    if (root != null) {

        inorderTraversal(root.left, result);

        result.push(root.data);

        inorderTraversal(root.right, result);
    }
}

function searchNode() {

    let value =
        Number(document.getElementById("nodeValue").value);

    let found = search(head, value);

    if (found) {

        document.getElementById("message").innerHTML =
            value + " Found";

    } else {

        document.getElementById("message").innerHTML =
            value + " Not Found";
    }
}

function search(root, value) {

    if (root == null) {
        return false;
    }

    if (root.data == value) {
        return true;
    }

    if (value < root.data) {

        return search(root.left, value);

    } else {

        return search(root.right, value);
    }
}