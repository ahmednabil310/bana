import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </span>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

const CustomToggleDropdown = ({ children, optionsArray, onItemClick, key }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {children}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {optionsArray.map((option, i) => <Dropdown.Item className="m-0 px-2" eventKey={i} onClick={() => onItemClick(option)} key={key ? option[key] : option}>{option}</Dropdown.Item>)}
      </Dropdown.Menu>
    </Dropdown>
  )
}

/**
How to use
<CustomToggle optionsArray={someArrayOfDropdownItems} onItemClick={(option) => // any function to use the selected option} key="if the options is object here pass the one to be the key">
  // any thing as the custom toggler
</CustomToggle>
*/

export default CustomToggleDropdown
