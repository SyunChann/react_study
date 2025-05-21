import * as React from 'react';
import PropTypes from 'prop-types';
// v6 experimental 테마 확장기와 provider
import {
  experimental_extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';

import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

function AppTheme(props) {
  const { children, disableCustomTheme, themeComponents } = props;
  const theme = React.useMemo(() => {
    if (disableCustomTheme) {
      return {};
    }

    return experimental_extendTheme({
      // CSS 변수 설정
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },
      // light/dark 모드 정의
      colorSchemes,
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    });
  }, [disableCustomTheme, themeComponents]);

  if (disableCustomTheme) {
    return <>{children}</>;
  }

  return (
    // ThemeProvider → CssVarsProvider
    <CssVarsProvider theme={theme}>
      {children}
    </CssVarsProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  /** docs 사이트용 옵션, 무시하셔도 됩니다 */
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
};

export default AppTheme;
