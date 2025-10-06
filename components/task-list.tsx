"use client"

import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "./task-card"
import type { Task } from "@/app/page"
import { Inbox } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
  onDeleteTask: (id: string) => void
  onToggleTask: (id: string) => void
  onEditTask: (id: string, title: string, category: Task["category"]) => void
}

export default function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <motion.div
        className="glass-strong rounded-2xl p-12 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Inbox className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-2xl font-semibold mb-2 text-foreground">No tasks yet</h3>
        <p className="text-muted-foreground">Add your first task to get started!</p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onDelete={onDeleteTask}
            onToggle={onToggleTask}
            onEdit={onEditTask}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
