import Swal, { type SweetAlertIcon } from 'sweetalert2';

export function modal(
    icon: SweetAlertIcon,
    title: string,
    text?: string,
    confirmButtonText?: string,
    denyButtonText?: string,
    onConfirmed?: () => void,
    onDenied?: () => void,
) {
    Swal.fire({
        title,
        html: text,
        icon,
        showDenyButton: true,
        confirmButtonText,
        denyButtonText,
        customClass: {
            confirmButton: 'contrast',
            denyButton: 'secondary',
        },
        theme: 'auto',
        willClose: () => onConfirmed?.(),
        position: window.matchMedia('(min-width: 768px)').matches ? 'center' : 'bottom',
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirmed?.();
        }

        if (result.isDenied) {
            onDenied?.();
        }
    });
}
