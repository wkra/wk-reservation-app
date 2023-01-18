import { Test, TestingModule } from '@nestjs/testing';
import { DeskResolver } from './desk.resolver';

describe('DeskResolver', () => {
  let resolver: DeskResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeskResolver],
    }).compile();

    resolver = module.get<DeskResolver>(DeskResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
