import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  getCountFromServer,
  docData
} from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BaseCrud } from '../base-crud.ng';
import {
  BaseEntity,
  BaseViewModel,
  buildFirestoreQueryParams,
  CrudPayload,
  PaginatedResult,
  QueryParams
} from '../../../shared';

/**
 * This is the base class for all CRUD services that use Firebase Firestore.
 *
 * The abstract `collectionName` property must be implemented in the derived class.
 * Example:
 * protected override collectionName = 'users';
 */
export abstract class BaseCrudFirestore<
  TEntity extends BaseEntity,
  TViewModel extends BaseViewModel<TEntity>
> implements BaseCrud<TEntity, TViewModel> {
  /**
   * Concrete classes must specify:
   * - The collection name in the Firestore (`collectionName`).
   * - The view model constructor to transform DTOs (`entityViewModel`).
   */
  protected abstract collectionName: string;
  protected abstract entityViewModel: new (entity: TEntity) => TViewModel;

  protected readonly firestore = inject(Firestore);

  create(payload: CrudPayload<TEntity>) {
    const collectionRef = collection(this.firestore, this.collectionName);

    return from(addDoc(collectionRef, payload)).pipe(
      map(documentRef => this.createEntityViewModel({ ...payload, id: documentRef.id } as TEntity))
    );
  }

  read(id: TEntity['id']) {
    const documentRef = this.#getDocumentRef(id);
    return docData(documentRef, { idField: 'id' }).pipe(
      map(entity => this.createEntityViewModel(entity as TEntity))
    );
  }

  readMany(params?: QueryParams<TEntity>) {
    return from(this.#readMany(params));
  }

  update(id: TEntity['id'], payload: CrudPayload<TEntity>) {
    const documentRef = this.#getDocumentRef(id);
    return from(updateDoc(documentRef, payload)).pipe(
      switchMap(() => this.read(id))
    );
  }

  delete(id: TEntity['id']) {
    const documentRef = this.#getDocumentRef(id);
    return from(deleteDoc(documentRef));
  }

  protected createEntityViewModel(entity: TEntity) {
    return new this.entityViewModel(entity);
  }

  #getDocumentRef(id: TEntity['id']) {
    return doc(this.firestore, this.collectionName, id);
  }

  async #readMany(params?: QueryParams<TEntity>): Promise<PaginatedResult<TViewModel>> {
    const collectionRef = collection(this.firestore, this.collectionName);
    const constraints = buildFirestoreQueryParams(params);

    /**
     * The `constraints` are the query constraints that are passed to Firestore.
     * The `paginatedQuery` is the query that is executed with the constraints.
     * The `snapshot` is the result of the query.
     * The `items` are the entities that are returned from the query.
     */
    const paginatedQuery = query(collectionRef, ...constraints);
    const snapshot = await getDocs(paginatedQuery);
    const items = snapshot.docs.map(doc => {
      return this.createEntityViewModel({ id: doc.id, ...doc.data() } as TEntity);
    });

    /**
     * The `countConstraints` are the same as the `constraints`, but without the `pagination` property.
     * This is because the `getCountFromServer` function does not support pagination.
     * We need to run a separate query to get the total count.
     * This is a limitation of Firestore.
     */
    const countConstraints = buildFirestoreQueryParams({ ...params, pagination: undefined });
    const countQuery = query(collectionRef, ...countConstraints);
    const countSnapshot = await getCountFromServer(countQuery);
    const total = countSnapshot.data().count;
    
    return { items, total };
  }
}
