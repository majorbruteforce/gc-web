'use client';
import { GuestGuard } from '@gc-broadcast-web/utils/auth/guard';
import AuthClassicLayout from '@gc-broadcast-web/utils/layouts/auth/classic';

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {

    return (
        <GuestGuard>
            <AuthClassicLayout image='/psoc_logo.png'>{children}</AuthClassicLayout>
        </GuestGuard>
    );
}