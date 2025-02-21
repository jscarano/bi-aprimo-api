
import Logger from "@asc/dv-logger";
import { Route } from '../types/route';
import UrlPattern from '@bicycle-codes/url-pattern';
/**
 * Returns the name of the route identified by a given request.
 *
 * @param {string} path The path of the request.
 *
 * @param {('DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT')} method The request
 * method.
 *
 * @param {Array<Route>} routes The collection of routes in preference order.
 *
 * @returns {string} The name of the route identified by the given request. This is an empty string
 * if a route can not be identified.
 */
export function getRoute(path: string, method: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT', routes: Route[]): string {
  Logger.debug('router:getRoute started', {
    path,
    locationId: 'MIfVtvpCS6uYdZ5MgfGcZZ',
    method,
    routes,
  });

  let routeName = '';
  for (const rt of routes) {
    if (rt.methods.includes(method)) {
      for (const p of rt.patterns) {
        const pattern = new UrlPattern(p as string);
        if (pattern.match(path) !== null) {
          routeName = rt.name
          break;
        }
      }
    }
    if (routeName !== '') {
      break;
    }
  }

  Logger.debug('router:getRoute complete', {
    path,
    locationId: 'ixu1jlXxTMupbchLToKXgZB',
    method,
    routeName,
  });
  return routeName;
}

export default getRoute;
