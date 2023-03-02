export interface Crud {
    create(item: any): any;
    read(item: any): any;
    update(item: any): any;
    delete(item: any): any;
}
