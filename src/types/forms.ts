export type FieldKey = 'pk' | 'fk' | 'regular';

export type ConstraintAction = 'NO ACTION' | 'RESTRICT' | 'CASCADE' | 'SET NULL';

export type DataType = 'INT' | 'FLOAT' | 'VARCHAR' | 'VARCHAR(255)' | 'VARCHAR(500)' | 'DATETIME' | 'ENUM';