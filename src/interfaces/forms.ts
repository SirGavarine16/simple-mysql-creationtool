import { ConstraintAction, DataType, FieldKey } from "../types/forms";

export interface DatabaseFormData {
    dbName: string;
}

export interface TableFieldFormData {
    name: string;
    key: FieldKey;
    constraintDelete?: ConstraintAction;
    constraintUpdate?: ConstraintAction;
    fkName?: string;
    fkTableName?: string;
    allowsNull?: boolean;
    type?: DataType; 
    varcharLength?: number;
    enumFields?: string;
}

export interface TableFieldData extends TableFieldFormData {
    id: number;
}

