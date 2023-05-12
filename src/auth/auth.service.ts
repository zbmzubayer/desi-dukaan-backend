import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/db/entities/admin.entity';
import { Customer } from 'src/db/entities/customer.entity';
import { Seller } from 'src/db/entities/seller.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Seller) private sellerRepo: Repository<Seller>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
  ) {}
  async customerLogin(loginDto: LoginDTO): Promise<boolean> {
    const isValidCustomer = await await this.customerRepo.findOneBy({ Email: loginDto.Email });
    if (isValidCustomer && (await bcrypt.compare(loginDto.Password, isValidCustomer.Password))) {
      return true;
    } else {
      return false;
    }
  }
  async sellerLogin(loginDto: LoginDTO) {
    const isValidCustomer = await await this.sellerRepo.findOneBy({ Email: loginDto.Email });
    if (isValidCustomer && (await bcrypt.compare(loginDto.Password, isValidCustomer.Password))) {
      return true;
    } else {
      return false;
    }
  }
  async adminLogin(loginDto: LoginDTO) {
    const isValidCustomer = await await this.adminRepo.findOneBy({ Email: loginDto.Email });
    if (isValidCustomer && (await bcrypt.compare(loginDto.Password, isValidCustomer.Password))) {
      return true;
    } else {
      return false;
    }
  }
}
