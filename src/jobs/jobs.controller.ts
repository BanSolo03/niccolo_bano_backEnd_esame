import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateJobDto } from './dtos/createJobDto';
import { UpdateJobDto } from './dtos/updateJobDto';
import { Job } from './jobs.schema';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.createJob(createJobDto);
  }

  @Get()
  async findAllJobs(@Query('limit') limit: number): Promise<Job[]> {
    return this.jobsService.findAllJobs(limit);
  }

  @Get('search')
  async findJobsByText(@Query('name') name: string): Promise<Job[]> {
    return this.jobsService.findJobsByText(name);
  }

  @Post(':id')
  async updateJob(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto): Promise<Job> {
    return this.jobsService.updateJob(id, updateJobDto);
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: string): Promise<any> {
    return this.jobsService.deleteJob(id);
  }
}
