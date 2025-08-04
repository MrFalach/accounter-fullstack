import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form.js';
import { Input } from './ui/input.js';

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

interface LoginPageProps {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  title?: string;
  subtitle?: string;
}

export function LoginPage({
  onSubmit,
  title = 'Accounter',
  subtitle = 'Login',
}: LoginPageProps): ReactElement {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit?.(values);
    console.log('Login attempt:', values);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen lg:grid lg:min-h-[200px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-[300px]">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">{title}</h1>
              <h1 className="text-3xl font-bold">{subtitle}</h1>
              <p className="text-balance text-muted-foreground">Enter your credentials to login.</p>
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              className="w-full font-semibold"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div className="hidden bg-muted lg:block bg-black rounded-tl-3xl rounded-bl-3xl">
        <div className="flex flex-row justify-center items-center h-screen">
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">🏢</span>
          </div>
        </div>
      </div>
    </div>
  );
}
