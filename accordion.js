let currentJson = '';

async function checkUpdates() {
    try {
        const response = await fetch('get_data.php?t=' + Date.now());
        const data = await response.json();
        const newJson = JSON.stringify(data);
        
        if (newJson !== currentJson) {
            currentJson = newJson;
            renderAccordion(data);
        }
        document.getElementById('last-update').textContent = new Date().toLocaleTimeString();
    } catch (error) {
        console.error("Error:", error);
    }
}

function renderAccordion(items) {
    const root = document.getElementById('accordion-root');
    root.innerHTML = '';

    if (!items || items.length === 0) {
        root.innerHTML = '<p>Немає даних.</p>';
        return;
    }

    items.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.className = 'accordion-item';

        const header = document.createElement('div');
        header.className = 'accordion-header';
        header.textContent = item.title;

        const body = document.createElement('div');
        body.className = 'accordion-body';
        const p = document.createElement('p');
        p.textContent = item.content;
        body.appendChild(p);

        header.onclick = () => {
            header.classList.toggle('active');
            if (header.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        };

        wrapper.appendChild(header);
        wrapper.appendChild(body);
        root.appendChild(wrapper);
    });
}

checkUpdates();
setInterval(checkUpdates, 3000);