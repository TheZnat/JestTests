import { renderHook, act } from '@testing-library/react';
import { useCreateUser } from '../use-create-user';
import { passwordValidationErrors } from '../../constants/validation';

describe('userCreate', () => {
  it('should return object with correct properties', () => {
    const { result } = renderHook(useCreateUser);
    //  проверка на то что эти методы существуют successMessage, errorMessage, onSubmit, onSuccess, onError
    expect(result.current).toHaveProperty('errorMessage');
    expect(result.current).toHaveProperty('onError');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('onSuccess');
    expect(result.current).toHaveProperty('successMessage');

    expect(typeof result.current.errorMessage).toBe('string');
    expect(typeof result.current.onError).toBe('function');
    expect(typeof result.current.onSubmit).toBe('function');
    expect(typeof result.current.onSuccess).toBe('function');
    expect(typeof result.current.successMessage).toBe('string');
  });
  // проверка состояния: const [successMessage, setSuccessMessage] = useState('');
  it('should set the success message', () => {
    const { result } = renderHook(useCreateUser);
    expect(result.current.successMessage).toBe('');

    act(() => {
      result.current.onSuccess({ name: 'John', password: 'Qwerty12#1' });
    });

    expect(result.current.successMessage).toBe(
      'User John created with password Qwerty12#1',
    );
  });
  // проверка состояния:  const [errorMessage, setErrorMessage] = useState('');
  it('should set the error message', () => {
    const { result } = renderHook(useCreateUser);

    expect(result.current.errorMessage).toBe('');

    act(() => {
      result.current.onError(new Error('Invalid password'));
    });

    expect(result.current.errorMessage).toBe('Invalid password');
  });
  // проверка на волидность пароля
  // проверка на то, что ошибка выбрасываеться, когда ввелен неверный пароль
  it('should throw an error', async () => {
    const { result } = renderHook(useCreateUser);

    await expect(
      result.current.onSubmit({ password: '123' }),
    ).rejects.toThrowError(passwordValidationErrors.length);
  });
  // проверка на то, что ошибка не выбрасываеться, когда введен верный пароль
  it('should not throw an error', async () => {
    const { result } = renderHook(useCreateUser);

    await expect(
      result.current.onSubmit({ password: 'Qwer!23!sds' }),
    ).resolves.toBe();
  });
});
