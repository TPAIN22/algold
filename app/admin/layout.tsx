export const metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Al Gold Admin",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
