import useDarkModeStore from '@stores/useDarkModeStore';
import { NavbarContainer, Logo, ToggleButton } from './styles/NavbarStyledComponents';


function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkModeStore();

  const handleToggle = (e) => {
    e.preventDefault(); 
    toggleDarkMode();
  };

  return (
    <NavbarContainer $darkMode={darkMode}>
      <Logo>MovieGrid</Logo>
      <ToggleButton 
        $darkMode={darkMode} 
        onClick={handleToggle}
        type="button"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </ToggleButton>
    </NavbarContainer>
  );
}

export default Navbar;
