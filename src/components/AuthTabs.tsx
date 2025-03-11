import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import console from "console";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    reEnterPassword: z.string().min(6, "Re-enter password is required"),
  })
  .refine((data) => data.password === data.reEnterPassword, {
    message: "Passwords must match",
    path: ["reEnterPassword"],
  });

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function AuthTabs() {
  const { signup, signin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(activeTab === "signup" ? signupSchema : signinSchema),
    defaultValues: {
      email: "",
      password: "",
      reEnterPassword: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (activeTab === "signup") {
        const { error } = await signup(data.email, data.password);
        if (error) {
          console.error("Error signing up: " + error.message);
          return;
        }
        toast("Please check your email for the verification link.");
        form.reset();
        setTimeout(() => {
          setActiveTab("login");
        }, 0);
      } else {
        const { error } = await signin(data.email, data.password);
        if (error) {
          console.error("Error signing in: " + error.message);
          return;
        }
        navigate("/onboarding");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("An error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={() => {
        setActiveTab(activeTab === "login" ? "signup" : "login");
        form.reset();
      }}
    >
      <TabsList>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="login-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="login-password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="********"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="signup">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="signup-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="signup-password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="********"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="reEnterPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="re-enter-password">
                    Re-enter Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="re-enter-password"
                      type="password"
                      placeholder="********"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage>{errors.reEnterPassword?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
