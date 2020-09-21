import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Renato Castro',
      email: 're7@re.com',
      password: '123456789',
    });

    const response = await authenticateUser.execute({
      email: 're7@re.com',
      password: '123456789',
    });

    expect(response).toHaveProperty('token');
  });
});
