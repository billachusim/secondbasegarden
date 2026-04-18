import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Loader2, LogOut, QrCode, Settings as SettingsIcon, Tag, UtensilsCrossed, Wrench } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Menu Items", icon: UtensilsCrossed, end: true },
  { to: "/admin/categories", label: "Categories", icon: Tag },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
  { to: "/admin/qr", label: "QR Code", icon: QrCode },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    navigate("/admin/login", { replace: true });
    return null;
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="font-display text-3xl font-bold">No admin access</h1>
        <p className="max-w-md text-muted-foreground">
          Your account ({user.email}) doesn't have admin access yet. Ask an existing admin to grant
          you the <span className="font-semibold">admin</span> role in the database.
        </p>
        <Button variant="outline" onClick={signOut}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-secondary/20">
      <header className="border-b border-border bg-background">
        <div className="container flex h-16 max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold">2nd Baze Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-muted-foreground hover:text-accent">View site →</a>
            <Button size="sm" variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="container flex max-w-6xl flex-1 flex-col gap-6 py-6 md:flex-row">
        <nav className="md:w-56">
          <div className="flex gap-2 overflow-x-auto rounded-xl bg-background p-2 shadow-soft md:flex-col [&::-webkit-scrollbar]:hidden">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-secondary",
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        <section className="flex-1">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
