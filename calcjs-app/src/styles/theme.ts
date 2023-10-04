import jss from 'jss';
import preset from 'jss-preset-default';
import { createTheme } from './utils.ts';

jss.setup(preset());

export const lightTheme = createTheme({ mode: 'light' });
export const darkTheme = createTheme({ mode: 'dark' });
