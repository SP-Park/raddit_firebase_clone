import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import { TiHome } from 'react-icons/ti'
import Community from "./Community";
import CreateModal from '../Community/CreateModal'
import useDirectory from "../../hook/useDirectory";
import { useLocation } from "react-router-dom";
import useCommunity from "../../hook/useCommunity";


export default function Directory () {
  // const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const [showModal, setShowModal] = useState(false)
  const [charsRemaining, setCharsRemaining] = useState(21)

  const { directoryState, toggleMenuOpen } = useDirectory()
  const { communitiesStateValue } = useCommunity()
  const location = useLocation() 
  const path = location.pathname.split('/')[2]

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    // setDropdownPopoverShow(true);
    toggleMenuOpen()
  };
  const closeDropdownPopover = () => {
    // setDropdownPopoverShow(false);
    toggleMenuOpen()
  };

  // console.log(directoryState)

  return (
    <>
        <button
            className='ml-2 flex items-center'
            type="button"
            ref={btnDropdownRef}
            // onClick={() => {
            //   dropdownPopoverShow
            //    ? closeDropdownPopover()
            //    : openDropdownPopover();
            // }}
            onClick={() => {
              directoryState.isOpen
               ? closeDropdownPopover()
               : openDropdownPopover();
            }}
            >
              <div className="flex items-center">
                {communitiesStateValue.currentCommunity.imageURL ? (
                  <img
                    className="w-10 h-10 rounded-full" 
                    alt='mini' 
                    src={communitiesStateValue.currentCommunity.imageURL} 
                  />
                ) : ( path? (<img className="w-10 h-10 rounded-full" alt='mini' src="/logo_mini.png" />) : (<TiHome className="text-3xl hover:scale-110"/>)
                  
                )}
                {/* <TiHome className="text-3xl hover:scale-110"/> */}
                <p className="hidden md:block ml-1">{path === undefined ? 'c/Home': `c/${path}`}</p>
              </div>
        </button>
        <div
            ref={popoverDropdownRef}
            className={
              // (dropdownPopoverShow ? "block " : "hidden ") +
              (directoryState.isOpen ? "block " : "hidden ") +
              "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 bg-white"
            }
              style={{ minWidth: "12rem" }}
        >
            {/* <Community setShowModal={setShowModal}/> */}
            <Community setShowModal={setShowModal}/>
        </div>
        {showModal ? <CreateModal setShowModal={setShowModal} charsRemaining={charsRemaining} setCharsRemaining={setCharsRemaining}/>: null}
    </>
  );
};
