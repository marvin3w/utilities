document.addEventListener('DOMContentLoaded', () => {
    const contentTexts = document.querySelectorAll('.content-text, .title-wrapper');
    
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const strongElements = entry.target.querySelectorAll('strong');
                strongElements.forEach((strong, index) => {
                    setTimeout(() => {
                        strong.closest('p, h2').classList.add('highlight-animate');
                    }, index * 500);
                });
                highlightObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    
    contentTexts.forEach(content => highlightObserver.observe(content));
});