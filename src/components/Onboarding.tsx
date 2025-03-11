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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Step 1 Schema
const step1Schema = z.object({
  name: z.string().nonempty("Name is required"),
  age: z.string().min(1, "Age must be a positive number"),
  address: z.string().nonempty("Address is required"),
  nationality: z.string().nonempty("Nationality is required"),
  phone_number: z
    .string()
    .length(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Phone number must be numeric"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  marital_status: z.enum(["single", "married"], {
    errorMap: () => ({ message: "Marital status is required" }),
  }),
});

// Step 2 Schema
const step2Schema = z.object({
  website_name: z.string().nonempty("Website name is required"),
  description: z.string().nonempty("Description is required"),
  website_logo: z.any().optional(), // Adjust as needed for file handling
});

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step === 1 ? step1Schema : step2Schema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log("User Info:", data);
    navigate("/dashboard");
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>
      <Progress value={step === 1 ? 50 : 100} className="w-full mb-4" />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(step === 1 ? handleNext : onSubmit)}
          className="space-y-4 w-full max-w-md"
        >
          {step === 1 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">User Profile:</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input id="name" placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage>{errors.name?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="age">Age</FormLabel>
                      <FormControl>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Age"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{errors.age?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <FormControl>
                        <Input id="address" placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage>{errors.address?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="nationality">Nationality</FormLabel>
                      <FormControl>
                        <Input
                          id="nationality"
                          placeholder="Nationality"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{errors.nationality?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          id="phone_number"
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{errors.phone_number?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="gender">Gender</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>{errors.gender?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="marital_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="marital_status">
                        Marital Status
                      </FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Marital Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>
                        {errors.marital_status?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="mt-4">
                Next
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Website Information:
              </h2>
              <FormField
                control={control}
                name="website_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="website_name">Website Name</FormLabel>
                    <FormControl>
                      <Input
                        id="website_name"
                        placeholder="Website Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.website_name?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Input
                        id="description"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="website_logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="website_logo">Website Logo</FormLabel>
                    <FormControl>
                      <Input id="website_logo" type="file" {...field} />
                    </FormControl>
                    <FormMessage>{errors.website_logo?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Onboarding;
