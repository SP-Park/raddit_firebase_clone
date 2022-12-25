import React from "react";
import { createPopper } from "@popperjs/core";
import { useAuthContext } from "../../context/AuthContext";
import { IoSparkles } from 'react-icons/io5'
import { FaRedditSquare } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLogout } from 'react-icons/md'

const Dropdown = ({ color }) => {
  // dropdown props
  const { user, logout, setCommunityState } = useAuthContext()
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-end"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const Logout = () => {
    logout()
    setCommunityState(false)
  }

  return (
    <>
        <button
            className='ml-2 flex items-center mr-1'
            type="button"
            ref={btnDropdownRef}
            onClick={() => {
            dropdownPopoverShow
               ? closeDropdownPopover()
               : openDropdownPopover();
            }}
            >
              <div className="flex items-center hover:border-2">
                <FaRedditSquare className="text-3xl text-slate-400 hover:scale-110"/>
                <div className="hidden md:flex flex-col items-center">
                <p className="font-bold">{user.email?.split('@')[0]}</p>
                <div className="flex flex-row ml-1">
                  <IoSparkles className="text-xs text-red-500"/>
                  <p className="text-[6px] text-slate-500">1won</p>
                </div>
                </div>
              </div>
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 bg-white"
              }
              style={{ minWidth: "12rem" }}
            >
              <div 
                className="flex items-center ml-2 hover:bg-brand hover:text-white py-1" 
              >
                <CgProfile className="text-xl mr-2"/>
                <p>Profile</p>
              </div>
              <hr />
              <div 
                className="flex items-center ml-2 hover:bg-brand hover:text-white py-1"
                onClick={Logout}
              >
                <MdOutlineLogout className="text-xl mr-2"/>
                <p>Log Out</p>
              </div>
            </div>
    </>
  );
};

export default function UserMenu() {
  return (
    <>
      <Dropdown color="slate" />
    </>
  );
}