import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import './LoadingSpinnerComponent.css';
import proxima_arrow from '../images/proxima_red_great_arrow.png'

export const LoadingSpinnerComponent = (props) => {
  const { promiseInProgress } = usePromiseTracker({ delay: 100000 });

  return (
    <div>
      <div className="modalLoaderDialog">
        <div className="loader modalLoader">
          <img src={proxima_arrow} alt="loading..." className="proxima_arrow_spinner" />
          {promiseInProgress}
        </div>
      </div>
    </div>
  )
};