import * as elements from './elements.js';

import state from './state.js';

class Router {
  page = {};

  add(name) {
    const route = name !== 'home' ? `/${name}` : '/';

    this.page[route] = {
      route: `/pages/${name}.html`,
      backgroundImageClassName: name !== '404' ? name : 'home',
      mainClassName: name !== 'home' ? 'content' : 'main',
    };
  }

  route(event) {
    event = event || window.event;

    event.preventDefault();

    window.history.pushState({}, '', event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const { route, backgroundImageClassName, mainClassName } =
      this.page[pathname] || this.page['/404'];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        elements.main.innerHTML = html;
        elements.main.className = mainClassName;
        elements.body.className = backgroundImageClassName;
      });

    Object.values(elements.menuItems)
      .filter((e) => e.pathname === state.menu)
      .forEach((e) => e.classList.remove('menu-item-selected'));

    Object.values(elements.menuItems)
      .filter((e) => e.pathname === pathname)
      .forEach((e) => e.classList.add('menu-item-selected'));

    state.menu = pathname;
  }
}

export default new Router();
