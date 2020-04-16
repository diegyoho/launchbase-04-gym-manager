const currentLocation = window.location.pathname
const menuItens = document.querySelectorAll('header a')

for (const item of menuItens) {
    if (currentLocation.includes(item.getAttribute('href')))
        item.classList.add('active')
}