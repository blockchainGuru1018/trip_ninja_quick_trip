import React from 'react';
import IdleTimer from 'react-idle-timer';
import { logout } from '../actions/AuthActions';

interface IdleTimerContainerProps {
  logout: typeof logout
}

class IdleTimeContainer extends React.Component<IdleTimerContainerProps> {

  render() {
    return (
      <div>
        <IdleTimer
          timeout={1000 * 60 * 90}
          onIdle={this.handleOnIdle}
          debounce={250}
        />
      </div>
    );
  }

  handleOnIdle = (event: any) => {
    this.props.logout();
  }
}

export default IdleTimeContainer;