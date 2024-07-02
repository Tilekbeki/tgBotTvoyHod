import { Test, TestingModule } from '@nestjs/testing';
import { UserPrizesController } from './user-prizes.controller';
import { UserPrizesService } from './user-prizes.service';

describe('UserPrizesController', () => {
  let controller: UserPrizesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPrizesController],
      providers: [UserPrizesService],
    }).compile();

    controller = module.get<UserPrizesController>(UserPrizesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
