import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// connecting the back end with the front end
export const client = sanityClient({ 
  // for completing the following fields open: >> sanity manage and find the related sections
  projectId: '83brnok2',
  dataset: 'production',
  apiVersion: '2022-12-23', // the time developed this project
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});


// in order to use the sanity images
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);  // extract image from sanity
//-> urlFor(myimage) {return imageUrlBuilder(client).image(myimage)}