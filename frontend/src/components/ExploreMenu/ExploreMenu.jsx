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
                <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt soluta eius quibusdam, assumenda at magni
                    vitae praesentium voluptatum. Facere earum perferendis provident quasi molestias nulla exercitationem tenetur.
                    Sint animi culpa porro sit, iusto repellat sed illo dolorem aliquam tempora nobis reprehenderit ab incidunt praesentium
                    dignissimos exercitationem sequi vel placeat quo, perferendis quod, quam assumenda vero quaerat? Illum obcaecati nostrum
                    doloremque animi hic. Accusantium necessitatibus assumenda, ullam ipsa quia voluptate, iusto minus aliquam at, nihil debitis. Omnis corporis
                    dignissimos quod vero obcaecati, natus eligendi saepe amet rem laboriosam molestias id consequuntur sit illum
                    nulla inventore rerum sed voluptas qui! Eum, amet.
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