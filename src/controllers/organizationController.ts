import { Body, Controller, Delete, Get, Post, Put, Route, Tags } from 'tsoa';
import { Organization, organizationModel } from '../models/organization.model';
import { v4 as uuidv4 } from 'uuid';

@Route("organization")
@Tags('Organization')
export class OrganizationController extends Controller {

    @Get() // Return a list of all organizations
    public async getOrganizations(): Promise<Organization[]> {
        return organizationModel.find({}, { _id: 0 });
    }

    // Return organization details for given id
    @Get("{id}")
    public async getOrganizationById(
        id: string
    ): Promise<Organization | null> {
        return organizationModel.findOne({ organization_id: id }, { _id: 0 });
    }

    // Add an organization 
    @Post()
    public async addOrganization(
        @Body() organization: Organization,
    ): Promise<string> {
        const org = new organizationModel(
            {
                organization_id: organization.organization_id ? organization.organization_id : uuidv4(),
                name: organization.name
            });
        org.save();
        return 'organization added successfully';
    }

    // Update an organization details for a given id
    @Put('{id}')
    public async updateOrganization(
        id: string,
        @Body() organization: Organization
    ): Promise<any> {
        const res = await organizationModel.findOne({ organization_id: id });
        if (res) {
            const updates: Organization = {
                organization_id: id,
                name: organization.name
            };
            return organizationModel.findByIdAndUpdate(res._id, updates, { new: true });
        }
        return;
    }

    @Delete('{id}')  // Delete an organization
    public async deleteOrganization(
        id: string
    ): Promise<any> {
        const res = {
            msg: 'Organization does not exist!'
        }
        const operation = await organizationModel.deleteOne({ organization_id: id });
        if (operation.deletedCount as unknown as number > 0) {
            res.msg = 'Organization deleted successfully!';
        }
        return res;
    }
}