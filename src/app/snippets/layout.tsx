import { NavigationHeader } from "@/components/navigation-header"

const SnippetsLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <NavigationHeader />
    {children}
  </>
)

export default SnippetsLayout
