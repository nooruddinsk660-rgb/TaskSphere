"use client"

import { motion } from "framer-motion"
import { Heart, Github, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer
      className="relative mt-auto backdrop-blur-xl bg-background/80 border-t-2 border-neon-blue/30 py-6 shadow-[0_-4px_20px_-4px_oklch(0.60_0.25_220/0.1)]"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-neon-pink fill-neon-pink" />
            <span>by Sk Nooruddin</span>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              className="glass p-2 rounded-lg hover:neon-glow-blue transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5 text-neon-blue" />
            </motion.a>
            <motion.a
              href="#"
              className="glass p-2 rounded-lg hover:neon-glow-purple transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-5 h-5 text-neon-purple" />
            </motion.a>
          </div>

          <p className="text-xs text-muted-foreground">© 2025 TaskSphere. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}
