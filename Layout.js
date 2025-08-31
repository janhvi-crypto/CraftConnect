import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  Upload, 
  Megaphone, 
  TrendingUp, 
  Store, 
  Settings,
  Sparkles,
  Heart
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
    color: "text-orange-600"
  },
  {
    title: "Create Product",
    url: createPageUrl("CreateProduct"),
    icon: Upload,
    color: "text-amber-600"
  },
  {
    title: "Marketing Studio",
    url: createPageUrl("MarketingStudio"),
    icon: Megaphone,
    color: "text-red-600"
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: TrendingUp,
    color: "text-emerald-600"
  },
  {
    title: "My Storefront",
    url: createPageUrl("Storefront"),
    icon: Store,
    color: "text-blue-600"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style jsx>{`
        :root {
          --craft-saffron: #ff6b35;
          --craft-terracotta: #d4622d;
          --craft-gold: #f4a261;
          --craft-warm-white: #fefdf8;
          --craft-sage: #7b8471;
        }
      `}</style>
      
      <div className="min-h-screen flex w-full" style={{background: 'linear-gradient(135deg, #fefdf8 0%, #f9f5f0 100%)'}}>
        <Sidebar className="border-r border-orange-100/50 bg-gradient-to-b from-orange-50/30 to-amber-50/30 backdrop-blur-sm">
          <SidebarHeader className="border-b border-orange-100/50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900">CraftConnect</h2>
                <p className="text-sm text-orange-600 font-medium">AI Marketplace</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-3 py-3">
                Main Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-orange-50 hover:text-orange-700 transition-all duration-300 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-orange-100/80 text-orange-800 shadow-sm' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className={`w-5 h-5 ${item.color}`} />
                          <span className="font-semibold">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-3 py-3 mt-4">
                Heritage Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100">
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-gray-700">Products Created</span>
                      <span className="ml-auto font-bold text-orange-600">0</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-gray-700">Total Views</span>
                      <span className="ml-auto font-bold text-emerald-600">0</span>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-orange-100/50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">Artisan</p>
                <p className="text-xs text-gray-600 truncate">Heritage Craftsperson</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100/50 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-orange-50 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-orange-800">CraftConnect</h1>
            </div>
          </header>

          {/* Main content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
