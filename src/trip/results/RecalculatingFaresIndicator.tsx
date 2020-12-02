import React from 'react';
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";

interface recalculatingFaresIndicatorProps {
  loading: boolean;
}

export default function RecalculatingFaresIndicator(props: recalculatingFaresIndicatorProps) {
  const [ t ] = useTranslation('common');

  return props.loading
    ? (
      <div className='recalculation-indicator-container'>
        <p className='standard-text margin-auto'>{t('results.recalculatingFaresIndicator')}</p>
        <CircularProgress color="primary"/>
      </div>
    )
    : null;
}
