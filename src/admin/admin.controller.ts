import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveAdminPhoto } from 'helper/saveUploadedFile';
import { AdminService } from './admin.service';
import { AdminChangePasswordDTO } from './dto/change-password-admin.dto';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { UpdateAdminDTO } from './dto/update-admin.dto';

@Controller('api/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  // CRUD
  @Post('/create')
  create(@Body(ValidationPipe) adminDto: CreateAdminDTO) {
    return this.adminService.create(adminDto);
  }
  @Get('/all')
  getAll() {
    return this.adminService.getAll();
  }
  @Get('/:uuid')
  getByUuid(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.adminService.getByUuid(uuid);
  }
  @Put('/update/:uuid')
  @UseInterceptors(FileInterceptor('Photo', saveAdminPhoto))
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) adminDto: UpdateAdminDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      adminDto.Photo = null;
      return this.adminService.update(uuid, adminDto);
    } else {
      adminDto.Photo = file.filename;
      return this.adminService.update(uuid, adminDto);
    }
  }
  @Delete('/delete/:uuid')
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    this.adminService.delete(uuid);
  }
  // Get Photo
  @Get('/photo/:filename')
  getImage(@Param('filename') filename, @Res() res) {
    res.sendFile(filename, { root: './uploads/admin-photo' });
  }
  // Change Password
  @Patch('/change-password/:uuid')
  changePassword(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) changePasswordDto: AdminChangePasswordDTO,
  ) {
    return this.adminService.changePassword(uuid, changePasswordDto);
  }
}
