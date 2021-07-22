import { Body, Controller, Delete, Get, Post, Put, Route, Tags } from 'tsoa';
import { Project, projectModel } from '../models/project.model';
import { v4 as uuidv4 } from 'uuid';

@Route("project")
@Tags('Project')
export class ProjectController extends Controller {

    @Get() // Return a list of all projects
    public async getProjects(): Promise<Project[]> {
        return projectModel.find({}, { _id: 0 });
    }

    // Return a specific project
    @Get("{id}")
    public async getProjectById(
        id: string
    ): Promise<Project | null> {
        return projectModel.findOne({ id: id }, { _id: 0 });
    }

    // Return all projects associated with organizationId
    @Get("organization/{organizationId}")
    public async getProjectByOrganizationId(
        organizationId: string
    ): Promise<Project[]> {
        return projectModel.find({ organization_id: organizationId }, { _id: 0 });
    }

    // Add project into a persistent storage
    @Post()
    public async addProject(
        @Body() project: Project,
    ): Promise<string> {
        const prj = new projectModel(
            {
                id: project.id ? project.id : uuidv4(),
                name: project.name,
                organization_id: project.organization_id,
                user_id: project.user_id,
                created_at: new Date()
            });
        prj.save();
        return 'project added successfully';
    }

    //Update project details for a given id
    @Put('{id}')
    public async updateProject(
        id: string,
        @Body() project: Project
    ): Promise<any> {
        const res = await projectModel.findOne({ id: id });
        if (res) {
            const updates: Project = {
                id: id,
                name: project.name,
                organization_id: project.organization_id,
                user_id: project.user_id
            };
            return projectModel.findByIdAndUpdate(res._id, updates, { new: true });
        }
        return;
    }

    // Delete a project for a given id
    @Delete('{id}')
    public async deleteProject(
        id: string
    ): Promise<any> {
        const res = {
            msg: 'Project does not exist!'
        }
        const operation = await projectModel.deleteOne({ id: id });
        if (operation.deletedCount as unknown as number > 0) {
            res.msg = 'project deleted successfully!';
        }
        return res;
    }
}