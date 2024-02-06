const themeToggleButton = document.getElementById('theme-toggle');
let blogPosts = [
    {
        title: "Blog Post Title 1",
        content: "This is the content of blog post 1.",
        likes: 0,
        comments: []
    },
    {
        title: "Blog Post Title 2",
        content: "This is the content of blog post 2.",
        likes: 0,
        comments: []
    }
];

function renderBlogPosts() {
    const blogSection = document.getElementById('blog');
    blogSection.innerHTML = '';
    blogPosts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="likePost(${index})">Like (${post.likes})</button>
            <input type="text" id="comment-input-${index}">
            <button onclick="addComment(${index})">Add Comment</button>
            <div id="comments-${index}"></div>
            <button onclick="resetPost(${index})">Reset Post</button>
        `;
        blogSection.appendChild(postElement);
        renderComments(index);
    });
}

function likePost(index) {
    blogPosts[index].likes += 1;
    saveBlogPosts();
    renderBlogPosts();
}

function resetPost(index) {
    blogPosts[index].likes = 0;
    blogPosts[index].comments = [];
    saveBlogPosts();
    renderBlogPosts();
}

function saveBlogPosts() {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

function loadBlogPosts() {
    const savedPosts = localStorage.getItem('blogPosts');
    return savedPosts ? JSON.parse(savedPosts) : blogPosts;
}

function renderComments(postIndex) {
    const commentsSection = document.getElementById(`comments-${postIndex}`);
    commentsSection.innerHTML = '';
    blogPosts[postIndex].comments.forEach(comment => {
        const commentElement = document.createElement('p');
        commentElement.textContent = comment;
        commentsSection.appendChild(commentElement);
    });
}

function addComment(postIndex) {
    const commentInput = document.getElementById(`comment-input-${postIndex}`);
    if (commentInput.value) {
        blogPosts[postIndex].comments.push(commentInput.value);
        commentInput.value = '';
        saveBlogPosts();
        renderBlogPosts();
    }
}

function toggleTheme() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    themeToggleButton.addEventListener('click', toggleTheme);
    blogPosts = loadBlogPosts();
    renderBlogPosts();
});
