const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const postsApi = {
  // GET - загружаем 100 заметок
  async fetchAllPosts(countPosts) {
    const response = await fetch(`${BASE_URL}/posts?_limit=${countPosts}`);
    if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
    const posts = await response.json();
    return posts.map((p) => ({
      id: p.id,
      title: p.title,
      content: p.body,
      createdAt: new Date().toLocaleDateString('ru-RU'),
    }));
  },

  // POST - имитация создания
  async createPost({ title, content }) {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body: content, userId: 1 }),
    });
    if (!response.ok) throw new Error(`Ошибка создания: ${response.status}`);
    return {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toLocaleString('ru-RU'),
    };
  },

  // PUT /posts/id - имитация обновления
  async updatePost({ id, title, content }) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, body: content, userId: 1 }),
    });
    if (!response.ok) throw new Error(`Ошибка обновления: ${response.status}`);
    return { id, title, content };
  },

  // DELETE /posts/id - имитация удаления
  async deletePost(id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Ошибка удаления: ${response.status}`);
    return true;
  },
};