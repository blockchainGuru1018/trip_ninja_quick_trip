import React, { useState } from 'react';
import { Typography, TextField } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

import "./styles.css";

const propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const UsernameField: React.FC<Props> = ({ first_name, last_name, onChange }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="userNameField-Component">
      <div className="content">
        {opened ? (
          <>
            <TextField style={{ marginRight: "20px" }} value={first_name} onChange={(ev) => onChange(ev, 'first_name')} variant="outlined" />
            <TextField value={last_name} onChange={(ev) => onChange(ev, 'last_name')} variant="outlined" />
          </>
        ) : (
          <Typography variant="h3" component="h1" className="label">{`${first_name} ${last_name}`}</Typography>
        )}
        <span>
          {opened ? (
            <CloseIcon
              className="icon"
              onClick={() => setOpened(!opened)}
            />
          ) : (
            <EditIcon
              className="icon"
              onClick={() => setOpened(!opened)}
            />
          )
          }
        </span>
      </div>
    </div>
  );
};

export default UsernameField;
