import Cookies from 'js-cookie';
import { IOptions } from '../d';


export async function csrfFetch(url:string, options:IOptions = { method: 'GET', headers: {}, body: '' }) {
  
    // if the options.method is not 'GET', then set the "Content-Type" header to
      // "application/json", and set the "XSRF-TOKEN" header to the value of the 
      // "XSRF-TOKEN" cookie
    if (options.method.toUpperCase() !== 'GET') {
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
      options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }
    // call the default window's fetch with the url and the options passed in
    let res:any;
    if (options.method.toUpperCase() === 'GET') {
      res = await window.fetch(url)
    } else {
      res = await window.fetch(url, options);
    }
  
    // if the response status code is 400 or above, then throw an error with the
      // error being the response
    if (res.status >= 402) throw res;
  
    // if the response status code is under 400, then return the response to the
      // next promise chain
    return res;
};

export function restoreCSRF() {
 return csrfFetch('/api/csrf/restore');
};

