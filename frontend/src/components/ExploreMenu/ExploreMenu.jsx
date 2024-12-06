// import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <>
            <div className='explore-menu flex flex-col' id="explore-menu">
                <h2 className='font-medium	text-black'>
                    ExploreMenu
                </h2>
                <p className='explore-menu-text'>Welcome to Foodys – your go-to food 
                    delivery service designed to bring your favorite meals right to
                     your doorstep, faster and more conveniently than ever before!
                    At Foodys, we understand the power of great food to bring people
                     together, and our mission is to make sure you never have to wait
                      long for your next delicious meal. Inspired by the best in the 
                      food delivery industry, we have created a seamless experience 
                      that connects hungry customers with local restaurants, all from
                       the comfort of your own home or office.
                </p>
                <div className='explore-menu-list flex justify-between	items-center text-center '>


                    {menu_list.map((item, index) => {
                        return (




                            <button key={index} onClick={() => setCategory(prev => prev === item.menuName ? "All" : item.menuName)} className=' explore-menu-item'>
                                <img className={category === item.menuName ? "active" : " "} src={item.menuImage} alt="/" />
                                <p>
                                    {item.menuName}
                                </p>
                            </button>
                        )
                    })}


                </div>
                <hr />
            </div>
        </>
    )
}

export default ExploreMenu