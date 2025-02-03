// components/Layout.tsx
import  { ReactNode } from 'react';
import Head from 'next/head';
import Provider from './Provider';
type LayoutProps = {
  children: ReactNode;
 
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
<Provider>
{children}
</Provider>      
     </div>
    
  );
};



export default Layout;