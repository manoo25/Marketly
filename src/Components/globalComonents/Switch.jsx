import React from 'react';
import styled from 'styled-components';

const Switch = ({ ispublish, setispublish, id }) => {
  return (
    <StyledWrapper>
      <div>
        <input
          type="checkbox"
          id={id}
          checked={ispublish}
          onChange={e => setispublish(e.target.checked)}
        />
        <label htmlFor={id} className="toggleSwitch"></label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  input[type="checkbox"] {
    display: none;
  }

  .toggleSwitch {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 50px;
    height: 30px;
    background-color: rgb(82, 82, 82);
    border-radius: 20px;
    cursor: pointer;
    transition-duration: .2s;
  }

  .toggleSwitch::after {
    content: "";
    position: absolute;
    height: 10px;
    width: 10px;
    left: 5px;
    background-color: transparent;
    border-radius: 50%;
    transition-duration: .2s;
    box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
    border: 5px solid white;
  }

  input[type="checkbox"]:checked + .toggleSwitch::after {
    transform: translateX(100%);
    transition-duration: .2s;
    background-color: white;
  }

  input[type="checkbox"]:checked + .toggleSwitch {
    background-color: var(--primary-color);
    transition-duration: .2s;
  }
`;

export default Switch;