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
}