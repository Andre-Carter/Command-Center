const KeyboardShortcuts = (function() {
    const shortcuts = {};

    function addShortcut(keyCombo, callback) {
        shortcuts[keyCombo] = callback;
    }

    function handleKeydown(event) {
        const keyCombo = 
            `${event.ctrlKey ? 'Ctrl+' : ''}${event.shiftKey ? 'Shift+' : ''}${event.altKey ? 'Alt+' : ''}${event.key}`;

        if(shortcuts[keyCombo]) {
            event.preventDefault();
            shortcuts[keyCombo]();
        }
    }

    function init() {
        document.addEventListener('keydown', handleKeydown);
    }

    return {
        addShortcut,
        init
    };
})();

export default KeyboardShortcuts;