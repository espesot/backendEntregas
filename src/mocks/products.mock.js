import {faker} from '@faker-js/faker'

const createImg = () =>{
  return faker.image.abstract()
}

const createProdcut = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.random.alpha({count:10, casing:'upper'}),
    price: faker.commerce.price(),
    status: faker.datatype.number({max:100}),
    category: faker.commerce.department(),
    thumbnails: Array.from({length:faker.random.numeric(1)},createImg),
    deleted: faker.datatype.boolean(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime()
  }
}



export const getProductsMocks = (nProducts) => {
  return Array.from({length:nProducts},createProdcut)
}