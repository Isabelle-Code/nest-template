import { CheckingAccountService } from './checking-account.service';
import { Model } from 'mongoose';
import { CheckingAccount } from './checking-account.model';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AccountDoesNotExists, AccountDuplicatedError } from '../account.error';

describe('CheckingAccountService', () => {
  let service: CheckingAccountService;
  let dbModel: Model<CheckingAccount>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckingAccountService,
        {
          provide: getModelToken(CheckingAccount.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CheckingAccountService>(CheckingAccountService);
    dbModel = module.get<Model<CheckingAccount>>(
      getModelToken(CheckingAccount.name),
    );
  });

  describe('Module Checking Account', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Checking Account Creation', () => {
    it('should create account', async () => {
      // given
      const accNumber: string = '123456';

      // mock
      dbModel.findOne = jest.fn().mockReturnValue(null);
      dbModel.create = jest.fn().mockReturnValue({
        number: accNumber,
        balance: 0,
        active: true,
      });

      // when
      const account = await service.createAccount(accNumber);

      // then
      expect(account).toBeDefined();
      expect(account).toEqual({
        number: accNumber,
        balance: 0,
        active: true,
      });
    });

    it('should throw error when account number exists', () => {
      // given
      const accNumber: string = '123456';

      // mock
      dbModel.findOne = jest.fn().mockReturnValue({
        active: true,
        accNumber,
        balance: 0,
      });

      // when
      const promise = service.createAccount(accNumber);

      // then
      expect(promise).rejects.toThrowError(AccountDuplicatedError);
    });
  });

  describe('Checking Account Retrieval', () => {
    it('should return account', async () => {
      //given
      const accNumber = '123456';

      //mock
      dbModel.findOne = jest.fn().mockReturnValue({
        accNumber,
        balance: 0,
        active: true,
      });

      //when
      const account = await service.getAccount(accNumber);

      //then
      expect(account).toBeDefined();
      expect(account).toEqual({
        accNumber,
        balance: 0,
        active: true,
      });
    });
    it('should throw error when account number does not exists', () => {
      // given
      const accNumber: string = '123456';

      // mock
      dbModel.findOne = jest.fn().mockReturnValue(null);

      // when
      const promise = service.getAccount(accNumber);

      // then
      expect(promise).rejects.toThrowError(AccountDoesNotExists);
    });
  });

  describe('Checking Account Deletion', () => {
    it('should delete account', () => {
      // given
      const accNumber: string = '123456';

      // mock
      dbModel.findOne = jest.fn().mockReturnValue({
        active: true,
        accNumber,
        balance: 0,
      });

      dbModel.findOneAndUpdate = jest
        .fn()
        .mockImplementation((filter, update) => {
          expect(filter).toEqual({
            number: accNumber,
          });

          expect(update).toEqual({
            active: false,
          });
        });

      // when
      const promise = service.deleteAccount(accNumber);

      // then
      expect(promise).resolves.toBeUndefined();
    });
    it('should throw error when account number does not exists', () => {
      // given
      const accNumber: string = '123456';

      // mock
      dbModel.findOne = jest.fn().mockReturnValue(null);

      // when
      const promise = service.deleteAccount(accNumber);

      // then
      expect(promise).rejects.toThrow(AccountDoesNotExists);
    });
  });
});
