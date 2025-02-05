import  'bootstrap/dist/css/bootstrap.min.css';
import Providers from './Providers';
import Navbar from './components/navBar';

export const metadata = {
  title: 'Smart Task Manager',
  description: 'A simple task manager App',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
      <Providers>
        <Navbar />
        {children}
        </Providers>
      </body>
    </html>
  );
}
