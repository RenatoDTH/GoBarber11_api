import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renato Castro',
      email: 're8@re.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Renato',
      email: 're9@re.com',
    });

    expect(updatedUser.name).toBe('Renato');
    expect(updatedUser.email).toBe('re9@re.com');
  });
  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'non-existing-user',
        email: 'nonexisting@nonexisting.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Renato Castro',
      email: 're10@re.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Renato',
      email: 're11@re.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Renato Castro',
        email: 're10@re.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renato Castro',
      email: 're11@re.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Renato',
      email: 're12@re.com',
      old_password: '123456',
      password: '123456789',
    });

    expect(updatedUser.password).toBe('123456789');
  });

  it('should not be able to update the password without inform the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renato Castro',
      email: 're13@re.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Renato',
        email: 're14@re.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renato Castro',
      email: 're15@re.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Renato',
        email: 're16@re.com',
        old_password: 'xx-wrong-password-xx',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
