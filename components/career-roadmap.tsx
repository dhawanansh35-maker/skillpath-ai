"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Circle, Rocket } from "lucide-react"

interface CareerRoadmapProps {
  interest: string
  skillLevel: string
  onReset: () => void
}

const roadmapData: Record<
  string,
  Record<string, { title: string; steps: { title: string; description: string }[] }>
> = {
  technology: {
    beginner: {
      title: "Software Developer Path",
      steps: [
        {
          title: "Learn Programming Basics",
          description: "Start with Python or JavaScript fundamentals, variables, loops, and functions.",
        },
        {
          title: "Build Small Projects",
          description: "Create simple apps like a calculator, to-do list, or personal website.",
        },
        {
          title: "Learn Version Control",
          description: "Master Git and GitHub for code collaboration and portfolio building.",
        },
        {
          title: "Study Data Structures",
          description: "Understand arrays, objects, and basic algorithms for problem-solving.",
        },
        {
          title: "Apply for Junior Roles",
          description: "Target entry-level developer or internship positions to gain experience.",
        },
      ],
    },
    intermediate: {
      title: "Full-Stack Developer Path",
      steps: [
        { title: "Master a Framework", description: "Deep dive into React, Next.js, or Vue for frontend development." },
        {
          title: "Learn Backend Development",
          description: "Build APIs with Node.js, Python, or Go and understand databases.",
        },
        { title: "Cloud & DevOps Basics", description: "Deploy apps on AWS, Vercel, or similar platforms with CI/CD." },
        { title: "Contribute to Open Source", description: "Build reputation and learn from real-world codebases." },
        {
          title: "Target Mid-Level Positions",
          description: "Apply for full-stack or specialized roles at tech companies.",
        },
      ],
    },
  },
  design: {
    beginner: {
      title: "UI/UX Designer Path",
      steps: [
        {
          title: "Learn Design Fundamentals",
          description: "Study color theory, typography, layout principles, and visual hierarchy.",
        },
        {
          title: "Master Design Tools",
          description: "Get proficient with Figma, Sketch, or Adobe XD for creating mockups.",
        },
        { title: "Understand UX Principles", description: "Learn user research, personas, and user journey mapping." },
        {
          title: "Build a Portfolio",
          description: "Create 3-5 case studies showcasing your design process and solutions.",
        },
        {
          title: "Apply for Junior Roles",
          description: "Target UI/UX designer or product design internship positions.",
        },
      ],
    },
    intermediate: {
      title: "Senior Product Designer Path",
      steps: [
        {
          title: "Deepen UX Research Skills",
          description: "Master usability testing, A/B testing, and data-driven design decisions.",
        },
        {
          title: "Learn Design Systems",
          description: "Create and maintain scalable component libraries and style guides.",
        },
        {
          title: "Prototype & Animation",
          description: "Build interactive prototypes with advanced micro-interactions.",
        },
        {
          title: "Develop Leadership Skills",
          description: "Mentor juniors, lead design sprints, and present to stakeholders.",
        },
        {
          title: "Target Senior Positions",
          description: "Apply for senior designer or design lead roles at product companies.",
        },
      ],
    },
  },
  business: {
    beginner: {
      title: "Business Analyst Path",
      steps: [
        {
          title: "Learn Business Fundamentals",
          description: "Understand finance, marketing, operations, and strategy basics.",
        },
        {
          title: "Master Excel & Data Tools",
          description: "Get proficient with spreadsheets, SQL basics, and data visualization.",
        },
        { title: "Study Project Management", description: "Learn Agile, Scrum, and basic PM frameworks like PMBOK." },
        {
          title: "Develop Communication Skills",
          description: "Practice presenting insights and writing professional reports.",
        },
        {
          title: "Apply for Entry Roles",
          description: "Target business analyst, operations, or project coordinator positions.",
        },
      ],
    },
    intermediate: {
      title: "Product Manager Path",
      steps: [
        {
          title: "Master Product Frameworks",
          description: "Learn PRDs, roadmapping, prioritization (RICE, MoSCoW), and OKRs.",
        },
        { title: "Deepen Technical Knowledge", description: "Understand APIs, databases, and development workflows." },
        {
          title: "Build Stakeholder Skills",
          description: "Practice negotiation, cross-functional collaboration, and leadership.",
        },
        {
          title: "Launch a Product",
          description: "Lead a product launch or significant feature from ideation to release.",
        },
        {
          title: "Target PM Positions",
          description: "Apply for Associate PM or PM roles at tech or product companies.",
        },
      ],
    },
  },
}

export function CareerRoadmap({ interest, skillLevel, onReset }: CareerRoadmapProps) {
  const roadmap = roadmapData[interest]?.[skillLevel]

  if (!roadmap) {
    return null
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onReset} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Start Over
      </Button>

      <Card className="shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-2">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{roadmap.title}</CardTitle>
          <CardDescription>Your personalized career roadmap based on your selections</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

            {/* Steps */}
            <div className="space-y-8">
              {roadmap.steps.map((step, index) => (
                <div key={index} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-primary">
                    {index === 0 ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-1">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        This roadmap is a general guide. Your actual path may vary based on opportunities and personal goals.
      </p>
    </div>
  )
}
