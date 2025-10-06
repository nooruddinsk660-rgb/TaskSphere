"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import type { Task } from "@/app/page"

interface TaskInputProps {
  onAddTask: (title: string, category: Task["category"]) => void
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<Task["category"]>("Personal")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask(title.trim(), category)
      setTitle("")
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-strong rounded-2xl p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full bg-input text-foreground placeholder:text-muted-foreground px-6 py-4 rounded-xl border border-border/50 focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple/50 transition-all duration-300"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Task["category"])}
          className="bg-input text-foreground px-6 py-4 rounded-xl border border-border/50 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all duration-300"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Other">Other</option>
        </select>

        <motion.button
          type="submit"
          className="gradient-neon text-foreground px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:neon-glow-purple transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:inline">Add Task</span>
        </motion.button>
      </div>
    </motion.form>
  )
}
