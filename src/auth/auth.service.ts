import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    )

    if (!username) {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
}
