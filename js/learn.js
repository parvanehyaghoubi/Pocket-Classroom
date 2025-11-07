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

    const selector = container.querySelector("#capsuleSelector");
    const content = container.querySelector("#learnContent");
    const tabs = container.querySelectorAll("#learnTabs .nav-link");
    const exportBtn = container.querySelector("#exportCapsule");

    // Capsule Selector
    selector.addEventListener("change", (e) => {
        currentId = e.target.value;
        window.currentLearnId = currentId;
        capsuleData = loadCapsule(currentId);

        const activeTab = container.querySelector("#learnTabs .nav-link.active").dataset.mode;
        if (activeTab === "notes") renderNotes();
        else if (activeTab === "flashcards") renderFlashcards();
        else renderQuiz();
    });

    // Tabs 
    tabs.forEach(tab => {
        tab.addEventListener("click", e => {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const mode = tab.dataset.mode;
            if (mode === "notes") renderNotes();
            else if (mode === "flashcards") renderFlashcards();
            else renderQuiz();
        });
    });

    // Export
    exportBtn.addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(capsuleData, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${capsuleData.meta?.title || "capsule"}.json`;
        a.click();
    });

    // Notes
    function renderNotes() {
        const notes = capsuleData.notes || [];

        if (notes.length === 0) {
            content.innerHTML = `<p class="text-light">No notes found for this capsule.</p>`;
            return;
        }

        content.innerHTML = `
            <input type="text" id="noteSearch" class="form-control bg-dark text-light mb-1" placeholder="Search notes...">
            <small class="text-light d-block mb-3">
                This notes belong to capsule <strong>Web Development Course</strong> 
                with <strong>Advanced</strong> level.
            </small>
            <ol id="noteList" class="list-group list-group-numbered"></ol>
        `;

        const list = content.querySelector("#noteList");
        const search = content.querySelector("#noteSearch");

        const renderList = (filter = "") => {
            const f = filter.toLowerCase();
            list.innerHTML = notes
                .filter(n => n && n.toLowerCase().includes(f))
                .map(n => `<li class="list-group-item bg-dark text-light border-secondary">${n}</li>`)
                .join("");
        };

        search.addEventListener("input", e => renderList(e.target.value));
        renderList();
    }

    // Flashcard
    function renderFlashcards() {
        const cards = capsuleData.flashcards || [];
        if (cards.length === 0) {
            content.innerHTML = `<p class="text-light">No flashcards available.</p>`;
            return;
        }

        let index = 0;
        let flipped = false;
        const knownSet = JSON.parse(localStorage.getItem(`known_${currentId}`) || "[]");

        const sections = ["notes", "flashcards", "quiz"];
        let currentSectionIndex = 1;

        const setActiveTab = (sectionName) => {
            const tabs = document.querySelectorAll(".nav-link");
            tabs.forEach(tab => {
                if (tab.dataset.section === sectionName) {
                    tab.classList.add("active");
                } else {
                    tab.classList.remove("active");
                }
            });
        };

        const renderCard = () => {
            const c = cards[index];
            const known = knownSet.includes(index);

            content.innerHTML = `
                <div class="text-center">
                    <div class="flashcard-container mb-3" style="perspective: 1000px; cursor:pointer;">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <h5 style="user-select:none; color:#000;">${c.front}</h5>
                            </div>
                            <div class="flashcard-back">
                                <h5 style="user-select:none; color:#000;">${c.back}</h5>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between mt-2">
                        <button id="prevCard" aria-label="Previous Flashcard" class="btn btn-danger btn-sm">Prev</button>
                        <div>
                            <button id="markKnown" class="btn ${known ? 'btn-success' : 'btn-outline-success'} btn-sm me-2">
                                ${known ? 'Known ✓' : 'Mark Known'}
                            </button>
                            <button id="nextCard" aria-label="Next Flashcard" class="btn btn-danger btn-sm">Next</button>
                        </div>
                    </div>
                    <p class="text-light mt-2">Card ${index + 1} / ${cards.length}</p>
                </div>
            `;

            const flashcardInner = content.querySelector(".flashcard-inner");
            const flashcardContainer = content.querySelector(".flashcard-container");

            flashcardContainer.onclick = () => {
                flipped = !flipped;
                flashcardInner.style.transform = flipped ? "rotateY(180deg)" : "rotateY(0deg)";
            };

            content.querySelector("#prevCard").onclick = () => {
                index = (index - 1 + cards.length) % cards.length;
                flipped = false;
                renderCard();
            };
            content.querySelector("#nextCard").onclick = () => {
                index = (index + 1) % cards.length;
                flipped = false;
                renderCard();
            };

            content.querySelector("#markKnown").onclick = () => {
                const known = knownSet.includes(index);
                if (known) {
                    const idx = knownSet.indexOf(index);
                    if (idx >= 0) knownSet.splice(idx, 1);
                    cards[index].known = false;
                } else {
                    knownSet.push(index);
                    cards[index].known = true;
                }

                localStorage.setItem(`known_${currentId}`, JSON.stringify(knownSet));

                try {
                    const capsuleKey = `pc_capsule_${currentId}`;
                    const capsule = JSON.parse(localStorage.getItem(capsuleKey) || "{}");
                    capsule.flashcards = cards;
                    capsule.updatedAt = new Date().toISOString();
                    localStorage.setItem(capsuleKey, JSON.stringify(capsule));
                } catch (err) {
                    console.warn("Failed to update capsule in localStorage:", err);
                }

                try {
                    const indexList = JSON.parse(localStorage.getItem("pc_capsules_index") || "[]");
                    const idx = indexList.findIndex(c => String(c.id) === String(currentId));
                    if (idx >= 0) {
                        indexList[idx].knownCards = knownSet.length;
                        indexList[idx].updatedAt = new Date().toISOString();
                        localStorage.setItem("pc_capsules_index", JSON.stringify(indexList));
                    }
                } catch (err) {
                    console.warn("Failed to update pc_capsules_index:", err);
                }

                window.dispatchEvent(new Event("capsuleProgressUpdated"));

                renderCard();
            };
        };
    }
}