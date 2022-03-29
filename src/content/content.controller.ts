import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateUploadDTO } from './dto/create-upload.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  // Submit an upload
  @Post('/upload')
  async addUpload(@Res() res, @Body() createUploadDTO: CreateUploadDTO) {
    const newUpload = await this.contentService.addUpload(createUploadDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Video has been uploaded sucessfully',
      upload: newUpload,
    });
  }

  // Fetch a particular video using ID
  @Get('/upload/:uploadID')
  async getUpload(
    @Res() res,
    @Param('uploadID', new ValidateObjectId()) uploadID,
  ) {
    const upload = await this.contentService.getUpload(uploadID);
    if (!upload) {
      throw new NotFoundException('Video does not exist!');
    }
    return res.status(HttpStatus.OK).json(upload);
  }

  // Fetch all videos
  @Get('/uploads')
  async getUploads(@Res() res) {
    const uploads = await this.contentService.getUploads();
    return res.status(HttpStatus.OK).json(uploads);
  }

  @Put('/edit')
  async editUpload(
    @Res() res,
    @Query('uploadID', new ValidateObjectId()) uploadID,
    @Body() createUploadDTO: CreateUploadDTO,
  ) {
    const editedUpload = await this.contentService.editUpload(
      uploadID,
      createUploadDTO,
    );
    if (!editedUpload) {
      throw new NotFoundException('Video does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Upload has been successfully updated',
      upload: editedUpload,
    });
  }
  // Delete a post using ID
  @Delete('/delete')
  async deleteUpload(
    @Res() res,
    @Query('uploadID', new ValidateObjectId()) uploadID,
  ) {
    const deletedUpload = await this.contentService.deleteUpload(uploadID);
    if (!deletedUpload) {
      throw new NotFoundException('Video does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Video has been deleted!',
      upload: deletedUpload,
    });
  }
}
