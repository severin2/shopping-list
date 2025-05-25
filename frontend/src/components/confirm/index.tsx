import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = 'Delete Item?',
  description = 'Are you sure you want to delete this item? This can not be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color='inherit'>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color='primary' type='button' variant='contained'>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
