"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // try {
    //   const response = await axios.patch(`/api/courses/${courseId}`, values);
    //   console.log(response);
    // } catch {
    //   console.log("Something went wrong");
    // }
    console.log(values);
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Title
        <Button variant="ghost" >
            <Pencil className="h-4 w-4 mr-2"/>
          Edit title
        </Button>
      </div>
    </div>
  );
};

export default TitleForm;
