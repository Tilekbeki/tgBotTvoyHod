import { Test, TestingModule } from '@nestjs/testing';
import { UserPrizesService } from './user-prizes.service';

describe('UserPrizesService', () => {
  let service: UserPrizesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPrizesService],
    }).compile();

    service = module.get<UserPrizesService>(UserPrizesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
