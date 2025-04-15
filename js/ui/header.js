import { loadFirstSearch } from '../logic/init.js'
import { searchPhotos } from '../services/api.js'
import { printItems } from './gallery.js'

export const headerTemplate = () => {
  return `
    <h1>INSPIREST</h1>
    <input type="text" placeholder="Buscar imágenes" id="searchinput" aria-label="Buscar imágenes"/>
    <button id="searchbtn" disabled aria-label="Buscar">
      <img src="./public/assets/icons/search.png" alt="Search icon"/>
    </button>
    <button id="darkmodebtn" aria-label="Modo oscuro">
      <img src="./public/assets/icons/dark.png" alt="Dark mode icon" id="darkmodeicon"/>
    </button>
    <img src="./public/assets/Images/images.png" alt="Profile image" class="profileimg" aria-label="Imagen de perfil" />
  `
}

export const themeSwitch = () => {
  document.body.classList.toggle('dark')
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark') ? 'dark' : 'light'
  )
}

const setupLogoClick = () => {
  const logo = document.querySelector('header h1')
  logo.style.cursor = 'pointer'
  logo.addEventListener('click', () => {
    loadFirstSearch()
  })
}

export const listeners = () => {
  const darkmodebtn = document.querySelector('#darkmodebtn')
  const darkmodeicon = document.querySelector('#darkmodeicon')
  const input = document.querySelector('#searchinput')
  const searchbtn = document.querySelector('#searchbtn')

  darkmodebtn.addEventListener('click', () => {
    themeSwitch()
    const isDark = document.body.classList.contains('dark')
    darkmodeicon.src = isDark
      ? '/assets/icons/light.png'
      : '/assets/icons/dark.png'
    darkmodeicon.alt = isDark ? 'Light mode icon' : 'Dark mode icon'
  })

  input.addEventListener('input', () => {
    searchbtn.disabled = !input.value.trim()
  })

  setupLogoClick()
}

export const printHeaderTemplate = () => {
  document.querySelector('header').innerHTML = headerTemplate()
  listeners()
}
