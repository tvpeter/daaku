import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { createMockUser } from '@app/common/utils/mock-data';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };
  const mockConfigService = {
    getOrThrow: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('create', () => {
    it('should create and return a new user without password', async () => {
      const createUserDto = createMockUser();
      const hashedPassword = 'hashedPassword';
      const createdUser = { ...createUserDto, password: hashedPassword };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = createdUser;

      jest.spyOn(service, 'hashPassword').mockResolvedValue(hashedPassword);
      mockUserRepository.create.mockReturnValue(createdUser);
      mockUserRepository.save.mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);
      expect(service.hashPassword).toHaveBeenCalledWith(createUserDto.password);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual({ ...rest });
    });
  });

  describe('findAll', () => {
    it('should return an array of users with selected fields', async () => {
      const user = createMockUser();
      const users = [
        user,
        { ...user, id: 2, username: 'newusername', name: 'New Name' },
      ];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(userRepository.find).toHaveBeenCalledWith({
        select: [
          'id',
          'name',
          'phone',
          'email',
          'status',
          'role',
          'created_at',
          'updated_at',
        ],
      });
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return the user if found', async () => {
      const user = createMockUser();
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findUser', () => {
    /**
    it('should return the user if found', async () => {
      const user = createMockUser();
      const studentClass = mockStudentClass(user);
      const classDetails = {
        id: studentClass.id,
        name: studentClass.name,
        user_id: studentClass.user_id,
        created_at: studentClass.created_at,
        updated_at: studentClass.updated_at,
      };

      user.studentClass = [
        {
          ...classDetails,
          students: [],
          result_status: [],
          scores: [],
          scoreMetaData: [],
          results: [],
          teacher: new User(),
          combineScore: [],
          studentSessionClass: [],
        },
      ];

      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, token, ...rest } = user;

      const result = await service.findUser(user.id);

      expect(service.findOne).toHaveBeenCalledWith(user.id);
      expect(result).toEqual(rest);
    });
**/
    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.findUser(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const updateUserDto = { name: 'Updated Name' };
      const user = createMockUser();
      const updatedUser = { ...user, ...updateUserDto };

      jest.spyOn(service, 'findOne').mockResolvedValue(user);
      mockUserRepository.save.mockResolvedValue(updatedUser);

      const result = await service.update(user.id, updateUserDto);

      expect(service.findOne).toHaveBeenCalledWith(user.id);
      expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove and return the user', async () => {
      const user = createMockUser();

      jest.spyOn(service, 'findOne').mockResolvedValue(user);
      mockUserRepository.remove.mockResolvedValue(user);

      const result = await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(userRepository.remove).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('findByUsername', () => {
    it('should return the user if found', async () => {
      const user = { id: 1, username: 'testuser' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findByUsername('testuser');

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findByUsername('unknown')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('hashPassword', () => {
    it('should hash the password using bcrypt', async () => {
      const password = 'plainPassword';
      const hashedPassword = 'hashedPassword';
      mockConfigService.getOrThrow.mockReturnValue('10');
      (jest.spyOn(bcrypt, 'hash') as jest.Mock).mockResolvedValue(
        hashedPassword,
      );

      const result = await service.hashPassword(password);

      expect(mockConfigService.getOrThrow).toHaveBeenCalledWith('SALT_ROUNDS');
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(result).toEqual(hashedPassword);
    });
  });
});
