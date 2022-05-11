import { PartialRouteObject } from 'react-router';

import { privateRoutes } from './private';
import { publicRoutes } from './public';

export const routes: PartialRouteObject[] = [...publicRoutes, ...privateRoutes];
