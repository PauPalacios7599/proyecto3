import { getRandomPhotos, searchPhotos } from '../services/api.js'
import { printItems } from '../ui/gallery.js'

export const loadRandomPhotos = async () => {
  const randomImages = await getRandomPhotos()
  if (randomImages.length > 0) {
    printItems(randomImages)
  }
}

export const loadFirstSearch = async () => {
  const keyword = localStorage.getItem('firstSearch')
  if (keyword) {
    const result = await searchPhotos(keyword)
    printItems(result.results)
  } else {
    loadRandomPhotos()
  }
}
