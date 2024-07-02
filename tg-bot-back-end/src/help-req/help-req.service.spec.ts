import { Test, TestingModule } from '@nestjs/testing';
import { HelpReqService } from './help-req.service';

describe('HelpReqService', () => {
  let service: HelpReqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpReqService],
    }).compile();

    service = module.get<HelpReqService>(HelpReqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
