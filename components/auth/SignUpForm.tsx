'use client';
import { Label } from '@radix-ui/react-label';
import { FormCard } from './FormCard';
import { Input } from '../ui/input';
import { Submit } from './Submit';
import { SignUpSchema } from '@/schemas/auth';
import { useFormValidate } from '@/hooks/useFormValidate';
import { TSignUpFormError } from '@/types/form';
import { FormMessage } from './FormMessage';
import { ChangeEvent, useEffect } from 'react';
import { signUp } from '@/actions/signup';
import { useActionState } from 'react';
import toast from 'react-hot-toast';

export function SignUpForm() {
  const [error, action] = useActionState(signUp, undefined);
  const { errors, validateField } =
    useFormValidate<TSignUpFormError>(SignUpSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="회원가입"
      footer={{ label: '이미 계정이 있으신가요?', href: '/login' }}
    >
      <form action={action} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            error={!!errors?.name}
            onChange={handleChange}
          />
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            error={!!errors?.email}
            onChange={handleChange}
          />
          {errors?.email && <FormMessage message={errors?.email[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            error={!!errors?.password}
            onChange={handleChange}
          />
          {errors?.password && <FormMessage message={errors?.password[0]} />}
        </div>
        <Submit className="w-full">가입하기</Submit>
      </form>
    </FormCard>
  );
}
