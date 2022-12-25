import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { directoryMenuState } from '../atoms/directoryMenu'

export default function useDirectory() {
  const navigate = useNavigate()
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState)
  
  const toggleMenuOpen = () => {
    setDirectoryState((prev) => (console.log(prev), {
        ...prev,
        isOpen: !directoryState.isOpen
    }))
  }

  const onSelectMenuItem = async (menuItem) => {
    console.log(menuItem)
    if(menuItem.displayText === 'Home') return
    setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: menuItem
    }))
    // if(directoryState.isOpen) {
    //   toggleMenuOpen()
    // }

    navigate(menuItem.link, { state: menuItem }) // 머지 ? 
    // navigate(menuItem.link)
  }
  
  return {
    directoryState,
    toggleMenuOpen,
    onSelectMenuItem
  }
}

