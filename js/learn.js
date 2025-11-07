export function renderLearn(selectedId = null) {
    const container = document.getElementById("learn-view");
    if (!container) return;

    const capsules = JSON.parse(localStorage.getItem("pc_capsules_index") || "[]");
    if (capsules.length === 0) {
        container.innerHTML = `
            <div class="text-center text-light p-5">
                <p>No capsules found.</p>
                <p><a href="#" data-view="author" class="btn btn-outline-light btn-sm">Create your first capsule</a></p>
            </div>`;
        return;
    }

    let currentId = selectedId != null ? String(selectedId) : (capsules.length > 0 ? capsules[0].id : null);
    let capsuleData = currentId ? loadCapsule(currentId) : null;

    container.innerHTML = `
        <div class="p-4 text-light">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3 class="fw-bold">Learn</h3>
                <div class="d-flex gap-2 align-items-center">
                    <select id="capsuleSelector" class="form-select bg-dark text-light">
                        ${capsules.map(c => `<option value="${c.id}" ${c.id === currentId ? 'selected' : ''}>${c.title}</option>`).join("")}
                    </select>
                    <button id="exportCapsule" aria-label="Export JSON" class="btn btn-outline-light btn-sm">Export</button>
                </div>
            </div>

            <p class="text-light mb-4">Study a capsule in Notes, Flashcards, or Quiz mode.</p>

            <!-- Tabs -->
            <ul class="nav nav-tabs mb-3" id="learnTabs">
                <li class="nav-item"><a class="nav-link active" data-mode="notes" href="#">Notes</a></li>
                <li class="nav-item"><a class="nav-link" data-mode="flashcards" href="#">Flashcards</a></li>
                <li class="nav-item"><a class="nav-link" data-mode="quiz" href="#">Quiz</a></li>
            </ul>

            <!-- Content area -->
            <div id="learnContent" class="mt-3"></div>
        </div>
    `;

}