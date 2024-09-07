import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { get } from 'lodash';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  let locale = 'id';
  const localeCookie: any = JSON.parse(get(cookies().get('locale'), 'value', '{}'));
  const localeCookieValue = get(localeCookie, 'state.locale', null);

  if (!!localeCookieValue) {
    locale = localeCookieValue;
  }
  
  return {
    locale,
    timeZone: 'Asia/Jakarta',
    messages: (await import(`./src/locales/${locale}.json`)).default
  };
});