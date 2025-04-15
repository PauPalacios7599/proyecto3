export const cardTemplate = (item) => {
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
          <a href="${item.links.html}" class="full-link" target="_blank">
            Ver en Unsplash →
          </a>
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
