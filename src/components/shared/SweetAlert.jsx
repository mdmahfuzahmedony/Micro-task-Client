"use client"
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SweetAlert() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const success = searchParams.get('success');
    const error = searchParams.get('error');

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: 'Success!',
                text: success,
                icon: 'success',
                confirmButtonText: 'Go to Home',
                confirmButtonColor: '#4f46e5',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/'); // এখানে হোম পেজ বা লগইন পেজের রুট দিন
                }
            });
        }

        if (error) {
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#ef4444',
            }).then(() => {
                // এরর মেসেজ দেখানোর পর URL টা পরিষ্কার করে ফেলা
                router.replace('/register');
            });
        }
    }, [success, error, router]);

    return null;
}