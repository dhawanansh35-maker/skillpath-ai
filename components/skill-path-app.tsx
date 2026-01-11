"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CareerRoadmap } from "@/components/career-roadmap"
import { Compass, Sparkles } from "lucide-react"

const interests = [
  { value: "technology", label: "Technology", icon: "💻" },
  { value: "design", label: "Design", icon: "🎨" },
  { value: "business", label: "Business", icon: "📊" },
]

const skillLevels = [
  { value: "beginner", label: "Beginner", description: "Just starting out" },
  { value: "intermediate", label: "Intermediate", description: "Some experience" },
]

export function SkillPathApp() {
  const [interest, setInterest] = useState<string>("")
  const [skillLevel, setSkillLevel] = useState<string>("")
  const [showRoadmap, setShowRoadmap] = useState(false)

  const handleGenerate = () => {
    if (interest && skillLevel) {
      setShowRoadmap(true)
    }
  }

  const handleReset = () => {
    setShowRoadmap(false)
    setInterest("")
    setSkillLevel("")
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Compass className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">SkillPath</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto text-balance">
          AI-powered career guidance to help you discover your ideal career path based on your interests and skill
          level.
        </p>
      </div>

      {!showRoadmap ? (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Find Your Career Path</CardTitle>
            <CardDescription>
              Select your interest area and current skill level to generate a personalized career roadmap.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Interest Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">What's your interest area?</Label>
              <RadioGroup
                value={interest}
                onValueChange={setInterest}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {interests.map((item) => (
                  <Label
                    key={item.value}
                    htmlFor={item.value}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                      interest === item.value ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value={item.value} id={item.value} className="sr-only" />
                    <span className="text-3xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Skill Level Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">What's your current skill level?</Label>
              <RadioGroup
                value={skillLevel}
                onValueChange={setSkillLevel}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {skillLevels.map((level) => (
                  <Label
                    key={level.value}
                    htmlFor={level.value}
                    className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                      skillLevel === level.value ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value={level.value} id={level.value} className="sr-only" />
                    <span className="font-medium">{level.label}</span>
                    <span className="text-sm text-muted-foreground">{level.description}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Generate Button */}
            <Button onClick={handleGenerate} disabled={!interest || !skillLevel} className="w-full" size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Career Path
            </Button>
          </CardContent>
        </Card>
      ) : (
        <CareerRoadmap interest={interest} skillLevel={skillLevel} onReset={handleReset} />
      )}
    </div>
  )
}
