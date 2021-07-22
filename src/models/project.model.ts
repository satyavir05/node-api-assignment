import { model, Schema } from 'mongoose';

export interface Project {
    id: string;
    organization_id: string;
    user_id: string;
    name: string;
    created_at?: Date;
}

const projectSchema = new Schema<Project>({
    id: {
        type: String,
        required: true
    },
    organization_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    }
},{ versionKey: false });

export const projectModel = model<Project>('projects', projectSchema);