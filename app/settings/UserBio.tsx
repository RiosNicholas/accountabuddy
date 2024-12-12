"use client"

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
  bio: z
    .string()
    .min(2, {
      message: "Bio must be at least 2 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 300 characters.",
    }),
})

export default function UserBio() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <Button variant="link" onClick={toggleEditing}>{isEditing ? "Cancel" : "Edit"}</Button>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-3">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  disabled={!isEditing}
                  // TODO: add value from query value={}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isEditing && <Button variant="outline" type="submit">Save Changes</Button> }
      </form>
    </Form>
  )
}
