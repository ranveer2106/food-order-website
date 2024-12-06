import React,{useState} from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const [image, setImage] = useState(null)

  // const url = "http://localhost:4000";

  const [data, setData] = useState({
    name: "",
    description:"",
    price:"",
    category:"Salad"
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  } 

  const onSubmitHandler = async (event)=>{
    // const name = event.target.name;
    // const value = event.target.value;
    // setData(data=>({...data,[name]:value}))
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)

    const response = await axios.post(`${url}/api/food/add`,formData)
    if (response.data.success){
      setData({
        name: "",
        description:"",
        price:"",
        category:"Salad"
      })
      setImage(false)
      // console.log(response.data.message);
      toast.success(response.data.message);
      // alert("Food added successfully")
    }
    else{
      // alert("Failed to add food")
      toast.error(response.data.message)
    }
    

  }



  return (
    <>
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label className='upload-image' htmlFor="image">
                        <img src={image? URL.createObjectURL(image):assets.upload} alt="upload area" />
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea required name="description" onChange={onChangeHandler} value={data.description} rows="6" placeholder='Write content here'></textarea>
                </div>
                <div className="add-category-price ">
                    <div className="add-category flex-col">
                      <p>Category</p>
                        <select onChange={onChangeHandler} name="category" >
                            <option value="Sandwich">Sandwich</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Burger">Burger</option>
                            <option value="Shake">Shake</option>
                            <option value="Taco">Taco</option>
                            <option value="Momos">Momos</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='20$' />
                    </div>
                </div>
                <button type="submit" className='add-btn'>Add</button>
            </form>
        </div>
    </>
  )
}

export default Add

