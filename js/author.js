import { switchSection } from "./main.js";

export function renderAuthor(editId = null) {
    const container = document.getElementById("author-view");
    container.innerHTML = "";

    let capsule = null;
    if (editId) {
        capsule = JSON.parse(localStorage.getItem(`pc_capsule_${editId}`) || "null");
    }

    const meta = capsule?.meta || {};
    const notes = capsule?.notes?.join("\n") || "";
    const flashcards = capsule?.flashcards || [];
    const quiz = capsule?.quiz || [];

    container.innerHTML = `
    <div class="container-fluid p-2 p-md-3">
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h3 class="me-2">Author Capsule</h3>
            <div class="mt-2 mt-md-0">
                <button class="btn btn-secondary me-2 mb-1 mb-md-0" id="backBtn">← Back</button>
                <button class="btn btn-success" id="saveBtn">💾 Save</button>
            </div>
        </div>
        <p class="text-light mb-3">Draft notes, flashcards, and quizzes.</p>

        <div class="row g-3">
            <!-- Meta -->
            <div class="col-12 col-md-6">
                <div class="card bg-dark border border-white text-light p-3 h-100">
                    <h5>Meta</h5>
                    <label class="mt-2">Title</label>
                    <input id="meta-title" class="form-control w-100" value="${meta.title || ""}" />

                    <label class="mt-2">Subject</label>
                    <input id="meta-subject" class="form-control w-100" value="${meta.subject || ""}" />

                    <label class="mt-2">Level</label>
                    <select id="meta-level" class="form-select w-100">
                        <option ${meta.level === "Beginner" ? "selected" : ""}>Beginner</option>
                        <option ${meta.level === "Intermediate" ? "selected" : ""}>Intermediate</option>
                        <option ${meta.level === "Advanced" ? "selected" : ""}>Advanced</option>
                    </select>

                    <label class="mt-2">Description</label>
                    <textarea id="meta-description" rows="2" class="form-control w-100">${meta.description || ""}</textarea>
                </div>
            </div>

            <!-- Notes -->
            <div class="col-12 col-md-6">
                <div class="card bg-dark border border-white text-light p-3 h-100">
                    <h5>Notes <small class="text-light">(one idea per line)</small></h5>
                    <textarea id="notes" class="form-control w-100" rows="10" placeholder="Write notes here...">${notes}</textarea>
                </div>
            </div>
        </div>

        <div class="row g-3 mt-2">
            <!-- Flashcards -->
            <div class="col-12 col-md-6">
                <div class="card bg-dark border border-white text-light p-3 h-100">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5>Flashcards</h5>
                        <button id="addFlashcard" class="btn btn-sm btn-outline-info">+ Add</button>
                    </div>
                    <div id="flashcardsList" class="mt-2"></div>
                </div>
            </div>

            <!-- Quiz -->
            <div class="col-12 col-md-6">
                <div class="card bg-dark border border-white text-light p-3 h-100">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5>Quiz</h5>
                        <button id="addQuiz" class="btn btn-sm btn-outline-info">+ Add</button>
                    </div>
                    <div id="quizList" class="mt-2"></div>
                </div>
            </div>
        </div>
    </div>`;

}