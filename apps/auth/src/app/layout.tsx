import './global.css';
import { ReduxProvider } from "@gc-broadcast-web/redux/ReduxProvider";
import ThemeProvider from "@gc-broadcast-web/utils/theme/index"
import { MotionLazy } from "@gc-broadcast-web/components/animate/motion-lazy"
import { SnackbarProvider } from "@gc-broadcast-web/components/snackbar";
import { SettingsDrawer, SettingsProvider } from '@gc-broadcast-web/components/settings';
import ProgressBar from '@gc-broadcast-web/components/progress-bar';
import config from "@gc-broadcast-web/config/index";
import './global.css';

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: config.appName,
  description: config.description,
  // keywords: 'react,material,kit,application,dashboard,admin,template',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};
type Props = {
  children: React.ReactNode;
};

export default function RootLayout({
  children
}: Props) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SettingsProvider defaultSettings={{
            themeMode: 'dark', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'horizontal', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'red', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
          >
            <ThemeProvider>
              <MotionLazy>
                <SnackbarProvider>
                  <SettingsDrawer />
                  <ProgressBar />
                  {children}
                </SnackbarProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
