import { model, Schema } from 'mongoose';

export interface Organization {
  organization_id?: string;
  name: string;
}

const organizationSchema  = new Schema<Organization>({
    organization_id: {
        type: String,
        required: [false]
    },
    name: {
        type: String,
        required: true
    }
},{ versionKey: false });

export const organizationModel = model<Organization>('organizations', organizationSchema);