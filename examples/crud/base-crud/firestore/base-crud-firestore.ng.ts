import { inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, query, docData } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BaseCrud } from '../base-crud.ng';
import { BaseEntity, buildFirestoreQueryParams, CrudPayload, QueryParams } from '../../../shared';

/**
 * This is the base class for all CRUD services that use Firebase Firestore.
 *
 * The abstract `collectionName` property must be implemented in the derived class.
 * Example:
 * protected override collectionName = 'albums';
 */
export abstract class BaseCrudFirestore<
  TEntity extends BaseEntity
> implements BaseCrud<TEntity> {
  protected abstract collectionName: string;

  protected readonly firestore = inject(Firestore);

  create(payload: CrudPayload<TEntity>) {
    const collectionRef = collection(this.firestore, this.collectionName);

    return from(addDoc(collectionRef, payload)).pipe(
      map(documentRef => ({ ...payload, id: documentRef.id } as TEntity))
    );
  }

  read(id: TEntity['id']) {
    const documentRef = this.#getDocumentRef(id);
    return docData(documentRef, { idField: 'id' }).pipe(
      map(entity => entity as TEntity)
    );
  }

  readMany(params?: QueryParams<TEntity>) {
    const collectionRef = collection(this.firestore, this.collectionName);
    const queryParams = buildFirestoreQueryParams(params);

    return from(getDocs(query(collectionRef, ...queryParams))).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        return ({ id: doc.id, ...doc.data() } as TEntity);
      }))
    );
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

  #getDocumentRef(id: TEntity['id']) {
    return doc(this.firestore, this.collectionName, id);
  }
}
