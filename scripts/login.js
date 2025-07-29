async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = '../pages/posts.html';
    } else {
      alert('Usuário ou senha incorreto');
    }
  } catch (error) {
    console.error('Erro ao logar:', error);
    alert('Erro ao fazer login');
  }
}


document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  login();
});
