import { MetaDefinition } from '@angular/platform-browser';
import { Route } from '@angular/router';

export interface RouteMetadata {
  tags: MetaDefinition[];
}

export const RouteMetadataKey = Symbol('RouteMetadata');

export interface RouteWithMetadata extends Route {
  children?: RouteWithMetadata[];
  [RouteMetadataKey]?: RouteMetadata;
}
