import axios from 'axios';
const readMany=async()=>{
    const url='https://jsonplaceholder.typicode.com/users'
    try{
   const data=  await axios.get(`${url}`)
//    console.log(data)
   return data;
    }catch(err){
        console.log(err)
    }
}
export default readMany