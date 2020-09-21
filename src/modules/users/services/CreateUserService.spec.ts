import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Renato',
      email: 're@re.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const userRegistered = {
      name: 'Renato',
      email: 're@re.com',
      password: '123456',
    };

    await createUser.execute(userRegistered);

    expect(
      createUser.execute({
        name: 'AAAAA',
        email: 're@re.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
