import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    )

    if (!username) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: JwtPayload = { username },
      access_token = await this.jwtService.sign(payload)

    return { access_token }
  }
}
