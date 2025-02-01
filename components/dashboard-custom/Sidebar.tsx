import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupContent,
    SidebarGroupLabel
  } from "@/components/ui/sidebar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSeparator
  } from "@/components/ui/dropdown-menu"
  import { Calendar, Home, Inbox, Search, Settings, ArrowUp,Mail,MessageSquare,PlusCircle } from "lucide-react"
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu"
  const items = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "MDX Editor",
      url: "/dashboard/editor",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader >
          <div className="flex w-full justify-center items-center space-x-2">
            <img
              src="/globe.svg"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-semibold">Mdx</span>
           </div>
          </SidebarHeader>
       
          <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span> 
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className=" flex justify-around">
                   <span>Username</span>  <span><ArrowUp></ArrowUp></span>
                 </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                          <DropdownMenuItem>
                    <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="w-full">
                      <span>new</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal >
              <DropdownMenuSubContent className="w-full">
                <DropdownMenuItem >
                  <Mail />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
       
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
  }
  