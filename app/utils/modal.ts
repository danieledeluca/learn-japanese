import Swal, { type SweetAlertIcon } from 'sweetalert2';

export function modal(
    icon: SweetAlertIcon,
    title: string,
    text?: string,
    confirmButtonText?: string,
    onClose?: () => void,
) {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        customClass: {
            confirmButton: 'contrast',
        },
        theme: 'auto',
        willClose: () => onClose?.(),
        position: window.matchMedia('(min-width: 768px)').matches ? 'center' : 'bottom',
    });
}
