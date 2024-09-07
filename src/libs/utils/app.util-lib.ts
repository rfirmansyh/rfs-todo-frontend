import { replace, trim } from 'lodash';

export const getInitials = (input?: string): string => {
  if (!input) {
    return '';
  }

  if (input.length > 2) {
    let res = input.trim().split(' ');

    if (res.length === 1) {
      return res[0]?.charAt(0).toUpperCase() ?? '';
    }

    return res.map(word => word.charAt(0).toUpperCase()).join('');
  }

  return input;
};

export const getPathsWithoutParams = (pathName: string, params: any): string => {
  if (pathName) {
    let cleanedPathName: string = pathName;

    Object.values(params).forEach((param) => {
      cleanedPathName = replace(cleanedPathName, new RegExp(param as string, 'g'), '');
    });
    cleanedPathName = cleanedPathName.replace('//', '/');

    return trim(cleanedPathName, '/');
  }

  return '';
};
export const getLocaleFormatViaPathName = (pathName: string, params: any): string => {
  if (pathName) {
    return `${getPathsWithoutParams(pathName, params).split('/').join('.')}.page`;
  }

  return '';
};