import { BaseEntity } from '../base-entity';

/**
 * This is the base class for all view models.
 * It encapsulates the entity (DTO) and provides a way to clone the view model.
 * It addition, it provides a way to access the entity id.
 */
export class BaseViewModel<TEntity extends BaseEntity> {
  readonly id: TEntity['id'];

  protected readonly dto: TEntity;

  constructor(dto: TEntity) {
    this.dto = dto;
    this.id = dto.id;

    /**
     * TODO: consider using Object.assign to copy all properties from the DTO to the view model.
     * This way, we can avoid writing all properties manually.
     * However, this approach has some drawbacks:
     * - It will copy all properties, including the ones that should not be exposed.
     */
    // Object.assign(this, dto);
  }

  clone() {
    const classConstructor = this.constructor as new (dto: TEntity) => this;
    return new classConstructor(this.dto);
  }
}
