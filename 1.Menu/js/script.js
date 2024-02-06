let activeElementId = '';

const makeupMenuItem = document.getElementById('makeup-menu-item');
const makeupItemChevronIcon = document.getElementById('makeup-item-chevron-icon');
const makeupSubmenu = document.getElementById('makeup-submenu');

const faceMenuItem = document.getElementById('face-menu-item');
const faceItemChevronIcon = document.getElementById('face-item-chevron-icon');
const faceSubmenu = document.getElementById('face-submenu');

makeupMenuItem.addEventListener('click', () => {
  if(activeElementId === 'makeup-menu-item') {
    activeElementId = '';
    makeupItemChevronIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    makeupSubmenu.classList.replace('menu__submenu--visible', 'menu__submenu--hidden');
  } else {
    activeElementId = 'makeup-menu-item';
    makeupItemChevronIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    makeupSubmenu.classList.replace('menu__submenu--hidden', 'menu__submenu--visible');
    faceItemChevronIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    faceSubmenu.classList.replace('menu__submenu--visible', 'menu__submenu--hidden');
  }
});

faceMenuItem.addEventListener('click', () => {
  if(activeElementId === 'face-menu-item') {
    activeElementId = '';
    faceItemChevronIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    faceSubmenu.classList.replace('menu__submenu--visible', 'menu__submenu--hidden');
  } else {
    activeElementId = 'face-menu-item';
    faceItemChevronIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    faceSubmenu.classList.replace('menu__submenu--hidden', 'menu__submenu--visible');
    makeupItemChevronIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    makeupSubmenu.classList.replace('menu__submenu--visible', 'menu__submenu--hidden');
  }
});

const menuItems = document.querySelectorAll('.menu__item');

menuItems.forEach(menuItem => {
  menuItem.addEventListener('click', () => {
    makeupItemChevronIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    makeupSubmenu.classList.replace('menu__submenu--visible', 'menu__submenu--hidden');
    faceItemChevronIcon.classList.replace('fa-chevron-up', 'fa-chevron-down'); 
    faceSubmenu.classList.replace('menu__submenu--visible', 'menu__submenu--hidden');
  });
});


