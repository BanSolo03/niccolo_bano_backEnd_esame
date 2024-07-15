import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop({ required: true })
  titolo: string;

  @Prop({ required: true })
  descrizioneBreve: string;

  @Prop({ required: true })
  dataInserimento: Date;

  @Prop({ required: true })
  retribuzioneLorda: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);