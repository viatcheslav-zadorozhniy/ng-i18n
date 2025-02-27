import { Injectable } from '@angular/core';

import { Album } from '../album';
import { BaseCrudFirestore } from '../../base-crud';
import { AlbumCrud } from '../album-crud.ng';

/**
 * This is an example of a CRUD service for albums that uses Firestore.
 * By extending the `BaseCrudFirestore` class, it reduces the boilerplate code.
 */
@Injectable({
  providedIn: 'root'
})
export class AlbumCrudFireStore extends BaseCrudFirestore<Album> implements AlbumCrud {
  protected override collectionName = 'albums';
}
