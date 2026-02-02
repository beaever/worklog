'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResponsiveModalContextValue {
  isMobile: boolean;
}

const ResponsiveModalContext = React.createContext<ResponsiveModalContextValue>({
  isMobile: false,
});

function useResponsiveModal() {
  return React.useContext(ResponsiveModalContext);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

interface ResponsiveModalRootProps extends DialogPrimitive.DialogProps {
  children: React.ReactNode;
}

function ResponsiveModalRoot({ children, ...props }: ResponsiveModalRootProps) {
  const isMobile = useIsMobile();

  return (
    <ResponsiveModalContext.Provider value={{ isMobile }}>
      <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
    </ResponsiveModalContext.Provider>
  );
}

const ResponsiveModalTrigger = DialogPrimitive.Trigger;

const ResponsiveModalClose = DialogPrimitive.Close;

const ResponsiveModalPortal = DialogPrimitive.Portal;

const ResponsiveModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
ResponsiveModalOverlay.displayName = 'ResponsiveModalOverlay';

interface ResponsiveModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean;
}

const ResponsiveModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ResponsiveModalContentProps
>(({ className, children, showCloseButton = true, ...props }, ref) => {
  const { isMobile } = useResponsiveModal();

  return (
    <ResponsiveModalPortal>
      <ResponsiveModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-50 grid gap-4 border bg-background shadow-lg duration-200',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          isMobile
            ? [
                'inset-x-0 bottom-0 rounded-t-2xl p-6',
                'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
                'max-h-[90vh] overflow-y-auto',
              ]
            : [
                'left-[50%] top-[50%] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg p-6',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
                'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
              ],
          className,
        )}
        {...props}
      >
        {isMobile && (
          <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-muted" />
        )}
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </ResponsiveModalPortal>
  );
});
ResponsiveModalContent.displayName = 'ResponsiveModalContent';

function ResponsiveModalHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isMobile } = useResponsiveModal();

  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5',
        isMobile ? 'text-center' : 'text-left',
        className,
      )}
      {...props}
    />
  );
}
ResponsiveModalHeader.displayName = 'ResponsiveModalHeader';

function ResponsiveModalBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('py-4', className)} {...props} />;
}
ResponsiveModalBody.displayName = 'ResponsiveModalBody';

function ResponsiveModalFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isMobile } = useResponsiveModal();

  return (
    <div
      className={cn(
        'flex gap-2',
        isMobile ? 'flex-col' : 'flex-row justify-end',
        className,
      )}
      {...props}
    />
  );
}
ResponsiveModalFooter.displayName = 'ResponsiveModalFooter';

const ResponsiveModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
ResponsiveModalTitle.displayName = 'ResponsiveModalTitle';

const ResponsiveModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
ResponsiveModalDescription.displayName = 'ResponsiveModalDescription';

// 컴파운드 패턴 export
const ResponsiveModal = Object.assign(ResponsiveModalRoot, {
  Trigger: ResponsiveModalTrigger,
  Close: ResponsiveModalClose,
  Content: ResponsiveModalContent,
  Header: ResponsiveModalHeader,
  Body: ResponsiveModalBody,
  Footer: ResponsiveModalFooter,
  Title: ResponsiveModalTitle,
  Description: ResponsiveModalDescription,
});

export {
  ResponsiveModal,
  ResponsiveModalRoot,
  ResponsiveModalTrigger,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalBody,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
  useResponsiveModal,
};
