const currentLocation = window.location.pathname
const menuItens = document.querySelectorAll('header a')

for (const item of menuItens) {
    if (currentLocation.includes(item.getAttribute('href')))
        item.classList.add('active')
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; ++currentPage) {

        const startAndEnd = currentPage <= 2 || currentPage > totalPages - 2
        const pagesBeforeSelected = currentPage >= selectedPage - 1
        const pagesAfterSelected = currentPage <= selectedPage + 1

        if (startAndEnd || pagesBeforeSelected && pagesAfterSelected) {

            if (oldPage && currentPage - oldPage > 2)
                pages.push('...')
            else if (oldPage && currentPage - oldPage === 2)
                pages.push(currentPage - 1)

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

function createPagination(pagination) {
    const page = parseInt(pagination.dataset.page)
    const total = parseInt(pagination.dataset.total)
    const filter = pagination.dataset.filter

    const pages = paginate(page, total)

    let elements = ``

    for (let page of pages) {
        if (!String(page).includes('...'))
            if (filter)
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            else
                elements += `<a href="?page=${page}">${page}</a>`
        else
            elements += `<span>${page}</span>`
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if (pagination)
    createPagination(pagination)