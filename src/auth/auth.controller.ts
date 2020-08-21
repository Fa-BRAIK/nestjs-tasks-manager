import { Controller, Post, Body } from '@nestjs/common'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    this.authService.signUp(authCredentialsDto)
  }
}
