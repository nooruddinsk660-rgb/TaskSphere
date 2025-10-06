"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Edit2, Check, X } from "lucide-react"
import type { Task } from "@/app/page"

interface TaskCardProps {
  task: Task
  index: number
  onDelete: (id: string) => void
  onToggle: (id: string) => void
  onEdit: (id: string, title: string, category: Task["category"]) => void
}

export default function TaskCard({ task, index, onDelete, onToggle, onEdit }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editCategory, setEditCategory] = useState(task.category)

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editCategory)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditCategory(task.category)
    setIsEditing(false)
  }

  const categoryColors = {
    Work: "text-neon-blue border-neon-blue/30 bg-neon-blue/10",
    Personal: "text-neon-purple border-neon-purple/30 bg-neon-purple/10",
    Study: "text-neon-pink border-neon-pink/30 bg-neon-pink/10",
    Other: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`glass-strong rounded-xl p-6 hover:neon-glow-blue transition-all duration-300 ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-input text-foreground px-4 py-2 rounded-lg border border-border/50 focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple/50"
            autoFocus
          />
          <div className="flex items-center gap-3">
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value as Task["category"])}
              className="bg-input text-foreground px-4 py-2 rounded-lg border border-border/50 focus:border-neon-blue focus:outline-none"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Other">Other</option>
            </select>
            <motion.button
              onClick={handleSave}
              className="glass p-2 rounded-lg hover:bg-neon-purple/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Check className="w-5 h-5 text-neon-purple" />
            </motion.button>
            <motion.button
              onClick={handleCancel}
              className="glass p-2 rounded-lg hover:bg-destructive/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-destructive" />
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {/* Checkbox */}
          <motion.button
            onClick={() => onToggle(task.id)}
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
              task.completed
                ? "border-neon-purple bg-neon-purple neon-glow-purple"
                : "border-border hover:border-neon-purple"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {task.completed && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
                <Check className="w-4 h-4 text-background" />
              </motion.div>
            )}
          </motion.button>

          {/* Task Content */}
          <div className="flex-1">
            <p className={`text-lg ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {task.title}
            </p>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[task.category]}`}
            >
              {task.category}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsEditing(true)}
              className="glass p-2 rounded-lg hover:bg-neon-blue/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit2 className="w-5 h-5 text-neon-blue" />
            </motion.button>
            <motion.button
              onClick={() => onDelete(task.id)}
              className="glass p-2 rounded-lg hover:bg-destructive/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 className="w-5 h-5 text-destructive" />
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
