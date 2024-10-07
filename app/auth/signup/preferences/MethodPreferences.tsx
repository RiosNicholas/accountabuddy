"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
  methodPreferences: z
    .string({
      required_error: "Please select your preferred way to meet.",
    }),
  frequencyPreferences: z
		.string({
			required_error: "Please select your frequency preference.",
		})
})

export default function MethodPreferences() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
		// TODO: Add a progress tracker for all of the settings. maybe replace the save preferences with forward and backwards arrow until the end.
    <>
			<h1 className="font-bold text-left">How would you like to meet?</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 lg:w-1/2 space-y-3">
					<FormField
						control={form.control}
						name="methodPreferences"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Method Preferences</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="How do you prefer to meet with your accountability person?" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="in-person">In-Person</SelectItem>
										<SelectItem value="virtual">Virtual</SelectItem>
										<SelectItem value="no-preference">No Preference</SelectItem>
									</SelectContent>
									{/* TODO: Conditionally render another form field if virtual is selected ]
										- do they prefer to meet async/sync over text? 
										- do they prefer video call, phone call? 
										- allow for multiple answer choices
									*/}
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="frequencyPreferences"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Meeting Frequency</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
										<SelectValue placeholder="How often do you want to check-in with your partner?" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="daily">Daily</SelectItem>
										<SelectItem value="weekly">Weekly</SelectItem>
										<SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
										<SelectItem value="monthly">Monthly</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormDescription>
						You can manage preferences in your{" "}
						<Link href="/profile/settings" className="underline">profile settings</Link>.
					</FormDescription>
				</form>
			</Form> 
    </>
  )
}

