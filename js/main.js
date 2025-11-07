import { renderLibrary } from './library.js';
import { renderAuthor } from './author.js';
import { renderLearn } from './learn.js';

const views = {
    library: document.getElementById('library-view'),
    author: document.getElementById('author-view'),
    learn: document.getElementById('learn-view'),
};

// Save current ID
window.currentLearnId = null;

// Navigation between tabs
document.querySelectorAll('[data-view]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = e.target.getAttribute('data-view');
        showView(target);
    });
});