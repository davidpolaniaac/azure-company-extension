import React from 'react';
import { Spinner, SpinnerSize } from 'azure-devops-ui/Spinner';

function withLoading(loading) {
  return function Wrapped(Component) {
    return function Result(props) {
      return loading(props) ? <Spinner
        label="Loading"
        size={SpinnerSize.large}
        className="flex-grow"
      /> : <Component {...props} />;
    };
  };
}

export default withLoading;
