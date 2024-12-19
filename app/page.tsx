"use client";

import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import AuthForm from "@/components/form/AuthForm";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/services/auth/signin";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

type FormErrors = Record<string, { message?: string }>;

type FormValues = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignIn() {
  const { toast } = useToast();
  const { signIn: authSignIn } = useAuth();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: async (data) => {
      await authSignIn(
        data.username,
        data.email,
        data.role,
        data.token,
        data.id
      );
      toast({
        title: "Access Granted",
        description: "Welcome to NYPD Crime Analysis Platform.",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: `An error occured: ${error instanceof Error ? error.message : error}`,
      });
    },
  });

  const onError = useCallback(
    (errors: FormErrors) => {
      Object.values(errors).forEach((error) => {
        toast({
          variant: "destructive",
          title: "Form submission failed",
          description: error.message,
        });
      });
    },
    [toast]
  );

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <AuthForm<FormValues>
      title="NYPD Crime Analysis Platform"
      description="Access NYC's comprehensive crime data dashboard."
      fields={[
        {
          label: "Email",
          type: "email",
          id: "email",
          placeholder: "johndoe@gmail.com",
          name: "email",
        },
        {
          label: "Password",
          type: "password",
          id: "password",
          placeholder: "",
          name: "password",
        },
      ]}
      form={form}
      onSubmit={onSubmit}
      onError={onError}
      isLoading={mutation.status === "pending"}
      image={"/background.webp"}
      buttonText="Sign In"
      redirectText="Don't have an account? "
      redirectButton="Sign up"
      redirectLink="/signup"
    />
  );
}
