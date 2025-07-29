// Verifica se o usuário está logado
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}

const postsContainer = document.getElementById('postsContainer');
const searchInput = document.getElementById('searchInput');
const postModal = document.getElementById('postModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

// Busca os posts da API JSONPlaceholder
let allPosts = [];

async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    allPosts = data;
    renderPosts(data);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    postsContainer.innerHTML = '<p>Erro ao carregar posts.</p>';
  }
}

function renderPosts(posts) {
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `<h3>${post.title}</h3>`;
    card.addEventListener('click', () => showModal(post));
    postsContainer.appendChild(card);
  });
}

function showModal(post) {
  modalTitle.textContent = post.title;
  modalBody.textContent = post.body;
  postModal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
  postModal.classList.add('hidden');
});

// Busca em tempo real
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm)
  );
  renderPosts(filtered);
});

// Logout
document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
});

// Inicia
fetchPosts();
