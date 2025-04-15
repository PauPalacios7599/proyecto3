import { searchPhotos } from '../services/api.js'
import { cardTemplate } from './card.js'

export const galleryTemplate = () => {
  return `<ul class="gallery"></ul>`
}

export const printItems = (items) => {
  const gallery = document.querySelector('.gallery')
  let htmlContent = ''
  items.forEach((item) => {
    htmlContent += cardTemplate(item)
  })
  gallery.innerHTML = htmlContent
}

export const clearGallery = async () => {
  const gallery = document.querySelector('.gallery')
  const fallback = await searchPhotos('gatos')
  gallery.innerHTML =
    '<p>No se encontraron resultados. Aquí tienes unos gatitos:</p>'
  printItems(fallback.results)
}

export const galleryListeners = () => {
  const input = document.querySelector('#searchinput')
  const btn = document.querySelector('#searchbtn')

  const debounce = (func, delay) => {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), delay)
    }
  }

  const search = async () => {
    const keyword = input.value.trim()
    if (keyword) {
      const images = await searchPhotos(keyword)
      input.value = ''
      if (keyword.length > 2 && !localStorage.getItem('firstSearch')) {
        localStorage.setItem('firstSearch', keyword)
      }
      localStorage.setItem('lastSearch', keyword)
      if (images.results.length > 0) {
        printItems(images.results)
      } else {
        clearGallery()
      }
    } else {
      clearGallery()
    }
  }

  const debouncedSearch = debounce(search, 500)

  btn.addEventListener('click', debouncedSearch)
  input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      debouncedSearch()
    }
  })
}
