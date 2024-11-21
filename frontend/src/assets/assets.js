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
import playstore from "./playstore.png"
import appstore from "./appstore.png"
import profile from "./profile.jpg"
import burger from "./burger.jpg"
import taco from "./taco.jpg"
import chicken from './Chicken.jpg'

export const assets = {
    logo,
    search,
    cart,
    playstore,
    appstore,
    profile
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
    menuName:"Burger",
    menuImage:burger
    },{
    menuName:"Taco",
    menuImage:taco
}
    ,{
    menuName:"Shake",
    menuImage:menu_04
},{
    menuName:"Chicken",
    menuImage:chicken
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