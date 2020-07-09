import React, { useContext, useState, useEffect } from 'react';
import './toggle-switch.styles.scss';
import Container from 'react-bootstrap/Container';
import { ThemeContext } from '../../contexts/ThemeContext';

const ToggleSwitch = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  // const [checked, setChecked] = useState(false)

  return (
    <Container>
      <div className="ToggleSwitch">
        <label className="switch">
          <input
            type="checkbox"
            checked={!theme.light}
            onChange={() => toggleTheme()}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </Container>
  );
};

export default ToggleSwitch;
