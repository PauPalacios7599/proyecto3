import './style.css'

// HEADER
const headerTemplate = () => {
  return `
    <h1>I</h1>
    <input type="text" placeholder="Buscar imágenes" id="searchinput"/>
    <button id="searchbtn"><img src="/icons/search.svg" alt="Search icon"/></button>
    <button id="darkmodebtn"><img src="/icons/dark.svg" alt="Dark mode icon" id="darkmodeicon"/></button>
    <img src="/images/profile.jpg" alt="Profile image" class="profileimg" /> 
  `
}

const themeSwitch = () => {
  document.body.classList.toggle('dark')
}

const listeners = () => {
  const darkmodebtn = document.querySelector('#darkmodebtn')
  darkmodebtn.addEventListener('click', () => {
    themeSwitch()
    const theme = document.body.classList.contains('dark')
    const darkmodeicon = document.querySelector('#darkmodeicon')
    darkmodeicon.src = theme ? '/icons/light.svg' : '/icons/dark.svg'
  })
}

const printHeaderTemplate = () => {
  document.querySelector('header').innerHTML = headerTemplate()
  listeners()
}

printHeaderTemplate()

// FOOTER
const templateFooter = () => {
  return `
    <h4>Copyright 2023 - Inspirest - Rock the Code</h4>
  `
}

const printFooterTemplate = () => {
  document.querySelector('footer').innerHTML = templateFooter()
}

printFooterTemplate()

// CARD TEMPLATE
const cardTemplate = (item) => {
  return `
    <li class="gallery-item" style="background-image: url(${item.urls.regular}); border: 10px solid ${item.color}">
      <div class="info">
        <div class="save-btn">
          <button>Guardar</button>
        </div>
        <div class="links">
          <a href="${item.links.html}" class="full-link">${item.links.html}</a>
          <div>
            <a href="${item.urls.full}" target="_blank" class="links-icon">
              <img src="/icons/upload.svg" alt="Upload icon"/>
            </a>
            <a href="#null" class="links-icon">
              <img src="/icons/more.svg" alt="More icon"/>
            </a>    
          </div>
        </div>
      </div>
    </li>
  `
}

// UNSPLASH API
const searchPhotos = async (keyword) => {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    keyword
  )}&client_id=${accessKey}&page=1&per_page=30`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText)
    }
    const data = await response.json()
    console.log('Datos de la API:', data) // Verifica la respuesta
    return data
  } catch (error) {
    console.error('Error fetching photos:', error)
    return { results: [] } // Retorna una respuesta vacía en caso de error
  }
}

// GALLERY
const galleryTemplate = () => {
  return `
    <ul class="gallery"></ul>
  `
}

const printItems = (items) => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = '' // Limpiar galería existente
  items.forEach((item) => {
    gallery.innerHTML += cardTemplate(item)
  })
}

const galleryListeners = async () => {
  const input = document.querySelector('#searchinput')
  const btn = document.querySelector('#searchbtn')

  const search = async () => {
    const keyword = input.value.trim()
    if (keyword) {
      const images = await searchPhotos(keyword)
      printItems(images.results)
    } else {
      printItems([]) // Limpiar la galería si no hay palabra clave
    }
  }

  btn.addEventListener('click', search)

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      search()
    }
  })
}

const printTemplate = async () => {
  document.querySelector('main').innerHTML = galleryTemplate()
  galleryListeners()

  const images = await searchPhotos('moon')
  printItems(images.results)
}

printTemplate()
