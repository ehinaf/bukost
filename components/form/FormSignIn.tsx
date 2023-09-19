"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ButtonAuth from "@/components/ButtonAuth";
import Divider from "@/components/ui/divider";
import { useToast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormSignInProps {
  role: "tenant" | "owner";
}

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "password must have than 8 characters"),
});

const FormSignIn = ({ role }: FormSignInProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Opps something when wrong!",
      });
    } else {
      router.refresh();
      router.push("/ownerpage");
    }
  };
  return (
    <Card className="w-[400px]">
      <CardHeader className="mb-5">
        <CardTitle>
          Login {role === "tenant" ? "Pencari" : "Pemilik"} Kos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {role == "tenant" && (
          <>
            <div className="flex flex-col gap-4">
              <ButtonAuth provider={"google"} icon={"icon-google.svg"} />
              <ButtonAuth provider={"facebook"} icon={"icon-facebook.svg"} />
            </div>
            <Divider>atau</Divider>
          </>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukan Email" {...field} />
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
                    <Input
                      placeholder="Masukan Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col  justify-between gap-4">
              <Button className="w-full" size={"lg"} type="submit">
                Login
              </Button>
              <p className="text-sm">
                Sudah punya akun BuKost?{" "}
                <Link href={"sign-up"} className="text-green-700">
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormSignIn;
