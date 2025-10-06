"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import TaskInput from "@/components/task-input"
import TaskList from "@/components/task-list"
import Footer from "@/components/footer"
import { Moon, Sun } from "lucide-react"
import Image from "next/image"

export interface Task {
  id: string
  title: string
  category: "Work" | "Personal" | "Study" | "Other"
  completed: boolean
  createdAt: number
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [greeting, setGreeting] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasksphere-tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }

    const savedTheme = localStorage.getItem("tasksphere-theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Set greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")

    // Set current date
    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    setCurrentDate(date)
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem("tasksphere-tasks")) {
      localStorage.setItem("tasksphere-tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("tasksphere-theme", !isDarkMode ? "dark" : "light")
  }

  const addTask = (title: string, category: Task["category"]) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      category,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks([newTask, ...tasks])
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const editTask = (id: string, title: string, category: Task["category"]) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title, category } : task)))
  }

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filter === "all" ? true : filter === "completed" ? task.completed : !task.completed

    const categoryMatch = categoryFilter === "all" ? true : task.category === categoryFilter

    return statusMatch && categoryMatch
  })

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="min-h-screen gradient-neon-subtle relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, oklch(0.75 0.20 200) 0%, transparent 70%)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, oklch(0.70 0.30 330) 0%, transparent 70%)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar
          filter={filter}
          setFilter={setFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        <motion.section
          className="container mx-auto px-4 pt-32 md:pt-36 pb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.div
                // animate={{
                //   rotate: [0, 360],
                // }}
                transition={{
                  duration: 30,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Image
                  src="/logo Image.png"
                  alt="TaskSphere"
                  width={280}
                  height={280}
                  className="w-80 h-80 md:w-64 md:h-64 lg:w-72 lg:h-72 drop-shadow-[0_0_40px_rgba(255,0,255,0.7)]"
                  priority
                />
              </motion.div>
            </motion.div>
            <motion.p
              className="text-xl md:text-4xl text-muted-foreground mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Manage Your Day in Style
            </motion.p>
            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {currentDate}
            </motion.p>
          </div>

          {/* Greeting and Stats */}
          <motion.div
            className="glass-strong rounded-2xl p-8 mb-8 max-w-4xl mx-auto border-2 border-neon-purple/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-glow-cyan">{greeting}, Noor!</h2>
                <p className="text-muted-foreground">
                  You have {tasks.filter((t) => !t.completed).length} tasks to complete today
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className="glass rounded-full p-4 hover:neon-glow-purple transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-6 h-6 text-neon-pink" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-6 h-6 text-neon-cyan" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-semibold text-neon-purple">
                  {completedCount}/{totalCount} tasks completed ({Math.round(progressPercentage)}%)
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-neon"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Task Input */}
          <TaskInput onAddTask={addTask} />
        </motion.section>

        {/* Task List */}
        <section className="container mx-auto px-4 pb-12">
          <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} onEditTask={editTask} />
        </section>

        <Footer />
      </div>
    </div>
  )
}
