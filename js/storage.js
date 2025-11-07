export function loadCapsuleIndex() {
    try {
        return JSON.parse(localStorage.getItem('pc_capsules_index')) || [];
    } catch (e) {
        console.error('Failed to parse index', e);
        return [];
    }
}

export function saveCapsuleIndex(index) {
    localStorage.setItem('pc_capsules_index', JSON.stringify(index));
}

export function deleteCapsule(id) {
    const index = loadCapsuleIndex().filter(c => c.id !== id);
    saveCapsuleIndex(index);
    localStorage.removeItem(`pc_capsule_${id}`);
    localStorage.removeItem(`pc_progress_${id}`);
}