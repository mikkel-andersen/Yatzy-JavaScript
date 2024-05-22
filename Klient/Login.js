window.login = function() {
    const username = document.getElementById('player-name').value;

    fetch('http://localhost:6677/add-player', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'player-name': username})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Login successful', data);
    })
    .catch(error => {
        console.log('Login failed', error);
    });
}