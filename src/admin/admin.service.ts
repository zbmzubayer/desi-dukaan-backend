import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/db/entities/admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { UpdateAdminDTO } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepo: Repository<Admin>) {}
  // CRUD
  async create(adminDto: CreateAdminDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(adminDto.Password, salt);
    adminDto.Password = hashedPassword;
    adminDto.CreatedAt = new Date();
    adminDto.ModifiedAt = new Date();
    return this.adminRepo.save(adminDto);
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
}
