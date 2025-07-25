const inputForm = document.getElementById("form-catalogue");
const savebutt = document.getElementById("save-cata");
const tbody = document.getElementById("my-tbody");

let lst = [];

function getIn() {
    inputForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const inputTxt = document.getElementById("name-cata").value;
        if (inputTxt == "") return;
        if (lst.length > 0) {
            if (lst.includes(inputTxt)) {
                alert("Duplicate!");
                return;
            }
        }
        const row = document.createElement('tr');
        tbody.append(row);
        const nameCell = row.insertCell(0);
        const actionCell = row.insertCell(1);
        nameCell.textContent = inputTxt;
        lst.push(inputTxt);
        const removeBtn = document.createElement('button');
        removeBtn.addEventListener('click', () => {
            row.remove();
            const index = lst.indexOf(nameCell.textContent);
            lst.splice(index, 1);
        });
        removeBtn.textContent = 'Rermove';
        actionCell.append(removeBtn);
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        actionCell.append(editBtn);
        actionCell.style.display = 'flex';
        actionCell.style.gap = '9px';
        editBtn.onclick = () => editFunction(inputTxt);
        this.reset();
    });
}

function editFunction(name) {
    const newName = prompt();
    if (!newName) {
        return;
    }
    alert("Changed! ", newName);
    const rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].getElementsByTagName('td')[0].textContent == name) {
            rows[i].getElementsByTagName('td')[0].textContent = newName;
            break;
        }
    }
    lst[lst.indexOf(name)] = newName;
}

getIn();

savebutt.onclick = () => {
    if (lst.length < 1) {
        alert("List empty!");
        return;
    }
    localStorage.setItem("cata-data", JSON.stringify(lst));
    const json = localStorage.getItem('cata-data');
    parsed = JSON.parse(json);
    console.log(parsed);
    alert('Saved!');
};