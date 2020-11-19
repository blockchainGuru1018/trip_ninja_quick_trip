import React, { useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import { logout } from '../actions/AuthActions';

interface IdleTimerContainerProps {
  logout: typeof logout
}

class IdleTimeContainer extends React.Component<IdleTimerContainerProps> {

  render() {
    console.log("Loaded");
    let idleTimer = null;
    return (
      <div>
        <IdleTimer
          ref={ref => { idleTimer = ref; }}
          timeout={1000 * 60 * 1}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
      </div>
    );
  }

  handleOnAction (event: any) {
    console.log('user did something', event);
  }

  handleOnActive (event: any) {
    console.log('user is active', event);
   
  }

  handleOnIdle (event: any) {
    console.log('user is idle', event);
    this.props.logout();
  }
}

export default IdleTimeContainer;