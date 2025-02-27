import { Component, inject } from '@angular/core';

import { AlbumCrud } from './album-crud.ng';

@Component({
  // ...
})
export class AlbumList {
  albums$ = inject(AlbumCrud).readMany();
}
