import { Injectable, isDevMode } from '@angular/core';

import { BaseCrud } from '../base-crud';

import { Album } from './album';
import { AlbumCrudFireStore } from './firestore';
import { AlbumCrudRest } from './rest';

/**
 * This is an example of a CRUD service for albums that extends the `BaseCrud` class.
 * It is agnostic of the underlying data source (Firestore, RESTful API, etc.).
 * It is easy to switch between different data sources by changing the `useExisting` property.
 * The service consumers do not need to know the implementation details.
 */
@Injectable({
  providedIn: 'root',
  useExisting: isDevMode() ? AlbumCrudFireStore : AlbumCrudRest
})
export abstract class AlbumCrud extends BaseCrud<Album> {
  /**
   * The custom abstract methods for the album CRUD service can be added here.
   * They must be implemented in the derived classes.
   *
   * Example:
   * abstract updateCover(albumCover: File): Observable<Album>;
   */
}
