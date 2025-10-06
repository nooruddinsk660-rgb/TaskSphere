"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Filter, Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface NavbarProps {
  filter: "all" | "completed" | "active"
  setFilter: (filter: "all" | "completed" | "active") => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
}

export default function Navbar({ filter, setFilter, categoryFilter, setCategoryFilter }: NavbarProps) {
  const categories = ["all", "Work", "Personal", "Study", "Other"]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/90 border-b-2 border-neon-purple/40 shadow-lg shadow-neon-purple/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              // // animate={{
              //   rotate: [0, 360],
              // }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Image
                src="/tasksphere-logo.png"
                alt="TaskSphere Logo"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_0_15px_rgba(255,0,255,0.6)]"
              />
            </motion.div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,0,255,0.4)]">
              TaskSphere
            </span>
          </motion.div>

          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="flex gap-2">
                {(["all", "active", "completed"] as const).map((f) => (
                  <motion.button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      filter === f
                        ? "glass-strong neon-glow-purple text-foreground"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    categoryFilter === cat
                      ? "gradient-neon text-foreground"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="lg:hidden glass rounded-lg p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-4 pb-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Status Filter Mobile */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Status:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["all", "active", "completed"] as const).map((f) => (
                    <motion.button
                      key={f}
                      onClick={() => {
                        setFilter(f)
                        setMobileMenuOpen(false)
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        filter === f
                          ? "glass-strong neon-glow-purple text-foreground"
                          : "glass text-muted-foreground hover:text-foreground"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Category Filter Mobile */}
              <div>
                <span className="text-sm text-muted-foreground mb-2 block">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      onClick={() => {
                        setCategoryFilter(cat)
                        setMobileMenuOpen(false)
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                        categoryFilter === cat
                          ? "gradient-neon text-foreground"
                          : "glass text-muted-foreground hover:text-foreground"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
