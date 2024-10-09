import { Document, Schema } from 'mongoose';

export class BaseSchema extends Document {
    static createSchema(definition: any): Schema {
        return new Schema(definition, { timestamps: true });
    }
}
