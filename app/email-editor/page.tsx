'use client'
import EditorHeader from '@/components/email-custom/EditorHeader'
import EmailCanvas from '@/components/email-custom/EmailCanvas'
import EmailSetting from '@/components/email-custom/EmailSetting'
import EmailSidebar from '@/components/email-custom/EmailSidebar'


export default function page() {
  return (
    <div>
        <EditorHeader />

        <div className="grid grid-flow-col w-full col-span-7">
      

            <EmailSidebar />
 
            <div className="grid col-span-5 bg-slate-200 h-full">
                <EmailCanvas />

            </div>
            <EmailSetting />
        </div>
    </div>
  )
}
