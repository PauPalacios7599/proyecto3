const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export const getRandomPhotos = async () => {
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

export const searchPhotos = async (keyword) => {
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
