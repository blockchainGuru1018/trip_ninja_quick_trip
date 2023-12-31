import React, { useState } from 'react';
import { Typography, TextField } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

import "./styles.css";

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const NameField: React.FC<Props> = ({ value, onChange }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="userNameField-Component">
      <div className="content">
        {opened ? (
          <TextField value={value} onChange={onChange} variant="outlined" />
        ) : (
          <Typography variant="h3" component="h1" className="label">{value}</Typography>
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

export default NameField;
