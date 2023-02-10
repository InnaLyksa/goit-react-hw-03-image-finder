import { InfinitySpin } from 'react-loader-spinner';
import { WraperLoader } from './Loader.styled';

export const Loader = () => {
  return (
    <WraperLoader>
      <InfinitySpin color="#14c287" ariaLabel="loading" />;
    </WraperLoader>
  );
};
