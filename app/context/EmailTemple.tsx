import { createContext } from 'react';
interface EmailTemplateContextType {
  emailTemplate: any; // Define a proper type for the email template
  setEmailTemplate: React.Dispatch<React.SetStateAction<any>>;
}
export const EmailTemplateContext = createContext<EmailTemplateContextType | null>(null);
