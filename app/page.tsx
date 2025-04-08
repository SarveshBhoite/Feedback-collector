"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { Moon, Sun, CheckCircle, Mail, User, Clock, MessageSquare } from "lucide-react"
import { useTheme as useNextTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// Form schema with validation
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(5, { message: "Feedback message must be at least 5 characters." }),
})

// Feedback type
type Feedback = {
  id: string
  fullName: string
  email: string
  message: string
  timestamp: Date
}

export default function FeedbackCollector() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const { theme, setTheme } = useNextTheme()

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setShowSuccess(false)

    // Simulate API call
    setTimeout(() => {
      const newFeedback: Feedback = {
        id: crypto.randomUUID(),
        ...values,
        timestamp: new Date(),
      }

      setFeedbacks([...feedbacks, newFeedback])
      form.reset()
      setIsSubmitting(false)
      setShowSuccess(true)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }, 1500)
  }

  // Generate a pastel color based on the feedback ID for visual distinction
  const getCardAccentColor = (id: string) => {
    const colors = [
      "border-l-4 border-l-blue-400 dark:border-l-blue-600",
      "border-l-4 border-l-green-400 dark:border-l-green-600",
      "border-l-4 border-l-purple-400 dark:border-l-purple-600",
      "border-l-4 border-l-amber-400 dark:border-l-amber-600",
      "border-l-4 border-l-rose-400 dark:border-l-rose-600",
    ]

    // Use the last character of the ID to select a color
    const lastChar = id.charAt(id.length - 1)
    const index = Number.parseInt(lastChar, 16) % colors.length
    return colors[index]
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with theme toggle */}
      <header className="container mx-auto py-4 px-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">Feedback Collector</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          {/* Toggle button */}
          <div className="mb-6 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Switch id="admin-mode" checked={showAdmin} onCheckedChange={setShowAdmin} />
              <Label htmlFor="admin-mode">View Submitted Feedback</Label>
            </div>
          </div>

          {/* Feedback form */}
          {!showAdmin ? (
            <Card className="w-full transition-all duration-300 ease-in-out">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Feedback Form</CardTitle>
                <CardDescription className="text-center">
                  We value your feedback. Please share your thoughts with us.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showSuccess && (
                  <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900 text-green-800 dark:text-green-300 animate-fadeIn">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>Thank you! Your feedback has been submitted successfully.</AlertDescription>
                  </Alert>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="abc@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Feedback Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please share your thoughts here..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Submit Feedback"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            // Enhanced Admin view
            <div className="w-full transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-center mb-6">
                <h2 className="text-2xl font-bold text-center">Admin View</h2>
                {feedbacks.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {feedbacks.length} {feedbacks.length === 1 ? "entry" : "entries"}
                  </Badge>
                )}
              </div>

              {feedbacks.length === 0 ? (
                <Card className="w-full">
                  <CardContent className="pt-6 text-center">
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                      <p>No feedback submitted yet.</p>
                      <p className="text-sm mt-2">Submitted feedback will appear here.</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {feedbacks.map((feedback) => (
                    <Card
                      key={feedback.id}
                      className={`w-full transition-all hover:shadow-md animate-fadeIn ${getCardAccentColor(feedback.id)} overflow-hidden`}
                    >
                      <CardHeader className="pb-2 bg-muted/30">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <CardTitle className="text-lg">{feedback.fullName}</CardTitle>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {format(feedback.timestamp, "MMM d, yyyy 'at' h:mm a")}
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                          <CardDescription>{feedback.email}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="whitespace-pre-wrap">{feedback.message}</p>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground border-t bg-muted/20 py-2">
                        <span>Feedback ID: {feedback.id.substring(0, 8)}...</span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Created by SARVESH | Task Completed
        </div>
      </footer>
    </div>
  )
}
