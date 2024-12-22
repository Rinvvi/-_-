// Fetch and display the list of services
fetch('/api/services')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch services.');
        }
        return response.json();
    })
    .then(data => {
        const servicesList = document.getElementById('services-list');
        data.forEach(service => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${service.name}: ${service.description} - ${service.price} руб`;
            servicesList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error fetching services:', error);
        alert('Ошибка загрузки списка услуг.');
    });

// Handle form submission
document.getElementById('request-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    fetch('/api/requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => {
        if (response.ok) {
            alert('Запрос отправлен!');
            document.getElementById('request-form').reset();
        } else {
            return response.json().then(errorData => {
                const errorMessage = errorData.message || 'Ошибка при отправке запроса.';
                throw new Error(errorMessage);
            });
        }
    })
    .catch(error => {
        console.error('Error submitting request:', error);
        alert(error.message);
    });
});
