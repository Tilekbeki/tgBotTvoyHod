import { Test, TestingModule } from '@nestjs/testing';
import { HelpReqController } from './help-req.controller';
import { HelpReqService } from './help-req.service';

describe('HelpReqController', () => {
  let controller: HelpReqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelpReqController],
      providers: [HelpReqService],
    }).compile();

    controller = module.get<HelpReqController>(HelpReqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
