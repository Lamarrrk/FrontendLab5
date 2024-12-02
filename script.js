function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const group = document.getElementById('group').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const idCard = document.getElementById('idCard').value.trim();
    const faculty = document.getElementById('faculty').value.trim();
    const output = document.getElementById('output');

    let isValid = true;
    let errors = [];

    const nameRegex = /^[А-ЯІЇЄ][а-яіїє]+\s[А-ЯІЇЄ]\.[А-ЯІЇЄ]\.$/;
    if (!nameRegex.test(fullName)) {
        errors.push('Некоректний формат ПІБ (Приклад: Жереб К.А.)');
        isValid = false;
    }

    const groupRegex = /^[A-ZА-ЯІЇЄ]{2}-\d{2}$/;
    if (!groupRegex.test(group)) {
        errors.push('Некоректний формат групи (Приклад: ІМ-23)');
        isValid = false;
    }

    const phoneRegex = /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phone)) {
        errors.push('Некоректний формат телефону (Приклад: (123)-123-12-12)');
        isValid = false;
    }

    const idCardRegex = /^[A-ZА-ЯІЇЄ]{2}\s№\d{7}$/;
    if (!idCardRegex.test(idCard)) {
        errors.push('Некоректний формат ID-card (Приклад: ІD №1234567)');
        isValid = false;
    }

    if (!faculty) {
        errors.push('Поле не може бути порожнім');
        isValid = false;
    }

    if (isValid) {
        output.innerHTML = `<p class="success">Дані введено успішно!:</p>
        <p>ПІБ: ${fullName}</p>
        <p>Група: ${group}</p>
        <p>Телефон: ${phone}</p>
        <p>ID-card: ${idCard}</p>
        <p>Факультет: ${faculty}</p>`;

        openTableInNewWindow();
    } else {
        output.innerHTML = `<p class="error">${errors.join('<br>')}</p>`;
    }
}

function openTableInNewWindow() {
    const width = 300;
    const height = 300;

    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const newWindow = window.open('', '_blank', `width=${width},height=${height},top=${top},left=${left}`);

    newWindow.document.body.innerHTML = `
        <h2>Тицніть на 2</h2>
        <div id="tableContainer"></div>
    `;

    const tableContainer = newWindow.document.getElementById('tableContainer');
    tableContainer.innerHTML = `
        <table id="colorTable">
            <tbody></tbody>
        </table>
    `;
    createTableInNewWindow(newWindow); 
    handleTableEventsInNewWindow(newWindow);
}

function createTableInNewWindow(newWindow) {
    const table = newWindow.document.getElementById('colorTable').getElementsByTagName('tbody')[0];

    for (let row = 0; row < 6; row++) {
        let tr = newWindow.document.createElement('tr');
        for (let col = 0; col < 6; col++) {
            let td = newWindow.document.createElement('td');
            td.innerText = row * 6 + col + 1;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function handleTableEventsInNewWindow(newWindow) {
    const secondCell = newWindow.document.querySelector('#colorTable td:nth-child(2)');
    let selectedColor = "#FF6347";

    secondCell.addEventListener('mouseenter', () => {
        secondCell.style.backgroundColor = getRandomColor();
    });

    secondCell.addEventListener('click', (e) => {
        if (e.target.querySelector('input[type="color"]')) return;

        const colorPickerContainer = newWindow.document.createElement('div');
        colorPickerContainer.style.position = 'absolute';
        colorPickerContainer.style.top = '0';
        colorPickerContainer.style.left = '0';
        colorPickerContainer.style.zIndex = '10';

        const colorPicker = newWindow.document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = selectedColor;
        colorPicker.style.width = '30px';
        colorPicker.style.height = '30px';

        colorPickerContainer.appendChild(colorPicker);
        e.target.appendChild(colorPickerContainer);

        colorPicker.addEventListener('input', (e) => {
            selectedColor = e.target.value;
            e.target.closest('td').style.backgroundColor = selectedColor;

            e.target.closest('td').removeChild(colorPickerContainer);
        });
    });

    secondCell.addEventListener('dblclick', () => {
        const columnIndex = Array.from(secondCell.parentElement.children).indexOf(secondCell);
        const allRows = newWindow.document.querySelectorAll('#colorTable tr');
        allRows.forEach(row => {
            row.children[columnIndex].style.backgroundColor = selectedColor;
        });
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}






