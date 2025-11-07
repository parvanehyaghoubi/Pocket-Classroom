export function loadCapsuleIndex() {
    try {
        return JSON.parse(localStorage.getItem('pc_capsules_index')) || [];
    } catch (e) {
        console.error('Failed to parse index', e);
        return [];
    }
}