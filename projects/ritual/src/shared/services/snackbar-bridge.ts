/**
 * Snackbar Bridge
 * 
 * Connects snackbarHelper from masterfabric-expo-core to snackbarService
 * This allows snackbarHelper to work with our custom SnackbarQueue component
 */

import { snackbarHelper } from 'masterfabric-expo-core';
import { snackbarService } from './snackbar-service';

// Subscribe snackbarHelper to snackbarService
snackbarHelper.subscribe((options) => {
  snackbarService.show({
    message: options.message,
    type: options.type || 'info',
    duration: options.duration ?? 3000,
    position: options.position || 'bottom',
    action: options.action,
  });
});
