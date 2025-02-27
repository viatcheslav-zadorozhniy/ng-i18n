import { InjectionToken } from '@angular/core';

export type ApiConfig = {
  url: string;
  version: string;
};

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');
