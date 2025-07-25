
const addButt = document.getElementById("add-butt");
const addProductForm = document.getElementById("add-product-form");
const tbody = document.getElementById("my-tbody");
let id = 0;
let cataLst = [];
setCata();

function addFunc() {
    addProductForm.addEventListener('submit', function (e) {
        e.preventDefault();
        ++id;
        const inputTxt = document.getElementById("name-product-in").value;
        if (inputTxt == "") return;

        const newRow = document.createElement('tr');
        const nameCell = newRow.insertCell(0);
        const actionCell = newRow.insertCell(1);
        const numberCell = newRow.insertCell(2);
        const cataCell = newRow.insertCell(3)
        const removeButt = document.createElement('button');
        removeButt.textContent = 'Remove';
        const editButt = document.createElement('button');
        editButt.textContent = 'Edit';
        nameCell.textContent = inputTxt;
        numberCell.textContent = id;
        const selection = document.createElement('select');
        if (cataLst.length > 0 && cataLst) {
            for (let i = 0; i < cataLst.length; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = cataLst[i];
                selection.appendChild(option);
            }
        }
        cataCell.appendChild(selection);
        removeButt.onclick = () => {
            newRow.remove();
        };
        editButt.setAttribute('data-id', id);
        editButt.onclick = () => editFunction(editButt.getAttribute('data-id'));
        actionCell.append(removeButt);
        actionCell.append(editButt);
        actionCell.style.display = 'flex';
        actionCell.style.gap = '6px';
        tbody.append(newRow);
        this.reset();
    })

}

function editFunction(index) {
    const name = prompt("Enter new name:");
    if (!name) {
        return;
    }
    const rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].getElementsByTagName('td')[2].textContent == index) {
            rows[i].getElementsByTagName('td')[0].textContent = name;
            return;
        }
    }
    alert("Done! " + name);
}
addFunc();
let nameLst = [];
function saveFunc() {
    // localStorage.clear();
    const rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        nameLst.push(rows[0].getElementsByTagName('td')[0]);
    }
    localStorage.setItem('data', JSON.stringify(nameLst));
    const json = localStorage.getItem('data');
    const parsed = JSON.parse(json);
    console.log(parsed);
    alert("Saved!");
}
const saveBtn = document.getElementById("save-btn");
saveBtn.onclick = saveFunc;


function loadCataData() {
    const jsn = localStorage.getItem('cata-data');
    if (!jsn) return [];
    try {
        return JSON.parse(jsn);
    }
    catch (e) {
        console.error("Lỗi parse JSON:", e);
        return [];
    }
}

function setCata() {
    const getLst = loadCataData();
    cataLst = getLst;
}
const gotoButt = document.getElementById('goto-page2');
gotoButt.onclick = () => {
    window.location.href = 'index2.html';
};