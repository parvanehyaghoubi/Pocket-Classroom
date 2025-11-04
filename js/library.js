import { exportCapsule } from './storage.js';
import { timeAgo } from './utils.js';
import { switchSection } from './main.js';
import { renderLearn } from "./learn.js";

window.addEventListener("capsuleProgressUpdated", renderLibrary);

const container = document.getElementById('library-view');

export function renderLibrary() {
    const index = JSON.parse(localStorage.getItem('pc_capsules_index') || '[]');

    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'library-wrapper p-3 rounded-3';
    wrapper.style.backgroundColor = '#161b22';
    wrapper.style.border = '1px solid #30363d';
    wrapper.style.color = '#e6edf3';

}