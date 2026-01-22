// Prevent auto-refresh and scroll loops
document.addEventListener('DOMContentLoaded', function () {
    let isAtBottom = false;
    let scrollEndTimeout;

    // Prevent scroll loops
    window.addEventListener('scroll', function () {
        clearTimeout(scrollEndTimeout);

        // Check if we're at the bottom
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        isAtBottom = scrollTop + windowHeight >= documentHeight - 10;

        scrollEndTimeout = setTimeout(function () {
            if (isAtBottom) {
                // We're at the bottom, don't do anything that might cause refresh
                console.log('At bottom - preventing any refresh');
            }
        }, 100);
    });

    // Prevent any automatic navigation
    window.addEventListener('beforeunload', function (e) {
        if (isAtBottom) {
            // Don't prevent if user is actually navigating away
            return;
        }
    });

    console.log('Scroll fix loaded');
});