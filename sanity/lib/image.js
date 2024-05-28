import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source, options = {}) => {
  if (!source) return '' // Handle missing source gracefully

  const imageUrl = imageBuilder
    .image(source)
    .auto('format')
    .fit(options.fit || 'max') // Allow customization of fit option

  if (options.width && options.height) {
    imageUrl.width(options.width)
      .height(options.height)
  } // Allow customization of width and height

  // Ensure the .url() method is called to return the actual URL
  return imageUrl?.url();
}
