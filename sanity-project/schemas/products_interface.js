export default {
  name: 'products_interface',
  title: 'Products_interface', 
  type: 'document',
  fields: [ // the fields are objects based
    { // one object for the image
      name: 'image',
      title: 'Image',
      type: 'image',          
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    { 
      tilte: 'Slug',
      name: 'slug',       // unique url 
      type: 'slug',       // costume type fro unique identifiers
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
      name: 'details',
      title: 'Details',
      type: 'string',
    }

  ]
}
