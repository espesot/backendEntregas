import factory from '../services/factory.js'

export const checkRequiredFiles = async (uid)=>{
  try {
    const user = await factory.users.getUserById(uid)
    if(user.status != 'files loaded') throw new Error('El ususrio no cargo archivos')
    if(!user.documents.find((document)=> document.name.include('id'))) throw new Error('Identificacion no cargada')
    if(!user.documents.find((document)=> document.name.include('AddressValidation'))) throw new Error('Validacion no cargada')
    if(!user.documents.find((document)=> document.name.include('AccountValidation'))) throw new Error('Estado de validacion no cargada')
    return true
  } catch (error) {
    throw new Error(error.message)
  }
}