import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { replace } from 'lodash';

type TUseT = (
  param: string, 
  options?: {
    routes: boolean
  }
) => any
export const useT: TUseT = (
  param: string, 
  options = { routes: false}
) => {
  const value = useMemo(() => {
    if (options.routes) {
      return `routes${replace(param, /\//g, '.')}`;
    }
    return param;
  }, [param, options]);

  return useTranslations(value);
};