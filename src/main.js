import router from './router.js';

router.add('home');
router.add('universe');
router.add('exploration');
router.add('404');
router.handle();

window.onpopstate = () => router.handle();
window.route = () => router.route();
