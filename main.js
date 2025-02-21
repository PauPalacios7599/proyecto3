// HEADER
const headerTemplate = () => {
  return `
    <h1>INSPIREST</h1>
    <input type="text" placeholder="Buscar imágenes" id="searchinput" aria-label="Buscar imágenes"/>
    <button id="searchbtn" disabled aria-label="Buscar"><img src="./public/assets/icons/search.png" alt="Search icon"/></button>
    <button id="darkmodebtn" aria-label="Modo oscuro">
      <img src="./public/assets/icons/dark.png" alt="Dark mode icon" id="darkmodeicon"/>
    </button>
    <img src="./public/assets/Images/images.png" alt="Profile image" class="profileimg" aria-label="Imagen de perfil" /> 
  `
}

const themeSwitch = () => {
  document.body.classList.toggle('dark')
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark') ? 'dark' : 'light'
  )
}

const listeners = () => {
  const darkmodebtn = document.querySelector('#darkmodebtn')
  darkmodebtn.addEventListener('click', () => {
    themeSwitch()
    const theme = document.body.classList.contains('dark')
    const darkmodeicon = document.querySelector('#darkmodeicon')

    if (theme) {
      darkmodeicon.src = '/assets/icons/light.png'
      darkmodeicon.alt = 'Light mode icon'
    } else {
      darkmodeicon.src = '/assets/icons/dark.png'
      darkmodeicon.alt = 'Dark mode icon'
    }
  })

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
              <img src="/assets/icons/upload.svg" alt="Upload icon"/>
            </a>
            <a href="#null" class="links-icon">
              <img src="/assets/icons/more.svg" alt="More icon"/>
            </a>    
          </div>
        </div>
      </div>
    </li>
  `
}

// UNSPLASH API
const getRandomPhotos = async () => {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching random photos:', error)
    return []
  }
}

// UNSPLASH API
const searchPhotos = async (keyword) => {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
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
    return { results: [] }
  }
}

const galleryTemplate = () => {
  return `
    <ul class="gallery"></ul>
  `
}

const printItems = (items) => {
  const gallery = document.querySelector('.gallery')
  let htmlContent = ''
  items.forEach((item) => {
    htmlContent += cardTemplate(item)
  })
  gallery.innerHTML = htmlContent
}

// Limpieza de galería
const clearGallery = () => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML =
    '<p>No se encontraron resultados. Intenta con otra palabra clave.</p>'
}

const galleryListeners = () => {
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

// Cargar imágenes aleatorias al cargar la página
const loadRandomPhotos = async () => {
  const randomImages = await getRandomPhotos()
  if (randomImages.length > 0) {
    printItems(randomImages)
  } else {
    clearGallery()
  }
}

const printTemplate = async () => {
  document.querySelector('main').innerHTML = galleryTemplate()
  galleryListeners()
  loadRandomPhotos()
}

printTemplate()
