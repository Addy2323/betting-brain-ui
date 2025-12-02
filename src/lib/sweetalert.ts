import Swal from 'sweetalert2';

/**
 * Custom SweetAlert2 configuration for Betting Brain
 * Provides consistent styling across all alerts
 */

// Custom theme configuration
const swalTheme = {
    background: '#1e293b',
    color: '#f1f5f9',
    confirmButtonColor: '#3B82F6',
    cancelButtonColor: '#64748b',
};

// Success alert
export const showSuccessAlert = (title: string, text?: string, timer = 1500) => {
    return Swal.fire({
        icon: 'success',
        title,
        text,
        timer,
        showConfirmButton: false,
        ...swalTheme,
    });
};

// Error alert
export const showErrorAlert = (title: string, text?: string) => {
    return Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonText: 'OK',
        ...swalTheme,
    });
};

// Warning alert
export const showWarningAlert = (title: string, text?: string) => {
    return Swal.fire({
        icon: 'warning',
        title,
        text,
        confirmButtonText: 'OK',
        ...swalTheme,
    });
};

// Info alert
export const showInfoAlert = (title: string, text?: string) => {
    return Swal.fire({
        icon: 'info',
        title,
        text,
        confirmButtonText: 'OK',
        ...swalTheme,
    });
};

// Confirmation dialog
export const showConfirmDialog = (
    title: string,
    text?: string,
    confirmButtonText = 'Yes',
    cancelButtonText = 'Cancel'
) => {
    return Swal.fire({
        icon: 'question',
        title,
        text,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        ...swalTheme,
    });
};

// Loading alert
export const showLoadingAlert = (title: string, text?: string) => {
    return Swal.fire({
        title,
        text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        ...swalTheme,
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

export default Swal;
