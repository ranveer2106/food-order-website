import axios from "axios";
import {
    createContext,
    React,
    useEffect,
    // useEffect,
    useState
} from "react";

export const StoreContext = createContext(null)
// export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    const [token,setToken]= useState("")
    const [cartItems, setcartItems] = useState({})
    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setcartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }

    }


    const removeFromCart = async(itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const fetchFoodList = async ()=> {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setcartItems(response.data.cartData);
    }




    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])

    // const getTotal = ()=> {
    //     let totalAmount = 0;
    //     for (const key in cartItems) {
    //         let itemInfo = food_list.find((product)=>product.id===item)
    //     }
    // }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {

                let itemInfo = food_list.find((product) => product._id === item);


                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;

    //     for (const item in cartItems) {
    //         if (cartItems[item] > 0) {
    //             // Ensure item ID matches the type of product.id
    //             let itemInfo = food_list.find((product) => product._id === Number(item));
    //             console.log(itemInfo);
                
    //             if (itemInfo) {
    //                 totalAmount += itemInfo.price * cartItems[item];
    //             } else {
    //                 console.error(`Item with id ${item} not found in food_list`);
    //             }
    //         }
    //     }

    //     return totalAmount;
    // };


    useEffect(()=>{
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }

        
        loadData();
        // console.log(food_list);
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider >

    )
}

export default StoreContextProvider