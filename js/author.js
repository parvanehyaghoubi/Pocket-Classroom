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

}