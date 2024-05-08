const Login = () => {

    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        try{
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username})
            });

            const data = await response.json();
            if(response.status === 200){
                console.log('Login successful', data);
                // Redirect to the game page
            } else {
                console.log('Login failed', data.message);
            }
        } catch (error) {
            console.log('Login failed', error);
        }
};


