import 'vite/client';
import type { ITheme } from './styles';

declare global {
  namespace Jss {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Theme extends ITheme {}
  }
}
