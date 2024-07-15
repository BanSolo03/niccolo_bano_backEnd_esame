import { IsString, IsNotEmpty, IsDate, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class UpdateJobDto {
  @IsString()
  @IsNotEmpty()
  titolo: string;

  @IsString()
  @IsNotEmpty()
  descrizioneBreve: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dataInserimento: Date;

  @IsNumber()
  @IsNotEmpty()
  retribuzioneLorda: number;
}