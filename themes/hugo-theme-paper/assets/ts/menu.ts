export default function () {
    const toggleMenu = document.getElementById('toggle-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    if (toggleMenu && mobileMenu) {
        toggleMenu.addEventListener('click', () => {
            const expanded = toggleMenu.classList.toggle('is-active');
            mobileMenu.classList.toggle('active');
            document.documentElement.classList.toggle('show-menu');
            document.body.classList.toggle('show-menu');
            toggleMenu.setAttribute('aria-expanded', String(expanded));
            mobileMenu.setAttribute('aria-hidden', String(!expanded));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu.classList.remove('is-active');
                mobileMenu.classList.remove('active');
                document.documentElement.classList.remove('show-menu');
                document.body.classList.remove('show-menu');
                toggleMenu.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                toggleMenu.focus();
            }
        });
    }
}
