import { atom } from "recoil";
import { TiHome } from 'react-icons/ti'

export const defaultMenuItem = {
    displayText: "Home",
    link: "/",
    icon: <TiHome />,
    iconColor: "black",
  };
  
  export const defaultMenuState = {
    isOpen: false,
    selectedMenuItem: defaultMenuItem,
  };
  
  export const directoryMenuState = atom({
    key: "directoryMenuState",
    default: defaultMenuState,
  });