import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './jobs.schema';
import { UpdateJobDto } from './dtos/updateJobDto';
import { CreateJobDto } from './dtos/createJobDto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const createdJob = new this.jobModel(createJobDto);
    return createdJob.save();
  }

  async findAllJobs(limit: number): Promise<Job[]> {
    const results = await this.jobModel
      .find()
      .sort({ dataInserimento: -1 })
      .limit(limit)
      .exec();
    if(results.length == 0) {
        throw new NotFoundException(`No results found`);
    }
    return results;
  }

  async findJobsByText(text: string): Promise<Job[]> {
    const results = await this.jobModel
      .find({ titolo: new RegExp(text, 'i') } || { dataInserimento: new RegExp(text, 'i')})
      .sort({ dataInserimentoRichiesta: -1 })
      .exec();
    if (results.length == 0) {
      throw new NotFoundException(`No results found`);
    }
    return results;
  }

  async updateJob(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const existingJob = await this.jobModel
      .findByIdAndUpdate(id, updateJobDto, { new: true })
      .exec();
    if (!existingJob) {
      throw new NotFoundException(`Job #${id} not found`);
    }
    return existingJob;
  }

  async deleteJob(id: string): Promise<any> {
    const result = await this.jobModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Job #${id} not found`);
    }
    return result;
  }
}
