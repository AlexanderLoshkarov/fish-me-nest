import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UserService } from '../service/user.service';
import { User } from 'src/model/user.schema';

@Injectable()
export class UserSeedCommand {
  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'create:user',
    describe: 'create a user',
    //autoExit: true,
  })
  async create() {
    const user = await this.userService.signup({
      fullname: 'Tomas Shelbey',
      email: 'tomas.shelbey@yahoo.com',
      password: 'pwd',
    } as User);

    console.log(user);
  }
}
