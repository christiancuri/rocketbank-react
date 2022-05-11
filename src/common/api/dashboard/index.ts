import { getModule } from '../client';
import { DashboardSystemInfo } from './dashboard.types';

export async function getSystemInfo() {
  return getModule<DashboardSystemInfo>('/system/info');
}

export * as DashboardRequests from './index';
