import { Entity } from '../business/entity/Entity';

export interface Persister {
    create(item: Entity): any;
    read(id: string): any;
    update(id: Entity, updateMap: any, deleteMap?: any): any;
    delete(id: string): any;
}
