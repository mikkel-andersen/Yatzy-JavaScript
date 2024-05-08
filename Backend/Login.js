function login() {
    const username = document.getElementById('player-name').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        if(response.status === 200){
            console.log('Login successful', data);
            // Redirect to the game page
        } else {
            console.log('Login failed', data.message);
        }
    })
    .catch(error => {
        console.log('Login failed', error);
    });
}

