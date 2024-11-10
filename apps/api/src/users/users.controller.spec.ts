import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRole } from '@app/common/enums';
import { ForbiddenException } from '@nestjs/common';
import { JwtPayload } from '@app/common/interfaces/jwt.interface';
import { createMockUser } from '@app/common/utils/mock-data';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: jest.Mocked<UsersService>;

  const mockUser: JwtPayload = {
    username: 'testuser',
    userId: 1,
    role: UserRole.STAFF,
  };
  const mockAdmin: JwtPayload = {
    username: 'adminuser',
    userId: 2,
    role: UserRole.ADMIN,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findUser: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService);
  });

  describe('create', () => {
    it('should call usersService.create and return the result', async () => {
      const dto = createMockUser();
      usersService.create.mockResolvedValue({ ...dto });

      const result = await controller.create(dto);

      expect(usersService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto });
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll and return the result', async () => {
      const user = createMockUser();
      const users = [
        user,
        { ...user, id: 2, username: 'newusername', name: 'New Name' },
      ];
      usersService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();

      expect(usersService.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('myProfile', () => {
    it('should return the current user profile', async () => {
      const user = createMockUser();
      usersService.findUser.mockResolvedValue({ ...user });

      const result = await controller.myProfile(mockUser);

      expect(usersService.findUser).toHaveBeenCalledWith(1);
      expect(result).toEqual({ ...user });
    });
  });

  describe('findOne', () => {
    it('should return a user if the user is an admin', async () => {
      const user = createMockUser();
      usersService.findUser.mockResolvedValue({ ...user });

      const result = await controller.findOne(1, mockAdmin);

      expect(usersService.findUser).toHaveBeenCalledWith(1);
      expect(result).toEqual({ ...user });
    });

    it('should return a user if the user is accessing their own profile', async () => {
      const user = createMockUser();
      usersService.findUser.mockResolvedValue({ ...user });

      const result = await controller.findOne(1, mockUser);

      expect(usersService.findUser).toHaveBeenCalledWith(1);
      expect(result).toEqual({ ...user });
    });

    it("should throw ForbiddenException if the user tries to access another user's profile without admin role", () => {
      expect(() => controller.findOne(2, mockUser)).toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should update a user if the user is an admin', async () => {
      const user = createMockUser();
      const updateUserDto = { name: 'Updated Name' };
      const updatedUser = { ...user, ...updateUserDto };
      usersService.update.mockResolvedValue({ ...updatedUser });

      const result = await controller.update(user.id, updateUserDto, mockAdmin);

      expect(usersService.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(result).toEqual({ ...updatedUser });
    });

    it('should update a user if they are updating their own profile', async () => {
      const user = createMockUser();
      const updateUserDto = { name: 'Updated Name' };
      const updatedUser = { ...user, ...updateUserDto };
      usersService.update.mockResolvedValue({ ...updatedUser });

      const result = await controller.update(user.id, updateUserDto, mockUser);

      expect(usersService.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(result).toEqual({ ...updatedUser });
    });

    it('should throw ForbiddenException if a non-admin tries to change role', () => {
      const updateUserDto = { role: UserRole.ADMIN };

      expect(() => controller.update(1, updateUserDto, mockUser)).toThrow(
        ForbiddenException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user if the requester is an admin', async () => {
      const user = createMockUser();
      usersService.remove.mockResolvedValue({ ...user });

      const result = await controller.remove(1);

      expect(usersService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ ...user });
    });
  });

  describe('checkUser', () => {
    it('should not throw if the user is an admin', () => {
      expect(() => controller['checkUser'](mockAdmin, 1)).not.toThrow();
    });

    it('should not throw if the user is accessing their own profile', () => {
      expect(() => controller['checkUser'](mockUser, 1)).not.toThrow();
    });

    it('should throw ForbiddenException if the user is not an admin and accessing another profile', () => {
      expect(() => controller['checkUser'](mockUser, 2)).toThrow(
        ForbiddenException,
      );
    });
  });
});
