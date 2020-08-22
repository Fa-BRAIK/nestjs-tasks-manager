import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    await this.authService.signUp(authCredentialsDto)
  }

  @Post('signin')
  public async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.signIn(authCredentialsDto)
  }

  @Post('test')
  @UseGuards(AuthGuard())
  public async test(@Req() req) {}
}
