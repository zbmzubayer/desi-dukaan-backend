import { Body, Controller, Get, Post, Session, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('customer/login')
  async customerLogin(@Session() session, @Body(ValidationPipe) loginDto: LoginDTO) {
    const isValid = this.authService.customerLogin(loginDto);
    if ((await isValid.then((res) => res)) == true) {
      session.email = loginDto.Email;
      return session.email;
    } else {
      return { message: 'Invalid credentials' };
    }
  }
  @Post('/seller/login')
  async sellerLogin(@Session() session, @Body(ValidationPipe) loginDto: LoginDTO) {
    const isValid = this.authService.sellerLogin(loginDto);
    if ((await isValid.then((res) => res)) == true) {
      session.email = loginDto.Email;
      return session.email;
    } else {
      return { message: 'Invalid credentials' };
    }
  }
  @Post('/admin/login')
  async adminLogin(@Session() session, @Body(ValidationPipe) loginDto: LoginDTO) {
    const isValid = this.authService.adminLogin(loginDto);
    if ((await isValid.then((res) => res)) == true) {
      session.email = loginDto.Email;
      return session.email;
    } else {
      return { message: 'Invalid credentials' };
    }
  }
  @Get('/logout')
  logout(@Session() session) {
    if (session.destroy()) {
      return { message: 'Logged out' };
    } else {
      throw new UnauthorizedException('Invalid actions');
    }
  }
}
