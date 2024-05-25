import speakingurl from 'speakingurl';

const defaultSlugify = (value) => {
  const maxLength = 200; // Adjust as needed
  const slugifyOpts = { truncate: maxLength, symbols: true };
  return speakingurl(value, slugifyOpts);
}

export async function slugify(sourceValue) {
  if (!sourceValue) {
    return Promise.resolve({ _type: 'slug', current: '' });
  }

  // You can customize slugification logic here
  // For example, remove special characters not supported by URLs
  const sanitizedValue = sourceValue.replace(/[^a-zA-Z0-9]+/g, '-');

  try {
    const generatedSlug = await defaultSlugify(sanitizedValue);
    return Promise.resolve({ _type: 'slug', current: generatedSlug });
  } catch (error) {
    console.error('Error generating slug:', error);
    // You can handle the error here by returning a default slug or logging the error
    return Promise.resolve({ _type: 'slug', current: '' });
  }
}
