import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { randomBytes } from 'crypto';
import { LoginDto } from './dto/login-auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isPasswordValid = await user.checkPassword(loginDto.password);

    if (!isPasswordValid) throw new UnauthorizedException('Senha inválida');

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      user: { id: user.id, email: user.email, name: user.name },
      access_token: token,
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const token = randomBytes(32).toString('hex');

    const expires = new Date(Date.now() + 1000 * 60 * 60);

    user.resetToken = token;
    user.resetTokenExpiresAt = expires;
    await user.save();

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const emailContent = `<p>Para recuperar a sua senha <a href="${resetLink}">clique aqui</a></p>`;

    await this.mailService.sendMail(
      forgotPasswordDto.email,
      'Recuperação de Senha - Garantia+',
      emailContent,
    );

    return {
      message:
        'Se o e-mail estiver registrado, você receberá instruções em breve',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByEmail(resetPasswordDto.email);

    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    if (
      resetPasswordDto.token !== user.resetToken ||
      (user.resetTokenExpiresAt && new Date() > user.resetTokenExpiresAt)
    ) {
      throw new BadRequestException('Código inválido ou expirado');
    }

    user.password = resetPasswordDto.newPassword;
    user.resetToken = null;
    user.resetTokenExpiresAt = null;
    await user.save();

    return {
      message: 'Senha alterada com sucesso. Você já pode fazer login novamente',
    };
  }
}
