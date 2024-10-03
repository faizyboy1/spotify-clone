import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@Controller('users')
@ApiTags("users")
export class UsersController {}
