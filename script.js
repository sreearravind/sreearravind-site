'use strict';
// Enhance the fully readable HTML. All publications remain accessible without JS.
const filters = [...document.querySelectorAll('.tabs button')];
const publications = [...document.querySelectorAll('.publication')];
const count = document.querySelector('#publication-count');
function filterPublications(button) {
  const category = button.dataset.category;
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  let visible = 0;
  publications.forEach(item => {
    const show = category === 'all' ? item.dataset.category !== 'review' : item.dataset.category === category;
    item.hidden = !show;
    if (show) visible++;
  });
  count.textContent = `${visible} ${category === 'review' ? 'manuscripts under review · status: 26 October 2026' : 'published works'}`;
}
const tabs = document.querySelector('.tabs');
tabs.hidden = false;
tabs.setAttribute('role', 'tablist');
document.querySelector('#publication-list').setAttribute('role', 'tabpanel');
filters.forEach((button, index) => {
  button.setAttribute('role', 'tab');
  button.id = `publication-tab-${index}`;
  button.setAttribute('aria-controls', 'publication-list');
  button.addEventListener('click', () => {
    filterPublications(button);
    document.querySelector('#publication-list').setAttribute('aria-labelledby', button.id);
  });
  button.addEventListener('keydown', event => {
    let next;
    if(event.key === 'ArrowRight') next = (index + 1) % filters.length;
    if(event.key === 'ArrowLeft') next = (index - 1 + filters.length) % filters.length;
    if(event.key === 'Home') next = 0;
    if(event.key === 'End') next = filters.length - 1;
    if(next !== undefined) { event.preventDefault(); filters[next].focus(); filters[next].click(); }
  });
});
filters[0].click();
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav-links');
menu.hidden = false;
const smallScreen = window.matchMedia('(max-width: 680px)');
function closeMenu() { nav.classList.toggle('is-collapsed', smallScreen.matches); menu.setAttribute('aria-expanded', String(!smallScreen.matches)); }
closeMenu();
smallScreen.addEventListener('change', closeMenu);
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-collapsed', !open); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
menu.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
