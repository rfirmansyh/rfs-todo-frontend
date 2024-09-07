import React, { useMemo } from 'react';
import type { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import {
  AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle  
} from '@/components/atoms/alert-dialog';
import { Button, type ButtonProps } from '@/components/atoms/button';


type TAlertDialogConfirmationProps = {
  loading?: boolean;
  variant?: 'confirm' | 'delete'
  onConfirm?(): void;
} & AlertDialogProps

const AlertDialogConfirmation = ({
  open,
  loading,
  variant,
  onConfirm,
  onOpenChange,
}: TAlertDialogConfirmationProps) => {
  const btnConfirmVariant = useMemo<ButtonProps['variant']>(() => {
    if (variant === 'delete') {
      return 'outline-destructive';
    }

    return 'default'; 
  }, [variant]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Todo
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange?.(false)}>Cancel</AlertDialogCancel>
          <Button type="button" variant={btnConfirmVariant} color="danger" onClick={onConfirm}>
            {loading ? 'Loading...' : 'Continue'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogConfirmation;