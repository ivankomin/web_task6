let accordionData = [];

function addItem() {
    const titleInput = document.getElementById('acc-title');
    const contentInput = document.getElementById('acc-content');
    
    if(!titleInput.value || !contentInput.value) {
        alert("Заповніть обидва поля!");
        return;
    }

    accordionData.push({ 
        title: titleInput.value, 
        content: contentInput.value 
    });
    
    renderPreview();
    titleInput.value = '';
    contentInput.value = '';
}

function renderPreview() {
    const list = document.getElementById('preview-list');
    list.innerHTML = '';
    accordionData.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${item.title}`;
        list.appendChild(li);
    });
}

async function saveToServer() {
    const status = document.getElementById('status-msg');
    status.textContent = "Збереження...";
    status.style.color = "blue";
    
    try {
        const response = await fetch('save_data.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(accordionData)
        });
        const result = await response.json();
        
        if(result.status === 'success') {
            status.textContent = "Дані збережено!";
            status.style.color = "green";
        } else {
            status.textContent = "Помилка сервера";
            status.style.color = "red";
        }
    } catch (e) {
        console.error(e);
        status.textContent = "Помилка запиту";
        status.style.color = "red";
    }
}