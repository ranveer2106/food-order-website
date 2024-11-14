import logo from './logo_transparent.png'
import search from './search-outline.svg'
import cart from './cart-outline.svg'
import menu_01 from "./menu_01.jpg"
import menu_02 from "./menu_02.jpg"
import menu_03 from "./menu_03.jpg"
import menu_04 from "./menu_04.jpg"
import food_01 from "./food_01.jpg"
import food_02 from "./food_02.jpg"
import food_03 from "./food_03.jpg"
import food_04 from "./food_04.jpg"

export const assets = {
    logo,
    search,
    cart
}

export const menu_list = [
    {
    menuName:"Salad",
    menuImage: menu_01
    },
    {
    menuName:"Pizza",
    menuImage:menu_02
    },{
    menuName:"Naan",
    menuImage:menu_03
    },{
    menuName:"Shake",
    menuImage:menu_04
}
    ,{
    menuName:"Shake",
    menuImage:menu_04
},{
    menuName:"Shake",
    menuImage:menu_04
}
]

export const food_list = [
    {
        id:1,
        name:"greek salad",
        image:food_01,
        description:"lorem",
        category:"Salad",
        price:12

    },
    {
        id:2,
        name:"italian pizza",
        image:food_02,
        description:"lorem",
        category:"Pizza",
        price:12

    },
    {
        id:3,
        name:"Butter Naan",
        image:food_03,
        description:"lorem",
        category:"Naan",
        price:12

    },{
        id:4,
        name:"Chocolate Shake",
        image:food_04,
        description:"lorem",
        category:"Shake",
        price:12

    }

]