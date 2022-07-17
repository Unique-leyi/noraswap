import React, {useRef, useEffect} from "react";

const Dropdown = ({ searchPlaceholder, search, searchChangeHandler, options, selectedValue, changeSelectedHandler, name, selectedIndex}) => {
    const searchInputEl = useRef();
    const itemsEl = useRef();


    useEffect(() => {
        searchInputEl.current.focus();
        if(selectedValue){
            itemsEl.current.scrollTop = itemsEl.current.querySelector(`.item-${selectedIndex}`).offsetTop = 42;
        }
    }, []);

    return (
        <div className="dropdown__menu">
            <input 
            type="text" 
            placeholder={searchPlaceholder ? searchPlaceholder : 'Search...'}
            className="dropdown__menu_search"
            value={search}
            onChange={searchChangeHandler}
            ref={searchInputEl}  
            />
            <div className="dropdown__menu_items" ref={itemsEl}>
                {options.map((item,index) => {
                   <div
                    className={selectedValue === item ? `dropdown__menu_item item-${index} selected` : `dropdown__menu_item  item-${index}`}
                    key={index}
                    onClick={() => changeSelectedHandler(item, name, index)}
                   >
                    {item}
                   </div> 
                })}
            </div>
        </div>
    )

}