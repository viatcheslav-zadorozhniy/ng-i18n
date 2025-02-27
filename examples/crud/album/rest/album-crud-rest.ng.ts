import { Injectable } from '@angular/core';

import { Album } from '../album';
import { BaseCrudRest } from '../../base-crud';
import { AlbumCrud } from '../album-crud.ng';

/**
 * This is an example of a CRUD service for albums that uses a RESTful API.
 * By extending the `BaseCrudRest` class, it reduces the boilerplate code.
 */
@Injectable({
  providedIn: 'root'
})
export class AlbumCrudRest extends BaseCrudRest<Album> implements AlbumCrud {
  protected override entityRoute = '/api/albums';
}
