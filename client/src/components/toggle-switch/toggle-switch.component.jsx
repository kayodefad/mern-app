import React from 'react';
import './toggle-switch.styles.scss';
import Container from 'react-bootstrap/Container';

const ToggleSwitch = ({onToggle}) => {
  return (
    <Container>
      <div className="ToggleSwitch">
        <label className="switch">
          <input type="checkbox" onClick={() => onToggle()} />
          <span className="slider round"></span>
        </label>
      </div>
    </Container>
  );
};

export default ToggleSwitch;
