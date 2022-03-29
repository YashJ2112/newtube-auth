import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Upload } from './interfaces/upload.interface';
import { CreateUploadDTO } from './dto/create-upload.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('Upload') private readonly uploadModel: Model<Upload>,
  ) {}

  async addUpload(createUploadDTO: CreateUploadDTO): Promise<Upload> {
    const newUpload = await new this.uploadModel(createUploadDTO);
    return newUpload.save();
  }

  async getUpload(uploadID): Promise<Upload> {
    const upload = await this.uploadModel.findById(uploadID).exec();
    return upload;
  }

  async getUploads(): Promise<Upload[]> {
    const uploads = await this.uploadModel.find().exec();
    return uploads;
  }

  async editUpload(
    uploadID,
    createUploadDTO: CreateUploadDTO,
  ): Promise<Upload> {
    const editedUpload = await this.uploadModel.findByIdAndUpdate(
      uploadID,
      createUploadDTO,
      { new: true },
    );
    return editedUpload;
  }
  async deleteUpload(uploadID): Promise<any> {
    const deletedUpload = await this.uploadModel.findByIdAndRemove(uploadID);
    return deletedUpload;
  }
}
