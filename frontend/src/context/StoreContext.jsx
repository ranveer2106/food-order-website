import {
    createContext,
    React,
    // useEffect,
    useState
} from "react";

import { food_list } from "../assets/assets";
export const StoreContext = createContext(null)
// export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setcartItems] = useState({})

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setcartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

    }

    const removeFromCart = (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
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

                let itemInfo = food_list.find((product) => product.id === Number(item));


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
    //             let itemInfo = food_list.find((product) => product.id === Number(item));

    //             if (itemInfo) {
    //                 totalAmount += itemInfo.price * cartItems[item];
    //             } else {
    //                 console.error(`Item with id ${item} not found in food_list`);
    //             }
    //         }
    //     }

    //     return totalAmount;
    // };


    const contextValue = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider >

    )
}

export default StoreContextProvider