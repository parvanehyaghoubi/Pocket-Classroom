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

    wrapper.innerHTML = `
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div class="mb-3 mb-md-0">
                <h3 class="mb-2 fs-5 fw-semibold">Your Capsules</h3>
                <p class="text-light mb-0" style="font-size: 0.9rem;">
                    Create, import, export, and manage learning capsules. All data stays in your browser.
                </p>
            </div>
            <div class="d-flex flex-column flex-sm-row gap-2">
                <button class="btn btn-success px-3 py-2 mb-2 mb-sm-0" id="new-capsule-btn" aria-label="New Capsule">➕ New Capsule</button>
                <button class="btn btn-outline-light px-3 py-2" id="import-json-btn" aria-label="Import JSON">⬆ Import JSON</button>
            </div>
        </div>
    `;

    if (!index.length) {
        wrapper.innerHTML += `
            <div class="text-center text-light py-5">
                <p>No capsules yet. Click <strong>New Capsule</strong> to create one!</p>
            </div>
        `;
        container.appendChild(wrapper);
        attachTopButtons();
        return;
    }
    
}