/**
 * Dialog/Modal Component
 * Based on Radix UI Dialog for accessibility
 * Styled with terminal/man-page aesthetic
 */

import { forwardRef, ComponentPropsWithoutRef, ElementRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { modalBackdrop, modalContent } from '@/lib/animations'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

// Overlay with backdrop blur
const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-terminal-black/80 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// Main content wrapper
const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showClose?: boolean
  }
>(({ className, children, showClose = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // Positioning
        'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
        // Sizing
        'w-full max-w-2xl max-h-[90vh]',
        // Terminal window styling
        'border border-phosphor bg-terminal-dark',
        'shadow-lg shadow-phosphor/10',
        // Scrolling
        'overflow-hidden flex flex-col',
        // Animation
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        'duration-200',
        className
      )}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close
          className={cn(
            'absolute right-4 top-4 p-1',
            'text-phosphor-dim hover:text-phosphor',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-phosphor focus:ring-offset-2 focus:ring-offset-terminal-black',
            'disabled:pointer-events-none'
          )}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

// Terminal-style header (like man page header)
const DialogHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between px-4 py-3',
        'border-b border-phosphor-muted',
        'bg-phosphor/5',
        className
      )}
      {...props}
    />
  )
)
DialogHeader.displayName = 'DialogHeader'

// Title styled as man page header
const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-display font-semibold text-phosphor uppercase tracking-wider',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

// Description
const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-phosphor-dim', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// Scrollable body
const DialogBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 overflow-y-auto p-4 md:p-6', className)}
      {...props}
    />
  )
)
DialogBody.displayName = 'DialogBody'

// Footer
const DialogFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-3 px-4 py-3',
        'border-t border-phosphor-muted',
        className
      )}
      {...props}
    />
  )
)
DialogFooter.displayName = 'DialogFooter'

/**
 * Animated Dialog using Framer Motion
 * For more control over animations
 */
interface AnimatedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const AnimatedDialog = ({ open, onOpenChange, children }: AnimatedDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <AnimatePresence>
      {open && (
        <DialogPortal forceMount>
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DialogOverlay className="animate-none" />
          </motion.div>
          <motion.div
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]"
          >
            {children}
          </motion.div>
        </DialogPortal>
      )}
    </AnimatePresence>
  </Dialog>
)

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
  AnimatedDialog,
}
