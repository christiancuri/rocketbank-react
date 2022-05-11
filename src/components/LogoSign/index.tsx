import { Link } from 'react-router-dom';

import { Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

import LogoImage from './logo.webp';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        display: flex;
        text-decoration: none;
        width: 75px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSign = styled('img')(
  () => `
        width: auto;
        height: 75px;
`
);

function Logo() {
  return (
    <Tooltip title="Rocket Bank by Christian Curi" arrow>
      <LogoWrapper to="/">
        <LogoSign src={LogoImage} />
      </LogoWrapper>
    </Tooltip>
  );
}

export default Logo;
