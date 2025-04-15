import { printHeaderTemplate } from './ui/header.js'
import { printFooterTemplate } from './ui/footer.js'
import { galleryTemplate, galleryListeners } from './ui/gallery.js'
import { getRandomPhotos } from './services/api.js'
import { printItems } from './ui/gallery.js'

export const loadRandomPhotos = async () => {
  const randomImages = await getRandomPhotos()
  if (randomImages.length > 0) {
    printItems(randomImages)
  }
}

const printTemplate = async () => {
  printHeaderTemplate()
  document.querySelector('main').innerHTML = galleryTemplate()
  printFooterTemplate()
  galleryListeners()
  loadRandomPhotos()
}

printTemplate()
