/**
 * useValidator Hook
 * Wrapper for masterfabric-expo-core validator helper
 */

import { useState, useCallback, useEffect } from 'react';
import {
  ValidationResult,
  ValidatorOptions,
  ValidatorType,
  getValidatorHelper,
} from 'masterfabric-expo-core';

export interface UseValidatorReturn {
  value: string;
  setValue: (value: string) => void;
  result: ValidationResult;
  validate: (inputValue: string) => ValidationResult;
  isValid: boolean;
  error?: string;
  errors?: string[];
  reset: () => void;
}

export function useValidator(
  type: ValidatorType,
  options?: ValidatorOptions
): UseValidatorReturn {
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<ValidationResult>({ isValid: true });

  const validate = useCallback(
    (inputValue: string): ValidationResult => {
      const validatorHelper = getValidatorHelper();
      const validationResult = validatorHelper.validate(inputValue, type, options);
      setResult(validationResult);
      return validationResult;
    },
    [type, options]
  );

  // Auto-validate when value changes
  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      validate(value);
    } else {
      // Reset validation state when empty
      setResult({ isValid: true });
    }
  }, [value, type]);

  const handleSetValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const reset = useCallback(() => {
    setValue('');
    setResult({ isValid: true });
  }, []);

  return {
    value,
    setValue: handleSetValue,
    result,
    validate,
    isValid: result.isValid,
    error: result.error,
    errors: result.errors,
    reset,
  };
}
