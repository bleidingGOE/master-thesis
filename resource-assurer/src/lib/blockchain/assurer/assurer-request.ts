export class AssurerRequest {    
    json = true;
    code = 'assurer';
    scope = 'assurer';
    table: string;
    upper_bound: string;
    lower_bound: string;
    key_type = '';
    index_position = 2;
    limit = 50;

    constructor(by: string, table: string, keyType: string = 'i64') {
        this.upper_bound = by;
        this.lower_bound = by;
        this.table = table;
        this.key_type = keyType;
    }
}