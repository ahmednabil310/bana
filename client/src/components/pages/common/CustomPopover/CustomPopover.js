import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

//comp props documentation
//content => JSX => content the will be in popover body
//trigger => anything that will trigger the popover (text or jsx element)
//placement => will be on of (right, left, top, bottom)
//title => text to show in the popover title area
const CustomPopover = ({ content, trigger, placement, title }) => {

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title>
        <div className="d-flex align-items-canter text-bold">
          <span>{title}</span>
          <span className="material-icons pointer text-light-grey text-sm ml-auto mt-1" onClick={() => document.body.click()}>close</span>
        </div>
      </Popover.Title>
      <Popover.Content>
        {content}
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement={placement} overlay={popover} rootClose={true}>
      {trigger}
    </OverlayTrigger>
  )
}

export default CustomPopover
