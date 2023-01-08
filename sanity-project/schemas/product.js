export default {
  name: 'product',
  title: 'Product', 
  type: 'document',
  fields: [ // the fields are objects based
    { // one object for the image
      name: 'image',
      title: 'Image',
      type: 'array',            // array of images
      of: [{ type: 'image' }],  // plain english :D
      options: {
        hotspot: true           // https://www.sanity.io/docs/image-type for checking hotspot property (it just help us to better position the image)
      }
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    { 
      tilte: 'Slug',
      name: 'slug',       // unique url 
      type: 'slug',       // costume type from unique identifiers
      options: {
        source: 'name',   // it will automatically generate unique slug based on the above object named 'name'
      }
    },
    {
      name: 'product_type',
      title: 'Product_Type',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    }

  ]
}