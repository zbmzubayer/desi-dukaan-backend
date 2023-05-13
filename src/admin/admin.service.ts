import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/db/entities/admin.entity';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { AdminChangePasswordDTO } from './dto/change-password-admin.dto';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { UpdateAdminDTO } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepo: Repository<Admin>, private emailService: EmailService) {}
  // CRUD
  async create(adminDto: CreateAdminDTO) {
    const dbUser = await this.adminRepo.findOneBy({ Email: adminDto.Email });
    if (dbUser) {
      throw new BadRequestException('Email already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(adminDto.Password, salt);
    adminDto.Password = hashedPassword;
    adminDto.CreatedAt = new Date();
    adminDto.ModifiedAt = new Date();
    const admin = this.adminRepo.save(adminDto);
    this.emailService.sendOnSignup((await admin).Email, (await admin).Name, (await admin).Uuid);
    return admin;
  }
  async getAll() {
    return await this.adminRepo.find();
  }
  async getByUuid(uuid: string) {
    return await this.adminRepo.findOneBy({ Uuid: uuid });
  }
  async update(uuid: string, adminDto: UpdateAdminDTO) {
    adminDto.ModifiedAt = new Date();
    return this.adminRepo.update({ Uuid: uuid }, adminDto);
  }
  async delete(uuid: string) {
    return await this.adminRepo.delete({ Uuid: uuid });
  }
  // Change Password
  async changePassword(uuid: string, changePasswordDto: AdminChangePasswordDTO) {
    const dbPassword = (await this.adminRepo.findOneBy({ Uuid: uuid })).Password;
    const isMatch = await bcrypt.compare(changePasswordDto.CurrentPassword, dbPassword);
    if (isMatch) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(changePasswordDto.NewPassword, salt);
      changePasswordDto.NewPassword = hashedPassword;
      await this.adminRepo.update({ Uuid: uuid }, { Password: changePasswordDto.NewPassword });
      return true;
    } else {
      return false;
    }
  }
}
