import './style.css'

// HEADER
const headerTemplate = () => {
  return `
    <h1>I</h1>
    <input type="text" placeholder="Buscar imágenes" id="searchinput"/>
    <button id="searchbtn" disabled><img src="/icons/search.svg" alt="Search icon"/></button>
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

  // Disable search button if input is empty
  const input = document.querySelector('#searchinput')
  const searchbtn = document.querySelector('#searchbtn')
  input.addEventListener('input', () => {
    searchbtn.disabled = !input.value.trim()
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
    <li class="gallery-item" style="background-image: url(${
      item.urls.regular
    }); border: 10px solid ${item.color}">
      <img src="${item.urls.regular}" alt="${
    item.alt_description || 'Unsplash image'
  }" class="hidden-img"/>
      <div class="info">
        <div class="save-btn">
          <button>Guardar</button>
        </div>
        <div class="links">
          <a href="${item.links.html}" class="full-link" target="_blank">${
    item.links.html
  }</a>
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
  // API Key directamente en el código (temporalmente)
  const accessKey = ' F4TfQAyYMVhCDZ32xnMtTND3YFFi1jCrJf-1yfY8gl4' // Coloca tu API Key aquí
  // URL de la API sin encodeURIComponent
  const url = `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${accessKey}&page=1&per_page=30`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText)
    }
    const data = await response.json()
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
  let htmlContent = '' // Crear una variable para almacenar el contenido HTML
  items.forEach((item) => {
    htmlContent += cardTemplate(item)
  })
  gallery.innerHTML = htmlContent // Asignar el HTML completo una vez
}

// Limpieza de galería
const clearGallery = () => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML =
    '<p>No se encontraron resultados. Intenta con otra palabra clave.</p>'
}

const galleryListeners = async () => {
  const input = document.querySelector('#searchinput')
  const btn = document.querySelector('#searchbtn')

  const search = async () => {
    const keyword = input.value.trim()
    if (keyword) {
      const images = await searchPhotos(keyword)
      if (images.results.length > 0) {
        printItems(images.results)
      } else {
        clearGallery() // Mostrar un mensaje si no hay resultados
      }
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

  // Mensaje inicial de bienvenida en lugar de imágenes por defecto
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML =
    '<p>Bienvenido. Usa la barra de búsqueda para encontrar imágenes.</p>'
}

printTemplate()
