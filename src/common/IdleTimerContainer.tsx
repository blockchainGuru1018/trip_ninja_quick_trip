import React, { useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import { logout } from '../actions/AuthActions';

interface IdleTimerContainterProps {
  logout: typeof logout
}

function IdleTimerContainer (props: IdleTimerContainterProps) {
  const idleTimerRef = useRef(null);
  return (
    <div>
      <IdleTimer
        ref={idleTimerRef}
        timeout={14400000}
        onIdle={() => props.logout()}
      />
    </div>
  )
}

export default IdleTimerContainer;