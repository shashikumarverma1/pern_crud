import axios from 'axios';
const readAll=async()=>{
  
  try{
 const data=  await axios.get(`https://jsonplaceholder.typicode.com/users`)
 console.log(data)
//  return data;
  }catch(err){
      console.log(err)
  }
}

const readOne=async(id)=>{
  
  try{
 const data=  await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
 console.log(data)
//  return data;
  }catch(err){
      console.log(err)
  }
}

const postData = {
  // Define your data to be sent in the POST request body
  // For example:
  name: "John Doe",
  email: "john@example.com",
  // Add more fields as needed
};

const creat=async(postData)=>{ 
  try {
    
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', postData);
    console.log(response.data);
    // Handle response data as needed
  } catch (error) {
    console.error(error);
    // Handle errors
  }
  
}

const updateData = {
  // Define the data you want to update
  // For example:
  name: "Updated Name",
  email: "updated@example.com",
  // Add more fields as needed
};
const id = 1;
const updat=async(id , updateData)=>{ 
  try {
    // Assuming you want to update user with ID 1
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateData);
    console.log(response.data);
    // Handle response data as needed
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

// const id = 1;
const deleteData = async(id:any)=>{ 
  try {
     // Assuming you want to delete user with ID 1
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log(response.data);
    // Handle response data as needed (usually, there might not be any data returned for delete requests)
  } catch (error) {
    console.error(error);
    // Handle errors
  }
  
}