import { Link } from 'react-router-dom';

import { Box, Hidden, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

import LogoImage from '../LogoSign/logo.webp';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../../package.json');

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSign = styled('img')(
  () => `
        width: auto;
        height: 70px;
        margin-top: 4px;
        transform: scale(.8);
`
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-top: 10px;
`
);

const VersionBadge = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.success.main};
        color: ${theme.palette.success.contrastText};
        padding: ${theme.spacing(0.4, 1)};
        border-radius: ${theme.general.borderRadiusSm};
        text-align: center;
        display: inline-block;
        line-height: 1;
        font-size: ${theme.typography.pxToRem(11)};
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {
  return (
    <LogoWrapper to="/">
      <LogoSign src={LogoImage} />
      <Hidden smDown>
        <LogoTextWrapper>
          <Tooltip title={`Version ${version}`} arrow placement="right">
            <VersionBadge>{version}</VersionBadge>
          </Tooltip>
          <LogoText>Rocket Bank</LogoText>
        </LogoTextWrapper>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
